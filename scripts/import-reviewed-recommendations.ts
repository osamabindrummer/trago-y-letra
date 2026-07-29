import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Catalog } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const reviewPath = resolve(root, 'exports/recomendaciones-para-revision.md')
const shouldApply = process.argv.includes('--apply')
const catalog = JSON.parse(await readFile(catalogPath, 'utf8')) as Catalog
const reviewDocument = (await readFile(reviewPath, 'utf8')).replaceAll('\r\n', '\n')
const reviewedItems = parseReviewedItems(reviewDocument)
const publishedRecommendations = catalog.recommendations.filter((item) => item.editorial_status === 'published')
const catalogById = new Map(publishedRecommendations.map((item) => [item.id, item]))

if (reviewedItems.size !== publishedRecommendations.length) {
  throw new Error(`La revisión contiene ${reviewedItems.size} fichas y el catálogo tiene ${publishedRecommendations.length} recomendaciones publicadas.`)
}

const changes = []
const ignoredHeadlineChanges = []
for (const [id, reviewed] of reviewedItems) {
  const recommendation = catalogById.get(id)
  if (!recommendation) throw new Error(`La ficha ${id} no corresponde a una recomendación publicada del catálogo.`)
  if (reviewed.decision !== 'pendiente') throw new Error(`La ficha ${id} tiene la decisión “${reviewed.decision}”. Este importador sólo acepta “pendiente”.`)
  if (reviewed.headline !== recommendation.headline_es) ignoredHeadlineChanges.push(id)
  if (!reviewed.explanation) throw new Error(`La ficha ${id} dejó vacío el texto visible.`)
  if (reviewed.explanation !== recommendation.explanation_es) changes.push({ id, explanation: reviewed.explanation })
}

console.log(`${changes.length} textos visibles cambiaron de ${publishedRecommendations.length} recomendaciones publicadas.`)
for (const change of changes) console.log(`- ${change.id}`)
if (ignoredHeadlineChanges.length) console.log(`Se conservarán ${ignoredHeadlineChanges.length} títulos canónicos sin cambios: ${ignoredHeadlineChanges.join(', ')}`)

if (!shouldApply) {
  console.log('Vista previa terminada. Ejecuta con --apply para escribir el catálogo.')
  process.exit(0)
}

const reviewedAt = new Date().toISOString().slice(0, 10)
for (const change of changes) {
  const recommendation = catalogById.get(change.id)!
  recommendation.explanation_es = change.explanation
  recommendation.reviewed_by = 'revisión editorial manual'
  recommendation.reviewed_at = reviewedAt
}
await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
console.log(`Catálogo actualizado: ${changes.length} textos visibles incorporados.`)

function parseReviewedItems(document: string): Map<string, { decision: string; headline: string; explanation: string }> {
  const pattern = /<!-- review-item:start id="([^"]+)" -->\n## [^\n]+\n\n\*\*Decisión:\*\* ([^\n]+)\n\n\*\*Título visible:\*\*\n([\s\S]*?)\n\n\*\*Texto visible:\*\*\n([\s\S]*?)\n\n### Contexto de revisión \(no editar\)/g
  const items = new Map<string, { decision: string; headline: string; explanation: string }>()
  for (const match of document.matchAll(pattern)) {
    const [, id, decision, headline, explanation] = match
    if (items.has(id)) throw new Error(`La ficha ${id} aparece más de una vez.`)
    items.set(id, { decision: decision.trim(), headline: headline.trim(), explanation: explanation.trim() })
  }
  if (!items.size) throw new Error('No se encontraron fichas de revisión con el formato esperado.')
  return items
}
