import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateCatalog } from './content-validation.ts'
import type { Catalog } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const schemaPath = resolve(root, 'data/schema/catalog.schema.json')
const csvPath = resolve(root, 'exports/titulos-para-versiones-en-espanol-completado.csv')
const shouldApply = process.argv.includes('--apply')
const expectedHeader = ['Nombre del autor', 'Nombre de la obra en inglés o idioma original', 'Versión en Español']

interface CsvRow {
  author: string
  originalTitle: string
  spanishTitle: string
}

function parseCsv(input: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let quoted = false

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') {
        value += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        value += character
      }
      continue
    }
    if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(value)
      value = ''
    } else if (character === '\n') {
      row.push(value.replace(/\r$/u, ''))
      rows.push(row)
      row = []
      value = ''
    } else {
      value += character
    }
  }
  if (quoted) throw new Error('El CSV termina dentro de una celda entrecomillada.')
  if (value || row.length) {
    row.push(value.replace(/\r$/u, ''))
    rows.push(row)
  }
  return rows
}

function key(author: string, originalTitle: string): string {
  return `${author}\u0000${originalTitle}`
}

const [catalogRaw, schemaRaw, csvRaw] = await Promise.all([
  readFile(catalogPath, 'utf8'),
  readFile(schemaPath, 'utf8'),
  readFile(csvPath, 'utf8'),
])
const catalog = JSON.parse(catalogRaw) as Catalog
const rows = parseCsv(csvRaw.replace(/^\uFEFF/u, ''))
const [header, ...dataRows] = rows
if (!header || header.length !== expectedHeader.length || header.some((value, index) => value !== expectedHeader[index])) {
  throw new Error('La cabecera del CSV no coincide con las tres columnas esperadas.')
}

const authorsById = new Map(catalog.authors.filter((author) => author.status === 'published').map((author) => [author.id, author]))
const visibleWorkIds = new Set([...authorsById.values()].flatMap((author) => author.featured_works))
const expectedWorks = catalog.works.filter((work) => visibleWorkIds.has(work.id))
const workByKey = new Map(expectedWorks.map((work) => {
  const author = authorsById.get(work.author_id)
  if (!author) throw new Error(`La obra ${work.id} pertenece a un autor no publicado.`)
  return [key(author.canonical_name, work.original_title), work]
}))

const reviewedRows = new Map<string, CsvRow>()
for (const [rowNumber, row] of dataRows.entries()) {
  if (row.length !== 3) throw new Error(`Fila ${rowNumber + 2}: se esperaban tres columnas y se encontraron ${row.length}.`)
  const [author, originalTitle, spanishTitle] = row.map((value) => value.trim())
  if (!author || !originalTitle) throw new Error(`Fila ${rowNumber + 2}: autor y título original son obligatorios.`)
  const rowKey = key(author, originalTitle)
  if (reviewedRows.has(rowKey)) throw new Error(`Fila ${rowNumber + 2}: obra repetida (${author} — ${originalTitle}).`)
  reviewedRows.set(rowKey, { author, originalTitle, spanishTitle })
}

if (reviewedRows.size !== expectedWorks.length) {
  throw new Error(`El CSV contiene ${reviewedRows.size} obras y el catálogo público espera ${expectedWorks.length}.`)
}
for (const rowKey of reviewedRows.keys()) {
  if (!workByKey.has(rowKey)) throw new Error(`El CSV contiene una obra que no corresponde al catálogo público: ${rowKey.replace('\u0000', ' — ')}.`)
}
for (const rowKey of workByKey.keys()) {
  if (!reviewedRows.has(rowKey)) throw new Error(`El CSV no contiene la obra pública ${rowKey.replace('\u0000', ' — ')}.`)
}

const changes = expectedWorks.flatMap((work) => {
  const author = authorsById.get(work.author_id)!
  const row = reviewedRows.get(key(author.canonical_name, work.original_title))!
  const nextTitle = row.spanishTitle || work.original_title
  return nextTitle === work.display_title_es ? [] : [{ id: work.id, author: author.canonical_name, previous: work.display_title_es, next: nextTitle }]
})

console.log(`${changes.length} títulos visibles cambiarán; ${expectedWorks.length - changes.length} permanecen sin cambios.`)
for (const change of changes.slice(0, 20)) console.log(`- ${change.author}: ${change.previous} → ${change.next}`)
if (changes.length > 20) console.log(`- … y ${changes.length - 20} cambios más.`)

if (!shouldApply) {
  console.log('Vista previa terminada. Ejecuta con --apply para escribir el catálogo.')
  process.exit(0)
}

for (const change of changes) catalog.works.find((work) => work.id === change.id)!.display_title_es = change.next
const errors = validateCatalog(catalog, JSON.parse(schemaRaw) as object)
if (errors.length) throw new Error(`El CSV produciría un catálogo inválido:\n${errors.join('\n')}`)
await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
console.log(`Catálogo actualizado: ${changes.length} títulos incorporados.`)
