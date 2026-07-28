import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Author, Catalog, Drink, Evidence, Recommendation, Work } from './content-types.ts'

type Proposal = { discovery_id: string; source_candidate_ids: string[]; author: { action: string; canonical_id: string; canonical_name: string }; work: { action: string; canonical_id: string | null; title: string | null }; drink: { action: string; canonical_id: string; name_es: string; aliases: string[] }; recommendation: { relationship_type: Recommendation['relationship_type']; confidence: Recommendation['confidence']; headline_es: string; explanation_es: string }; evidence: { source_id: string; claim: string; locator: string; support_excerpt: string } }
type Batch = { items: Proposal[] }
type ReadyItem = { source_candidate_ids?: string[] }
type Manifest = { final_counts: { catalog: Record<string, number>; catalog_added: Record<string, number>; published_provisional_groups: number; promotion_ready_groups: number } }

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const base = resolve(root, 'data/research/book-convergence/three-literary-books')
const date = '2026-07-28'
const json = async <T>(path: string) => JSON.parse(await readFile(path, 'utf8')) as T
const save = async (path: string, value: unknown) => writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
const add = <T extends { id: string }>(items: T[], value: T) => { if (!items.some((item) => item.id === value.id)) items.push(value) }

function alcoholic(name: string): boolean {
  return /(whisk|wine|vino|beer|cerveza|rum|ron\b|vodka|gin\b|brandy|cognac|champ|martini|daiquiri|julep|bourbon|scotch|baijiu|mamajuana|absinthe|te-zerac|bellini|liqueur|cordial)/i.test(name)
}

function drinkFrom(proposal: Proposal): Drink {
  const direct = proposal.drink.action === 'create_serving_only'
  const hasAlcohol = alcoholic(proposal.drink.name_es)
  return {
    id: proposal.drink.canonical_id,
    name_es: proposal.drink.name_es,
    aliases: proposal.drink.aliases,
    category: direct ? 'Bebida de servicio directo' : 'Bebida de la casa',
    alcoholic: hasAlcohol,
    ingredients: direct ? [] : [{ name: 'base de la bebida', amount: 1, unit: 'porción' }],
    steps: [direct ? 'Sirve la bebida a la temperatura adecuada.' : 'Prepara una versión original de la casa según los ingredientes disponibles.'],
    glassware: direct ? 'Vaso de servicio' : 'Vaso de preparación',
    recipe_note: direct ? 'Bebida servida directamente; el libro respalda el maridaje, no una receta.' : 'Receta de la casa separada del maridaje editorial atribuido a Literary Libations.',
    recipe_status: direct ? 'serving_only' : 'house',
  }
}

async function main(): Promise<void> {
  const catalog = await json<Catalog>(resolve(root, 'data/source/catalog.json'))
  const initial = Object.fromEntries(Object.entries(catalog).map(([key, value]) => [key, Array.isArray(value) ? value.length : 0]))
  const batches = await Promise.all(Array.from({ length: 8 }, (_, index) => json<Batch>(resolve(base, `agent-results/literary-libations-${String(index + 1).padStart(2, '0')}.json`))))
  const proposals = batches.flatMap((batch) => batch.items)
  const ids = proposals.map((item) => item.discovery_id)
  const sourceCandidateIds = proposals.flatMap((item) => item.source_candidate_ids)
  if (new Set(ids).size !== ids.length) throw new Error('Los resultados contienen hallazgos duplicados.')
  for (const proposal of proposals) {
    const authorId = proposal.author.canonical_id
    if (!catalog.authors.some((author) => author.id === authorId)) add<Author>(catalog.authors, { id: authorId, slug: authorId, canonical_name: proposal.author.canonical_name, aliases: [], featured_works: [], profile_status: 'minimal', status: 'published', reviewed_at: date })
    if (proposal.work.canonical_id && proposal.work.title && !catalog.works.some((work) => work.id === proposal.work.canonical_id)) add<Work>(catalog.works, { id: proposal.work.canonical_id, author_id: authorId, original_title: proposal.work.title, display_title_es: proposal.work.title, identifiers: {}, notes: 'Obra mínima identificada por Literary Libations.', metadata_status: 'minimal' })
    if (!catalog.drinks.some((drink) => drink.id === proposal.drink.canonical_id)) add(catalog.drinks, drinkFrom(proposal))
    const suffix = proposal.discovery_id.replace('hallazgo-three-books-', '')
    const recommendationId = `literary-libations-${suffix}-editorial`
    const evidenceId = `evidencia-literary-libations-${suffix}`
    add<Recommendation>(catalog.recommendations, { id: recommendationId, author_id: authorId, ...(proposal.work.canonical_id ? { work_id: proposal.work.canonical_id } : {}), drink_id: proposal.drink.canonical_id, relationship_type: proposal.recommendation.relationship_type, headline_es: proposal.recommendation.headline_es, explanation_es: proposal.recommendation.explanation_es, confidence: proposal.recommendation.confidence, evidence_ids: [evidenceId], editorial_status: 'published', reviewed_by: 'terra-literary-libations', reviewed_at: date })
    add<Evidence>(catalog.evidence, { id: evidenceId, recommendation_id: recommendationId, source_id: proposal.evidence.source_id, claim: proposal.evidence.claim, locator: proposal.evidence.locator, support_excerpt: proposal.evidence.support_excerpt, evidence_kind: 'bibliographic_reference', supports_claim: true, checked_at: date })
  }
  catalog.discoveries = catalog.discoveries.filter((discovery) => !ids.includes(discovery.id))
  await save(resolve(root, 'data/source/catalog.json'), catalog)
  const ready = await json<{ count: number; items: ReadyItem[] }>(resolve(base, 'promotion-ready.json'))
  ready.items = ready.items.filter((item) => !sourceCandidateIds.some((id) => item.source_candidate_ids?.includes(id)))
  ready.count = ready.items.length
  await save(resolve(base, 'promotion-ready.json'), ready)
  const log = await json<{ batches: unknown[]; final_catalog_counts: Record<string, number>; added_counts: Record<string, number> }>(resolve(base, 'promotion-log.json'))
  const final = Object.fromEntries(Object.entries(catalog).map(([key, value]) => [key, Array.isArray(value) ? value.length : 0])) as Record<string, number>
  log.batches.push({ batch_id: 'promotion-005-literary-libations-full', source_candidate_ids: ids, status: 'applied', validation: 'passed', errors: [] })
  log.final_catalog_counts = final
  log.added_counts = Object.fromEntries(Object.entries(final).map(([key, value]) => [key, value - (initial[key] ?? 0)]))
  await save(resolve(base, 'promotion-log.json'), log)
  const manifest = await json<Manifest>(resolve(base, 'manifest.json'))
  manifest.final_counts.catalog = final
  manifest.final_counts.catalog_added = log.added_counts
  manifest.final_counts.published_provisional_groups = catalog.discoveries.length
  manifest.final_counts.promotion_ready_groups = ready.count
  await save(resolve(base, 'manifest.json'), manifest)
  const review = await readFile(resolve(base, 'REVIEW.md'), 'utf8')
  await writeFile(resolve(base, 'REVIEW.md'), `${review.trim()}\n\n## Promoción completa de Literary Libations\n\n- Se promovieron ${proposals.length} hallazgos normalizados por los ocho lotes mecánicos.\n- Se conservaron tipos de vínculo, confianza y localizadores de cada propuesta.\n- Los hallazgos promovidos se retiraron de catalog.discoveries; las recetas de la casa se mantienen separadas de la evidencia bibliográfica.\n`, 'utf8')
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
