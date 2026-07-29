import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Catalog, Recommendation } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const outputPath = resolve(root, 'exports/recomendaciones-para-revision.md')
const catalog = JSON.parse(await readFile(catalogPath, 'utf8')) as Catalog

const authors = new Map(catalog.authors.map((author) => [author.id, author]))
const works = new Map(catalog.works.map((work) => [work.id, work]))
const drinks = new Map(catalog.drinks.map((drink) => [drink.id, drink]))
const evidence = new Map(catalog.evidence.map((item) => [item.id, item]))
const sources = new Map(catalog.sources.map((source) => [source.id, source]))
const recommendations = catalog.recommendations
  .filter((recommendation) => recommendation.editorial_status === 'published')
  .sort((left, right) => {
    const leftAuthor = authors.get(left.author_id)?.canonical_name ?? left.author_id
    const rightAuthor = authors.get(right.author_id)?.canonical_name ?? right.author_id
    return leftAuthor.localeCompare(rightAuthor, 'es') || left.headline_es.localeCompare(right.headline_es, 'es')
  })

const sections = recommendations.map((recommendation) => renderRecommendation(recommendation)).join('\n')
const document = `# Revisión editorial de recomendaciones\n\nExportación creada el ${new Date().toISOString().slice(0, 10)} desde \`data/source/catalog.json\`. Incluye ${recommendations.length} recomendaciones con estado \`published\`; el borrador sintético queda excluido.\n\n## Cómo revisarlo\n\n1. Edita sólo los campos **Decisión**, **Título visible** y **Texto visible** de cada ficha.\n2. Usa una de estas decisiones: \`pendiente\`, \`mantener\`, \`editar\`, \`retirar\` o \`consulta\`.\n3. No borres ni cambies las líneas \`review-item:start\` y \`review-item:end\`: conservan el identificador necesario para reincorporar tus cambios.\n4. El bloque de contexto es sólo de consulta. Sirve para mantener la redacción proporcional a la evidencia, pero no necesitas editarlo.\n\nPuedes buscar por autor, bebida o identificador con la búsqueda de tu editor. Cuando termines, adjunta de vuelta este mismo archivo.\n\n---\n\n${sections}`

await mkdir(resolve(root, 'exports'), { recursive: true })
await writeFile(outputPath, document, 'utf8')
console.log(`Exportadas ${recommendations.length} recomendaciones para revisión: ${outputPath}`)

function renderRecommendation(recommendation: Recommendation): string {
  const author = authors.get(recommendation.author_id)
  const drink = drinks.get(recommendation.drink_id)
  const work = recommendation.work_id ? works.get(recommendation.work_id) : undefined
  const evidenceLines = recommendation.evidence_ids.map((evidenceId) => {
    const item = evidence.get(evidenceId)
    const source = item ? sources.get(item.source_id) : undefined
    const reference = source
      ? source.url
        ? `[${source.title}](${source.url}) — ${source.author_or_publisher}`
        : `${source.title} — ${source.author_or_publisher}`
      : `Evidencia no localizada: ${evidenceId}`
    return `- ${reference}${item ? ` (localizador: ${item.locator})` : ''}`
  }).join('\n')

  return `<!-- review-item:start id="${recommendation.id}" -->
## ${author?.canonical_name ?? recommendation.author_id} — ${drink?.name_es ?? recommendation.drink_id}

**Decisión:** pendiente

**Título visible:**
${recommendation.headline_es}

**Texto visible:**
${recommendation.explanation_es}

### Contexto de revisión (no editar)

- ID: \`${recommendation.id}\`
- Vínculo: \`${recommendation.relationship_type}\`
- Confianza: \`${recommendation.confidence}\`
- Obra: ${work ? `*${work.display_title_es}*` : 'No asociada a una obra concreta'}
- Fuentes:
${evidenceLines}

<!-- review-item:end -->`
}
