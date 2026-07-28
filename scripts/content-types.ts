export type EditorialStatus = 'draft' | 'needs_review' | 'approved' | 'published' | 'rejected' | 'blocked_insufficient_evidence'
export type RelationshipType = 'author_documented' | 'appears_in_work' | 'editorial_pairing' | 'circulating_anecdote' | 'abstinence_or_recovery'
export type DiscoveryFlag = 'provisional' | 'low_confidence' | 'identity_pending' | 'author_profile_pending' | 'work_metadata_pending' | 'recipe_pending'

export interface Author { id: string; slug: string; canonical_name: string; aliases: string[]; country?: string; birth_year?: number; death_year?: number; bio_es?: string; featured_works: string[]; profile_status?: 'full' | 'minimal'; status: 'draft' | 'needs_review' | 'published' | 'rejected'; reviewed_at: string }
export interface Work { id: string; author_id: string; original_title: string; display_title_es: string; publication_year?: number; language?: string; identifiers: Record<string, string>; notes: string; metadata_status?: 'full' | 'minimal' }
export interface Ingredient { name: string; amount: number; unit: string }
export interface Drink { id: string; name_es: string; aliases: string[]; category: string; alcoholic: boolean; ingredients: Ingredient[]; steps: string[]; glassware: string; garnish?: string; zero_proof_alternative_id?: string; recipe_note: string; recipe_status?: 'house' | 'source_adapted' | 'serving_only' }
export interface Recommendation { id: string; author_id: string; work_id?: string; drink_id: string; relationship_type: RelationshipType; headline_es: string; explanation_es: string; confidence: 'high' | 'medium' | 'low'; evidence_ids: string[]; editorial_status: EditorialStatus; reviewed_by: string; reviewed_at: string }
export interface Evidence { id: string; recommendation_id: string; source_id: string; claim: string; support_excerpt?: string; locator: string; evidence_kind: 'direct_quote' | 'paraphrase' | 'bibliographic_reference'; supports_claim: boolean; checked_at: string }
export interface Source { id: string; source_type: string; title: string; author_or_publisher: string; publication_date?: string; url?: string; isbn?: string; edition?: string; accessed_at: string; language: string; reliability_tier: 'primary' | 'scholarly' | 'reputable_secondary' | 'discovery_only' }
export interface DiscoverySourceRef { source_id: string; locator: string; support_excerpt?: string }
export interface Discovery { id: string; author_name: string; author_id?: string; work_title?: string; work_id?: string; drink_name: string; drink_id?: string; relationship_type: RelationshipType; relationship_basis: string; explanation_es: string; confidence: 'high' | 'medium' | 'low'; flags: DiscoveryFlag[]; source_refs: DiscoverySourceRef[]; editorial_status: 'published_provisional'; reviewed_at: string }
export interface Catalog { authors: Author[]; works: Work[]; drinks: Drink[]; recommendations: Recommendation[]; evidence: Evidence[]; sources: Source[]; discoveries: Discovery[] }

export interface PublicAuthor extends Author { works: Work[]; recommendations: Array<Recommendation & { drink: Drink; evidence: Array<Evidence & { source: Source }> }> }
export interface PublicDiscovery extends Omit<Discovery, 'source_refs'> { source_refs: Array<Omit<DiscoverySourceRef, 'support_excerpt'> & { source: Source }> }
export interface PublicCatalog { generated_at: string; authors: PublicAuthor[]; drinks: Drink[]; sources: Source[]; discoveries: PublicDiscovery[] }
