import type { Drink, PublicDiscovery, RelationshipType } from '../../scripts/content-types'
import type { ProvisionalAuthor } from '../lib/public-search'
import { drinkForDiscovery } from '../lib/public-search'

const labels: Record<RelationshipType, string> = {
  author_documented: 'Bebida documentada',
  appears_in_work: 'Aparece en la obra',
  editorial_pairing: 'Maridaje editorial',
  circulating_anecdote: 'Anécdota en circulación',
  abstinence_or_recovery: 'Abstinencia o recuperación',
}

function confidenceLabel(confidence: PublicDiscovery['confidence']): string {
  return confidence === 'high' ? 'alta' : confidence === 'medium' ? 'media' : 'baja'
}

function Preparation({ discovery, drinks }: { discovery: PublicDiscovery; drinks: Drink[] }) {
  const drink = drinkForDiscovery(discovery, drinks)
  if (!drink) return <p className="minimal-profile-note">Receta pendiente</p>

  if (drink.recipe_status === 'serving_only') {
    return (
      <>
        <p className="card-copy">Forma de servicio</p>
        <ol className="steps">{drink.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="glassware">{drink.glassware}{drink.garnish ? ` · ${drink.garnish}` : ''}</p>
      </>
    )
  }

  return (
    <>
      <ul className="ingredients">
        {drink.ingredients.map((ingredient) => <li key={ingredient.name}><span>{ingredient.name}</span><b>{ingredient.amount} {ingredient.unit}</b></li>)}
      </ul>
      <ol className="steps">{drink.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    </>
  )
}

export function ProvisionalAuthorSheet({ author, drinks, onClose }: { author: ProvisionalAuthor; drinks: Drink[]; onClose: () => void }) {
  return (
    <article id="result" className="author-sheet provisional-sheet" aria-labelledby="author-name">
      <header className="result-heading">
        <p>Tu combinación provisional</p>
        <button type="button" onClick={onClose}>← Nueva búsqueda</button>
      </header>
      <div className="provisional-intro">
        <p className="card-label">Perfil en desarrollo</p>
        <h2 id="author-name">{author.canonical_name}</h2>
        <p>Estas sugerencias conservan el alcance de sus libros de origen. No completamos biografía, obra ni receta cuando faltan datos.</p>
      </div>
      <div className="provisional-discovery-grid">
        {author.discoveries.map((discovery) => (
          <section className="result-card provisional-discovery-card" key={discovery.id}>
            <p className="card-label">{discovery.drink_name}</p>
            <div className="recommendation-tags">
              <p className={`relationship ${discovery.relationship_type}`}>{labels[discovery.relationship_type]}</p>
              <span className={`confidence-badge confidence-${discovery.confidence}`}>Confianza {confidenceLabel(discovery.confidence)}</span>
            </div>
            <p className="card-copy">{discovery.explanation_es}</p>
            {discovery.work_title && <p className="provisional-work">{discovery.work_title}</p>}
            <Preparation discovery={discovery} drinks={drinks} />
          </section>
        ))}
      </div>
    </article>
  )
}
