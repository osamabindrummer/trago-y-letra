import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { validateCatalog } from './content-validation.ts'
import type { Catalog } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = process.argv[2] ? resolve(process.argv[2]) : resolve(root, 'data/source/catalog.json')
const [catalogRaw, schemaRaw] = await Promise.all([readFile(catalogPath, 'utf8'), readFile(resolve(root, 'data/schema/catalog.schema.json'), 'utf8')])
const errors = validateCatalog(JSON.parse(catalogRaw) as Catalog, JSON.parse(schemaRaw) as object)
if (errors.length) {
  console.error(`Validación fallida (${catalogPath}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Contenido válido: ${catalogPath}`)
}
