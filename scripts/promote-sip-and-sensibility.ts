import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Author, Catalog, Drink, Evidence, Recommendation, Work } from './content-types.ts'

type Proposal = {
  discovery_id: string
  source_candidate_ids: string[]
  decision: 'create_recommendation'
  author: { action: string; canonical_id: string; canonical_name: string }
  work: { action: string; canonical_id: string | null; title: string | null }
  drink: { action: string; canonical_id: string; name_es: string; aliases: string[] }
  recommendation: { relationship_type: Recommendation['relationship_type']; confidence: Recommendation['confidence']; headline_es: string; explanation_es: string }
  evidence: { source_id: string; claim: string; locator: string; support_excerpt: string }
  duplicate_of: string | null
}

type Result = { batch_id: string; items: Proposal[] }
type Artifact = { candidates?: Array<Record<string, unknown>>; items?: Array<Record<string, unknown>>; batches?: Array<Record<string, unknown>>; counts?: Record<string, number>; generated_at?: string; [key: string]: unknown }

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const convergence = resolve(root, 'data/research/book-convergence/three-literary-books')
const catalogPath = resolve(root, 'data/source/catalog.json')
const date = '2026-07-28'
const batchId = 'promotion-007-sip-and-sensibility-normalized'

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function addMissing<T extends { id: string }>(target: T[], additions: T[]): T[] {
  const known = new Set(target.map((item) => item.id))
  const added: T[] = []
  for (const addition of additions) {
    if (!known.has(addition.id)) {
      target.push(addition)
      known.add(addition.id)
      added.push(addition)
    }
  }
  return added
}

function houseDrink(proposal: Proposal): Drink {
  const isWine = /wine|vino|piment|hipocrás|hippocras|negus/i.test(proposal.drink.name_es)
  return {
    id: proposal.drink.canonical_id,
    name_es: proposal.drink.name_es,
    aliases: proposal.drink.aliases,
    category: isWine ? 'Vino preparado' : 'Bebida literaria',
    alcoholic: true,
    ingredients: isWine
      ? [{ name: 'vino', amount: 120, unit: 'ml' }, { name: 'acompañamiento aromático', amount: 1, unit: 'porción' }]
      : [{ name: 'base alcohólica', amount: 45, unit: 'ml' }, { name: 'mezclador', amount: 90, unit: 'ml' }],
    steps: ['Combina los ingredientes con hielo o calor según el estilo de la bebida.', 'Sirve de inmediato en un vaso limpio.'],
    glassware: 'Vaso apropiado',
    recipe_note: 'Receta contemporánea de la casa; no reproduce ni atribuye como histórica la fórmula de Sip and Sensibility.',
    recipe_status: 'house',
  }
}

function servingOnlyDrink(proposal: Proposal): Drink {
  return {
    id: proposal.drink.canonical_id,
    name_es: proposal.drink.name_es,
    aliases: proposal.drink.aliases,
    category: 'Servicio directo',
    alcoholic: true,
    ingredients: [],
    steps: ['Sirve bien fría en un vaso limpio.'],
    glassware: 'Vaso alto',
    recipe_note: 'Servicio directo; la fuente no demuestra proporciones históricas.',
    recipe_status: 'serving_only',
  }
}

function recommendationId(proposal: Proposal): string {
  return `${proposal.author.canonical_id}-${proposal.drink.canonical_id}-sip-and-sensibility`
}

async function main(): Promise<void> {
  const catalog = await readJson<Catalog>(catalogPath)
  const results = await Promise.all([1, 2, 3, 4].map((part) => readJson<Result>(resolve(convergence, `agent-results/sip-and-sensibility-0${part}.json`))))
  const proposals = results.flatMap((result) => result.items)
  if (proposals.length !== 65 || new Set(proposals.map((item) => item.discovery_id)).size !== 65) throw new Error('Los lotes Sip no contienen exactamente 65 hallazgos únicos.')

  const sipDiscoveries = catalog.discoveries.filter((item) => item.source_refs.some((source) => source.source_id === 'fuente-sip-and-sensibility'))
  if (sipDiscoveries.length !== 65 && sipDiscoveries.length !== 0) throw new Error(`Se esperaban 65 hallazgos Sip antes de promover, o cero en una repetición, y hay ${sipDiscoveries.length}.`)
  const proposalDiscoveryIds = new Set(proposals.map((item) => item.discovery_id))
  if (sipDiscoveries.some((item) => !proposalDiscoveryIds.has(item.id))) throw new Error('Hay hallazgos Sip sin propuesta de promoción.')

  const authors: Author[] = proposals.filter((item) => item.author.action !== 'reuse').map((item) => ({
    id: item.author.canonical_id, slug: item.author.canonical_id, canonical_name: item.author.canonical_name, aliases: [], featured_works: [], profile_status: 'minimal', status: 'published', reviewed_at: date,
  }))
  const works: Work[] = proposals.filter((item) => item.work.action === 'create_minimal' && item.work.canonical_id && item.work.title).map((item) => ({
    id: item.work.canonical_id!, author_id: item.author.canonical_id, original_title: item.work.title!, display_title_es: item.work.title!, identifiers: {}, notes: 'Obra identificada por Sip and Sensibility; metadatos pendientes.', metadata_status: 'minimal',
  }))
  const drinks = proposals.filter((item) => item.drink.action === 'create_house').map(houseDrink)
    .concat(proposals.filter((item) => item.drink.action === 'create_serving_only').map(servingOnlyDrink))
  const addedAuthors = addMissing(catalog.authors, authors)
  const addedWorks = addMissing(catalog.works, works)
  const addedDrinks = addMissing(catalog.drinks, drinks)

  const addedRecommendations: Recommendation[] = []
  const addedEvidence: Evidence[] = []
  const updatedRecommendations: string[] = []
  for (const proposal of proposals) {
    const id = recommendationId(proposal)
    const evidenceId = `evidencia-${id}`
    const targetId = proposal.duplicate_of ?? id
    const target = catalog.recommendations.find((item) => item.id === targetId)
    if (proposal.duplicate_of) {
      if (!target) throw new Error(`No existe el duplicado canónico ${targetId}.`)
      if (target.author_id !== proposal.author.canonical_id || target.drink_id !== proposal.drink.canonical_id || target.relationship_type !== proposal.recommendation.relationship_type) throw new Error(`El duplicado ${targetId} no coincide con la propuesta.`)
      if (!target.evidence_ids.includes(evidenceId)) target.evidence_ids.push(evidenceId)
      updatedRecommendations.push(targetId)
    } else {
      if (target) {
        if (target.author_id !== proposal.author.canonical_id || target.drink_id !== proposal.drink.canonical_id || target.relationship_type !== proposal.recommendation.relationship_type) throw new Error(`La recomendación existente ${id} no coincide con la propuesta.`)
        if (!target.evidence_ids.includes(evidenceId)) target.evidence_ids.push(evidenceId)
        continue
      }
      const semanticDuplicate = catalog.recommendations.find((item) => item.author_id === proposal.author.canonical_id && item.drink_id === proposal.drink.canonical_id && item.relationship_type === proposal.recommendation.relationship_type)
      if (semanticDuplicate) throw new Error(`Duplicado semántico no declarado: ${id} / ${semanticDuplicate.id}`)
      const recommendation: Recommendation = {
        id, author_id: proposal.author.canonical_id, drink_id: proposal.drink.canonical_id, relationship_type: proposal.recommendation.relationship_type,
        headline_es: proposal.recommendation.headline_es, explanation_es: proposal.recommendation.explanation_es, confidence: proposal.recommendation.confidence,
        evidence_ids: [evidenceId], editorial_status: 'published', reviewed_by: 'convergencia-tres-libros', reviewed_at: date,
      }
      if (proposal.work.canonical_id) recommendation.work_id = proposal.work.canonical_id
      catalog.recommendations.push(recommendation)
      addedRecommendations.push(recommendation)
    }
    addedEvidence.push({ id: evidenceId, recommendation_id: targetId, source_id: proposal.evidence.source_id, claim: proposal.evidence.claim, locator: proposal.evidence.locator, support_excerpt: proposal.evidence.support_excerpt, evidence_kind: 'bibliographic_reference', supports_claim: true, checked_at: date })
  }
  const actualEvidence = addMissing(catalog.evidence, addedEvidence)
  catalog.discoveries = catalog.discoveries.filter((item) => !proposalDiscoveryIds.has(item.id))
  await writeJson(catalogPath, catalog)

  const consolidated = await readJson<Artifact>(resolve(convergence, 'consolidated-candidates.json'))
  for (const candidate of consolidated.candidates ?? []) {
    const ids = candidate.source_candidate_ids as string[]
    if (ids?.some((id) => proposals.some((proposal) => proposal.source_candidate_ids.includes(id)))) {
      candidate.convergence_status = 'promoted_canonical'
      candidate.decision_reason = ['Promovido al catálogo canónico por Terra desde la normalización revisada de Sip and Sensibility.']
    }
  }
  await writeJson(resolve(convergence, 'consolidated-candidates.json'), consolidated)

  const ready = await readJson<Artifact>(resolve(convergence, 'promotion-ready.json'))
  const sourceCandidateIds = new Set(proposals.flatMap((proposal) => proposal.source_candidate_ids))
  ready.items = (ready.items ?? []).filter((item) => !sourceCandidateIds.has(item.source_candidate_id as string)).concat(proposals.map((proposal) => ({ source_candidate_id: proposal.source_candidate_ids[0], action: proposal.duplicate_of ? 'append_evidence' : 'create_recommendation', canonical_record: proposal.duplicate_of ?? recommendationId(proposal), evidence_id: `evidencia-${recommendationId(proposal)}`, source_id: 'fuente-sip-and-sensibility', confidence: proposal.recommendation.confidence, justification: 'Promoción Terra desde normalización mecánica revisada.' })))
  ready.batches = (ready.batches ?? []).filter((batch) => batch.batch_id !== batchId).concat([{ batch_id: batchId, source_candidate_ids: proposals.flatMap((proposal) => proposal.source_candidate_ids) }])
  ready.counts = { ...(ready.counts ?? {}), sip_and_sensibility_promoted: proposals.length, provisional_remaining: catalog.discoveries.length }
  ready.generated_at = date
  await writeJson(resolve(convergence, 'promotion-ready.json'), ready)

  const needsReview = await readJson<Artifact>(resolve(convergence, 'needs-review.json'))
  needsReview.items = (needsReview.items ?? []).filter((item) => !((item.source_candidate_ids as string[] | undefined)?.some((id) => proposals.some((proposal) => proposal.source_candidate_ids.includes(id)))))
  needsReview.count = needsReview.items.length
  needsReview.generated_at = date
  await writeJson(resolve(convergence, 'needs-review.json'), needsReview)

  const log = await readJson<Artifact>(resolve(convergence, 'promotion-log.json'))
  const previousBatch = (log.batches ?? []).find((batch) => batch.batch_id === batchId)
  const previousIds = (previousBatch?.ids_added as string[] | undefined) ?? []
  const idsAdded = [...new Set([...previousIds, ...addedAuthors, ...addedWorks, ...addedDrinks, ...addedRecommendations, ...actualEvidence].map((item) => typeof item === 'string' ? item : item.id))]
  const validation = process.argv.includes('--finalize') ? 'passed' : 'pending'
  log.batches = (log.batches ?? []).filter((batch) => batch.batch_id !== batchId).concat([{ batch_id: batchId, source_candidate_ids: proposals.flatMap((proposal) => proposal.source_candidate_ids), status: 'applied', ids_added: idsAdded, ids_updated: updatedRecommendations, discoveries_removed_after_promotion: [...proposalDiscoveryIds].sort(), validation, errors: [] }])
  log.final_catalog_counts = { authors: catalog.authors.length, works: catalog.works.length, drinks: catalog.drinks.length, recommendations: catalog.recommendations.length, evidence: catalog.evidence.length, sources: catalog.sources.length, discoveries: catalog.discoveries.length }
  log.generated_at = date
  await writeJson(resolve(convergence, 'promotion-log.json'), log)

  const manifest = await readJson<Artifact>(resolve(convergence, 'manifest.json'))
  const finalCounts = manifest.final_counts as Record<string, unknown>
  finalCounts.catalog = log.final_catalog_counts
  finalCounts.published_provisional_groups = catalog.discoveries.length
  manifest.final_counts = finalCounts
  manifest.generated_at = date
  await writeJson(resolve(convergence, 'manifest.json'), manifest)

  console.log(JSON.stringify({ promoted: proposals.length, recommendations_added: addedRecommendations.length, recommendations_updated: updatedRecommendations.length, authors_added: addedAuthors.length, works_added: addedWorks.length, drinks_added: addedDrinks.length, evidence_added: actualEvidence.length, provisional_remaining: catalog.discoveries.length }, null, 2))
}

await main()
