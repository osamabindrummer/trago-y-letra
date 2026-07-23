import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import type { PublicAuthor } from '../../scripts/content-types'
import { searchAuthors } from '../lib/search'

interface Props {
  authors: PublicAuthor[]
  onSelect: (author: PublicAuthor) => void
  onRandom: () => void
}

const examples = ['Hemingway', 'Poe', 'Rayuela']

export function SearchBox({ authors, onSelect, onRandom }: Props) {
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showResults, setShowResults] = useState(false)
  const matches = searchAuthors(authors, query).slice(0, 6)

  const choose = (author: PublicAuthor) => {
    setQuery(author.canonical_name)
    setActiveIndex(-1)
    setShowResults(false)
    onSelect(author)
  }

  const search = (value: string) => {
    setQuery(value)
    setActiveIndex(-1)
    setShowResults(false)
    const firstMatch = searchAuthors(authors, value)[0]
    if (firstMatch) choose(firstMatch)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setActiveIndex(-1)
    setShowResults(true)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const selected = matches[activeIndex] ?? matches[0]
    if (selected) choose(selected)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, matches.length - 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    }
    if (event.key === 'Enter' && activeIndex >= 0 && matches[activeIndex]) {
      event.preventDefault()
      choose(matches[activeIndex])
    }
    if (event.key === 'Escape') {
      setActiveIndex(-1)
      setShowResults(false)
    }
  }

  return (
    <section className="search-panel" aria-label="Buscar un autor o un libro">
      <form className="search-form" role="search" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor={inputId}>¿A quién lees?</label>
        <div className="search-field">
          <input
            id={inputId}
            value={query}
            onChange={onChange}
            onFocus={() => query && setShowResults(true)}
            onKeyDown={onKeyDown}
            placeholder="Autor, autora o libro…"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="author-results"
            aria-expanded={Boolean(query && showResults)}
          />
          <button type="submit">
            <span>Descubrir</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className="search-status sr-only" aria-live="polite">
          {query ? `${matches.length} ${matches.length === 1 ? 'autor encontrado' : 'autores encontrados'}` : 'Escribe un autor, una autora o un libro.'}
        </p>
        {query && showResults && (
          <ul id="author-results" className="search-results" role="listbox">
            {matches.length ? matches.map((author, index) => (
              <li key={author.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => choose(author)}
                >
                  <span>{author.canonical_name}</span>
                  <small>{author.country}</small>
                </button>
              </li>
            )) : (
              <li className="empty-result">No encontramos coincidencias. Prueba con otro nombre o título.</li>
            )}
          </ul>
        )}
      </form>

      <div className="quick-picks" aria-label="Búsquedas de ejemplo">
        <span>Prueba con</span>
        {examples.map((example) => (
          <button type="button" key={example} onClick={() => search(example)}>{example}</button>
        ))}
        <button type="button" onClick={onRandom}>Al azar</button>
      </div>
    </section>
  )
}
