import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import type { SearchTarget } from '../lib/public-search'
import { searchTargets, targetName } from '../lib/public-search'

interface Props {
  targets: SearchTarget[]
  onSelect: (target: SearchTarget) => void
  onRandom: () => void
}

const examples = [
  { label: 'Hemingway', authorId: 'ernest-hemingway' },
  { label: 'Poe', authorId: 'edgar-allan-poe' },
  { label: 'Rayuela', authorId: 'julio-cortazar' },
]

export function SearchBox({ targets, onSelect, onRandom }: Props) {
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showResults, setShowResults] = useState(false)
  const matches = searchTargets(targets, query).slice(0, 6)

  const choose = (target: SearchTarget) => {
    setQuery(targetName(target))
    setActiveIndex(-1)
    setShowResults(false)
    onSelect(target)
  }

  const chooseExample = (authorId: string) => {
    const target = targets.find((candidate) => candidate.kind === 'author' && candidate.author.id === authorId)
    if (target) choose(target)
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
                  <span>{targetName(author)}</span>
                  <small>{author.kind === 'author' ? author.author.country ?? 'Ficha mínima' : 'Ficha provisional'}</small>
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
          <button type="button" key={example.authorId} onClick={() => chooseExample(example.authorId)}>
            {example.label}
          </button>
        ))}
        <button type="button" onClick={onRandom}>Al azar</button>
      </div>
    </section>
  )
}
