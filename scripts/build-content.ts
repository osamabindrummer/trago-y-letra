import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Catalog, PublicCatalog } from './content-types.ts'
import { validateCatalog } from './content-validation.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const [catalogRaw, schemaRaw] = await Promise.all([readFile(resolve(root, 'data/source/catalog.json'), 'utf8'), readFile(resolve(root, 'data/schema/catalog.schema.json'), 'utf8')])
const catalog = JSON.parse(catalogRaw) as Catalog
const errors = validateCatalog(catalog, JSON.parse(schemaRaw) as object)
if (errors.length) throw new Error(`No se puede construir contenido inválido:\n${errors.join('\n')}`)

const works = new Map(catalog.works.map((item) => [item.id, item]))
const drinks = new Map(catalog.drinks.map((item) => [item.id, item]))
const sources = new Map(catalog.sources.map((item) => [item.id, item]))
const evidence = new Map(catalog.evidence.map((item) => [item.id, item]))
const publicCatalog: PublicCatalog = {
  generated_at: new Date().toISOString().slice(0, 10),
  authors: catalog.authors.filter((author) => author.status === 'published').map((author) => ({
    ...author,
    works: author.featured_works.map((id) => works.get(id)).filter((item): item is NonNullable<typeof item> => Boolean(item)),
    recommendations: catalog.recommendations.filter((item) => item.author_id === author.id && item.editorial_status === 'published').map((recommendation) => ({
      ...recommendation,
      drink: drinks.get(recommendation.drink_id)!,
      evidence: recommendation.evidence_ids.map((id) => evidence.get(id)!).map((item) => ({ ...item, source: sources.get(item.source_id)! }))
    }))
  })).filter((author) => author.recommendations.length > 0),
  drinks: catalog.drinks,
  sources: catalog.sources.filter((source) => catalog.evidence.some((item) => item.source_id === source.id && catalog.recommendations.some((recommendation) => recommendation.id === item.recommendation_id && recommendation.editorial_status === 'published')))
}
await mkdir(resolve(root, 'src/content'), { recursive: true })
await writeFile(resolve(root, 'src/content/generated.ts'), `/* Archivo generado por scripts/build-content.ts. No editar a mano. */\nimport type { PublicCatalog } from '../../scripts/content-types'\n\nexport const content: PublicCatalog = ${JSON.stringify(publicCatalog, null, 2)}\n`, 'utf8')
console.log(`Contenido público generado: ${publicCatalog.authors.length} autores, ${publicCatalog.sources.length} fuentes.`)
