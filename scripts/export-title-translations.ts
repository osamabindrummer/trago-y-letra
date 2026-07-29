import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

interface Author {
  id: string
  canonical_name: string
  featured_works: string[]
  status: string
}

interface Work {
  id: string
  author_id: string
  original_title: string
  display_title_es: string
  language?: string
}

interface Catalog {
  authors: Author[]
  works: Work[]
}

function escapeCsv(value: string): string {
  return `"${value.replaceAll('"', '""')}"`
}

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalog = JSON.parse(await readFile(resolve(root, 'data/source/catalog.json'), 'utf8')) as Catalog
const authorsById = new Map(catalog.authors.filter((author) => author.status === 'published').map((author) => [author.id, author]))
const visibleWorkIds = new Set([...authorsById.values()].flatMap((author) => author.featured_works))
const rows = catalog.works
  .filter((work) => visibleWorkIds.has(work.id))
  .map((work) => {
    const author = authorsById.get(work.author_id)
    if (!author) throw new Error(`La obra ${work.id} pertenece a un autor no publicado.`)
    const spanishTitle = work.display_title_es !== work.original_title || work.language === 'es'
      ? work.display_title_es
      : ''
    return [author.canonical_name, work.original_title, spanishTitle]
  })
  .sort((left, right) => left[0].localeCompare(right[0], 'es') || left[1].localeCompare(right[1], 'es'))

const output = [
  ['Nombre del autor', 'Nombre de la obra en inglés o idioma original', 'Versión en Español'],
  ...rows,
].map((row) => row.map(escapeCsv).join(',')).join('\n')

const outputPath = resolve(root, 'exports/titulos-para-versiones-en-espanol.csv')
await mkdir(resolve(root, 'exports'), { recursive: true })
await writeFile(outputPath, `\uFEFF${output}\n`, 'utf8')
console.log(`CSV generado: ${rows.length} obras; ${rows.filter((row) => row[2]).length} versiones en español ya registradas.`)
