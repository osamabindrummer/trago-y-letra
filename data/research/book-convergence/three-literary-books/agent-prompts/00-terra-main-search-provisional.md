# Encargo Terra 00 — integrar hallazgos provisionales en la búsqueda principal

## Configuración

- Modelo: `gpt-5.6-terra`.
- Esfuerzo: `medium`.
- Directorio: `/Users/dsj-imac/Developer/trago-y-letra`.
- No hagas búsquedas web.
- No hagas commit ni push.

## Objetivo

Hacer que todos los autores y sugerencias de `catalog.discoveries` participen en la búsqueda principal, no sólo en Hallazgos e Índice. Esta tarea no promueve datos: crea una experiencia pública coherente para fichas canónicas y provisionales.

## Lecturas obligatorias

Lee completamente `AGENTS.md`, `docs/PRD.md`, `docs/RESEARCH_PROTOCOL.md`, los tipos, el generador de contenido, `SearchBox.tsx`, `AuthorSheet.tsx`, `DiscoveryLibrary.tsx`, `AuthorIndex.tsx`, las pruebas y el catálogo.

## Requisitos

1. Genera un índice público unificado de autores canónicos y nombres presentes en descubrimientos.
2. Deduplica por `author_id`; sin ID, usa nombre normalizado sin inferir homónimos.
3. La búsqueda debe aceptar nombre, alias, obra y bebida provisional.
4. Al seleccionar un autor sólo provisional, muestra una ficha ligera con todas sus sugerencias.
5. La ficha debe mostrar bebida, tipo de relación, confianza, explicación, libro y localizador.
6. Si falta receta, muestra “Receta pendiente”; si es `serving_only`, muestra la forma de servicio.
7. La confianza baja debe verse como texto.
8. No inventes país, fechas, biografía, obra ni receta.
9. Conserva el flujo actual de fichas completas.
10. La selección aleatoria puede incluir autores provisionales, pero nunca el fixture `draft`.

## Pruebas

Añade pruebas unitarias/componentes y E2E que cubran:

- búsqueda de un autor sólo provisional;
- búsqueda por bebida provisional;
- deduplicación de un autor canónico;
- confianza baja visible;
- teclado;
- móvil y escritorio.

Ejecuta todas las validaciones, pruebas, E2E, build y `git diff --check`. Actualiza README, GATES y DECISIONS si cambia la arquitectura pública.
