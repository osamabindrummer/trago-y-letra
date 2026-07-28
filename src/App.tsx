import { useMemo, useState } from 'react'
import { AuthorIndex } from './components/AuthorIndex'
import { AuthorSheet } from './components/AuthorSheet'
import { DiscoveryLibrary } from './components/DiscoveryLibrary'
import { ProvisionalAuthorSheet } from './components/ProvisionalAuthorSheet'
import { SearchBox } from './components/SearchBox'
import { content } from './content/generated'
import { buildSearchTargets, type SearchTarget } from './lib/public-search'

type Page = 'home' | 'discoveries' | 'method' | 'index' | 'sources'

export function App() {
  const [selected, setSelected] = useState<SearchTarget | null>(null)
  const [page, setPage] = useState<Page>('home')
  const targets = useMemo(() => buildSearchTargets(content.authors, content.discoveries), [])

  const showHome = () => {
    setSelected(null)
    setPage('home')
    window.scrollTo?.({ top: 0, behavior: 'smooth' })
  }

  const showAuthor = (target: SearchTarget) => {
    setSelected(target)
    setPage('home')
    window.setTimeout(() => {
      document.querySelector('#result')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const randomAuthor = () => {
    showAuthor(targets[Math.floor(Math.random() * targets.length)])
  }

  return (
    <main>
      <nav className={`site-nav${page === 'home' ? '' : ' site-nav-light'}`} aria-label="Navegación principal">
        <button type="button" className="wordmark" onClick={showHome}>
          Trago <i>y</i> Letra
        </button>
        <div>
          <button type="button" onClick={() => setPage('method')}>Cómo funciona</button>
          <button type="button" onClick={() => setPage('index')}>Índice</button>
        </div>
      </nav>

      {page === 'home' ? (
        <Home selected={selected} targets={targets} onSelect={showAuthor} onRandom={randomAuthor} onClear={() => setSelected(null)} />
      ) : page === 'discoveries' ? (
        <DiscoveryLibrary discoveries={content.discoveries} />
      ) : page === 'method' ? (
        <Method />
      ) : page === 'index' ? (
        <AuthorIndex authors={content.authors} discoveries={content.discoveries} />
      ) : (
        <Sources />
      )}

      <footer className="site-credit">
        <a href="https://bio.link/danielsalasj">Daniel Salas</a>
      </footer>
    </main>
  )
}

function Home({
  selected,
  targets,
  onSelect,
  onRandom,
  onClear,
}: {
  selected: SearchTarget | null
  targets: SearchTarget[]
  onSelect: (target: SearchTarget) => void
  onRandom: () => void
  onClear: () => void
}) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <p className="hero-kicker">Un autor. Un libro. Un trago.</p>
          <h1 id="hero-title">¿A quién lees?</h1>
          <SearchBox targets={targets} onSelect={onSelect} onRandom={onRandom} />
        </div>
        <p className="hero-side">Busca. Mezcla. Lee.</p>
      </section>

      {selected?.kind === 'author' && <AuthorSheet key={selected.author.id} author={selected.author} onClose={onClear} />}
      {selected?.kind === 'provisional' && <ProvisionalAuthorSheet key={selected.author.id} author={selected.author} drinks={content.drinks} onClose={onClear} />}

      <footer className="site-footer">
        <span>Trago y Letra</span>
        <span>El vínculo y su fuente, sin preámbulo.</span>
      </footer>
    </>
  )
}

function Method() {
  return (
    <section className="text-page">
      <p className="eyebrow">Cómo funciona</p>
      <h1>Claridad antes que leyenda.</h1>
      <p>Busca un autor, una autora o un libro. La ficha distingue si el vínculo viene de una obra, una fuente biográfica o una decisión editorial.</p>
      <dl>
        <dt>Hallazgo provisional</dt>
        <dd>Una asociación extraída de la biblioteca que entra al juego aunque todavía le falte ficha, receta o una confianza mayor. La interfaz muestra esas limitaciones.</dd>
        <dt>Bebida documentada</dt>
        <dd>Una fuente respalda consumo, preparación o preferencia; la redacción no va más lejos que la evidencia.</dd>
        <dt>Aparece en la obra</dt>
        <dd>La bebida se identifica en una escena y se indica su obra y localizador.</dd>
        <dt>Según el mito</dt>
        <dd>Una anécdota popular con una fuente localizable. Es parte del juego cultural, no un hecho confirmado.</dd>
        <dt>Maridaje editorial</dt>
        <dd>Una propuesta visible como interpretación y no como hecho biográfico.</dd>
        <dt>Abstinencia o recuperación</dt>
        <dd>Se trata con sobriedad y puede conducir a una recomendación sin alcohol.</dd>
      </dl>
    </section>
  )
}

function Sources() {
  return (
    <section className="text-page">
      <p className="eyebrow">Fuentes y créditos</p>
      <h1>Un catálogo que se puede revisar.</h1>
      <p>Las fuentes aparecen junto a cada recomendación para que el juego no dependa de anécdotas inventadas.</p>
      <ul className="source-list">
        {content.sources.map((source) => (
          <li key={source.id}>
            <strong>{source.title}</strong>
            <span>{source.author_or_publisher} · {source.reliability_tier}</span>
          </li>
        ))}
      </ul>
      <p>Imagen de portada y textos de interfaz: Trago y Letra.</p>
    </section>
  )
}
