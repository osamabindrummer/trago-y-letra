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

  it('rechaza una recomendación publicada con confianza baja', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    const mutable = structuredClone(catalog as Catalog)
    mutable.recommendations[0].confidence = 'low'
    expect(validateCatalog(mutable, schema).join('\n')).toContain('confidence low no es publicable')
  })

  it('acepta bebidas sin una alternativa automática', async () => {
    const [catalog, schema] = await Promise.all([readJson('data/source/catalog.json'), readJson('data/schema/catalog.schema.json')])
    const mutable = structuredClone(catalog as Catalog)
    delete mutable.drinks.find((drink) => drink.alcoholic)?.zero_proof_alternative_id
    expect(validateCatalog(mutable, schema)).toEqual([])
  })
})
