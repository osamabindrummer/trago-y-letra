import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

interface LibrarySource {
  id: string
  local_filename: string
}

interface LibraryInventory {
  sources: LibrarySource[]
}

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const inventoryPath = resolve(root, 'data/research/library-sources.json')
const schemaPath = resolve(root, 'data/schema/library-sources.schema.json')
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8')) as LibraryInventory
const schema = JSON.parse(await readFile(schemaPath, 'utf8')) as object

const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
const validate = ajv.compile(schema)

if (!validate(inventory)) {
  console.error(`Inventario inválido: ${ajv.errorsText(validate.errors, { separator: '\n' })}`)
  process.exitCode = 1
} else {
  const duplicateIds = findDuplicates(inventory.sources.map((source) => source.id))
  const duplicateFiles = findDuplicates(inventory.sources.map((source) => source.local_filename.toLowerCase()))

  if (duplicateIds.length) {
    console.error(`Inventario inválido: IDs duplicados (${duplicateIds.join(', ')})`)
    process.exitCode = 1
  }
  if (duplicateFiles.length) {
    console.error(`Inventario inválido: archivos duplicados (${duplicateFiles.join(', ')})`)
    process.exitCode = 1
  }
  if (!process.exitCode) {
    console.log(`Inventario de biblioteca válido: ${inventory.sources.length} fuente(s).`)
  }
}

function findDuplicates(values: string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))]
}
