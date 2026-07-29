import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Catalog, Drink } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const outputPath = resolve(root, 'exports/recetas-para-revision.md')
const catalog = JSON.parse(await readFile(catalogPath, 'utf8')) as Catalog

const authors = new Map(catalog.authors.map((author) => [author.id, author]))
const publishedRecommendations = catalog.recommendations.filter((recommendation) => recommendation.editorial_status === 'published')
const referencesByDrink = new Map<string, string[]>()

for (const recommendation of publishedRecommendations) {
  const authorName = authors.get(recommendation.author_id)?.canonical_name ?? recommendation.author_id
  const references = referencesByDrink.get(recommendation.drink_id) ?? []
  references.push(`${authorName} — ${recommendation.headline_es}`)
  referencesByDrink.set(recommendation.drink_id, references)
}

const drinks = catalog.drinks
  .filter((drink) => referencesByDrink.has(drink.id))
  .sort((left, right) => left.name_es.localeCompare(right.name_es, 'es'))

const document = `# Revisión de recetas de Trago y Letra

Exportación creada el ${new Date().toISOString().slice(0, 10)} desde \`data/source/catalog.json\`. Incluye ${drinks.length} bebidas usadas por recomendaciones publicadas.

## Cómo editar este archivo

1. Modifica sólo los valores bajo **Campos editables** de cada bebida. Puedes corregir ingredientes, cantidades, unidades, pasos, vaso, decoración, nota, categoría y si contiene alcohol.
2. Cada ingrediente ocupa una línea con este formato: \`- cantidad | unidad | ingrediente\`. Ejemplo: \`- 60 | ml | ginebra London dry\`.
3. Cada paso ocupa una línea numerada. Mantén entre 1 y 6 pasos, incluso en un servicio directo.
4. En **Tipo de receta**, usa \`receta de la casa\`, \`adaptada de fuente\` o \`servicio directo\`. Para un servicio directo puedes dejar ingredientes como \`(sin ingredientes; se sirve directamente)\`.
5. Escribe \`(sin decoración)\` si no corresponde decoración. No borres los comentarios \`recipe-review:start\` ni \`recipe-review:end\`, ni los títulos de los campos: permiten importar los cambios de vuelta sin ambigüedad.

La sección **Dónde aparece (consulta)** explica por qué la bebida está asociada a uno o más autores. No la edites: sólo sirve para que puedas reconocer los cócteles con nombres de fantasía o vinculados a un autor. Cuando termines, devuélveme este mismo archivo Markdown.

---

${drinks.map(renderDrink).join('\n')}`

await mkdir(resolve(root, 'exports'), { recursive: true })
await writeFile(outputPath, document, 'utf8')
console.log(`Exportadas ${drinks.length} recetas para revisión: ${outputPath}`)

function renderDrink(drink: Drink): string {
  const ingredients = drink.ingredients.length
    ? drink.ingredients.map((ingredient) => `- ${ingredient.amount} | ${ingredient.unit} | ${ingredient.name}`).join('\n')
    : '(sin ingredientes; se sirve directamente)'
  const steps = drink.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')
  const type = drink.recipe_status === 'serving_only'
    ? 'servicio directo'
    : drink.recipe_status === 'source_adapted'
      ? 'adaptada de fuente'
      : 'receta de la casa'
  const appearances = (referencesByDrink.get(drink.id) ?? []).map((reference) => `- ${reference}`).join('\n')

  return `<!-- recipe-review:start id="${drink.id}" -->
## ${drink.name_es}

### Campos editables

**Nombre de la bebida:**
${drink.name_es}

**Categoría:**
${drink.category}

**¿Contiene alcohol?:** ${drink.alcoholic ? 'sí' : 'no'}

**Ingredientes:**
${ingredients}

**Preparación:**
${steps}

**Vaso:**
${drink.glassware}

**Decoración:**
${drink.garnish ?? '(sin decoración)'}

**Nota de la receta:**
${drink.recipe_note}

**Tipo de receta:** ${type}

### Dónde aparece (consulta, no editar)

- ID técnico: \`${drink.id}\`
- Asociaciones publicadas:
${appearances}

<!-- recipe-review:end -->`
}
