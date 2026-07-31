# Trago y Letra

Webapp estática en español para encontrar bebidas vinculadas con autores y obras. La interfaz no consulta modelos ni servicios externos: consume un catálogo editorial versionado y compilado durante el build.

## Inicio rápido

Requiere Node.js y npm. En macOS, abre `abrir.command` con doble clic; prepara dependencias, genera el contenido y abre el sitio local.

También puede iniciarse desde Terminal:

```bash
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Datos y flujo editorial

- `data/source/catalog.json` es la fuente canónica de autores, obras, bebidas, recomendaciones, evidencias y fuentes.
- Edita el catálogo para añadir o corregir contenido; no edites `src/content/generated.ts`.
- `npm run build:content` crea el contenido público generado a partir del catálogo.
- Los libros privados pueden mantenerse en `library/inbox/` o `library/processed/`, fuera de Git. Su inventario opcional vive en `data/research/library-sources.json`.

La decisión sobre qué fuentes incorporar pertenece a la persona propietaria del proyecto. Cada afirmación debe conservar una procedencia suficiente y una redacción que no exceda lo que esa fuente permite.

## Comandos

```bash
npm run validate:content
npm run validate:library
npm run build:content
npm run lint
npm run test
npm run build
npm run test:e2e
```

`npm run build` valida el catálogo, genera `src/content/generated.ts` y crea el sitio estático en `dist/`.

Para una revisión manual del copy o de recetas, los comandos `export:*` generan archivos temporales en `exports/`. Los comandos `import:*` permiten previsualizar e incorporar cambios acotados al catálogo.

## Despliegue

El proyecto se despliega como sitio estático en Vercel. Después de enlazar el proyecto, ejecuta:

```bash
vercel --prod
```

Vercel ejecuta `npm run build` y publica `dist/`.

## Estructura

```text
data/source/catalog.json  fuente editorial canónica
data/schema/              contratos de datos
scripts/                  validación, compilación e importación editorial
src/                      interfaz React
public/images/            recursos visuales propios
library/                  biblioteca local privada e ignorada
tests/                    pruebas unitarias, de componentes y E2E
```
