import { useMemo, useState } from 'react'
import type { PublicDiscovery, RelationshipType } from '../../scripts/content-types'

const relationshipLabels: Record<RelationshipType, string> = {
  author_documented: 'Bebida documentada por el libro',
  appears_in_work: 'Aparece en la obra',
  editorial_pairing: 'Maridaje editorial',
  circulating_anecdote: 'Anécdota en circulación',
  abstinence_or_recovery: 'Abstinencia o recuperación',
}

const flagLabels: Record<string, string> = {
  low_confidence: 'Confianza baja',
  identity_pending: 'Identidad pendiente',
  author_profile_pending: 'Ficha de autor pendiente',
  work_metadata_pending: 'Ficha de obra pendiente',
  recipe_pending: 'Receta pendiente',
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

export function DiscoveryLibrary({ discoveries }: { discoveries: PublicDiscovery[] }) {
  const [query, setQuery] = useState('')
  const [confidence, setConfidence] = useState('all')
  const visible = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    return discoveries.filter((discovery) => {
      const matchesText = !normalizedQuery || normalize([
        discovery.author_name,
        discovery.work_title,
        discovery.drink_name,
        discovery.explanation_es,
      ].filter(Boolean).join(' ')).includes(normalizedQuery)
      return matchesText && (confidence === 'all' || discovery.confidence === confidence)
    })
  }, [confidence, discoveries, query])

  return (
    <section className="discoveries-page" aria-labelledby="discoveries-title">
      <div className="discoveries-intro">
        <p className="eyebrow">Hallazgos de biblioteca</p>
        <h1 id="discoveries-title">Más juego.<br />Menos descarte.</h1>
        <p>{discoveries.length
          ? `Estos ${discoveries.length} hallazgos vienen de tres libros revisados completos. Pueden tener una ficha, obra o receta pendiente; las señales visibles indican exactamente qué falta.`
          : 'No quedan hallazgos provisionales: los grupos de los tres libros ya se incorporaron como fichas canónicas buscables.'}
        </p>
        {discoveries.length > 0 && <div className="discovery-filters">
          <label>
            <span>Buscar por autor, obra o bebida</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej.: Mark Twain, Manhattan, The Odyssey"
            />
          </label>
          <label>
            <span>Confianza</span>
            <select value={confidence} onChange={(event) => setConfidence(event.target.value)}>
              <option value="all">Todas</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </label>
        </div>}
        <p className="discovery-count" aria-live="polite">{visible.length} hallazgos visibles</p>
      </div>

      <div className="discovery-grid">
        {visible.map((discovery) => (
          <article className="discovery-card" key={discovery.id}>
            <div className="discovery-card-heading">
              <p>{discovery.author_name}</p>
              <span className={`confidence-badge confidence-${discovery.confidence}`}>
                Confianza {discovery.confidence === 'high' ? 'alta' : discovery.confidence === 'medium' ? 'media' : 'baja'}
              </span>
            </div>
            <h2>{discovery.drink_name}</h2>
            {discovery.work_title && <p className="discovery-work">{discovery.work_title}</p>}
            <p className="discovery-relationship">{relationshipLabels[discovery.relationship_type]}</p>
            <p className="discovery-copy">{discovery.explanation_es}</p>
            <div className="discovery-flags">
              {discovery.flags.filter((flag) => flag !== 'provisional').map((flag) => (
                <span key={flag}>{flagLabels[flag]}</span>
              ))}
              {!discovery.flags.includes('recipe_pending') && <span>Receta canónica disponible</span>}
            </div>
            <div className="discovery-sources">
              {discovery.source_refs.map((reference) => (
                <p key={`${reference.source_id}-${reference.locator}`}>
                  <strong>{reference.source.title}</strong>
                  <span>{reference.locator}</span>
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
