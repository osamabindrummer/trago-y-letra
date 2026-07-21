import { useState } from 'react'
import type { PublicAuthor, RelationshipType } from '../../scripts/content-types'

const labels: Record<RelationshipType, string> = { author_documented: 'Bebida documentada', appears_in_work: 'Aparece en la obra', editorial_pairing: 'Maridaje editorial', circulating_anecdote: 'Según el mito', abstinence_or_recovery: 'Abstinencia o recuperación' }
interface Props { author: PublicAuthor; drinks: Array<{ id: string; name_es: string }> ; onClose: () => void }
export function AuthorSheet({ author, drinks, onClose }: Props) {
  const [choice, setChoice] = useState(0)
  const recommendation = author.recommendations[choice]
  const { drink } = recommendation
  const alternative = drinks.find((item) => item.id === drink.zero_proof_alternative_id)
  return <article className="author-sheet" aria-labelledby="author-name">
    <button type="button" className="back-button" onClick={onClose}>← Volver a buscar</button>
    <header className="author-heading"><p className="eyebrow">{author.country} · {author.birth_year}{author.death_year ? `–${author.death_year}` : ''}</p><h2 id="author-name">{author.canonical_name}</h2><p>{author.bio_es}</p><div className="works"><span>Para empezar</span>{author.works.map((work) => <em key={work.id}>{work.display_title_es}</em>)}</div></header>
    <section className="recommendation" aria-labelledby="drink-name"><div className="drink-mark" aria-hidden="true"><span>✦</span></div><div className="recommendation-copy"><p className={`relationship ${recommendation.relationship_type}`}>{labels[recommendation.relationship_type]}</p><h3 id="drink-name">{drink.name_es}</h3><p className="headline">{recommendation.headline_es}</p><p>{recommendation.explanation_es}</p><p className="confidence">Confianza: <strong>{recommendation.confidence === 'high' ? 'alta' : 'media'}</strong></p></div></section>
    <div className="detail-columns"><section><h3>Receta propuesta</h3><p className="recipe-note">{drink.recipe_note}</p><ul className="ingredients">{drink.ingredients.map((ingredient) => <li key={ingredient.name}><span>{ingredient.name}</span><b>{ingredient.amount} {ingredient.unit}</b></li>)}</ul><ol className="steps">{drink.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="glassware">Vaso: {drink.glassware}{drink.garnish ? ` · Decoración: ${drink.garnish}` : ''}</p></section><section><h3>Procedencia</h3>{recommendation.evidence.map((item) => <div className="source" key={item.id}><p>{item.claim}</p><small>{item.source.title} · {item.locator}</small>{item.source.url && <a href={item.source.url} target="_blank" rel="noreferrer">Abrir fuente <span aria-hidden="true">↗</span></a>}</div>)}<h3 className="alternative-title">Alternativa sin alcohol</h3><p>{alternative ? alternative.name_es : 'Consulta la receta equivalente en el catálogo.'}</p></section></div>
    {author.recommendations.length > 1 && <button type="button" className="another-button" onClick={() => setChoice((current) => (current + 1) % author.recommendations.length)}>Otra opción <span aria-hidden="true">→</span></button>}
  </article>
}
