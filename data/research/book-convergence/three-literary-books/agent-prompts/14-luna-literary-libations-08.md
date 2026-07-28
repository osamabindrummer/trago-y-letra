# Encargo Luna 14 — Literary Libations, lote 08

## Configuración

- Modelo: `gpt-5.6-luna`.
- Esfuerzo: `low`.
- Directorio: `/Users/dsj-imac/Developer/trago-y-letra`.
- Tipo de tarea: normalización mecánica de una extracción ya terminada.
- No hagas búsquedas web ni investigues fuentes nuevas.
- No hagas commit ni push.

## Objetivo

Normaliza exclusivamente los 20 hallazgos indicados abajo. Los tres libros son fuentes secundarias reputadas y sus localizadores ya fueron auditados. Tu trabajo no consiste en volver a juzgar si el libro merece confianza, sino en proponer cómo convertir cada hallazgo en entidades y recomendaciones compatibles con el contrato expansivo del proyecto.

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

- `hallazgo-three-books-250` — Sarah Dessen — Iced Mocha
- `hallazgo-three-books-251` — Suzanne Collins — Blueberry Daiquiri
- `hallazgo-three-books-252` — Clement Clarke Moore — Eggnog
- `hallazgo-three-books-253` — Lewis Carroll — Iced Tea
- `hallazgo-three-books-254` — Frances Hodgson Burnett — Hibiscus Tea
- `hallazgo-three-books-255` — Munro Leaf — Kids’ Pairing: Jasmine Tea Grown-Up Pairing: Alsatian Gewürztraminer
- `hallazgo-three-books-256` — Antoine De Saint-Exupéry — Sparkling Water
- `hallazgo-three-books-257` — Margaret Wise Brown And Clement Hurd — Hot Cocoa With Marshmallows
- `hallazgo-three-books-258` — C. S. Lewis — English Black Tea, With Cream And Sugar
- `hallazgo-three-books-259` — E. B. White — Vegan Milk
- `hallazgo-three-books-260` — Norman Juster — Alphabet Soup
- `hallazgo-three-books-261` — Maurice Sendak — Kids’ Pairing: Coca-Cola Grown-Up Pairing: Whiskey And Coke
- `hallazgo-three-books-262` — Roald Dahl — Chocolate Milkshake
- `hallazgo-three-books-263` — Shel Silverstein — Apple Cider
- `hallazgo-three-books-264` — Eric Carle — Fruit Cordial
- `hallazgo-three-books-265` — Dr. Seuss — Rooibos Tea
- `hallazgo-three-books-266` — Laura Joffe Numeroff — Milk (Or Plant-Based Milk)
- `hallazgo-three-books-267` — Philip Pullman — Kid’S Pairing: Ginger Beer Grown-Up Pairing: Ginger-Bourbon Julep
- `hallazgo-three-books-268` — Lemony Snicket — Kid’S Pairing: Lemonade Grown-Up Pairing: Lemonade And Vodka
- `hallazgo-three-books-269` — Markus Zusak — Orange Fanta

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

- `data/research/book-convergence/three-literary-books/agent-results/literary-libations-08.json`
- `data/research/book-convergence/three-literary-books/agent-results/literary-libations-08-REVIEW.md`

El JSON debe tener exactamente esta forma:

```json
{
  "batch_id": "literary-libations-08",
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
    "assigned": 20,
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
