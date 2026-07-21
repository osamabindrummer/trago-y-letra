import type { PublicAuthor } from '../../scripts/content-types'

export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').replace(/\s+/g, ' ').trim()
}

function editDistance(first: string, second: string): number {
  const previous = Array.from({ length: second.length + 1 }, (_, index) => index)
  for (let row = 1; row <= first.length; row += 1) {
    let diagonal = previous[0]
    previous[0] = row
    for (let column = 1; column <= second.length; column += 1) {
      const saved = previous[column]
      previous[column] = Math.min(previous[column] + 1, previous[column - 1] + 1, diagonal + Number(first[row - 1] !== second[column - 1]))
      diagonal = saved
    }
  }
  return previous[second.length]
}

export function searchAuthors(authors: PublicAuthor[], query: string): PublicAuthor[] {
  const term = normalize(query)
  if (!term) return authors
  return authors.map((author) => {
    const terms = [author.canonical_name, ...author.aliases].map(normalize)
    const match = terms.some((candidate) => candidate.includes(term) || term.includes(candidate))
    const distance = Math.min(...terms.map((candidate) => editDistance(term, candidate)))
    return { author, score: match ? 0 : distance }
  }).filter(({ score }) => score === 0 || score <= Math.max(1, Math.floor(term.length / 4))).sort((a, b) => a.score - b.score || a.author.canonical_name.localeCompare(b.author.canonical_name, 'es')).map(({ author }) => author)
}
