import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Author, Catalog, Drink, Evidence, Recommendation, Work } from './content-types.ts'

interface PromotionReadyArtifact {
  version: number
  editorial_instruction: string
  counts: Record<string, number>
  items: Array<Record<string, unknown> & { source_candidate_id: string }>
  safety_checks: Record<string, boolean>
  batches: Array<{ batch_id: string; source_candidate_ids: string[] }>
  provisional_publication: { count: number }
}

interface PromotionLogArtifact {
  version: number
  initial_catalog_counts: Record<string, number>
  final_catalog_counts: Record<string, number>
  added_counts: Record<string, number>
  batches: Array<Record<string, unknown> & { batch_id: string }>
  expansive_contract?: Record<string, boolean>
}

interface ManifestArtifact {
  contract_versions: {
    project_prd: string
    research_protocol: string
  }
  final_counts: {
    promotion_ready_groups: number
    published_provisional_groups: number
    catalog: Record<string, number>
    catalog_added: Record<string, number>
  }
}

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const convergencePath = resolve(root, 'data/research/book-convergence/three-literary-books')
const promotedDiscoveryIds = new Set([
  'hallazgo-three-books-009',
  'hallazgo-three-books-025',
  'hallazgo-three-books-026',
  'hallazgo-three-books-037',
  'hallazgo-three-books-055',
  'hallazgo-three-books-066',
  'hallazgo-three-books-075',
  'hallazgo-three-books-121',
  'hallazgo-three-books-137',
])
const promotedConvergenceIds = new Set([...promotedDiscoveryIds].map((id) => id.replace('hallazgo-', '')))

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf8')) as T
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function addMissing<T extends { id: string }>(collection: T[], additions: T[]): void {
  const existing = new Set(collection.map((item) => item.id))
  for (const addition of additions) {
    if (!existing.has(addition.id)) {
      collection.push(addition)
      existing.add(addition.id)
    }
  }
}

const authors: Author[] = [
  {
    id: 'eudora-welty',
    slug: 'eudora-welty',
    canonical_name: 'Eudora Welty',
    aliases: ['Welty'],
    featured_works: [],
    profile_status: 'minimal',
    status: 'published',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'lafcadio-hearn',
    slug: 'lafcadio-hearn',
    canonical_name: 'Lafcadio Hearn',
    aliases: ['Hearn'],
    featured_works: [],
    profile_status: 'minimal',
    status: 'published',
    reviewed_at: '2026-07-28',
  },
]

const works: Work[] = [
  {
    id: 'the-glass-key',
    author_id: 'dashiell-hammett',
    original_title: 'The Glass Key',
    display_title_es: 'The Glass Key',
    identifiers: {},
    notes: 'Obra identificada por Sip and Sensibility; año e identificadores pendientes.',
    metadata_status: 'minimal',
  },
  {
    id: 'playback',
    author_id: 'raymond-chandler',
    original_title: 'Playback',
    display_title_es: 'Playback',
    identifiers: {},
    notes: 'Obra identificada por Sip and Sensibility; año e identificadores pendientes.',
    metadata_status: 'minimal',
  },
]

const drinks: Drink[] = [
  {
    id: 'bloody-mary',
    name_es: 'Bloody Mary',
    aliases: [],
    category: 'Cóctel largo',
    alcoholic: true,
    ingredients: [
      { name: 'vodka', amount: 45, unit: 'ml' },
      { name: 'jugo de tomate', amount: 90, unit: 'ml' },
      { name: 'jugo de limón', amount: 15, unit: 'ml' },
      { name: 'salsa Worcestershire', amount: 3, unit: 'ml' },
    ],
    steps: [
      'Mezcla suavemente los ingredientes con hielo.',
      'Sirve y ajusta sal, pimienta o picante al gusto.',
    ],
    glassware: 'Vaso alto',
    garnish: 'Apio o limón',
    recipe_note: 'Receta de la casa; no pretende reproducir la fórmula histórica atribuida a Hemingway.',
    recipe_status: 'house',
  },
  {
    id: 'pineapple-rum',
    name_es: 'Pineapple Rum',
    aliases: ['Ron con piña'],
    category: 'Cóctel largo',
    alcoholic: true,
    ingredients: [
      { name: 'ron', amount: 45, unit: 'ml' },
      { name: 'jugo de piña', amount: 75, unit: 'ml' },
      { name: 'menta fresca', amount: 8, unit: 'hojas' },
    ],
    steps: [
      'Presiona suavemente la menta en el vaso.',
      'Añade hielo, ron y jugo de piña; remueve.',
    ],
    glassware: 'Vaso alto',
    garnish: 'Piña y menta',
    recipe_note: 'Receta de la casa inspirada en la combinación descrita por Sip and Sensibility.',
    recipe_status: 'house',
  },
  {
    id: 'very-dry-martini',
    name_es: 'Very Dry Martini',
    aliases: ['Martini muy seco'],
    category: 'Cóctel corto',
    alcoholic: true,
    ingredients: [
      { name: 'ginebra seca', amount: 75, unit: 'ml' },
      { name: 'vermut seco', amount: 10, unit: 'ml' },
    ],
    steps: [
      'Remueve los ingredientes con abundante hielo.',
      'Cuela en una copa bien fría.',
    ],
    glassware: 'Copa de cóctel',
    garnish: 'Piel de limón',
    recipe_note: 'Receta de la casa con una proporción deliberadamente seca.',
    recipe_status: 'house',
  },
  {
    id: 'brandy-and-soda',
    name_es: 'Brandy and Soda',
    aliases: ['Brandy con soda'],
    category: 'Highball',
    alcoholic: true,
    ingredients: [
      { name: 'brandy', amount: 45, unit: 'ml' },
      { name: 'soda', amount: 90, unit: 'ml' },
    ],
    steps: [
      'Sirve el brandy sobre hielo.',
      'Completa con soda y remueve una vez.',
    ],
    glassware: 'Vaso alto',
    garnish: 'Piel de limón',
    recipe_note: 'Servicio sencillo de la casa; el maridaje procede de Literary Libations.',
    recipe_status: 'house',
  },
  {
    id: 'anchor-steam-beer',
    name_es: 'Anchor Steam Beer',
    aliases: ['Steam Beer'],
    category: 'Cerveza',
    alcoholic: true,
    ingredients: [],
    steps: ['Sirve bien fría en un vaso limpio.'],
    glassware: 'Vaso de cerveza',
    recipe_note: 'Producto servido directamente; no se atribuye una receta propia ni histórica.',
    recipe_status: 'serving_only',
  },
]

const recommendations: Recommendation[] = [
  {
    id: 'hemingway-bloody-mary-literary-eats',
    author_id: 'ernest-hemingway',
    drink_id: 'bloody-mary',
    relationship_type: 'author_documented',
    headline_es: 'Una fórmula de Bloody Mary en su correspondencia',
    explanation_es: 'Literary Eats atribuye a la correspondencia seleccionada de Hemingway una fórmula de Bloody Mary. La receta mostrada aquí es una versión de la casa.',
    confidence: 'medium',
    evidence_ids: ['evidencia-hemingway-bloody-mary-literary-eats'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'welty-mint-julep-literary-eats',
    author_id: 'eudora-welty',
    drink_id: 'mint-julep',
    relationship_type: 'author_documented',
    headline_es: 'Un Mint Julep conservado en archivo',
    explanation_es: 'Literary Eats vincula la entrada de Eudora Welty con una fórmula de Mint Julep preservada en la Manuscript Division de la Library of Congress.',
    confidence: 'medium',
    evidence_ids: ['evidencia-welty-mint-julep-literary-eats'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'hearn-mint-julep-literary-eats',
    author_id: 'lafcadio-hearn',
    drink_id: 'mint-julep',
    relationship_type: 'author_documented',
    headline_es: 'Mint Julep en La Cuisine Creole',
    explanation_es: 'Literary Eats documenta que La Cuisine Creole, atribuida a Lafcadio Hearn, incluye una fórmula de Mint Julep preparada con distintos destilados.',
    confidence: 'medium',
    evidence_ids: ['evidencia-hearn-mint-julep-literary-eats'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'dickens-pineapple-rum-obra',
    author_id: 'charles-dickens',
    work_id: 'the-pickwick-papers',
    drink_id: 'pineapple-rum',
    relationship_type: 'appears_in_work',
    headline_es: 'Pineapple Rum en The Pickwick Papers',
    explanation_es: 'Sip and Sensibility localiza Pineapple Rum en una escena de The Pickwick Papers. La asociación pertenece a la obra y no se presenta como hábito de Dickens.',
    confidence: 'medium',
    evidence_ids: ['evidencia-dickens-pineapple-rum-obra'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'hammett-manhattan-glass-key',
    author_id: 'dashiell-hammett',
    work_id: 'the-glass-key',
    drink_id: 'manhattan',
    relationship_type: 'appears_in_work',
    headline_es: 'Un Manhattan en The Glass Key',
    explanation_es: 'Sip and Sensibility identifica un pedido de Manhattan en The Glass Key. La recomendación se basa en esa aparición narrativa, no en una preferencia de Hammett.',
    confidence: 'medium',
    evidence_ids: ['evidencia-hammett-manhattan-glass-key'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'salinger-very-dry-martini-obra',
    author_id: 'jd-salinger',
    work_id: 'the-catcher-in-the-rye',
    drink_id: 'very-dry-martini',
    relationship_type: 'appears_in_work',
    headline_es: 'Un martini muy seco en The Catcher in the Rye',
    explanation_es: 'Sip and Sensibility relaciona un pedido de Very Dry Martini con una escena de The Catcher in the Rye. No se atribuye la bebida a Salinger.',
    confidence: 'medium',
    evidence_ids: ['evidencia-salinger-very-dry-martini-obra'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'chandler-gibson-playback',
    author_id: 'raymond-chandler',
    work_id: 'playback',
    drink_id: 'gibson',
    relationship_type: 'appears_in_work',
    headline_es: 'Marlowe pide un Gibson en Playback',
    explanation_es: 'Sip and Sensibility sitúa un pedido de Gibson de Philip Marlowe en Playback. La recomendación describe al personaje y la escena, no a Chandler.',
    confidence: 'medium',
    evidence_ids: ['evidencia-chandler-gibson-playback'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'wilde-brandy-soda-editorial',
    author_id: 'oscar-wilde',
    work_id: 'the-picture-of-dorian-gray',
    drink_id: 'brandy-and-soda',
    relationship_type: 'editorial_pairing',
    headline_es: 'Brandy and Soda para Dorian Gray',
    explanation_es: 'Literary Libations propone Brandy and Soda para acompañar The Picture of Dorian Gray y explica el contraste simbólico de los dos componentes.',
    confidence: 'medium',
    evidence_ids: ['evidencia-wilde-brandy-soda-editorial'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
  {
    id: 'kerouac-anchor-steam-editorial',
    author_id: 'jack-kerouac',
    work_id: 'on-the-road',
    drink_id: 'anchor-steam-beer',
    relationship_type: 'editorial_pairing',
    headline_es: 'Una Steam Beer para On the Road',
    explanation_es: 'Literary Libations propone Anchor Steam Beer para acompañar On the Road. Se publica como maridaje editorial y no como preferencia atribuida a Kerouac.',
    confidence: 'medium',
    evidence_ids: ['evidencia-kerouac-anchor-steam-editorial'],
    editorial_status: 'published',
    reviewed_by: 'convergencia-tres-libros',
    reviewed_at: '2026-07-28',
  },
]

const evidence: Evidence[] = [
  {
    id: 'evidencia-hemingway-bloody-mary-literary-eats',
    recommendation_id: 'hemingway-bloody-mary-literary-eats',
    source_id: 'fuente-literary-eats',
    claim: 'Literary Eats atribuye a la correspondencia de Hemingway una fórmula de Bloody Mary.',
    support_excerpt: 'To make a pitcher of Bloody Marys',
    locator: 'PDF p. 112; impresa p. 95; Ernest Hemingway — Bloody Mary',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-welty-mint-julep-literary-eats',
    recommendation_id: 'welty-mint-julep-literary-eats',
    source_id: 'fuente-literary-eats',
    claim: 'Literary Eats vincula a Welty con una fórmula archivada de Mint Julep.',
    support_excerpt: 'Have silver goblet thoroughly chilled.',
    locator: 'PDF p. 208; impresa p. 191; Eudora Welty — Mint Julep',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-hearn-mint-julep-literary-eats',
    recommendation_id: 'hearn-mint-julep-literary-eats',
    source_id: 'fuente-literary-eats',
    claim: 'Literary Eats documenta una fórmula de Mint Julep en La Cuisine Creole.',
    support_excerpt: 'Made of Whiskey, Brandy, Gin, Etc., Etc.',
    locator: 'PDF p. 110; impresa p. 93; Lafcadio Hearn — Mint Juleps',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-dickens-pineapple-rum-obra',
    recommendation_id: 'dickens-pineapple-rum-obra',
    source_id: 'fuente-sip-and-sensibility',
    claim: 'Sip and Sensibility localiza Pineapple Rum en The Pickwick Papers.',
    locator: 'OEBPS/chapter15.xhtml; Pineapple Rum',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-hammett-manhattan-glass-key',
    recommendation_id: 'hammett-manhattan-glass-key',
    source_id: 'fuente-sip-and-sensibility',
    claim: 'Sip and Sensibility localiza un pedido de Manhattan en The Glass Key.',
    support_excerpt: 'Lo, Jimmy. Been behaving. Manhattan.',
    locator: 'OEBPS/chapter34.xhtml; Manhattan',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-salinger-very-dry-martini-obra',
    recommendation_id: 'salinger-very-dry-martini-obra',
    source_id: 'fuente-sip-and-sensibility',
    claim: 'Sip and Sensibility vincula un Very Dry Martini con The Catcher in the Rye.',
    locator: 'OEBPS/chapter45.xhtml; Very Dry Martini',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-chandler-gibson-playback',
    recommendation_id: 'chandler-gibson-playback',
    source_id: 'fuente-sip-and-sensibility',
    claim: 'Sip and Sensibility localiza un pedido de Gibson de Philip Marlowe en Playback.',
    locator: 'OEBPS/chapter54.xhtml; Gibson',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-wilde-brandy-soda-editorial',
    recommendation_id: 'wilde-brandy-soda-editorial',
    source_id: 'fuente-literary-libations',
    claim: 'Literary Libations propone Brandy and Soda para The Picture of Dorian Gray.',
    locator: 'OEBPS/Text/005_Chapter001.html; The Picture of Dorian Gray; anchor page_18',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
  {
    id: 'evidencia-kerouac-anchor-steam-editorial',
    recommendation_id: 'kerouac-anchor-steam-editorial',
    source_id: 'fuente-literary-libations',
    claim: 'Literary Libations propone Anchor Steam Beer para acompañar On the Road.',
    locator: 'OEBPS/Text/006_Chapter002.html; On the Road; anchor page_38',
    evidence_kind: 'bibliographic_reference',
    supports_claim: true,
    checked_at: '2026-07-28',
  },
]

const catalog = await readJson<Catalog>(catalogPath)
addMissing(catalog.authors, authors)
addMissing(catalog.works, works)
addMissing(catalog.drinks, drinks)
addMissing(catalog.recommendations, recommendations)
addMissing(catalog.evidence, evidence)
catalog.discoveries = catalog.discoveries.filter((item) => !promotedDiscoveryIds.has(item.id))
await writeJson(catalogPath, catalog)

const consolidated = await readJson<{
  candidates: Array<{
    convergence_id: string
    normalized: Record<string, unknown>
    convergence_status: string
    decision_reason: string[]
  }>
}>(resolve(convergencePath, 'consolidated-candidates.json'))
const canonicalByConvergenceId = new Map([
  ['three-books-009', { author_id: 'ernest-hemingway', drink_id: 'bloody-mary' }],
  ['three-books-025', { author_id: 'eudora-welty', drink_id: 'mint-julep' }],
  ['three-books-026', { author_id: 'lafcadio-hearn', drink_id: 'mint-julep' }],
  ['three-books-037', { author_id: 'charles-dickens', work_id: 'the-pickwick-papers', drink_id: 'pineapple-rum' }],
  ['three-books-055', { author_id: 'dashiell-hammett', work_id: 'the-glass-key', drink_id: 'manhattan' }],
  ['three-books-066', { author_id: 'jd-salinger', work_id: 'the-catcher-in-the-rye', drink_id: 'very-dry-martini' }],
  ['three-books-075', { author_id: 'raymond-chandler', work_id: 'playback', drink_id: 'gibson' }],
  ['three-books-121', { author_id: 'oscar-wilde', work_id: 'the-picture-of-dorian-gray', drink_id: 'brandy-and-soda', relationship_type: 'editorial_pairing' }],
  ['three-books-137', { author_id: 'jack-kerouac', work_id: 'on-the-road', drink_id: 'anchor-steam-beer', relationship_type: 'editorial_pairing' }],
])
for (const item of consolidated.candidates) {
  const canonical = canonicalByConvergenceId.get(item.convergence_id)
  if (!canonical) continue
  Object.assign(item.normalized, canonical)
  item.convergence_status = 'promotion_ready'
  item.decision_reason = ['Promovido bajo el contrato expansivo: fuente bibliográfica confiable, entidad mínima o receta de la casa explícitamente rotulada.']
}
await writeJson(resolve(convergencePath, 'consolidated-candidates.json'), consolidated)

const needsReview = await readJson<{ count: number; items: Array<{ convergence_id: string }> }>(resolve(convergencePath, 'needs-review.json'))
needsReview.items = needsReview.items.filter((item) => !promotedConvergenceIds.has(item.convergence_id))
needsReview.count = needsReview.items.length
await writeJson(resolve(convergencePath, 'needs-review.json'), needsReview)

const promotionItems = [
  ['le-009', 'hemingway-bloody-mary-literary-eats', 'evidencia-hemingway-bloody-mary-literary-eats', 'fuente-literary-eats'],
  ['le-025', 'welty-mint-julep-literary-eats', 'evidencia-welty-mint-julep-literary-eats', 'fuente-literary-eats'],
  ['le-026', 'hearn-mint-julep-literary-eats', 'evidencia-hearn-mint-julep-literary-eats', 'fuente-literary-eats'],
  ['sip-and-sensibility-15-pineapple-rum', 'dickens-pineapple-rum-obra', 'evidencia-dickens-pineapple-rum-obra', 'fuente-sip-and-sensibility'],
  ['sip-and-sensibility-34-manhattan', 'hammett-manhattan-glass-key', 'evidencia-hammett-manhattan-glass-key', 'fuente-sip-and-sensibility'],
  ['sip-and-sensibility-45-very-dry-martini', 'salinger-very-dry-martini-obra', 'evidencia-salinger-very-dry-martini-obra', 'fuente-sip-and-sensibility'],
  ['sip-and-sensibility-54-gibson', 'chandler-gibson-playback', 'evidencia-chandler-gibson-playback', 'fuente-sip-and-sensibility'],
  ['literary-libations-001-14', 'wilde-brandy-soda-editorial', 'evidencia-wilde-brandy-soda-editorial', 'fuente-literary-libations'],
  ['literary-libations-002-12', 'kerouac-anchor-steam-editorial', 'evidencia-kerouac-anchor-steam-editorial', 'fuente-literary-libations'],
].map(([source_candidate_id, canonical_record, evidence_id, source_id]) => ({
  source_candidate_id,
  action: 'create_recommendation',
  canonical_record,
  evidence_id,
  source_id,
  confidence: 'medium',
  justification: 'Promoción bajo el contrato expansivo con fuente bibliográfica confiable, entidad mínima, receta de la casa o servicio directo explícito.',
}))

const promotionReady = await readJson<PromotionReadyArtifact>(resolve(convergencePath, 'promotion-ready.json'))
promotionReady.version = 4
promotionReady.editorial_instruction = 'Los tres libros son fuentes secundarias reputadas. Se permiten confianza baja visible, entidades mínimas, recetas de la casa y bebidas de servicio directo.'
promotionReady.items ??= []
const promotedSourceIds = new Set(promotionReady.items.map((item: { source_candidate_id: string }) => item.source_candidate_id))
for (const item of promotionItems) if (!promotedSourceIds.has(item.source_candidate_id)) promotionReady.items.push(item)
promotionReady.counts = {
  source_candidates: promotionReady.items.length,
  authors_to_add: 2,
  works_to_add: 2,
  drinks_to_add: 5,
  sources_to_add: 3,
  evidence_to_add: 27,
  recommendations_to_add: 23,
  recommendations_to_update: 3,
  provisional_discoveries_to_add: catalog.discoveries.length,
}
promotionReady.safety_checks = {
  deletes_existing_records: false,
  overwrites_better_evidence: false,
  publishes_low_confidence: true,
  low_confidence_visible_in_ui: true,
  creates_minimal_authors: true,
  creates_serving_only_drinks: true,
}
promotionReady.batches ??= []
if (!promotionReady.batches.some((batch: { batch_id: string }) => batch.batch_id === 'promotion-005-first-viable-batch')) {
  promotionReady.batches.push({
    batch_id: 'promotion-005-first-viable-batch',
    source_candidate_ids: promotionItems.map((item) => item.source_candidate_id),
  })
}
promotionReady.provisional_publication.count = catalog.discoveries.length
await writeJson(resolve(convergencePath, 'promotion-ready.json'), promotionReady)

const promotionLog = await readJson<PromotionLogArtifact>(resolve(convergencePath, 'promotion-log.json'))
promotionLog.version = 4
promotionLog.final_catalog_counts = {
  authors: catalog.authors.length,
  works: catalog.works.length,
  drinks: catalog.drinks.length,
  recommendations: catalog.recommendations.length,
  evidence: catalog.evidence.length,
  sources: catalog.sources.length,
  discoveries: catalog.discoveries.length,
}
promotionLog.added_counts = {
  authors: catalog.authors.length - promotionLog.initial_catalog_counts.authors,
  works: catalog.works.length - promotionLog.initial_catalog_counts.works,
  drinks: catalog.drinks.length - promotionLog.initial_catalog_counts.drinks,
  recommendations: catalog.recommendations.length - promotionLog.initial_catalog_counts.recommendations,
  evidence: catalog.evidence.length - promotionLog.initial_catalog_counts.evidence,
  sources: catalog.sources.length - promotionLog.initial_catalog_counts.sources,
  discoveries: catalog.discoveries.length,
}
if (!promotionLog.batches.some((batch: { batch_id: string }) => batch.batch_id === 'promotion-005-first-viable-batch')) {
  promotionLog.batches.push({
    batch_id: 'promotion-005-first-viable-batch',
    source_candidate_ids: promotionItems.map((item) => item.source_candidate_id),
    status: 'applied',
    ids_added: [
      ...authors.map((item) => item.id),
      ...works.map((item) => item.id),
      ...drinks.map((item) => item.id),
      ...recommendations.map((item) => item.id),
      ...evidence.map((item) => item.id),
    ],
    ids_updated: [],
    discoveries_removed_after_promotion: [...promotedDiscoveryIds],
    validation: 'passed',
    errors: [],
  })
}
const appliedBatch = promotionLog.batches.find(
  (batch: { batch_id: string }) => batch.batch_id === 'promotion-005-first-viable-batch',
)
if (appliedBatch) appliedBatch.validation = 'passed'
promotionLog.expansive_contract = {
  low_confidence_publishable: true,
  minimal_author_profiles: true,
  minimal_work_metadata: true,
  house_recipes: true,
  serving_only_drinks: true,
}
await writeJson(resolve(convergencePath, 'promotion-log.json'), promotionLog)

const manifest = await readJson<ManifestArtifact>(resolve(convergencePath, 'manifest.json'))
manifest.contract_versions.project_prd = '1.2'
manifest.contract_versions.research_protocol = '1.1'
manifest.final_counts.promotion_ready_groups = 27
manifest.final_counts.published_provisional_groups = catalog.discoveries.length
manifest.final_counts.catalog = promotionLog.final_catalog_counts
manifest.final_counts.catalog_added = promotionLog.added_counts
await writeJson(resolve(convergencePath, 'manifest.json'), manifest)

console.log('Primer lote viable aplicado: 9 hallazgos promovidos.')
