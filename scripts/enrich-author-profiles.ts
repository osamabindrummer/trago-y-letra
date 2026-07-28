/* eslint-disable @typescript-eslint/no-explicit-any -- Wikimedia entrega JSON dinámico; cada acceso se comprueba antes de usarlo. */
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php'
export const WIKIDATA_API = 'https://www.wikidata.org/w/api.php'
const DEFAULT_USER_AGENT = 'TragoYLetraAuthorProfilePilot/1.0 (editorial research; contact: repository maintainer)'
const PERSON_QID = 'Q5'

export type IdentityStatus = 'matched' | 'ambiguous' | 'not_found'

export interface Source {
  kind: 'wikidata' | 'wikipedia' | 'other'
  url: string
  title: string
  accessed_at: string
}

export interface FieldProvenance {
  field: 'canonical_name' | 'aliases' | 'country_or_citizenship' | 'birth_year' | 'death_year' | 'featured_work_candidates'
  source_urls: string[]
  accessed_at: string
  provenance: 'wikidata_structured_candidate'
}

export interface AuthorProfileCandidate {
  author_id: string
  catalog_name: string
  wikidata_id: string | null
  identity_status: IdentityStatus
  candidate: {
    canonical_name: string | null
    aliases: string[]
    country_or_citizenship: string[]
    birth_year: number | null
    death_year: number | null
    featured_work_candidates: string[]
  }
  sources: Source[]
  field_provenance: FieldProvenance[]
  warnings: string[]
  status: 'candidate_generated'
}

interface InventoryAuthor { id: string; name: string; catalogWorks?: string[] }
interface FetchLike { (input: string, init?: RequestInit): Promise<Response> }
interface RetryableError extends Error { retryAfterMs?: number }

export interface RunOptions {
  ids: string[]
  inventoryPath: string
  catalogPath?: string
  outputPath: string
  cacheDir?: string
  fetchImpl?: FetchLike
  now?: Date
  pauseMs?: number
  retries?: number
  timeoutMs?: number
  userAgent?: string
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
}

export function parseInventory(markdown: string): InventoryAuthor[] {
  const authors: InventoryAuthor[] = []
  const pattern = /^- \[ \] \*\*(.+?)\*\* \(`([^`]+)`\):/gm
  for (const match of markdown.matchAll(pattern)) authors.push({ name: match[1], id: match[2] })
  return authors
}

function source(kind: Source['kind'], url: string, title: string, accessed_at: string): Source {
  return { kind, url, title, accessed_at }
}

function wikipediaUrl(title: string): string { return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}` }
function wikidataUrl(qid: string): string { return `https://www.wikidata.org/wiki/${qid}` }

function label(entity: any): string | null {
  const fallback = Object.values(entity?.labels ?? {})[0] as { value?: string } | undefined
  return entity?.labels?.en?.value ?? fallback?.value ?? null
}

function aliases(entity: any): string[] {
  const all = Object.values(entity?.aliases ?? {}).flatMap((items: any) => (items as any[]).map((item) => item.value))
  return [...new Set(all)].sort((a, b) => a.localeCompare(b))
}

function entityIds(entity: any, property: string): string[] {
  return (entity?.claims?.[property] ?? [])
    .map((claim: any) => claim?.mainsnak?.datavalue?.value?.id)
    .filter((id: unknown): id is string => typeof id === 'string')
}

function timeYear(entity: any, property: string): number | null {
  const value = entity?.claims?.[property]?.[0]?.mainsnak?.datavalue?.value?.time
  const matched = typeof value === 'string' ? /^([+-]?\d{4,})-/.exec(value) : null
  return matched ? Number(matched[1]) : null
}

function isPerson(entity: any): boolean { return entityIds(entity, 'P31').includes(PERSON_QID) }

function dateKey(now: Date): string { return now.toISOString().slice(0, 10) }

class WikimediaClient {
  constructor(private readonly fetchImpl: FetchLike, private readonly options: Required<Pick<RunOptions, 'cacheDir' | 'pauseMs' | 'retries' | 'timeoutMs' | 'userAgent'>>) {}

  private async request(url: URL): Promise<any> {
    const cacheFile = this.options.cacheDir ? resolve(this.options.cacheDir, `${createHash('sha256').update(url.toString()).digest('hex')}.json`) : undefined
    if (cacheFile) {
      try { return JSON.parse(await readFile(cacheFile, 'utf8')) }
      catch (error: unknown) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
    }
    let lastError: Error | undefined
    for (let attempt = 0; attempt <= this.options.retries; attempt += 1) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), this.options.timeoutMs)
      try {
        const response = await this.fetchImpl(url.toString(), { headers: { 'User-Agent': this.options.userAgent }, signal: controller.signal })
        if (!response.ok) {
          const error = new Error(`HTTP ${response.status} para ${url}`) as RetryableError
          const retryAfter = Number(response.headers.get('retry-after'))
          if (response.status === 429 && Number.isFinite(retryAfter) && retryAfter > 0) error.retryAfterMs = retryAfter * 1_000
          throw error
        }
        const json = await response.json()
        if (cacheFile) { await mkdir(dirname(cacheFile), { recursive: true }); await writeFile(cacheFile, `${JSON.stringify(json, null, 2)}\n`) }
        if (this.options.pauseMs) await new Promise((done) => setTimeout(done, this.options.pauseMs))
        return json
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        if (attempt < this.options.retries) {
          const retryAfterMs = (lastError as RetryableError).retryAfterMs
          await new Promise((done) => setTimeout(done, retryAfterMs ?? 1_000 * (attempt + 1)))
        }
      } finally { clearTimeout(timeout) }
    }
    throw lastError ?? new Error(`Solicitud fallida para ${url}`)
  }

  async searchPages(query: string): Promise<Array<{ title: string; pageid: number }>> {
    const url = new URL(WIKIPEDIA_API)
    url.search = new URLSearchParams({ action: 'query', list: 'search', srsearch: query, srlimit: '5', format: 'json', origin: '*' }).toString()
    return (await this.request(url)).query?.search ?? []
  }

  async pageQids(pageids: number[]): Promise<Record<number, string | null>> {
    const url = new URL(WIKIPEDIA_API)
    url.search = new URLSearchParams({ action: 'query', pageids: pageids.join('|'), prop: 'pageprops', format: 'json', origin: '*' }).toString()
    const pages = (await this.request(url)).query?.pages ?? {}
    return Object.fromEntries(pageids.map((pageid) => [pageid, (pages[String(pageid)] as { pageprops?: { wikibase_item?: string } } | undefined)?.pageprops?.wikibase_item ?? null]))
  }

  async entities(ids: string[]): Promise<Record<string, any>> {
    if (!ids.length) return {}
    const entities: Record<string, any> = {}
    for (const id of ids) {
      const entityUrl = new URL(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)
      Object.assign(entities, (await this.request(entityUrl)).entities ?? {})
    }
    return entities
  }
}

function candidateForUnresolved(author: InventoryAuthor, status: IdentityStatus, warning: string): AuthorProfileCandidate {
  return { author_id: author.id, catalog_name: author.name, wikidata_id: null, identity_status: status, candidate: { canonical_name: null, aliases: [], country_or_citizenship: [], birth_year: null, death_year: null, featured_work_candidates: [] }, sources: [], field_provenance: [], warnings: [warning], status: 'candidate_generated' }
}

export async function enrichAuthor(author: InventoryAuthor, client: WikimediaClient, now: Date): Promise<AuthorProfileCandidate> {
  const pages = await client.searchPages(author.name)
  if (!pages.length) return candidateForUnresolved(author, 'not_found', 'MediaWiki no devolvió páginas para el nombre del inventario.')
  const qidsByPage = await client.pageQids(pages.map((page) => page.pageid))
  const pageQids = pages.map((page) => ({ page, qid: qidsByPage[page.pageid] }))
  const entities = await client.entities(pageQids.flatMap(({ qid }) => qid ? [qid] : []))
  const possibilities = pageQids.filter(({ qid }) => qid && isPerson(entities[qid])).map(({ page, qid }) => ({ page, qid: qid!, entity: entities[qid!] }))
  const nameMatches = possibilities.filter(({ page, entity }) => [page.title, label(entity) ?? '', ...aliases(entity)].some((value) => normalize(value) === normalize(author.name)))
  let resolvedMatches = nameMatches
  let identityWarning: string | undefined
  if (nameMatches.length > 1 && author.catalogWorks?.length) {
    const workIds = nameMatches.flatMap(({ entity }) => entityIds(entity, 'P800'))
    const workEntities = await client.entities([...new Set(workIds)])
    const matchesByCatalogWork = nameMatches.filter(({ entity }) => entityIds(entity, 'P800').some((id) => {
      const workTitle = label(workEntities[id])
      return workTitle !== null && author.catalogWorks?.some((catalogWork) => normalize(catalogWork) === normalize(workTitle))
    }))
    if (matchesByCatalogWork.length === 1) {
      resolvedMatches = matchesByCatalogWork
      identityWarning = `La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: ${author.catalogWorks.join(', ')}.`
    }
  }
  if (resolvedMatches.length !== 1) {
    const message = nameMatches.length > 1
      ? `Más de una persona coincide con el nombre del inventario: ${nameMatches.map(({ qid }) => qid).join(', ')}.`
      : 'No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente.'
    return candidateForUnresolved(author, 'ambiguous', message)
  }
  const { page, qid, entity } = resolvedMatches[0]
  const accessed_at = dateKey(now)
  const entityUrl = wikidataUrl(qid)
  const pageUrl = wikipediaUrl(page.title)
  const citizenshipIds = entityIds(entity, 'P27')
  const workIds = entityIds(entity, 'P800').slice(0, 2)
  const related = await client.entities([...citizenshipIds, ...workIds])
  const country_or_citizenship = citizenshipIds.map((id) => label(related[id])).filter((value): value is string => Boolean(value))
  const featured_work_candidates = workIds.map((id) => label(related[id])).filter((value): value is string => Boolean(value))
  const provenance = (field: FieldProvenance['field'], source_urls = [entityUrl]): FieldProvenance => ({ field, source_urls, accessed_at, provenance: 'wikidata_structured_candidate' })
  const warnings: string[] = []
  if (identityWarning) warnings.push(identityWarning)
  if (!citizenshipIds.length) warnings.push('Wikidata no declara P27; no se infirió nacionalidad ni tradición.')
  if (!entity?.claims?.P570?.length) warnings.push('Wikidata no declara P570; esto no prueba que la persona esté viva.')
  if (workIds.length < 2) warnings.push('Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente.')
  if (page.title !== author.name || label(entity) !== author.name) warnings.push(`El catálogo usa “${author.name}”; Wikimedia devuelve página “${page.title}” y etiqueta “${label(entity) ?? 'sin etiqueta'}”.`)
  return {
    author_id: author.id, catalog_name: author.name, wikidata_id: qid, identity_status: 'matched',
    candidate: { canonical_name: label(entity), aliases: aliases(entity), country_or_citizenship, birth_year: timeYear(entity, 'P569'), death_year: timeYear(entity, 'P570'), featured_work_candidates },
    sources: [source('wikipedia', pageUrl, page.title, accessed_at), source('wikidata', entityUrl, `Wikidata ${qid}`, accessed_at)],
    field_provenance: [provenance('canonical_name'), provenance('aliases'), provenance('country_or_citizenship', [entityUrl, ...citizenshipIds.map(wikidataUrl)]), provenance('birth_year'), provenance('death_year'), provenance('featured_work_candidates', [entityUrl, ...workIds.map(wikidataUrl)])],
    warnings, status: 'candidate_generated',
  }
}

export async function runPilot(options: RunOptions): Promise<AuthorProfileCandidate[]> {
  const inventory = parseInventory(await readFile(options.inventoryPath, 'utf8'))
  if (options.catalogPath) {
    const catalog = JSON.parse(await readFile(options.catalogPath, 'utf8')) as { works?: Array<{ author_id: string; original_title?: string; display_title_es?: string }> }
    for (const author of inventory) author.catalogWorks = (catalog.works ?? []).filter((work) => work.author_id === author.id).map((work) => work.original_title ?? work.display_title_es).filter((title): title is string => Boolean(title))
  }
  const excluded = new Set(['anonimo', 'autor-no-identificado'])
  const selected = options.ids.map((id) => inventory.find((author) => author.id === id)).filter((author): author is InventoryAuthor => Boolean(author))
  if (selected.length !== options.ids.length) throw new Error('Uno o más IDs no pertenecen al inventario vigente.')
  if (selected.some((author) => excluded.has(author.id))) throw new Error('El piloto excluye anonimo y autor-no-identificado.')
  const client = new WikimediaClient(options.fetchImpl ?? fetch, { cacheDir: options.cacheDir ?? '', pauseMs: options.pauseMs ?? 250, retries: options.retries ?? 5, timeoutMs: options.timeoutMs ?? 10_000, userAgent: options.userAgent ?? DEFAULT_USER_AGENT })
  const candidates: AuthorProfileCandidate[] = []
  for (const author of selected) candidates.push(await enrichAuthor(author, client, options.now ?? new Date()))
  const sorted = candidates.sort((left, right) => left.author_id.localeCompare(right.author_id))
  await mkdir(dirname(options.outputPath), { recursive: true })
  await writeFile(options.outputPath, `${JSON.stringify(sorted, null, 2)}\n`)
  return sorted
}

function parseArguments(args: string[]): { ids: string[]; outputPath: string; cacheDir: string } {
  const value = (flag: string): string | undefined => {
    const position = args.indexOf(flag)
    return position >= 0 ? args[position + 1] : undefined
  }
  const ids = value('--ids')?.split(',').map((id) => id.trim()).filter(Boolean) ?? []
  if (!ids.length) throw new Error('Uso: tsx scripts/enrich-author-profiles.ts --ids id1,id2,...')
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
  return { ids, outputPath: value('--output') ?? resolve(root, 'data/research/author-profile-enrichment/pilot-candidates.json'), cacheDir: value('--cache-dir') ?? resolve(root, 'data/research/author-profile-enrichment/cache') }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
  const arguments_ = parseArguments(process.argv.slice(2))
  const candidates = await runPilot({ ...arguments_, inventoryPath: resolve(root, 'docs/AUTHOR_PROFILES_BACKLOG.md'), catalogPath: resolve(root, 'data/source/catalog.json') })
  console.log(`Candidatos generados: ${candidates.map((candidate) => candidate.author_id).join(', ')}`)
}
