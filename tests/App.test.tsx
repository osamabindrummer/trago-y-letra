import { fireEvent, render, screen } from '@testing-library/react'
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
})
