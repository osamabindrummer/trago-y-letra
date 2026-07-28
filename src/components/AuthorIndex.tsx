import { useMemo } from 'react'
import type { PublicAuthor, PublicDiscovery } from '../../scripts/content-types'

interface AuthorIndexEntry {
  id: string
  name: string
  suggestionCount: number
  surname: string
}

function normalizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
    .trim()
}

function surnameForSort(name: string): string {
  const parts = name.trim().split(/\s+/)
  const suffixes = new Set(['jr', 'sr', 'ii', 'iii', 'iv'])
  const lastPart = normalizeName(parts.at(-1) ?? name)
  return suffixes.has(lastPart) && parts.length > 1
    ? normalizeName(parts.at(-2) ?? name)
    : lastPart
}

function buildAuthorIndex(authors: PublicAuthor[], discoveries: PublicDiscovery[]): AuthorIndexEntry[] {
  const entries = new Map<string, AuthorIndexEntry>()
  const canonicalIdByName = new Map<string, string>()

  for (const author of authors) {
    const key = `author:${author.id}`
    entries.set(key, {
      id: key,
      name: author.canonical_name,
      suggestionCount: author.recommendations.length,
      surname: surnameForSort(author.canonical_name),
    })
    for (const name of [author.canonical_name, ...author.aliases]) {
      canonicalIdByName.set(normalizeName(name), author.id)
    }
  }

  for (const discovery of discoveries) {
    const canonicalId = discovery.author_id ?? canonicalIdByName.get(normalizeName(discovery.author_name))
    const key = canonicalId ? `author:${canonicalId}` : `name:${normalizeName(discovery.author_name)}`
    const current = entries.get(key)
    if (current) {
      current.suggestionCount += 1
      continue
    }
    entries.set(key, {
      id: key,
      name: discovery.author_name,
      suggestionCount: 1,
      surname: surnameForSort(discovery.author_name),
    })
  }

  const collator = new Intl.Collator('es', { sensitivity: 'base' })
  return [...entries.values()].sort((left, right) => (
    collator.compare(left.surname, right.surname)
    || collator.compare(left.name, right.name)
  ))
}

export function AuthorIndex({ authors, discoveries }: { authors: PublicAuthor[]; discoveries: PublicDiscovery[] }) {
  const entries = useMemo(() => buildAuthorIndex(authors, discoveries), [authors, discoveries])
  const suggestionCount = entries.reduce((total, entry) => total + entry.suggestionCount, 0)

  return (
    <section className="text-page index-page" aria-labelledby="index-title">
      <p className="eyebrow">Índice</p>
      <h1 id="index-title">Autores, de la A a la Z.</h1>
      <p>{entries.length} autores · {suggestionCount} recomendaciones y sugerencias de bebidas.</p>
      <ol className="author-index-list" aria-label="Índice alfabético de autores">
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.name} <span>({entry.suggestionCount})</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
