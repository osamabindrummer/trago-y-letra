import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../src/App'
import { AuthorSheet } from '../src/components/AuthorSheet'
import { content } from '../src/content/generated'

describe('flujo principal', () => {
  it('permite buscar y abrir una ficha', () => {
    render(<App />)
    fireEvent.change(screen.getByRole('textbox', { name: '¿A quién lees?' }), { target: { value: 'onetti' } })
    fireEvent.click(screen.getByRole('option', { name: /Juan Carlos Onetti/i }))
    expect(screen.getByRole('heading', { name: 'Juan Carlos Onetti' })).toBeInTheDocument()
    expect(screen.getByText('La recomendación')).toBeInTheDocument()
    expect(screen.getByText('La preparación')).toBeInTheDocument()
    expect(screen.queryByText('Alternativa sin alcohol')).not.toBeInTheDocument()
  })

  it('abre a Edgar Allan Poe desde el acceso rápido Poe', () => {
    const { container } = render(<App />)
    const app = within(container)
    fireEvent.click(app.getByRole('button', { name: 'Poe' }))
    expect(app.getByRole('heading', { name: 'Edgar Allan Poe' })).toBeInTheDocument()
    expect(app.queryByRole('heading', { name: 'Charles Bukowski' })).not.toBeInTheDocument()
  })

  it('permite explorar y filtrar los hallazgos provisionales', () => {
    const { container } = render(<App />)
    const app = within(container)
    fireEvent.click(app.getByRole('button', { name: 'Hallazgos' }))
    expect(app.getByText(`${content.discoveries.length} hallazgos visibles`)).toBeInTheDocument()
    if (content.discoveries.length) {
      fireEvent.change(app.getByRole('searchbox', { name: 'Buscar por autor, obra o bebida' }), { target: { value: 'Homer' } })
      expect(app.getByText(/hallazgos visibles/)).not.toHaveTextContent(`${content.discoveries.length} hallazgos visibles`)
      expect(app.getAllByText('Homer').length).toBeGreaterThan(0)
    }
  })

  it('abre una ficha mínima promovida desde los libros', () => {
    const { container } = render(<App />)
    const app = within(container)
    fireEvent.change(app.getByRole('textbox', { name: '¿A quién lees?' }), { target: { value: 'Eudora Welty' } })
    fireEvent.click(app.getByRole('option', { name: /Eudora Welty/i }))
    expect(app.getByRole('heading', { name: 'Eudora Welty' })).toBeInTheDocument()
    expect(app.getByText('Ficha mínima · perfil en desarrollo')).toBeInTheDocument()
    expect(app.getByRole('heading', { name: 'Mint Julep' })).toBeInTheDocument()
    expect(app.getByText('Confianza media')).toBeInTheDocument()
  })

  it('abre la ficha canónica de un autor con hallazgos provisionales relacionados', () => {
    const { container } = render(<App />)
    const app = within(container)
    fireEvent.change(app.getByRole('textbox', { name: '¿A quién lees?' }), { target: { value: 'Whiskey Cock-Tail' } })
    fireEvent.click(app.getByRole('option', { name: /Mark Twain/i }))
    expect(app.getByRole('heading', { name: 'Mark Twain' })).toBeInTheDocument()
    expect(app.getByText('Confianza media')).toBeInTheDocument()
    expect(app.getByText(/Literary Eats · PDF p\. 184/)).toBeInTheDocument()
    expect(app.getByText(/PDF p\. 184/)).toBeInTheDocument()
  })

  it('permite abrir una ficha provisional mediante teclado', () => {
    const { container } = render(<App />)
    const app = within(container)
    const input = app.getByRole('textbox', { name: '¿A quién lees?' })
    fireEvent.change(input, { target: { value: 'Mark Twain' } })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(app.getByRole('heading', { name: 'Mark Twain' })).toBeInTheDocument()
  })

  it('muestra el índice completo ordenado por apellido', () => {
    const { container } = render(<App />)
    const app = within(container)
    fireEvent.click(app.getByRole('button', { name: 'Índice' }))
    expect(app.getByRole('heading', { name: 'Autores, de la A a la Z.' })).toBeInTheDocument()
    expect(app.getByText('218 autores · 313 recomendaciones y sugerencias de bebidas.')).toBeInTheDocument()
    const list = within(app.getByRole('list', { name: 'Índice alfabético de autores' }))
    const items = list.getAllByRole('listitem')
    expect(items).toHaveLength(218)
    expect(list.getByText(/Ernest Hemingway/)).toHaveTextContent('(15)')
    const labels = items.map((item) => item.textContent ?? '')
    expect(labels.findIndex((label) => label.includes('Douglas Adams')))
      .toBeLessThan(labels.findIndex((label) => label.includes('Agatha Christie')))
  })
})

describe('contrato expansivo de fichas', () => {
  it('muestra explícitamente la confianza baja en una recomendación canónica', () => {
    const author = structuredClone(content.authors[0])
    author.recommendations = [author.recommendations[0]]
    author.recommendations[0].confidence = 'low'
    const { container } = render(<AuthorSheet author={author} onClose={() => undefined} />)
    expect(within(container).getByText('Confianza baja')).toBeInTheDocument()
  })

  it('renderiza una bebida de servicio directo sin inventar ingredientes', () => {
    const author = structuredClone(content.authors.find((item) => item.id === 'jack-kerouac')!)
    author.recommendations = [author.recommendations.find((item) => item.id === 'kerouac-anchor-steam-editorial')!]
    const { container } = render(<AuthorSheet author={author} onClose={() => undefined} />)
    const sheet = within(container)
    expect(sheet.getByRole('heading', { name: 'Anchor Steam Beer' })).toBeInTheDocument()
    expect(sheet.getByText('Sirve bien fría en un vaso limpio.')).toBeInTheDocument()
  })
})
