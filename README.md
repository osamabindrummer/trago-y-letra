# Trago y Letra

Webapp estática en español para descubrir una bebida vinculada con un autor o una obra. La búsqueda reconoce autores, alias, títulos y bebidas. Los 269 grupos de *Literary Eats*, *Sip and Sensibility* y *Literary Libations* ya están incorporados como fichas canónicas, con confianza y tipo de relación visibles. **Hallazgos** informa cuando no queda cola provisional e **Índice** reúne alfabéticamente todos los autores públicos y el número de recomendaciones asociadas. La interfaz no consulta modelos ni servicios externos: consume un catálogo editorial compilado y versionado.

## Requisitos

- Node.js 26.5.0 o posterior.
- npm 12.0.0 o posterior.
- Chromium de Playwright para las pruebas E2E (`npx playwright install chromium`).

## Inicio rápido

En macOS, puedes abrir `abrir.command` con doble clic. El launcher prepara las
dependencias cuando hace falta, actualiza el catálogo, levanta el servidor local
y abre la página en el navegador. Mantén su ventana de Terminal abierta mientras
usas el sitio.

También puedes iniciar el proyecto manualmente:

```bash
npm install
npm run dev
```

Abre la URL que Vite indique, normalmente `http://localhost:5173`.

## Comandos de verificación

```bash
npm run validate:content
npm run validate:library
npm run validate:research
npm run export:recommendations
npm run export:title-translations
npm run export:recipes
npx tsx scripts/enrich-author-profiles.ts --ids agatha-christie,aldous-huxley,alexandre-dumas,alice-sebold,anita-diamant
npx tsx scripts/run-pending-author-profile-enrichment.ts
npm run build:content
npm run lint
npm run test
npm run test:e2e
npm run build
```

`npm run build` valida los datos, genera el contenido público y crea el artefacto estático en `dist/`.

`npm run export:recommendations` genera `exports/recomendaciones-para-revision.md` con todas las recomendaciones publicadas, los identificadores necesarios para reimportarlas y el contexto de evidencia en modo consulta. La persona revisora sólo debe editar decisión, título y texto visible, y conservar los delimitadores técnicos de cada ficha.

`npm run export:title-translations` genera `exports/titulos-para-versiones-en-espanol.csv` con las obras que aparecen en las fichas públicas. La tercera columna conserva únicamente las versiones españolas ya registradas; las celdas vacías son las que requieren comprobación y completado editorial.

`npm run import:title-translations` revisa el CSV completado sin modificar datos. Tras revisar esa salida, `npm run import:title-translations -- --apply` actualiza `display_title_es` de cada obra pública; una celda vacía conserva el título original.

`npm run import:reviewed-recommendations` muestra qué textos cambiaron sin alterar datos. Añade `-- --apply` sólo después de revisar esa salida para incorporar los cambios de `Texto visible` en el catálogo; el importador rechaza títulos, decisiones o delimitadores modificados.

`npm run export:recipes` genera `exports/recetas-para-revision.md` con una ficha por cada bebida publicada. La ficha muestra, sólo como contexto, las asociaciones literarias que usan esa bebida; los campos editables permiten corregir ingredientes, cantidades, preparación, vaso, decoración, categoría, nota y tipo de receta. No se deben modificar los comentarios técnicos ni los títulos de campo.

`npm run import:reviewed-recipes` revisa el Markdown devuelto sin escribir cambios y detalla las recetas modificadas. Tras revisar esa salida, `npm run import:reviewed-recipes -- --apply` actualiza únicamente los datos de receta en `data/source/catalog.json`; valida el catálogo completo antes de escribirlo.

`npm run start` sirve ese mismo artefacto en producción local. La interfaz vive en `src/` y el catálogo canónico continúa en `data/source/catalog.json`.

## Despliegue

El sitio se publica desde este mismo repositorio en Vercel. Tras enlazar el proyecto una vez con `vercel link`, ejecuta:

```bash
vercel --prod
```

Vercel ejecuta `npm run build` y sirve el contenido estático de `dist/`. La carpeta local `.vercel/` y los artefactos de pruebas se mantienen fuera de Git y del paquete de despliegue.

Sitio público: [trago-y-letra.vercel.app](https://trago-y-letra.vercel.app).

## Flujo editorial

1. Los EPUB/PDF locales se dejan en `library/inbox/`, se inventarían en `data/research/library-sources.json` y deben pasar `npm run validate:library`.
2. Los candidatos sin revisar van a `data/research/candidates/` y deben pasar `npm run validate:research`.
3. Se comprueba cada fuente, localizador, fragmento y tipo de relación.
4. Sólo el equipo editor promueve evidencias y fichas a `data/source/catalog.json`.
5. `npm run validate:content` impide referencias rotas y duplicados. La confianza baja es publicable cuando permanece declarada en los datos y visible en la interfaz.
6. `npm run build:content` excluye autores o recomendaciones que no estén en estado `published` y publica la colección `discoveries` únicamente con estado `published_provisional`.

El procedimiento para depositar, leer y procesar libros está en
[`docs/SOURCE_INGESTION.md`](docs/SOURCE_INGESTION.md). Los archivos completos
son privados, están ignorados por Git y nunca se incorporan automáticamente al
catálogo.

El único fixture sintético restante está en estado `draft`: prueba que el pipeline excluye contenido no publicable. El catálogo almacena 219 autores, 314 recomendaciones y 378 evidencias, de las cuales 218 autores y 313 recomendaciones están publicadas en el artefacto público; no quedan hallazgos provisionales. Los perfiles mínimos se declaran explícitamente en la interfaz.

## Estructura

```text
data/source/catalog.json        fuente editorial canónica
data/research/library-sources.json inventario de libros locales
data/research/candidates/       salidas sin aprobar de investigación
data/research/rejected/         descartes y contradicciones
data/research/book-convergence/ convergencias y planes de promoción
data/schema/                    contratos JSON
scripts/                        validación y compilación
library/                        depósito privado local de EPUB/PDF
src/content/generated.ts        resultado público generado
src/                            interfaz React
public/images/                  imagen optimizada de la portada
tests/                          pruebas unitarias, de componentes y E2E
docs/GATES.md                   estado comprobable de cada fase
docs/DECISIONS.md               decisiones técnicas y editoriales
```

### Piloto de perfiles de autor

`scripts/enrich-author-profiles.ts` lee `docs/AUTHOR_PROFILES_BACKLOG.md` y exige una lista explícita de IDs. Usa la búsqueda pública de MediaWiki y Wikidata/Wikibase para generar únicamente candidatos bajo `data/research/author-profile-enrichment/`; no modifica el catálogo ni cambia `profile_status`. La caché reanudable queda en `cache/` y sus respuestas no se versionan. El informe de revisión separa faltantes, ambigüedades, contradicciones y obras pendientes de selección.

`scripts/run-pending-author-profile-enrichment.ts` deriva el lote completo desde las casillas pendientes del inventario, excluye las categorías especiales y los IDs que ya tengan candidatos generados en esa carpeta, y conserva el resultado separado en `pending-profiles-candidates.json`.

## Licencias, seguridad y límites

- La V1 no contiene retratos, portadas ni obras completas de terceros. La imagen `public/images/cantina-1955.webp` fue generada específicamente para el proyecto y optimizada para la portada.
- Los libros locales de `library/inbox/` y `library/processed/` están excluidos de Git. Sólo se versionan sus metadatos y resultados editoriales permitidos.
- No agregues claves al repositorio. `.env` está ignorado; `OPENAI_API_KEY`, si se usa en investigación local autorizada, nunca llega al cliente.
- Las recetas se redactan de forma original y las fuentes se conservan con un enlace o una referencia comprobable.
- La ficha debe distinguir hecho documentado, presencia en la obra, maridaje editorial y abstinencia o recuperación. No se romantiza la dependencia.
- Un hallazgo provisional puede omitir IDs de autor, obra o bebida, pero siempre conserva nombres, procedencia, localizador, confianza y flags visibles de lo pendiente.
- Las recetas sencillas pueden redactarse como recetas de la casa; nunca se presentan como reconstrucciones históricas sin respaldo.
- Una bebida de servicio directo puede omitir ingredientes mediante `recipe_status: serving_only`.
- Los perfiles y obras mínimos permiten publicar una relación localizada sin inventar datos biográficos o bibliográficos ausentes.
- El estado actual de cobertura editorial está en `docs/GATES.md`; los candidatos de investigación se conservan separados de las fichas ya promovidas.
