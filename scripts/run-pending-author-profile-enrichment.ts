import { readFile, readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseInventory, runPilot, type AuthorProfileCandidate } from './enrich-author-profiles.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const researchDirectory = resolve(root, 'data/research/author-profile-enrichment')
const outputPath = resolve(researchDirectory, 'pending-profiles-candidates.json')
const reportPath = resolve(researchDirectory, 'PENDING_PROFILES_REVIEW.md')
const excludedIds = new Set(['anonimo', 'autor-no-identificado'])

async function readCandidates(path: string): Promise<AuthorProfileCandidate[]> {
  try {
    const value = JSON.parse(await readFile(path, 'utf8')) as unknown
    return Array.isArray(value) ? value as AuthorProfileCandidate[] : []
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw error
  }
}

export async function pendingAuthorIds(): Promise<string[]> {
  const [inventory, files] = await Promise.all([readFile(resolve(root, 'docs/AUTHOR_PROFILES_BACKLOG.md'), 'utf8'), readdir(researchDirectory)])
  const previousFiles = files.filter((file) => file.endsWith('-candidates.json') && resolve(researchDirectory, file) !== outputPath)
  const generated = new Set((await Promise.all(previousFiles.map(async (file) => readCandidates(resolve(researchDirectory, file))))).flat().filter((candidate) => candidate.status === 'candidate_generated').map((candidate) => candidate.author_id))
  return parseInventory(inventory).map((author) => author.id).filter((id) => !excludedIds.has(id) && !generated.has(id))
}

function row(candidate: AuthorProfileCandidate): string {
  const qid = candidate.wikidata_id ? `[${candidate.wikidata_id}](https://www.wikidata.org/wiki/${candidate.wikidata_id})` : '—'
  const page = candidate.sources.find((source) => source.kind === 'wikipedia')
  return `| \`${candidate.author_id}\` | ${qid} | ${page ? `[${page.title}](${page.url})` : '—'} | ${candidate.candidate.featured_work_candidates.length} |`
}

function missingFields(candidate: AuthorProfileCandidate): string[] {
  const missing: string[] = []
  if (!candidate.candidate.canonical_name) missing.push('nombre canónico')
  if (!candidate.candidate.country_or_citizenship.length) missing.push('P27')
  if (candidate.candidate.birth_year === null) missing.push('P569')
  if (candidate.candidate.death_year === null) missing.push('P570')
  if (!candidate.candidate.featured_work_candidates.length) missing.push('P800')
  return missing
}

export function buildReport(candidates: AuthorProfileCandidate[], ids: string[]): string {
  const matched = candidates.filter((candidate) => candidate.identity_status === 'matched')
  const complete = matched.filter((candidate) => !missingFields(candidate).length)
  const incomplete = matched.filter((candidate) => missingFields(candidate).length)
  const unresolved = candidates.filter((candidate) => candidate.identity_status !== 'matched')
  const coverage = {
    canonical_name: matched.filter((candidate) => candidate.candidate.canonical_name !== null).length,
    citizenship: matched.filter((candidate) => candidate.candidate.country_or_citizenship.length > 0).length,
    birth_year: matched.filter((candidate) => candidate.candidate.birth_year !== null).length,
    death_year: matched.filter((candidate) => candidate.candidate.death_year !== null).length,
    works: matched.filter((candidate) => candidate.candidate.featured_work_candidates.length > 0).length,
  }
  const warnings = candidates.filter((candidate) => candidate.warnings.some((warning) => /homo|coincide|discrepancia/i.test(warning)))
  return `# Revisión del lote pendiente de perfiles\n\n**Fecha de consulta:** 2026-07-28  \n**Estado editorial:** los ${candidates.length} registros permanecen exclusivamente como \`candidate_generated\`; no se modificó \`data/source/catalog.json\` ni \`profile_status\`.\n\n## Alcance\n\nSe procesaron en el orden vigente del inventario los ${ids.length} IDs ordinarios pendientes. Se excluyeron \`anonimo\`, \`autor-no-identificado\`, las casillas completadas y los cinco IDs ya presentes en \`pilot-candidates.json\`. La salida JSON se ordena por ID para que sea determinista; el procesamiento y las consultas fueron secuenciales.\n\n## Cobertura por campo\n\n| Campo candidato | Cobertura entre identidades confirmadas (${matched.length}) |\n| --- | ---: |\n| Nombre canónico | ${coverage.canonical_name} |\n| Ciudadanía(s) P27 | ${coverage.citizenship} |\n| Año de nacimiento P569 | ${coverage.birth_year} |\n| Año de fallecimiento P570 | ${coverage.death_year} |\n| Una o más obras P800 | ${coverage.works} |\n\nCada campo conserva procedencia, URL y fecha de consulta en \`field_provenance\` de [pending-profiles-candidates.json](pending-profiles-candidates.json). Wikidata y Wikipedia son fuentes de descubrimiento estructurado: no constituyen aprobación editorial.\n\n## Candidatos completos\n\n${complete.length ? `| ID | QID | Página concreta | P800 candidatos |\n| --- | --- | --- | ---: |\n${complete.map(row).join('\n')}` : 'No hubo candidatos con los cinco campos estructurados disponibles.'}\n\n## Datos ausentes\n\n${incomplete.length ? `| ID | Campos ausentes | Advertencias conservadas |\n| --- | --- | --- |\n${incomplete.map((candidate) => `| \`${candidate.author_id}\` | ${missingFields(candidate).join(', ')} | ${candidate.warnings.join(' ') || '—'} |`).join('\n')}` : 'No hay datos ausentes entre las identidades confirmadas.'}\n\n## Identidades ambiguas o no encontradas\n\n${unresolved.length ? `| ID | Estado | Advertencia |\n| --- | --- | --- |\n${unresolved.map((candidate) => `| \`${candidate.author_id}\` | ${candidate.identity_status} | ${candidate.warnings.join(' ')} |`).join('\n')}` : 'No quedaron identidades ambiguas ni no encontradas.'}\n\n## Valores contradictorios o desambiguaciones que requieren revisión\n\n${warnings.length ? `| ID | Advertencia conservada |\n| --- | --- |\n${warnings.map((candidate) => `| \`${candidate.author_id}\` | ${candidate.warnings.filter((warning) => /homo|coincide|discrepancia/i.test(warning)).join(' ')} |`).join('\n')}` : 'No se detectaron contradicciones estructuradas ni desambiguaciones basadas en el catálogo.'}\n\n## Obras que requieren selección editorial\n\nLas ${coverage.works} fichas con P800 sólo contienen candidatos estructurados; ninguna obra fue seleccionada ni incorporada al catálogo. ${matched.filter((candidate) => !candidate.candidate.featured_work_candidates.length).length} identidades no aportan P800 y quedan explícitamente pendientes de investigación bibliográfica. La selección humana debe confirmar representatividad, atribución y metadatos antes de promover cualquier valor.\n`
}

const existing = await readCandidates(outputPath)
const ids = existing.length ? existing.map((candidate) => candidate.author_id) : await pendingAuthorIds()
const candidates = existing.length ? existing : await runPilot({ ids, inventoryPath: resolve(root, 'docs/AUTHOR_PROFILES_BACKLOG.md'), catalogPath: resolve(root, 'data/source/catalog.json'), outputPath, cacheDir: resolve(researchDirectory, 'cache'), pauseMs: 250 })
await writeFile(reportPath, buildReport(candidates, ids))
console.log(`Lote pendiente: ${candidates.length} candidatos; ${ids.length} IDs seleccionados.`)
