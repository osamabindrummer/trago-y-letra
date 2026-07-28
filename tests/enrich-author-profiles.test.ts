import { describe, expect, it } from 'vitest'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { parseInventory, runPilot } from '../scripts/enrich-author-profiles.ts'

const inventory = `- [ ] **Ada Lovelace** (\`ada-lovelace\`): pendiente.\n- [ ] **Anónimo** (\`anonimo\`): pendiente.\n`
const entity = (id: string, label: string, claims: object) => ({ id, labels: { en: { value: label } }, aliases: { en: [{ value: 'Augusta Ada King' }] }, claims })
const response = (body: object) => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } })

describe('enriquecimiento de perfiles de autor', () => {
  it('lee el inventario y conserva el ID junto al nombre', () => {
    expect(parseInventory(inventory)).toEqual([{ id: 'ada-lovelace', name: 'Ada Lovelace' }, { id: 'anonimo', name: 'Anónimo' }])
  })

  it('genera candidatos trazables con respuestas sintéticas y usa la caché', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'trago-y-letra-profile-'))
    const inventoryPath = join(directory, 'inventory.md')
    const outputPath = join(directory, 'candidates.json')
    await writeFile(inventoryPath, inventory)
    let calls = 0
    const fetchImpl = async (input: string) => {
      calls += 1
      const url = new URL(input)
      if (url.hostname === 'en.wikipedia.org' && url.searchParams.get('list') === 'search') return response({ query: { search: [{ title: 'Ada Lovelace', pageid: 1 }, { title: 'Ada (given name)', pageid: 2 }] } })
      if (url.hostname === 'en.wikipedia.org') return response({ query: { pages: { 1: { pageprops: { wikibase_item: 'Q7259' } }, 2: { pageprops: { wikibase_item: 'Q123' } } } } })
      const ids = url.pathname.includes('Special:EntityData') ? [url.pathname.match(/Q\d+/)?.[0] ?? 'Q0'] : url.searchParams.get('ids')!.split('|')
      const entities: Record<string, object> = {}
      for (const id of ids) {
        if (id === 'Q7259') entities[id] = entity(id, 'Ada Lovelace', { P31: [{ mainsnak: { datavalue: { value: { id: 'Q5' } } } }], P27: [{ mainsnak: { datavalue: { value: { id: 'Q145' } } } }], P569: [{ mainsnak: { datavalue: { value: { time: '+1815-12-10T00:00:00Z' } } } }], P570: [{ mainsnak: { datavalue: { value: { time: '+1852-11-27T00:00:00Z' } } } }], P800: [{ mainsnak: { datavalue: { value: { id: 'Q100' } } } }] })
        else if (id === 'Q123') entities[id] = entity(id, 'Ada', { P31: [] })
        else if (id === 'Q145') entities[id] = entity(id, 'United Kingdom', {})
        else entities[id] = entity(id, 'Notes on the Analytical Engine', {})
      }
      return response({ entities })
    }
    const options = { ids: ['ada-lovelace'], inventoryPath, outputPath, cacheDir: join(directory, 'cache'), fetchImpl, now: new Date('2026-07-28T12:00:00Z'), pauseMs: 0 }
    const [candidate] = await runPilot(options)
    expect(candidate).toMatchObject({ author_id: 'ada-lovelace', wikidata_id: 'Q7259', identity_status: 'matched', candidate: { birth_year: 1815, death_year: 1852, country_or_citizenship: ['United Kingdom'], featured_work_candidates: ['Notes on the Analytical Engine'] }, status: 'candidate_generated' })
    expect(candidate.sources.map((item) => item.url)).toEqual(['https://en.wikipedia.org/wiki/Ada_Lovelace', 'https://www.wikidata.org/wiki/Q7259'])
    expect(candidate.field_provenance).toHaveLength(6)
    const callsAfterFirstRun = calls
    await runPilot(options)
    expect(calls).toBe(callsAfterFirstRun)
    expect(JSON.parse(await readFile(outputPath, 'utf8'))).toHaveLength(1)
  })

  it('rechaza IDs especiales y ausentes', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'trago-y-letra-profile-'))
    const inventoryPath = resolve(directory, 'inventory.md')
    await writeFile(inventoryPath, inventory)
    await expect(runPilot({ ids: ['anonimo'], inventoryPath, outputPath: join(directory, 'out.json') })).rejects.toThrow('excluye')
    await expect(runPilot({ ids: ['no-existe'], inventoryPath, outputPath: join(directory, 'out.json') })).rejects.toThrow('inventario vigente')
  })
})
