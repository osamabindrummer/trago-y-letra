import { useId, useState, type ChangeEvent } from 'react'
import type { PublicAuthor } from '../../scripts/content-types'
import { searchAuthors } from '../lib/search'

interface Props { authors: PublicAuthor[]; onSelect: (author: PublicAuthor) => void }
export function SearchBox({ authors, onSelect }: Props) {
  const inputId = useId()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const matches = searchAuthors(authors, query).slice(0, 6)
  const choose = (author: PublicAuthor) => { setQuery(author.canonical_name); setActiveIndex(-1); onSelect(author) }
  const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => { setQuery(event.target.value); setActiveIndex(-1) }
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, matches.length - 1)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)) }
    if (event.key === 'Enter' && activeIndex >= 0 && matches[activeIndex]) { event.preventDefault(); choose(matches[activeIndex]) }
    if (event.key === 'Escape') setActiveIndex(-1)
  }
  return <section className="search-panel" aria-label="Buscar un autor">
    <label htmlFor={inputId}>¿A quién lees?</label>
    <div className="search-field"><input id={inputId} value={query} onChange={onChange} onKeyDown={onKeyDown} placeholder="Prueba con un apellido" autoComplete="off" aria-autocomplete="list" aria-controls="author-results" aria-expanded={Boolean(query)} /><span aria-hidden="true">⌕</span></div>
    <p className="search-status" aria-live="polite">{query ? `${matches.length} ${matches.length === 1 ? 'autor encontrado' : 'autores encontrados'}` : 'Busca por nombre, apellido o seudónimo.'}</p>
    {query && <ul id="author-results" className="search-results" role="listbox">{matches.length ? matches.map((author, index) => <li key={author.id}><button type="button" role="option" aria-selected={index === activeIndex} className={index === activeIndex ? 'active' : ''} onMouseDown={() => choose(author)}><span>{author.canonical_name}</span><small>{author.country}</small></button></li>) : <li className="empty-result">No encontramos coincidencias. Prueba con otro nombre o una variante.</li>}</ul>}
  </section>
}
