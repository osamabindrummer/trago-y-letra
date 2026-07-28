import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { content } from '../src/content/generated'

describe('contenido público generado', () => {
  it('expone sólo autores y recomendaciones publicadas', async () => {
    const raw = await readFile(resolve(import.meta.dirname, '../data/source/catalog.json'), 'utf8')
    expect(raw).toContain('Borrador Sintético')
    expect(content.authors.map((author) => author.canonical_name)).not.toContain('Borrador Sintético')
    expect(content.authors).toHaveLength(JSON.parse(raw).authors.filter((author: { status: string }) => author.status === 'published').length)
  })

  it('publica los hallazgos provisionales restantes con sus señales', async () => {
    const raw = await readFile(resolve(import.meta.dirname, '../data/source/catalog.json'), 'utf8')
    expect(content.discoveries).toHaveLength(JSON.parse(raw).discoveries.length)
    expect(content.discoveries.every((discovery) => discovery.flags.includes('provisional'))).toBe(true)
    expect(content.discoveries.filter((discovery) => discovery.confidence === 'low').every((discovery) => discovery.flags.includes('low_confidence'))).toBe(true)
  })
})
