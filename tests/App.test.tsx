import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../src/App'

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
})
