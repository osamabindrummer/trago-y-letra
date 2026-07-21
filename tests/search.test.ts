import { describe, expect, it } from 'vitest'
import { content } from '../src/content/generated'
import { searchAuthors } from '../src/lib/search'

describe('búsqueda de autores', () => {
  it('tolera tildes, alias y un error menor', () => {
    expect(searchAuthors(content.authors, 'onetti')[0].canonical_name).toBe('Juan Carlos Onetti')
    expect(searchAuthors(content.authors, 'Cortazar')[0].canonical_name).toBe('Julio Cortázar')
    expect(searchAuthors(content.authors, 'Cortazr')[0].canonical_name).toBe('Julio Cortázar')
  })
})
