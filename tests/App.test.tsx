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

  it('oculta los accesos a hallazgos y fuentes sin retirar las otras páginas', () => {
    const { container } = render(<App />)
    const app = within(container)
    expect(app.queryByRole('button', { name: 'Hallazgos' })).not.toBeInTheDocument()
    expect(app.queryByRole('button', { name: 'Fuentes' })).not.toBeInTheDocument()
    expect(app.getByRole('button', { name: 'Cómo funciona' })).toBeInTheDocument()
    expect(app.getByRole('button', { name: 'Índice' })).toBeInTheDocument()
  })

  it('abre una ficha mínima promovida desde los libros', () => {
    const { container } = render(<App />)
    const app = within(container)
    fireEvent.change(app.getByRole('textbox', { name: '¿A quién lees?' }), { target: { value: 'Eudora Welty' } })
    fireEvent.click(app.getByRole('option', { name: /Eudora Welty/i }))
    expect(app.getByRole('heading', { name: 'Eudora Welty' })).toBeInTheDocument()
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
    expect(app.getByText('216 autores · 311 recomendaciones y sugerencias de bebidas.')).toBeInTheDocument()
    const list = within(app.getByRole('list', { name: 'Índice alfabético de autores' }))
    const items = list.getAllByRole('listitem')
    expect(items).toHaveLength(216)
    expect(list.getByText(/Ernest Hemingway/)).toHaveTextContent('(15)')
    const labels = items.map((item) => item.textContent ?? '')
    expect(labels.findIndex((label) => label.includes('Douglas Adams')))
      .toBeLessThan(labels.findIndex((label) => label.includes('Agatha Christie')))
    expect(app.getByRole('heading', { name: 'Tragos, de la A a la (glup) Z.' })).toBeInTheDocument()
    const drinks = within(app.getByRole('list', { name: 'Índice alfabético de bebidas' }))
    expect(drinks.getAllByRole('listitem')).toHaveLength(252)
    expect(drinks.getByText('Whisky escocés')).toBeInTheDocument()
  })

  it('muestra el crédito enlazado al final de todas las páginas visibles', () => {
    const { container } = render(<App />)
    const app = within(container)
    const credit = () => app.getByRole('link', { name: 'Daniel Salas' })

    expect(credit()).toHaveAttribute('href', 'https://bio.link/danielsalasj')
    fireEvent.click(app.getByRole('button', { name: 'Cómo funciona' }))
    expect(credit()).toBeInTheDocument()
    fireEvent.click(app.getByRole('button', { name: 'Índice' }))
    expect(credit()).toBeInTheDocument()
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
    expect(sheet.getByText('Vierte 330 ml en un vaso limpio, dejando espacio para espuma.')).toBeInTheDocument()
  })

  it('mantiene las recomendaciones como invitaciones lúdicas sin defensas metodológicas', () => {
    const recommendations = content.authors.flatMap((author) => author.recommendations)
    const defensas = /no se (atribuye|presenta|infiere)|no afirma|no constituye|sin convertir/i
    expect(recommendations.some((recommendation) => defensas.test(recommendation.explanation_es))).toBe(false)
  })
})
