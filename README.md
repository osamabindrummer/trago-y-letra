# Trago y Letra

Webapp estática en español para descubrir una bebida vinculada con un autor o una obra. La búsqueda reconoce autores, alias y títulos de libros. La interfaz no consulta modelos ni servicios externos: consume un catálogo editorial compilado y versionado.

## Requisitos

- Node.js 26.5.0 o posterior.
- npm 12.0.0 o posterior.
- Chromium de Playwright para las pruebas E2E (`npx playwright install chromium`).

## Inicio rápido

```bash
npm install
npm run dev
```

Abre la URL que Vite indique, normalmente `http://localhost:5173`.

## Comandos de verificación

```bash
npm run validate:content
npm run validate:research
npm run build:content
npm run lint
npm run test
npm run test:e2e
npm run build
```

`npm run build` valida los datos, genera el contenido público y crea el artefacto estático en `dist/`.

`npm run start` sirve ese mismo artefacto en producción local. La interfaz vive en `src/` y el catálogo canónico continúa en `data/source/catalog.json`.

## Despliegue

El sitio se publica desde este mismo repositorio en Vercel. Tras enlazar el proyecto una vez con `vercel link`, ejecuta:

```bash
vercel --prod
```

Vercel ejecuta `npm run build` y sirve el contenido estático de `dist/`. La carpeta local `.vercel/` y los artefactos de pruebas se mantienen fuera de Git y del paquete de despliegue.

Sitio público: [trago-y-letra.vercel.app](https://trago-y-letra.vercel.app).

## Flujo editorial

1. Los candidatos sin revisar van a `data/research/candidates/` y deben pasar `npm run validate:research`.
2. Se comprueba cada URL, localizador, fragmento y tipo de relación contra la fuente.
3. Sólo el equipo editor promueve evidencias y fichas a `data/source/catalog.json`.
4. `npm run validate:content` impide referencias rotas, duplicados, confianza baja publicada y fuentes insuficientes. Una alternativa sin alcohol puede registrarse, pero no es obligatoria.
5. `npm run build:content` excluye autores o recomendaciones que no estén en estado `published`.

El único fixture sintético restante está en estado `draft`: prueba que el pipeline excluye contenido no publicable. El catálogo público contiene 20 autores reales; no expone fixtures.

## Estructura

```text
data/source/catalog.json        fuente editorial canónica
data/research/candidates/       salidas sin aprobar de investigación
data/research/rejected/         descartes y contradicciones
data/schema/                    contratos JSON
scripts/                        validación y compilación
src/content/generated.ts        resultado público generado
src/                            interfaz React
public/images/                  imagen optimizada de la portada
tests/                          pruebas unitarias, de componentes y E2E
docs/GATES.md                   estado comprobable de cada fase
docs/DECISIONS.md               decisiones técnicas y editoriales
```

## Licencias, seguridad y límites

- La V1 no contiene retratos, portadas ni obras completas de terceros. La imagen `public/images/cantina-1955.webp` fue generada específicamente para el proyecto y optimizada para la portada.
- No agregues claves al repositorio. `.env` está ignorado; `OPENAI_API_KEY`, si se usa en investigación local autorizada, nunca llega al cliente.
- Las recetas se redactan de forma original y las fuentes se conservan con un enlace o una referencia comprobable.
- La ficha debe distinguir hecho documentado, presencia en la obra, maridaje editorial y abstinencia o recuperación. No se romantiza la dependencia.
- El estado actual de cobertura editorial está en `docs/GATES.md`; los candidatos de investigación se conservan separados de las fichas ya promovidas.
