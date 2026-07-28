# Encargo Terra 15 — promover Literary Eats

## Configuración

- Modelo: `gpt-5.6-terra`.
- Esfuerzo: `medium`.
- Directorio: `/Users/dsj-imac/Developer/trago-y-letra`.
- No hagas búsquedas web ni investigaciones nuevas.
- No hagas commit ni push.

## Objetivo

Revisar y promover al catálogo canónico todos los resultados Luna correspondientes a Literary Eats. Los libros ya están aceptados como fuentes secundarias reputadas. No rechaces una propuesta sólo por confianza baja, perfil mínimo, obra mínima o bebida de servicio directo.

## Entradas obligatorias

- `data/research/book-convergence/three-literary-books/agent-results/literary-eats-01.json`
- `data/research/book-convergence/three-literary-books/agent-results/literary-eats-01-REVIEW.md`
- `data/research/book-convergence/three-literary-books/agent-results/literary-eats-02.json`
- `data/research/book-convergence/three-literary-books/agent-results/literary-eats-02-REVIEW.md`

Lee además completamente:

1. `AGENTS.md`
2. `docs/PRD.md`, sección 20.
3. `docs/RESEARCH_PROTOCOL.md`, sección 18.
4. `data/schema/catalog.schema.json`
5. `data/source/catalog.json`
6. Todos los artefactos de `data/research/book-convergence/three-literary-books/`.

Inspecciona el estado Git y preserva cambios preexistentes.

## Reglas de integración

- Revisa estructura, IDs, duplicados y correspondencia con los candidatos originales.
- Publica confianza baja sin elevarla y asegúrate de que la UI la muestre.
- Mantén separadas preferencia/anécdota del autor, aparición en obra y maridaje editorial.
- Permite `profile_status: minimal`, `metadata_status: minimal`, recetas de la casa y `recipe_status: serving_only`.
- Reutiliza entidades existentes; no dupliques autores, obras o bebidas por variantes léxicas.
- Cada recomendación debe conservar una evidencia con `source_id: fuente-literary-eats` y localizador.
- Retira de `catalog.discoveries` únicamente los hallazgos efectivamente promovidos.
- Actualiza `consolidated-candidates.json`, `promotion-ready.json`, `needs-review.json`, `promotion-log.json`, `manifest.json` y `REVIEW.md`.
- No elimines recomendaciones anteriores ni sobrescribas evidencia mejor.

## Verificación obligatoria

Ejecuta:

```bash
npm run validate:library
npm run validate:research
npm run validate:content
npm run build:content
npm run lint
npm run test
npm run test:e2e
npm run build
git diff --check
```

Comprueba además que los promovidos aparecen en la búsqueda principal o, si la tarea Terra 00 todavía no se ejecutó, que aparecen al menos en Hallazgos e Índice. Cierra informando agregados por tipo, provisionales restantes y rutas modificadas.
