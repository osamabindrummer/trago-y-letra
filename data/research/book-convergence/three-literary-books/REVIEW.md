# Revisión de convergencia — tres libros literarios

## Resumen ejecutivo

Las tres extracciones superaron el gate de cobertura. Se consolidaron 269 candidatos de origen en 269 grupos, conservando la procedencia diferenciada. Las promociones 15–17 incorporaron todos los grupos al catálogo canónico o como evidencia complementaria; no quedan hallazgos provisionales visibles.

## Cierre final — Terra 18

Las promociones posteriores consumieron los 242 grupos restantes exactamente una vez: 21 de *Literary Eats*, 65 de *Sip and Sensibility* y 156 de *Literary Libations*. El catálogo final tiene 219 autores, 314 recomendaciones, 378 evidencias y 0 hallazgos provisionales. El contenido generado expone 218 autores y 313 recomendaciones, porque conserva un único fixture sintético `draft` fuera del artefacto público.

`promotion-ready.json` y `needs-review.json` quedaron sin pendientes y guardan sus elementos previos como historial. Se mantienen las extracciones, los 14 resultados de normalización, los cruces y los logs; no se eliminó ninguna recomendación vigente ni se convirtió una relación de personaje en preferencia autoral.

## Cobertura de las tres fuentes

- **Literary Eats:** 229/229 páginas, 27 candidatos y 6 descartes específicos.
- **Sip and Sensibility:** 101/101 documentos del spine, 80 candidatos y 0 descartes.
- **Literary Libations:** 17/17 documentos, 9/9 capítulos y 162/162 entradas, con 162 candidatos.

## Comparación de enfoques

- *Literary Eats* aporta recetas atribuidas, apariciones y afirmaciones biográficas del compilador. Se promovieron tres candidatos que encajan en entidades y recetas canónicas existentes.
- *Sip and Sensibility* aporta apariciones literarias y recetas reconstruidas. Se promovieron once apariciones, siempre como hechos de la obra o sus personajes, no como hábitos de los autores.
- *Literary Libations* aporta principalmente maridajes editoriales. Se promovieron cuatro asociaciones y se mantuvieron rotuladas como `editorial_pairing`.

## Incorporaciones realizadas

- 3 candidatos de *Literary Eats*: 2 recomendaciones nuevas y 1 evidencia complementaria.
- 11 candidatos de *Sip and Sensibility*: 8 recomendaciones nuevas y evidencia complementaria para 3 recomendaciones vigentes.
- 4 candidatos de *Literary Libations*: 4 recomendaciones editoriales nuevas.
- Primer lote expansivo: 9 recomendaciones nuevas, 2 autores mínimos, 2 obras mínimas, 5 bebidas y 9 evidencias. Las bebidas nuevas usan recetas de la casa o servicio directo explícito.
- Tres fuentes bibliográficas diferenciadas en el catálogo y en el inventario local.

## Entidades nuevas

- Autores nuevos: 2.
- Obras nuevas: 2.
- Bebidas nuevas: 5.
- Fuentes nuevas: 3.
- Evidencias nuevas: 27.
- Recomendaciones nuevas: 23.

Eudora Welty y Lafcadio Hearn usan `profile_status: minimal`; *The Glass Key* y *Playback* usan `metadata_status: minimal`. Anchor Steam Beer usa `recipe_status: serving_only`. Estas limitaciones se muestran o conservan explícitamente y no se completaron con datos inventados.

## Evidencias complementadas

- `chandler-gimlet`: conserva su fuente primaria y agrega localizaciones de *Literary Eats* y *Sip and Sensibility*.
- `fitzgerald-gin-rickey`: conserva su fuente primaria y agrega la entrada localizada de *Sip and Sensibility*.
- `thompson-singapore-sling`: conserva la evidencia vigente y agrega la entrada localizada de *Sip and Sensibility*.

## Candidatos pendientes en la etapa intermedia

No quedó ningún grupo fuera del catálogo. Este bloque conserva el estado previo al cierre para explicar la ruta de los 242 grupos que entonces seguían en `catalog.discoveries`; la cola actual está vacía y su historial se preserva en `needs-review.json`.

## Hallazgos provisionales en la etapa intermedia

- 242 grupos visibles en la página **Hallazgos**.
- La confianza baja se muestra de forma explícita.
- Identidades, fichas de autor, obras y recetas pendientes llevan flags separados.
- Cada entrada conserva libro, localizador y fragmento breve.
- Una receta sencilla podrá añadirse como receta de la casa sin alterar la evidencia literaria.

## Contradicciones y advertencias

- La solicitud inicial de *Sip and Sensibility* mencionaba a Tim Federle; metadata y “About the Author” del archivo identifican a Tim Rayborn.
- *Literary Eats* presenta deriva entre su enum declarado y 14 candidatos `attributed_recipe`; la normalización existe sólo en esta convergencia.
- Una repetición entre compilaciones no se contó como independencia automática.
- No se resolvió ninguna contradicción por mayoría.

## Pruebas ejecutadas

Todas las validaciones cerraron correctamente:

- `npm run validate:library`
- `npm run validate:research`
- `npm run validate:content`
- `npm run build:content`
- `npm run lint`
- `npm run test`: 17 pruebas aprobadas.
- `npm run test:e2e`: 12 pruebas aprobadas en Chromium y viewport móvil.
- `npm run build`
- `git diff --check`
- QA visual a 1200 px y 390 px, sin desbordamiento horizontal.

La conciliación final confirmó cero IDs duplicados, cero recomendaciones previas perdidas, cero rechazados publicados y cero fragmentos internos de hallazgos en el bundle público.

## Estado final del árbol

No se hizo commit ni push. Las extracciones originales conservan el mismo hash agregado antes y después de la convergencia, no están rastreadas y los libros completos continúan ignorados por Git.

## Conservación de los artefactos de extracción

Conviene conservar los 45 archivos editoriales estructurados de las tres extracciones: `manifest.json`, `coverage.json`, `CHECKPOINT.md`, `REVIEW.md`, `schema.json`, `candidates.json`, `rejected.json` y los lotes. Ocupan aproximadamente 1,1 MiB y siguen siendo la evidencia necesaria para resolver identidades, obras, recetas y relaciones pendientes sin volver a leer tres libros completos. También debe conservarse la carpeta de convergencia, de aproximadamente 1 MiB, porque contiene los cruces y las decisiones que explican cómo los 269 grupos llegaron al catálogo.

Los siguientes archivos bajo `tmp/` fueron eliminados localmente como derivados regenerables y están protegidos por `.gitignore`:

- `__pycache__/`: bytecode de Python sin valor editorial.
- `rendered/*.png`: tres muestras visuales del PDF.
- `pages.json`: texto intermedio del PDF.
- `spine-text.json`: texto intermedio del EPUB.
- `extracted.json`: texto intermedio del EPUB.

Esos cachés sumaban aproximadamente 1,8 MiB. Se movieron los siete scripts de extracción, construcción y validación a `scripts/` dentro de cada extracción y se enviaron los cachés a la Papelera; los libros privados permanecen ignorados y permiten regenerarlos cuando haga falta.

## Próxima sesión

1. Completar autores nuevos sólo con fuentes autorizadas y los dos títulos exigidos por el esquema.
2. Resolver obras nuevas con sus campos canónicos completos.
3. Redactar recetas de la casa o usar `serving_only`; no copiar instrucciones expresivas de los libros.
4. Mantener `confidence: low` cuando corresponda y mostrarlo de forma explícita en la ficha publicada.

## Promoción posterior — Literary Eats

Se promovieron los 21 hallazgos normalizados en los lotes `literary-eats-01` y
`literary-eats-02`. Las recomendaciones conservan `fuente-literary-eats`, su
localizador y fragmentos breves; se reutilizaron bebidas existentes cuando
correspondía y las demás se declararon como recetas de la casa o de servicio
directo. Quedan 221 hallazgos provisionales visibles. La promoción no eliminó
recomendaciones ni evidencia previa.

## Promoción posterior — Sip and Sensibility

Se promovieron los 65 hallazgos normalizados en los cuatro lotes de *Sip and
Sensibility*. Se añadieron 64 recomendaciones: 45 `appears_in_work`, 16
`author_documented` de confianza baja y 3 `editorial_pairing` de confianza baja.
El hallazgo restante (`hallazgo-three-books-096`) coincidía semánticamente con
`faulkner-hot-toddy-documentado`, por lo que se incorporó como evidencia
complementaria sin duplicar la recomendación. Cada promoción mantiene
`fuente-sip-and-sensibility`, un localizador EPUB y el fragmento breve
correspondiente. Quedan 156 hallazgos provisionales visibles, todos de
*Literary Libations*; no se eliminaron recomendaciones ni evidencia anteriores.

## Promoción completa de Literary Libations

- Se promovieron 156 hallazgos normalizados por los ocho lotes mecánicos.
- Se conservaron tipos de vínculo, confianza y localizadores de cada propuesta.
- Los hallazgos promovidos se retiraron de catalog.discoveries; las recetas de la casa se mantienen separadas de la evidencia bibliográfica.
