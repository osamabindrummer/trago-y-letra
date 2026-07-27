# Procedimiento de incorporación de libros

**Estado:** trabajo futuro habilitado  
**Alcance:** fuentes locales EPUB y PDF  
**Inventario canónico:** `data/research/library-sources.json`

## 1. Propósito y límites

La biblioteca local permite acumular gradualmente libros que puedan aportar
evidencia sobre autores, obras y bebidas. Los archivos completos son insumos
privados de investigación: no forman parte de la web, del build ni de la base
editorial publicada.

Un libro depositado no equivale a una fuente verificada. Sólo una revisión que
confirme edición, contexto y localizador puede producir evidencia candidata.
La promoción al catálogo continúa regida por `docs/RESEARCH_PROTOCOL.md`.

## 2. Ubicaciones y autoridad

| Ruta | Función | Git | Autoridad |
| --- | --- | --- | --- |
| `library/inbox/` | EPUB/PDF pendientes | Ignorada | Depósito local |
| `library/processed/` | EPUB/PDF ya revisados | Ignorada | Archivo local |
| `data/research/library-sources.json` | Metadatos y estado | Versionado | Inventario bibliográfico |
| `data/research/candidates/` | Hallazgos aún no aprobados | Versionado | Investigación intermedia |
| `data/research/rejected/` | Descartes y contradicciones | Versionado | Historial editorial |
| `data/source/catalog.json` | Contenido aprobado | Versionado | Fuente editorial canónica |

Nunca se edita `src/content/generated.ts` para incorporar una fuente; ese archivo
se regenera desde el catálogo.

## 3. Alta de una fuente

1. Confirmar que el archivo es EPUB o PDF y que su uso es legítimo.
2. Copiarlo a `library/inbox/`.
3. Renombrarlo como
   `apellido-autor--titulo-corto--edicion.ext`, usando minúsculas, guiones y sin
   información personal.
4. Añadir una entrada a `data/research/library-sources.json`.
5. Registrar, como mínimo, título, autor, formato, idioma, situación de
   derechos, estado `queued` y autores del catálogo relacionados.
6. Ejecutar `npm run validate:library`.

No se registran rutas absolutas: `local_filename` debe contener sólo el nombre
del archivo para que el inventario sea portable.

## 4. Estados

```text
queued
  → metadata_checked
  → searchable
  → extraction_completed
  → evidence_under_review
  → incorporated

En cualquier etapa:
  → blocked
```

- `queued`: archivo recibido e inventariado.
- `metadata_checked`: autoría, título, edición e identificadores revisados.
- `searchable`: el archivo permite búsqueda o ya dispone de texto extraíble.
- `extraction_completed`: búsquedas pertinentes ejecutadas y hallazgos guardados.
- `evidence_under_review`: fragmentos y localizadores están siendo comprobados.
- `incorporated`: al menos una evidencia aprobada fue promovida al catálogo, o
  la revisión terminó dejando constancia de que no había material incorporable.
- `blocked`: derechos, legibilidad, edición o identidad impiden continuar.

## 5. Lectura y extracción

La lectura se realiza por un autor y una hipótesis concreta a la vez.

1. Confirmar identidad del autor y edición del libro.
2. Definir consultas reproducibles: nombres de bebidas, categorías, lugares,
   personajes y variantes en el idioma original.
3. Buscar en el texto sin asumir que una coincidencia prueba relevancia.
4. Leer el pasaje completo y distinguir narrador, personaje y autor.
5. Registrar capítulo, página o sección estable. Si la paginación del EPUB
   cambia, preferir capítulo y una referencia textual breve.
6. Guardar sólo fragmentos breves necesarios para verificar el hallazgo.
7. Registrar evidencia contraria, ambigüedad y resultados negativos útiles.
8. Crear o actualizar el candidato correspondiente en
   `data/research/candidates/`.

No se copian capítulos completos ni se traduce o publica material extenso.

## 6. Revisión e incorporación

Antes de promover un hallazgo:

- comprobar que el archivo corresponde a la edición inventariada;
- verificar que el localizador permite reencontrar el pasaje;
- confirmar que el fragmento sostiene exactamente la afirmación;
- clasificar la fuente y el tipo de vínculo según el protocolo;
- separar lo que bebe un personaje de los hábitos del autor;
- buscar contradicciones si la asociación es conocida o controvertida;
- redactar en español con palabras propias.

Sólo después se modifica `data/source/catalog.json`. Luego se ejecuta:

```bash
npm run validate:library
npm run validate:research
npm run validate:content
npm run build:content
```

El archivo puede moverse de `library/inbox/` a `library/processed/` cuando la
revisión termina. Debe conservar el mismo `local_filename` en el inventario; la
carpeta se deduce del estado y no se guarda como ruta.

## 7. Criterio de terminado por libro

- [ ] Metadatos y situación de derechos registrados.
- [ ] Archivo legible y edición comprobada, o bloqueo documentado.
- [ ] Consultas e hipótesis de lectura registradas.
- [ ] Hallazgos con contexto y localizador, sin extractos extensos.
- [ ] Contradicciones y descartes conservados.
- [ ] Decisión editorial registrada.
- [ ] Inventario, investigación y catálogo válidos.
- [ ] Archivo local en `processed/` si la revisión concluyó.

## 8. Trabajo futuro

La automatización de extracción, cálculo de huellas, detección de archivos sin
inventariar y generación asistida de candidatos queda fuera del alcance actual.
Sólo debe implementarse con fixtures sintéticos, validaciones y un gate propio;
ninguna automatización podrá aprobar o publicar evidencia por sí sola.
