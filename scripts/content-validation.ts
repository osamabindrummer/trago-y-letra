import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import type { Catalog, Recommendation } from './content-types.ts'

const publishableSourceTiers = new Set(['primary', 'scholarly', 'reputable_secondary'])

function duplicates(values: string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))]
}

export function validateCatalog(catalog: Catalog, schema: object): string[] {
  const ajv = new Ajv2020({ allErrors: true, strict: false })
  addFormats(ajv)
  const validate = ajv.compile(schema)
  const errors: string[] = []
  if (!validate(catalog)) errors.push(...(validate.errors ?? []).map((error) => `Esquema ${error.instancePath || '/'}: ${error.message ?? 'inválido'}`))

  const collections: Array<[string, Array<{ id: string }>]> = [
    ['authors', catalog.authors], ['works', catalog.works], ['drinks', catalog.drinks], ['recommendations', catalog.recommendations], ['evidence', catalog.evidence], ['sources', catalog.sources]
  ]
  for (const [name, collection] of collections) {
    const repeated = duplicates(collection.map((item) => item.id))
    if (repeated.length) errors.push(`${name}: IDs duplicados (${repeated.join(', ')})`)
  }
  const repeatedSlugs = duplicates(catalog.authors.map((author) => author.slug))
  if (repeatedSlugs.length) errors.push(`authors: slugs duplicados (${repeatedSlugs.join(', ')})`)

  const authorIds = new Set(catalog.authors.map((item) => item.id))
  const workIds = new Set(catalog.works.map((item) => item.id))
  const drinkIds = new Set(catalog.drinks.map((item) => item.id))
  const recommendationIds = new Set(catalog.recommendations.map((item) => item.id))
  const evidenceIds = new Set(catalog.evidence.map((item) => item.id))
  const sourceById = new Map(catalog.sources.map((item) => [item.id, item]))

  for (const author of catalog.authors) {
    if (author.featured_works.some((id) => !workIds.has(id))) errors.push(`author ${author.id}: obra destacada inexistente`)
    if (author.featured_works.some((id) => catalog.works.find((work) => work.id === id)?.author_id !== author.id)) errors.push(`author ${author.id}: una obra destacada pertenece a otro autor`)
  }
  for (const work of catalog.works) if (!authorIds.has(work.author_id)) errors.push(`work ${work.id}: author_id inexistente`)
  for (const drink of catalog.drinks) {
    if (!drinkIds.has(drink.zero_proof_alternative_id)) errors.push(`drink ${drink.id}: alternativa sin alcohol inexistente`)
    if (drink.alcoholic && !catalog.drinks.find((candidate) => candidate.id === drink.zero_proof_alternative_id && !candidate.alcoholic)) errors.push(`drink ${drink.id}: su alternativa debe ser sin alcohol`)
  }
  for (const recommendation of catalog.recommendations) validateRecommendation(recommendation, { authorIds, workIds, drinkIds, evidenceIds, works: new Map(catalog.works.map((work) => [work.id, work])) }, errors)
  for (const evidence of catalog.evidence) {
    if (!recommendationIds.has(evidence.recommendation_id)) errors.push(`evidence ${evidence.id}: recommendation_id inexistente`)
    if (!sourceById.has(evidence.source_id)) errors.push(`evidence ${evidence.id}: source_id inexistente`)
  }
  for (const recommendation of catalog.recommendations.filter((item) => item.editorial_status === 'published')) {
    const author = catalog.authors.find((item) => item.id === recommendation.author_id)
    if (author?.status !== 'published') errors.push(`recommendation ${recommendation.id}: el autor debe estar published`)
    if (recommendation.confidence === 'low') errors.push(`recommendation ${recommendation.id}: confidence low no es publicable`)
    const evidence = catalog.evidence.filter((item) => recommendation.evidence_ids.includes(item.id) && item.supports_claim)
    if (!evidence.length) errors.push(`recommendation ${recommendation.id}: no posee evidencia a favor`)
    const hasUsableEvidence = recommendation.relationship_type === 'circulating_anecdote'
      ? evidence.some((item) => sourceById.has(item.source_id))
      : evidence.some((item) => publishableSourceTiers.has(sourceById.get(item.source_id)?.reliability_tier ?? ''))
    if (!hasUsableEvidence) errors.push(`recommendation ${recommendation.id}: sólo posee fuentes no publicables`)
  }
  return errors
}

function validateRecommendation(recommendation: Recommendation, ids: { authorIds: Set<string>; workIds: Set<string>; drinkIds: Set<string>; evidenceIds: Set<string>; works: Map<string, { author_id: string }> }, errors: string[]): void {
  if (!ids.authorIds.has(recommendation.author_id)) errors.push(`recommendation ${recommendation.id}: author_id inexistente`)
  if (recommendation.work_id && !ids.workIds.has(recommendation.work_id)) errors.push(`recommendation ${recommendation.id}: work_id inexistente`)
  if (recommendation.work_id && ids.works.get(recommendation.work_id)?.author_id !== recommendation.author_id) errors.push(`recommendation ${recommendation.id}: la obra pertenece a otro autor`)
  if (!ids.drinkIds.has(recommendation.drink_id)) errors.push(`recommendation ${recommendation.id}: drink_id inexistente`)
  if (recommendation.evidence_ids.some((id) => !ids.evidenceIds.has(id))) errors.push(`recommendation ${recommendation.id}: evidence_id inexistente`)
}
