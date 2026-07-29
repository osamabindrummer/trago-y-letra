import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { validateCatalog } from './content-validation.ts'
import type { Catalog, Drink, Ingredient } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const schemaPath = resolve(root, 'data/schema/catalog.schema.json')
const reviewPath = resolve(root, 'exports/recetas-para-revision.md')
const shouldApply = process.argv.includes('--apply')
const catalog = JSON.parse(await readFile(catalogPath, 'utf8')) as Catalog
const schema = JSON.parse(await readFile(schemaPath, 'utf8')) as object
const reviewDocument = (await readFile(reviewPath, 'utf8')).replaceAll('\r\n', '\n')
const publishedDrinkIds = new Set(catalog.recommendations
  .filter((recommendation) => recommendation.editorial_status === 'published')
  .map((recommendation) => recommendation.drink_id))
const publishedDrinks = catalog.drinks.filter((drink) => publishedDrinkIds.has(drink.id))
const catalogById = new Map(catalog.drinks.map((drink) => [drink.id, drink]))
const reviewedDrinks = parseReviewedDrinks(reviewDocument)

if (reviewedDrinks.size !== publishedDrinks.length) {
  throw new Error(`La revisión contiene ${reviewedDrinks.size} bebidas y el catálogo tiene ${publishedDrinks.length} bebidas publicadas.`)
}

const changes: Array<{ id: string; fields: string[] }> = []
for (const [id, reviewedDrink] of reviewedDrinks) {
  const currentDrink = catalogById.get(id)
  if (!currentDrink || !publishedDrinkIds.has(id)) throw new Error(`La bebida ${id} no corresponde a una receta publicada del catálogo.`)
  const changedFields = recipeDifference(currentDrink, reviewedDrink)
  if (changedFields.length) changes.push({ id, fields: changedFields })
  Object.assign(currentDrink, reviewedDrink)
}

const validationErrors = validateCatalog(catalog, schema)
if (validationErrors.length) throw new Error(`La revisión contiene datos inválidos:\n- ${validationErrors.join('\n- ')}`)

console.log(`${changes.length} recetas cambiaron de ${publishedDrinks.length} bebidas publicadas.`)
for (const change of changes) console.log(`- ${change.id}: ${change.fields.join(', ')}`)

if (!shouldApply) {
  console.log('Vista previa terminada. Ejecuta con --apply para escribir el catálogo.')
  process.exit(0)
}

await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
console.log(`Catálogo actualizado: ${changes.length} recetas incorporadas.`)

function parseReviewedDrinks(document: string): Map<string, Drink> {
  const pattern = /<!-- recipe-review:start id="([^"]+)" -->\n## [^\n]+\n\n### Campos editables\n\n\*\*Nombre de la bebida:\*\*\n([\s\S]*?)\n\n\*\*Categoría:\*\*\n([\s\S]*?)\n\n\*\*¿Contiene alcohol\?:\*\* ([^\n]+)\n\n\*\*Ingredientes:\*\*\n([\s\S]*?)\n\n\*\*Preparación:\*\*\n([\s\S]*?)\n\n\*\*Vaso:\*\*\n([\s\S]*?)\n\n\*\*Decoración:\*\*\n([\s\S]*?)\n\n\*\*Nota de la receta:\*\*\n([\s\S]*?)\n\n\*\*Tipo de receta:\*\* ([^\n]+)\n\n### Dónde aparece \(consulta, no editar\)/g
  const drinks = new Map<string, Drink>()
  for (const match of document.matchAll(pattern)) {
    const [, id, name, category, alcoholic, ingredients, steps, glassware, garnish, recipeNote, recipeStatus] = match
    if (drinks.has(id)) throw new Error(`La bebida ${id} aparece más de una vez.`)
    drinks.set(id, {
      ...requiredCatalogFields(id),
      name_es: requiredText(name, id, 'Nombre de la bebida'),
      category: requiredText(category, id, 'Categoría'),
      alcoholic: parseAlcoholic(alcoholic, id),
      ingredients: parseIngredients(ingredients, id),
      steps: parseSteps(steps, id),
      glassware: requiredText(glassware, id, 'Vaso'),
      garnish: parseOptionalText(garnish),
      recipe_note: requiredText(recipeNote, id, 'Nota de la receta'),
      recipe_status: parseRecipeStatus(recipeStatus, id)
    })
  }
  if (!drinks.size) throw new Error('No se encontraron recetas con el formato esperado.')
  return drinks
}

function requiredCatalogFields(id: string): Pick<Drink, 'id' | 'aliases' | 'zero_proof_alternative_id'> {
  const drink = catalogById.get(id)
  if (!drink) throw new Error(`La bebida ${id} no existe en el catálogo.`)
  return { id, aliases: drink.aliases, ...(drink.zero_proof_alternative_id ? { zero_proof_alternative_id: drink.zero_proof_alternative_id } : {}) }
}

function parseIngredients(value: string, id: string): Ingredient[] {
  const trimmed = value.trim()
  if (trimmed === '(sin ingredientes; se sirve directamente)') return []
  return trimmed.split('\n').map((line) => {
    const match = line.match(/^-\s*([^|]+)\|\s*([^|]+)\|\s*(.+)$/)
    if (!match) throw new Error(`La bebida ${id}: cada ingrediente debe usar “- cantidad | unidad | ingrediente”.`)
    const amount = Number(match[1].trim().replace(',', '.'))
    if (!Number.isFinite(amount) || amount <= 0) throw new Error(`La bebida ${id}: la cantidad “${match[1].trim()}” no es válida.`)
    return { name: requiredText(match[3], id, 'Ingrediente'), amount, unit: requiredText(match[2], id, 'Unidad') }
  })
}

function parseSteps(value: string, id: string): string[] {
  const steps = value.trim().split('\n').map((line, index) => {
    const match = line.match(/^\d+\.\s+(.+)$/)
    if (!match) throw new Error(`La bebida ${id}: el paso ${index + 1} debe comenzar con “${index + 1}. ”.`)
    return requiredText(match[1], id, `Paso ${index + 1}`)
  })
  if (steps.length > 6) throw new Error(`La bebida ${id}: una receta admite como máximo seis pasos.`)
  return steps
}

function parseAlcoholic(value: string, id: string): boolean {
  const normalized = value.trim().toLocaleLowerCase('es')
  if (normalized === 'sí' || normalized === 'si') return true
  if (normalized === 'no') return false
  throw new Error(`La bebida ${id}: “¿Contiene alcohol?” debe ser “sí” o “no”.`)
}

function parseRecipeStatus(value: string, id: string): Drink['recipe_status'] {
  const normalized = value.trim().toLocaleLowerCase('es')
  if (normalized === 'receta de la casa') return catalogById.get(id)?.recipe_status === undefined ? undefined : 'house'
  if (normalized === 'adaptada de fuente') return 'source_adapted'
  if (normalized === 'servicio directo') return 'serving_only'
  throw new Error(`La bebida ${id}: el tipo debe ser “receta de la casa”, “adaptada de fuente” o “servicio directo”.`)
}

function requiredText(value: string, id: string, field: string): string {
  const trimmed = value.trim()
  if (!trimmed) throw new Error(`La bebida ${id}: “${field}” no puede quedar vacío.`)
  return trimmed
}

function parseOptionalText(value: string): string | undefined {
  const trimmed = value.trim()
  return !trimmed || trimmed === '(sin decoración)' ? undefined : trimmed
}

function recipeFields(drink: Drink): Omit<Drink, 'id' | 'aliases' | 'zero_proof_alternative_id'> {
  return {
    name_es: drink.name_es,
    category: drink.category,
    alcoholic: drink.alcoholic,
    ingredients: drink.ingredients,
    steps: drink.steps,
    glassware: drink.glassware,
    ...(drink.garnish ? { garnish: drink.garnish } : {}),
    recipe_note: drink.recipe_note,
    ...(drink.recipe_status ? { recipe_status: drink.recipe_status } : {})
  }
}

function recipeDifference(currentDrink: Drink, reviewedDrink: Drink): string[] {
  const currentFields = recipeFields(currentDrink)
  const reviewedFields = recipeFields(reviewedDrink)
  return Object.keys(reviewedFields).filter((field) => JSON.stringify(currentFields[field as keyof typeof currentFields]) !== JSON.stringify(reviewedFields[field as keyof typeof reviewedFields]))
}
