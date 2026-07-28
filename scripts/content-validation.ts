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
    ['authors', catalog.authors], ['works', catalog.works], ['drinks', catalog.drinks], ['recommendations', catalog.recommendations], ['evidence', catalog.evidence], ['sources', catalog.sources], ['discoveries', catalog.discoveries ?? []]
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
    if (author.status === 'published' && author.profile_status !== 'minimal') {
      if (!author.country || !author.birth_year || !author.bio_es) errors.push(`author ${author.id}: el perfil completo exige país, año de nacimiento y reseña`)
      if (author.featured_works.length < 2) errors.push(`author ${author.id}: el perfil completo exige dos obras destacadas`)
    }
  }
  for (const work of catalog.works) {
    if (!authorIds.has(work.author_id)) errors.push(`work ${work.id}: author_id inexistente`)
    if (work.metadata_status !== 'minimal' && (!work.publication_year || !work.language)) errors.push(`work ${work.id}: la ficha completa exige año e idioma`)
  }
  for (const drink of catalog.drinks) {
    if (drink.zero_proof_alternative_id && !drinkIds.has(drink.zero_proof_alternative_id)) errors.push(`drink ${drink.id}: alternativa sin alcohol inexistente`)
    if (drink.alcoholic && drink.zero_proof_alternative_id && !catalog.drinks.find((candidate) => candidate.id === drink.zero_proof_alternative_id && !candidate.alcoholic)) errors.push(`drink ${drink.id}: su alternativa debe ser sin alcohol`)
    if (drink.recipe_status !== 'serving_only' && !drink.ingredients.length) errors.push(`drink ${drink.id}: una receta exige ingredientes`)
  }
  for (const recommendation of catalog.recommendations) validateRecommendation(recommendation, { authorIds, workIds, drinkIds, evidenceIds, works: new Map(catalog.works.map((work) => [work.id, work])) }, errors)
  for (const evidence of catalog.evidence) {
    if (!recommendationIds.has(evidence.recommendation_id)) errors.push(`evidence ${evidence.id}: recommendation_id inexistente`)
    if (!sourceById.has(evidence.source_id)) errors.push(`evidence ${evidence.id}: source_id inexistente`)
  }
  for (const recommendation of catalog.recommendations.filter((item) => item.editorial_status === 'published')) {
    const author = catalog.authors.find((item) => item.id === recommendation.author_id)
    if (author?.status !== 'published') errors.push(`recommendation ${recommendation.id}: el autor debe estar published`)
    const evidence = catalog.evidence.filter((item) => recommendation.evidence_ids.includes(item.id) && item.supports_claim)
    if (!evidence.length) errors.push(`recommendation ${recommendation.id}: no posee evidencia a favor`)
    const hasUsableEvidence = recommendation.relationship_type === 'circulating_anecdote'
      ? evidence.some((item) => sourceById.has(item.source_id))
      : evidence.some((item) => publishableSourceTiers.has(sourceById.get(item.source_id)?.reliability_tier ?? ''))
    if (!hasUsableEvidence) errors.push(`recommendation ${recommendation.id}: sólo posee fuentes no publicables`)
  }
  for (const discovery of catalog.discoveries ?? []) {
    if (discovery.author_id && !authorIds.has(discovery.author_id)) errors.push(`discovery ${discovery.id}: author_id inexistente`)
    if (discovery.work_id && !workIds.has(discovery.work_id)) errors.push(`discovery ${discovery.id}: work_id inexistente`)
    if (discovery.drink_id && !drinkIds.has(discovery.drink_id)) errors.push(`discovery ${discovery.id}: drink_id inexistente`)
    if (discovery.work_id && discovery.author_id && catalog.works.find((work) => work.id === discovery.work_id)?.author_id !== discovery.author_id) errors.push(`discovery ${discovery.id}: la obra pertenece a otro autor`)
    if (discovery.source_refs.some((reference) => !sourceById.has(reference.source_id))) errors.push(`discovery ${discovery.id}: source_id inexistente`)
    if (!discovery.flags.includes('provisional')) errors.push(`discovery ${discovery.id}: debe declarar provisional`)
    if (discovery.confidence === 'low' && !discovery.flags.includes('low_confidence')) errors.push(`discovery ${discovery.id}: confidence low exige el flag low_confidence`)
    if (!discovery.author_id && !discovery.flags.some((flag) => flag === 'identity_pending' || flag === 'author_profile_pending')) errors.push(`discovery ${discovery.id}: autor no canónico sin flag pendiente`)
    if (!discovery.drink_id && !discovery.flags.includes('recipe_pending')) errors.push(`discovery ${discovery.id}: bebida no canónica sin flag recipe_pending`)
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
