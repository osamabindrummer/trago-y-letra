# Encargo Luna 01 — Literary Eats, lote 01

## Configuración

- Modelo: `gpt-5.6-luna`.
- Esfuerzo: `low`.
- Directorio: `/Users/dsj-imac/Developer/trago-y-letra`.
- Tipo de tarea: normalización mecánica de una extracción ya terminada.
- No hagas búsquedas web ni investigues fuentes nuevas.
- No hagas commit ni push.

## Objetivo

Normaliza exclusivamente los 10 hallazgos indicados abajo. Los tres libros son fuentes secundarias reputadas y sus localizadores ya fueron auditados. Tu trabajo no consiste en volver a juzgar si el libro merece confianza, sino en proponer cómo convertir cada hallazgo en entidades y recomendaciones compatibles con el contrato expansivo del proyecto.

## Lecturas obligatorias

Lee completamente, antes de actuar:

1. `AGENTS.md`
2. `docs/PRD.md`, especialmente la sección 20.
3. `docs/RESEARCH_PROTOCOL.md`, especialmente la sección 18.
4. `data/schema/catalog.schema.json`
5. `data/source/catalog.json`
6. `data/research/book-convergence/three-literary-books/consolidated-candidates.json`
7. `data/research/book-convergence/three-literary-books/author-crosswalk.json`
8. `data/research/book-convergence/three-literary-books/work-crosswalk.json`
9. `data/research/book-convergence/three-literary-books/drink-crosswalk.json`
10. La extracción completa de `literary-eats`.

Preserva todos los cambios preexistentes y no modifiques las extracciones originales.

## Hallazgos asignados

- `hallazgo-three-books-002` — Bernard DeVoto — Martini à la DeVoto
- `hallazgo-three-books-003` — Lydia Maria Child — Vino de grosella
- `hallazgo-three-books-004` — Oliver Bell Bunce — Vino de diente de león
- `hallazgo-three-books-006` — Benjamin Franklin — Cerveza con esencia de abeto
- `hallazgo-three-books-007` — Benjamin Franklin — Orange Shrub
- `hallazgo-three-books-008` — Erle Stanley Gardner — Case of the Caretaker’s Cat Cocktail
- `hallazgo-three-books-011` — Thomas Jefferson — Apple Toddy
- `hallazgo-three-books-012` — Thomas Jefferson — Cerveza de caqui
- `hallazgo-three-books-013` — Ted Kooser — Vino de ruibarbo
- `hallazgo-three-books-014` — Ring Lardner — Dry Martini

No proceses ningún ID fuera de esta lista.

## Reglas editoriales vigentes

- `confidence: low` es publicable y debe conservarse cuando venga declarado.
- No eleves la confianza sólo para facilitar una promoción.
- Una relación puede ser `author_documented`, `appears_in_work`, `editorial_pairing`, `circulating_anecdote` o `abstinence_or_recovery`.
- No toda recomendación necesita una obra.
- Un maridaje editorial atribuido al libro es válido sin convertirlo en hecho biográfico.
- Un hábito o preferencia atribuido por el libro puede publicarse con redacción proporcional y confianza baja o media.
- Se permiten autores con `profile_status: minimal`.
- Se permiten obras con `metadata_status: minimal`.
- Reutiliza bebidas canónicas y alias antes de proponer una nueva.
- Una bebida simple puede recibir una receta original de la casa.
- Cerveza, vino, champaña, destilados y otras bebidas de servicio directo pueden usar `recipe_status: serving_only`.
- No copies instrucciones expresivas ni fragmentos extensos del libro.
- Conserva el localizador y un fragmento de máximo 25 palabras.
- Si la identidad es anónima, puede proponerse una entidad mínima explícita como “Anónimo”; no inventes una persona.

## Trabajo requerido

Para cada hallazgo:

1. Encuentra su grupo en `consolidated-candidates.json` y su candidato original.
2. Decide si el autor se reutiliza, se crea como perfil mínimo o queda como identidad anónima explícita.
3. Decide si la obra se reutiliza, se crea como obra mínima o no corresponde.
4. Decide si la bebida se reutiliza como entidad/alias, se crea con receta de la casa o se crea como `serving_only`.
5. Conserva el tipo de relación correcto. No conviertas personajes en hábitos del autor.
6. Propón una recomendación en español con redacción proporcional.
7. Propón una evidencia con el libro, el localizador y el fragmento breve existentes.
8. Detecta duplicados reales contra el catálogo actual.

## Salida obligatoria

Crea:

- `data/research/book-convergence/three-literary-books/agent-results/literary-eats-01.json`
- `data/research/book-convergence/three-literary-books/agent-results/literary-eats-01-REVIEW.md`

El JSON debe tener exactamente esta forma:

```json
{
  "batch_id": "literary-eats-01",
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
        "source_id": "fuente-literary-eats",
        "claim": "",
        "locator": "",
        "support_excerpt": ""
      },
      "duplicate_of": null,
      "notes": []
    }
  ],
  "counts": {
    "assigned": 10,
    "normalization_ready": 0,
    "duplicates": 0,
    "anonymous_identities": 0
  },
  "errors": []
}
```

No modifiques `data/source/catalog.json`, el esquema, la aplicación ni el contenido generado. Luna entrega propuestas; Terra publica.

## Verificación y cierre

- Comprueba que todos y sólo los IDs asignados aparecen una vez.
- Comprueba que cada evidencia conserva un localizador.
- Comprueba que ningún fragmento supera 25 palabras.
- Ejecuta `git diff --check`.
- Informa conteos, rutas creadas y cualquier identidad anónima.
