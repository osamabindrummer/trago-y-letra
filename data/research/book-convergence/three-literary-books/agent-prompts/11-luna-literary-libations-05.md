# Encargo Luna 11 — Literary Libations, lote 05

## Configuración

- Modelo: `gpt-5.6-luna`.
- Esfuerzo: `low`.
- Directorio: `/Users/dsj-imac/Developer/trago-y-letra`.
- Tipo de tarea: normalización mecánica de una extracción ya terminada.
- No hagas búsquedas web ni investigues fuentes nuevas.
- No hagas commit ni push.

## Objetivo

Normaliza exclusivamente los 19 hallazgos indicados abajo. Los tres libros son fuentes secundarias reputadas y sus localizadores ya fueron auditados. Tu trabajo no consiste en volver a juzgar si el libro merece confianza, sino en proponer cómo convertir cada hallazgo en entidades y recomendaciones compatibles con el contrato expansivo del proyecto.

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
10. La extracción completa de `literary-libations`.

Preserva todos los cambios preexistentes y no modifiques las extracciones originales.

## Hallazgos asignados

- `hallazgo-three-books-192` — Neil Gaiman — Jack Daniel’S And Coffee
- `hallazgo-three-books-193` — Susanna Clarke — Magical Martini
- `hallazgo-three-books-194` — Patrick Rothfuss — Barleywine
- `hallazgo-three-books-195` — Brandon Sanderson — German Riesling
- `hallazgo-three-books-196` — Deborah Harkness — Champagne, Blanc De Noirs
- `hallazgo-three-books-197` — Erin Morgenstern — Champagne Cocktail
- `hallazgo-three-books-198` — William Shakespeare — Recioto Della Valpolicella
- `hallazgo-three-books-199` — Jane Austen — Rum Punch
- `hallazgo-three-books-200` — Charlotte Brontë — Tawny Port
- `hallazgo-three-books-201` — Leo Tolstoy — Sauternes
- `hallazgo-three-books-202` — D. H. Lawrence — Oregon Chardonnay
- `hallazgo-three-books-203` — Daphne De Maurier — The Jasmine
- `hallazgo-three-books-204` — Boris Pasternak — White Russian
- `hallazgo-three-books-205` — William Goldman — Chianti Classico
- `hallazgo-three-books-206` — Diana Galbaldon — Scotch, The Older The Better
- `hallazgo-three-books-207` — Helen Fielding — Chocolatini
- `hallazgo-three-books-208` — Nicholas Sparks — Provençal Rosé
- `hallazgo-three-books-209` — Nora Roberts — Peach Tea Cocktail
- `hallazgo-three-books-210` — Audrey Niffenegger — The Chicago

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

- `data/research/book-convergence/three-literary-books/agent-results/literary-libations-05.json`
- `data/research/book-convergence/three-literary-books/agent-results/literary-libations-05-REVIEW.md`

El JSON debe tener exactamente esta forma:

```json
{
  "batch_id": "literary-libations-05",
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
        "source_id": "fuente-literary-libations",
        "claim": "",
        "locator": "",
        "support_excerpt": ""
      },
      "duplicate_of": null,
      "notes": []
    }
  ],
  "counts": {
    "assigned": 19,
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
