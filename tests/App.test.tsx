import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../src/App'

describe('flujo principal', () => {
  it('permite buscar y abrir una ficha', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('¿A quién lees?'), { target: { value: 'onetti' } })
    fireEvent.mouseDown(screen.getByRole('option', { name: /Juan Carlos Onetti/i }))
    expect(screen.getByRole('heading', { name: 'Juan Carlos Onetti' })).toBeInTheDocument()
    expect(screen.getByText('Receta propuesta')).toBeInTheDocument()
    expect(screen.getByText('Procedencia')).toBeInTheDocument()
  })
})
