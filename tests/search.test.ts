import { describe, expect, it } from 'vitest'
import { content } from '../src/content/generated'
import { searchAuthors } from '../src/lib/search'
import { buildSearchTargets, searchTargets } from '../src/lib/public-search'

describe('búsqueda de autores', () => {
  it('tolera tildes, alias y un error menor', () => {
    expect(searchAuthors(content.authors, 'onetti')[0].canonical_name).toBe('Juan Carlos Onetti')
    expect(searchAuthors(content.authors, 'Cortazar')[0].canonical_name).toBe('Julio Cortázar')
    expect(searchAuthors(content.authors, 'Cortazr')[0].canonical_name).toBe('Julio Cortázar')
  })

  it('encuentra un autor a partir del título de una obra', () => {
    expect(searchAuthors(content.authors, 'Rayuela')[0].canonical_name).toBe('Julio Cortázar')
  })
})

describe('búsqueda pública unificada', () => {
  const targets = buildSearchTargets(content.authors, content.discoveries)

  it('prioriza un autor canónico cuando también tiene hallazgos provisionales', () => {
    const result = searchTargets(targets, 'Whiskey Cock-Tail')
    const markTwain = result.find((target) => target.author.canonical_name === 'Mark Twain')
    expect(markTwain?.kind).toBe('author')
  })

  it('deduplica un autor canónico aunque tenga sugerencias provisionales', () => {
    const result = searchTargets(targets, 'Bronx Cocktail')
    expect(result).toHaveLength(1)
    expect(result[0].kind).toBe('author')
    expect(result[0].author.id).toBe('f-scott-fitzgerald')
  })
})
