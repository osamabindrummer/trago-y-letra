import { useState } from 'react'
import type { PublicAuthor, RelationshipType } from '../../scripts/content-types'

const labels: Record<RelationshipType, string> = {
  author_documented: 'Bebida documentada',
  appears_in_work: 'Aparece en la obra',
  editorial_pairing: 'Maridaje editorial',
  circulating_anecdote: 'Según el mito',
  abstinence_or_recovery: 'Abstinencia o recuperación',
}

interface Props {
  author: PublicAuthor
  onClose: () => void
}

export function AuthorSheet({ author, onClose }: Props) {
  const [choice, setChoice] = useState(0)

  const recommendation = author.recommendations[choice]
  const { drink } = recommendation

  return (
    <article id="result" className="author-sheet" aria-labelledby="author-name">
      <header className="result-heading">
        <p>Tu combinación</p>
        <button type="button" onClick={onClose}>← Nueva búsqueda</button>
      </header>

      <div className="card-grid">
        <section className="result-card author-card">
          <span className="card-number">01</span>
          <div className="card-icon" aria-hidden="true">Aa</div>
          <p className="card-label">El autor</p>
          <h2 id="author-name">{author.canonical_name}</h2>
          <p className="card-meta">{author.country} · {author.birth_year}{author.death_year ? `–${author.death_year}` : ''}</p>
          <div className="book-list">
            <span>Para seguir leyendo</span>
            {author.works.map((work) => <strong key={work.id}>{work.display_title_es}</strong>)}
          </div>
        </section>

        <section className="result-card pairing-card" aria-labelledby="drink-name">
          <span className="card-number">02</span>
          <div className="card-icon" aria-hidden="true">✦</div>
          <p className="card-label">La recomendación</p>
          <h2 id="drink-name">{drink.name_es}</h2>
          <p className={`relationship ${recommendation.relationship_type}`}>{labels[recommendation.relationship_type]}</p>
          <p className="card-copy">{recommendation.explanation_es}</p>
          <div className="source-links">
            {recommendation.evidence.map((item) => item.source.url ? (
              <a key={item.id} href={item.source.url} target="_blank" rel="noreferrer">
                {item.source.title} · {item.locator} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span key={item.id}>{item.source.title} · {item.locator}</span>
            ))}
          </div>
        </section>

        <section className="result-card recipe-card">
          <span className="card-number">03</span>
          <div className="card-icon" aria-hidden="true">⌄</div>
          <p className="card-label">La preparación</p>
          <h2>Simple.<br />Lenta. Fría.</h2>
          <ul className="ingredients">
            {drink.ingredients.map((ingredient) => (
              <li key={ingredient.name}>
                <span>{ingredient.name}</span>
                <b>{ingredient.amount} {ingredient.unit}</b>
              </li>
            ))}
          </ul>
          <ol className="steps">
            {drink.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="glassware">
            {drink.glassware}{drink.garnish ? ` · ${drink.garnish}` : ''} · {drink.steps.length} {drink.steps.length === 1 ? 'paso' : 'pasos'}
          </p>
        </section>
      </div>

      {author.recommendations.length > 1 && (
        <button
          type="button"
          className="another-button"
          onClick={() => setChoice((current) => (current + 1) % author.recommendations.length)}
        >
          Otra opción <span aria-hidden="true">→</span>
        </button>
      )}
    </article>
  )
}
