import type { Drink, PublicAuthor, PublicDiscovery } from '../../scripts/content-types'
import { normalize } from './search'

export interface ProvisionalAuthor {
  id: string
  canonical_name: string
  aliases: string[]
  discoveries: PublicDiscovery[]
}

export type SearchTarget =
  | { kind: 'author'; author: PublicAuthor; discoveries: PublicDiscovery[] }
  | { kind: 'provisional'; author: ProvisionalAuthor }

function keyForName(name: string): string {
  return normalize(name).replace(/[^\p{Letter}\p{Number}]+/gu, ' ').trim()
}

/** Agrupa sin adivinar identidades: el ID prevalece y el nombre normalizado es el respaldo cuando falta. */
export function buildSearchTargets(authors: PublicAuthor[], discoveries: PublicDiscovery[]): SearchTarget[] {
  const canonicalById = new Map(authors.map((author) => [author.id, author]))
  const canonicalIdByName = new Map<string, string>()
  const attachedDiscoveries = new Map<string, PublicDiscovery[]>()
  const provisional = new Map<string, ProvisionalAuthor>()

  for (const author of authors) {
    attachedDiscoveries.set(author.id, [])
    for (const name of [author.canonical_name, ...author.aliases]) {
      canonicalIdByName.set(keyForName(name), author.id)
    }
  }

  for (const discovery of discoveries) {
    const canonicalId = discovery.author_id && canonicalById.has(discovery.author_id)
      ? discovery.author_id
      : canonicalIdByName.get(keyForName(discovery.author_name))
    if (canonicalId) {
      attachedDiscoveries.get(canonicalId)?.push(discovery)
      continue
    }

    const key = discovery.author_id
      ? `id:${discovery.author_id}`
      : `name:${keyForName(discovery.author_name)}`
    const current = provisional.get(key)
    if (current) {
      current.discoveries.push(discovery)
    } else {
      provisional.set(key, {
        id: key,
        canonical_name: discovery.author_name,
        aliases: [],
        discoveries: [discovery],
      })
    }
  }

  return [
    ...authors.map((author) => ({ kind: 'author' as const, author, discoveries: attachedDiscoveries.get(author.id) ?? [] })),
    ...provisional.values().map((author) => ({ kind: 'provisional' as const, author })),
  ]
}

export function targetName(target: SearchTarget): string {
  return target.author.canonical_name
}

export function targetSuggestionCount(target: SearchTarget): number {
  return target.kind === 'author'
    ? target.author.recommendations.length + target.discoveries.length
    : target.author.discoveries.length
}

export function searchTargets(targets: SearchTarget[], query: string): SearchTarget[] {
  const term = normalize(query)
  if (!term) return targets
  return targets.map((target) => {
    const discoveries = target.kind === 'author' ? target.discoveries : target.author.discoveries
    const terms = [
      targetName(target),
      ...target.author.aliases,
      ...(target.kind === 'author'
        ? [
            ...target.author.works.flatMap((work) => [work.original_title, work.display_title_es]),
            ...target.author.recommendations.flatMap((recommendation) => [recommendation.drink.name_es, ...recommendation.drink.aliases]),
          ]
        : []),
      ...discoveries.flatMap((discovery) => [discovery.author_name, discovery.work_title, discovery.drink_name]),
    ].filter((value): value is string => Boolean(value)).map(normalize)
    const match = terms.some((candidate) => candidate.includes(term) || (candidate.length >= 4 && term.includes(candidate)))
    return { target, match }
  }).filter(({ match }) => match).map(({ target }) => target)
}

export function drinkForDiscovery(discovery: PublicDiscovery, drinks: Drink[]): Drink | undefined {
  return discovery.drink_id ? drinks.find((drink) => drink.id === discovery.drink_id) : undefined
}
