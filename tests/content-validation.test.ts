import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { validateCatalog } from '../scripts/content-validation.ts'
import type { Catalog } from '../scripts/content-types.ts'

const root = resolve(import.meta.dirname, '..')
async function readJson(path: string): Promise<object> { return JSON.parse(await readFile(resolve(root, path), 'utf8')) as object }

describe('contratos editoriales', () => {
  it('acepta el fixture sintético completo', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    expect(validateCatalog(catalog as Catalog, schema)).toEqual([])
  })

  it('rechaza IDs duplicados y obras destacadas rotas', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/fixtures/invalid-duplicate-id.json'), readJson('data/schema/catalog.schema.json')])
    const errors = validateCatalog(catalog as Catalog, schema)
    expect(errors.join('\n')).toContain('IDs duplicados')
    expect(errors.join('\n')).toContain('obra destacada inexistente')
  })

  it('permite una recomendación publicada con confianza baja', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    const mutable = structuredClone(catalog as Catalog)
    mutable.recommendations[0].confidence = 'low'
    expect(validateCatalog(mutable, schema)).toEqual([])
  })

  it('acepta bebidas sin una alternativa automática', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    const mutable = structuredClone(catalog as Catalog)
    delete mutable.drinks.find((drink) => drink.alcoholic)?.zero_proof_alternative_id
    expect(validateCatalog(mutable, schema)).toEqual([])
  })

  it('permite confianza baja sin una señalización técnica adicional', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    const mutable = structuredClone(catalog as Catalog)
    const discovery = mutable.discoveries[0] ?? {
      id: 'hallazgo-fixture-bajo', author_name: 'Autora de prueba', drink_name: 'Té de prueba', relationship_type: 'editorial_pairing', relationship_basis: 'fixture', explanation_es: 'Hallazgo sintético para verificar la regla de confianza baja.', confidence: 'low' as const, flags: ['provisional', 'low_confidence', 'author_profile_pending', 'recipe_pending'], source_refs: [{ source_id: mutable.sources[0].id, locator: 'Fixture 1' }], editorial_status: 'published_provisional' as const, reviewed_at: '2026-07-28',
    }
    if (!mutable.discoveries.length) mutable.discoveries.push(discovery)
    discovery.confidence = 'low'
    discovery.flags = discovery.flags.filter((flag) => flag !== 'low_confidence')
    expect(validateCatalog(mutable, schema)).toEqual([])
  })

  it('permite autores, obras y bebidas con contenido mínimo explícito', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    const mutable = structuredClone(catalog as Catalog)
    mutable.authors.push({
      id: 'autora-minima',
      slug: 'autora-minima',
      canonical_name: 'Autora Mínima',
      aliases: [],
      featured_works: [],
      profile_status: 'minimal',
      status: 'published',
      reviewed_at: '2026-07-28',
    })
    mutable.works.push({
      id: 'obra-minima',
      author_id: 'autora-minima',
      original_title: 'Obra mínima',
      display_title_es: 'Obra mínima',
      identifiers: {},
      notes: 'Metadatos pendientes.',
      metadata_status: 'minimal',
    })
    mutable.drinks.push({
      id: 'bebida-servida',
      name_es: 'Bebida servida',
      aliases: [],
      category: 'Servicio directo',
      alcoholic: true,
      ingredients: [],
      steps: ['Sirve fría.'],
      glassware: 'Vaso',
      recipe_note: 'No requiere receta.',
      recipe_status: 'serving_only',
    })
    expect(validateCatalog(mutable, schema)).toEqual([])
  })
})
