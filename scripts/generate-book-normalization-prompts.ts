import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Catalog, Discovery } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const convergenceRoot = resolve(root, 'data/research/book-convergence/three-literary-books')
const promptsRoot = resolve(convergenceRoot, 'agent-prompts')
const resultsRoot = 'data/research/book-convergence/three-literary-books/agent-results'
const catalog = JSON.parse(await readFile(resolve(root, 'data/source/catalog.json'), 'utf8')) as Catalog

const sourcePlans = [
  {
    sourceId: 'fuente-literary-eats',
    slug: 'literary-eats',
    title: 'Literary Eats',
    batchCount: 2,
  },
  {
    sourceId: 'fuente-sip-and-sensibility',
    slug: 'sip-and-sensibility',
    title: 'Sip and Sensibility',
    batchCount: 4,
  },
  {
    sourceId: 'fuente-literary-libations',
    slug: 'literary-libations',
    title: 'Literary Libations',
    batchCount: 8,
  },
]

function chunkEvenly<T>(items: T[], count: number): T[][] {
  return Array.from({ length: count }, (_, index) => {
    const start = Math.floor((items.length * index) / count)
    const end = Math.floor((items.length * (index + 1)) / count)
    return items.slice(start, end)
  })
}

function idsBlock(discoveries: Discovery[]): string {
  return discoveries.map((item) => `- \`${item.id}\` — ${item.author_name} — ${item.drink_name}`).join('\n')
}

function lunaPrompt(
  sequence: number,
  source: (typeof sourcePlans)[number],
  batchIndex: number,
  discoveries: Discovery[],
): { filename: string; resultStem: string; content: string } {
  const sequenceLabel = String(sequence).padStart(2, '0')
  const batchLabel = String(batchIndex + 1).padStart(2, '0')
  const resultStem = `${source.slug}-${batchLabel}`
  const filename = `${sequenceLabel}-luna-${resultStem}.md`
  return {
    filename,
    resultStem,
    content: `# Encargo Luna ${sequenceLabel} — ${source.title}, lote ${batchLabel}

## Configuración

- Modelo: \`gpt-5.6-luna\`.
- Esfuerzo: \`low\`.
- Directorio: \`/Users/dsj-imac/Developer/trago-y-letra\`.
- Tipo de tarea: normalización mecánica de una extracción ya terminada.
- No hagas búsquedas web ni investigues fuentes nuevas.
- No hagas commit ni push.

## Objetivo

Normaliza exclusivamente los ${discoveries.length} hallazgos indicados abajo. Los tres libros son fuentes secundarias reputadas y sus localizadores ya fueron auditados. Tu trabajo no consiste en volver a juzgar si el libro merece confianza, sino en proponer cómo convertir cada hallazgo en entidades y recomendaciones compatibles con el contrato expansivo del proyecto.

## Lecturas obligatorias

Lee completamente, antes de actuar:

1. \`AGENTS.md\`
2. \`docs/PRD.md\`, especialmente la sección 20.
3. \`docs/RESEARCH_PROTOCOL.md\`, especialmente la sección 18.
4. \`data/schema/catalog.schema.json\`
5. \`data/source/catalog.json\`
6. \`data/research/book-convergence/three-literary-books/consolidated-candidates.json\`
7. \`data/research/book-convergence/three-literary-books/author-crosswalk.json\`
8. \`data/research/book-convergence/three-literary-books/work-crosswalk.json\`
9. \`data/research/book-convergence/three-literary-books/drink-crosswalk.json\`
10. La extracción completa de \`${source.slug}\`.

Preserva todos los cambios preexistentes y no modifiques las extracciones originales.

## Hallazgos asignados

${idsBlock(discoveries)}

No proceses ningún ID fuera de esta lista.

## Reglas editoriales vigentes

- \`confidence: low\` es publicable y debe conservarse cuando venga declarado.
- No eleves la confianza sólo para facilitar una promoción.
- Una relación puede ser \`author_documented\`, \`appears_in_work\`, \`editorial_pairing\`, \`circulating_anecdote\` o \`abstinence_or_recovery\`.
- No toda recomendación necesita una obra.
- Un maridaje editorial atribuido al libro es válido sin convertirlo en hecho biográfico.
- Un hábito o preferencia atribuido por el libro puede publicarse con redacción proporcional y confianza baja o media.
- Se permiten autores con \`profile_status: minimal\`.
- Se permiten obras con \`metadata_status: minimal\`.
- Reutiliza bebidas canónicas y alias antes de proponer una nueva.
- Una bebida simple puede recibir una receta original de la casa.
- Cerveza, vino, champaña, destilados y otras bebidas de servicio directo pueden usar \`recipe_status: serving_only\`.
- No copies instrucciones expresivas ni fragmentos extensos del libro.
- Conserva el localizador y un fragmento de máximo 25 palabras.
- Si la identidad es anónima, puede proponerse una entidad mínima explícita como “Anónimo”; no inventes una persona.

## Trabajo requerido

Para cada hallazgo:

1. Encuentra su grupo en \`consolidated-candidates.json\` y su candidato original.
2. Decide si el autor se reutiliza, se crea como perfil mínimo o queda como identidad anónima explícita.
3. Decide si la obra se reutiliza, se crea como obra mínima o no corresponde.
4. Decide si la bebida se reutiliza como entidad/alias, se crea con receta de la casa o se crea como \`serving_only\`.
5. Conserva el tipo de relación correcto. No conviertas personajes en hábitos del autor.
6. Propón una recomendación en español con redacción proporcional.
7. Propón una evidencia con el libro, el localizador y el fragmento breve existentes.
8. Detecta duplicados reales contra el catálogo actual.

## Salida obligatoria

Crea:

- \`${resultsRoot}/${resultStem}.json\`
- \`${resultsRoot}/${resultStem}-REVIEW.md\`

El JSON debe tener exactamente esta forma:

\`\`\`json
{
  "batch_id": "${resultStem}",
  "model": "gpt-5.6-luna",
  "status": "normalization_completed",
  "assigned_discovery_ids": [],
  "items": [
    {
      "discovery_id": "",
      "source_candidate_ids": [],
      "decision": "create_recommendation",
      "author": {
        "action": "reuse|create_minimal|anonymous_minimal",
        "canonical_id": "",
        "canonical_name": ""
      },
      "work": {
        "action": "reuse|create_minimal|not_applicable",
        "canonical_id": null,
        "title": null
      },
      "drink": {
        "action": "reuse|create_house|create_serving_only",
        "canonical_id": "",
        "name_es": "",
        "aliases": [],
        "recipe_plan": ""
      },
      "recommendation": {
        "relationship_type": "editorial_pairing",
        "confidence": "low",
        "headline_es": "",
        "explanation_es": ""
      },
      "evidence": {
        "source_id": "${source.sourceId}",
        "claim": "",
        "locator": "",
        "support_excerpt": ""
      },
      "duplicate_of": null,
      "notes": []
    }
  ],
  "counts": {
    "assigned": ${discoveries.length},
    "normalization_ready": 0,
    "duplicates": 0,
    "anonymous_identities": 0
  },
  "errors": []
}
\`\`\`

No modifiques \`data/source/catalog.json\`, el esquema, la aplicación ni el contenido generado. Luna entrega propuestas; Terra publica.

## Verificación y cierre

- Comprueba que todos y sólo los IDs asignados aparecen una vez.
- Comprueba que cada evidencia conserva un localizador.
- Comprueba que ningún fragmento supera 25 palabras.
- Ejecuta \`git diff --check\`.
- Informa conteos, rutas creadas y cualquier identidad anónima.
`,
  }
}

function terraPromotionPrompt(
  sequence: number,
  source: (typeof sourcePlans)[number],
  resultStems: string[],
): { filename: string; content: string } {
  const sequenceLabel = String(sequence).padStart(2, '0')
  const filename = `${sequenceLabel}-terra-promote-${source.slug}.md`
  const resultFiles = resultStems.map((stem) => `- \`${resultsRoot}/${stem}.json\`\n- \`${resultsRoot}/${stem}-REVIEW.md\``).join('\n')
  return {
    filename,
    content: `# Encargo Terra ${sequenceLabel} — promover ${source.title}

## Configuración

- Modelo: \`gpt-5.6-terra\`.
- Esfuerzo: \`medium\`.
- Directorio: \`/Users/dsj-imac/Developer/trago-y-letra\`.
- No hagas búsquedas web ni investigaciones nuevas.
- No hagas commit ni push.

## Objetivo

Revisar y promover al catálogo canónico todos los resultados Luna correspondientes a ${source.title}. Los libros ya están aceptados como fuentes secundarias reputadas. No rechaces una propuesta sólo por confianza baja, perfil mínimo, obra mínima o bebida de servicio directo.

## Entradas obligatorias

${resultFiles}

Lee además completamente:

1. \`AGENTS.md\`
2. \`docs/PRD.md\`, sección 20.
3. \`docs/RESEARCH_PROTOCOL.md\`, sección 18.
4. \`data/schema/catalog.schema.json\`
5. \`data/source/catalog.json\`
6. Todos los artefactos de \`data/research/book-convergence/three-literary-books/\`.

Inspecciona el estado Git y preserva cambios preexistentes.

## Reglas de integración

- Revisa estructura, IDs, duplicados y correspondencia con los candidatos originales.
- Publica confianza baja sin elevarla y asegúrate de que la UI la muestre.
- Mantén separadas preferencia/anécdota del autor, aparición en obra y maridaje editorial.
- Permite \`profile_status: minimal\`, \`metadata_status: minimal\`, recetas de la casa y \`recipe_status: serving_only\`.
- Reutiliza entidades existentes; no dupliques autores, obras o bebidas por variantes léxicas.
- Cada recomendación debe conservar una evidencia con \`source_id: ${source.sourceId}\` y localizador.
- Retira de \`catalog.discoveries\` únicamente los hallazgos efectivamente promovidos.
- Actualiza \`consolidated-candidates.json\`, \`promotion-ready.json\`, \`needs-review.json\`, \`promotion-log.json\`, \`manifest.json\` y \`REVIEW.md\`.
- No elimines recomendaciones anteriores ni sobrescribas evidencia mejor.

## Verificación obligatoria

Ejecuta:

\`\`\`bash
npm run validate:library
npm run validate:research
npm run validate:content
npm run build:content
npm run lint
npm run test
npm run test:e2e
npm run build
git diff --check
\`\`\`

Comprueba además que los promovidos aparecen en la búsqueda principal o, si la tarea Terra 00 todavía no se ejecutó, que aparecen al menos en Hallazgos e Índice. Cierra informando agregados por tipo, provisionales restantes y rutas modificadas.
`,
  }
}

const searchPrompt = `# Encargo Terra 00 — integrar hallazgos provisionales en la búsqueda principal

## Configuración

- Modelo: \`gpt-5.6-terra\`.
- Esfuerzo: \`medium\`.
- Directorio: \`/Users/dsj-imac/Developer/trago-y-letra\`.
- No hagas búsquedas web.
- No hagas commit ni push.

## Objetivo

Hacer que todos los autores y sugerencias de \`catalog.discoveries\` participen en la búsqueda principal, no sólo en Hallazgos e Índice. Esta tarea no promueve datos: crea una experiencia pública coherente para fichas canónicas y provisionales.

## Lecturas obligatorias

Lee completamente \`AGENTS.md\`, \`docs/PRD.md\`, \`docs/RESEARCH_PROTOCOL.md\`, los tipos, el generador de contenido, \`SearchBox.tsx\`, \`AuthorSheet.tsx\`, \`DiscoveryLibrary.tsx\`, \`AuthorIndex.tsx\`, las pruebas y el catálogo.

## Requisitos

1. Genera un índice público unificado de autores canónicos y nombres presentes en descubrimientos.
2. Deduplica por \`author_id\`; sin ID, usa nombre normalizado sin inferir homónimos.
3. La búsqueda debe aceptar nombre, alias, obra y bebida provisional.
4. Al seleccionar un autor sólo provisional, muestra una ficha ligera con todas sus sugerencias.
5. La ficha debe mostrar bebida, tipo de relación, confianza, explicación, libro y localizador.
6. Si falta receta, muestra “Receta pendiente”; si es \`serving_only\`, muestra la forma de servicio.
7. La confianza baja debe verse como texto.
8. No inventes país, fechas, biografía, obra ni receta.
9. Conserva el flujo actual de fichas completas.
10. La selección aleatoria puede incluir autores provisionales, pero nunca el fixture \`draft\`.

## Pruebas

Añade pruebas unitarias/componentes y E2E que cubran:

- búsqueda de un autor sólo provisional;
- búsqueda por bebida provisional;
- deduplicación de un autor canónico;
- confianza baja visible;
- teclado;
- móvil y escritorio.

Ejecuta todas las validaciones, pruebas, E2E, build y \`git diff --check\`. Actualiza README, GATES y DECISIONS si cambia la arquitectura pública.
`

const finalPrompt = `# Encargo Terra 18 — cierre integral de los 269 grupos

## Configuración

- Modelo: \`gpt-5.6-terra\`.
- Esfuerzo: \`medium\`.
- Directorio: \`/Users/dsj-imac/Developer/trago-y-letra\`.
- No hagas búsquedas web salvo autorización nueva y explícita.
- No hagas commit ni push.

## Objetivo

Cerrar la expansión de los tres libros después de ejecutar los encargos Luna 01–14 y Terra 15–17. El resultado esperado es que los 269 grupos estén incorporados como recomendaciones canónicas o como perfiles ligeros plenamente buscables, sin pérdida de procedencia.

## Trabajo

1. Lee completamente los contratos vigentes y todos los artefactos de convergencia.
2. Confirma que cada resultado Luna fue consumido exactamente una vez.
3. Resuelve duplicados por ID, alias y cruces explícitos; no por mera semejanza.
4. Mantén separados los fundamentos biográfico, textual, anecdótico y editorial.
5. Admite confianza baja visible.
6. Admite autores/obras mínimos, recetas de la casa y bebidas \`serving_only\`.
7. Para “Anónimo” o autor no identificado, crea una identidad editorial mínima explícita en lugar de inventar una persona.
8. Asegura que búsqueda, Hallazgos e Índice cubran todo el catálogo.
9. Actualiza manifiesto, cruces, promoción, pendientes, log, revisión, README, PRD, protocolo, decisiones y gates.
10. No elimines registros vigentes ni las extracciones estructuradas.

## Criterio de terminado

- Los 269 grupos tienen destino público trazable.
- Cero IDs duplicados.
- Cero recomendaciones anteriores perdidas.
- Cero relación de personaje convertida en preferencia del autor.
- Todas las confianzas bajas se muestran.
- Todos los autores aparecen en búsqueda o índice.
- Conteos del catálogo y contenido generado coinciden.
- Inventario, investigación, contenido, lint, pruebas, E2E, build y \`git diff --check\` pasan.

Entrega conteos antes/después, provisionales restantes, entidades creadas, validaciones y rutas. No hagas commit ni push.
`

await mkdir(promptsRoot, { recursive: true })
await writeFile(resolve(promptsRoot, '00-terra-main-search-provisional.md'), searchPrompt, 'utf8')

let sequence = 1
const promotionPlans: Array<{ source: (typeof sourcePlans)[number]; resultStems: string[] }> = []
for (const source of sourcePlans) {
  const discoveries = catalog.discoveries
    .filter((item) => item.source_refs.some((reference) => reference.source_id === source.sourceId))
    .sort((left, right) => left.id.localeCompare(right.id))
  const batches = chunkEvenly(discoveries, source.batchCount)
  const resultStems: string[] = []
  for (const [batchIndex, batch] of batches.entries()) {
    const prompt = lunaPrompt(sequence, source, batchIndex, batch)
    resultStems.push(prompt.resultStem)
    await writeFile(resolve(promptsRoot, prompt.filename), prompt.content, 'utf8')
    sequence += 1
  }
  promotionPlans.push({ source, resultStems })
}

for (const plan of promotionPlans) {
  const prompt = terraPromotionPrompt(sequence, plan.source, plan.resultStems)
  await writeFile(resolve(promptsRoot, prompt.filename), prompt.content, 'utf8')
  sequence += 1
}
await writeFile(resolve(promptsRoot, '18-terra-final-consolidation.md'), finalPrompt, 'utf8')

const readme = `# Paquete de prompts — normalización de los tres libros

Este paquete procesa los 242 hallazgos que permanecen después del primer lote expansivo.

## Orden

1. \`00-terra-main-search-provisional.md\` puede ejecutarse de inmediato.
2. Ejecuta Luna 01–14. Son independientes y no se solapan; usa como máximo tres simultáneos.
3. Ejecuta Terra 15 después de Luna 01–02.
4. Ejecuta Terra 16 después de Luna 03–06.
5. Ejecuta Terra 17 después de Luna 07–14.
6. Ejecuta Terra 18 al final.

Los agentes Luna sólo crean resultados de normalización. Los agentes Terra son los únicos autorizados para modificar el catálogo canónico y publicar.

## Distribución

- Literary Eats: ${catalog.discoveries.filter((item) => item.source_refs.some((reference) => reference.source_id === 'fuente-literary-eats')).length} hallazgos en 2 lotes Luna.
- Sip and Sensibility: ${catalog.discoveries.filter((item) => item.source_refs.some((reference) => reference.source_id === 'fuente-sip-and-sensibility')).length} hallazgos en 4 lotes Luna.
- Literary Libations: ${catalog.discoveries.filter((item) => item.source_refs.some((reference) => reference.source_id === 'fuente-literary-libations')).length} hallazgos en 8 lotes Luna.
- Total: ${catalog.discoveries.length}.

No ejecutes dos prompts Terra de promoción al mismo tiempo porque todos modifican \`data/source/catalog.json\`.
`
await writeFile(resolve(promptsRoot, 'README.md'), readme, 'utf8')

console.log(`Prompts generados en ${promptsRoot}: ${sequence + 1} archivos de tarea y README.`)
