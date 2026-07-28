# Encargo reutilizable: enriquecimiento de perfiles de autor

Copia desde la sección «Prompt para una sesión nueva» y úsala como mensaje
inicial en una sesión nueva de Codex abierta en este repositorio.

## Decisión operativa

El trabajo se divide en tres capas:

1. **Extracción estructurada:** Wikidata entrega candidatos para identidad,
   fechas, ciudadanía y obras notables.
2. **Verificación editorial:** Wikipedia ayuda a desambiguar y a localizar
   referencias, pero no es evidencia suficiente por sí sola para aprobar una
   afirmación biográfica.
3. **Integración:** el catálogo se modifica sólo después de revisar los
   candidatos y sus fuentes.

La primera ejecución debe ser un piloto de cinco autores. Su objetivo es probar
la rutina y entregar candidatos; no completar automáticamente los 190 perfiles.

## Campos y propiedades orientativas

| Campo del catálogo | Fuente estructurada candidata | Observación |
|---|---|---|
| `canonical_name` | etiqueta de Wikidata | Debe coincidir con la identidad correcta, no sólo con el primer resultado. |
| `aliases` | alias y redirecciones | Conservar los alias existentes y añadir sólo variantes inequívocas. |
| `country` | Wikidata `P27` | `P27` representa ciudadanía; redactar país o tradición literaria con cuidado, especialmente ante varias ciudadanías. |
| `birth_year` | Wikidata `P569` | Conservar precisión y calendario; el catálogo sólo admite un año. |
| `death_year` | Wikidata `P570` | Su ausencia no demuestra por sí sola que la persona siga viva. |
| `featured_works` | Wikidata `P800` y referencias bibliográficas | `P800` puede estar ausente o incompleto; no elegir dos obras sólo por popularidad algorítmica. |
| `bio_es` | redacción editorial propia | Sintetizar después de verificar hechos; no copiar el resumen de Wikipedia. |

Además de los valores, cada candidato debe guardar:

- QID de Wikidata;
- URL de la entidad;
- URL y título de la página de Wikipedia usada para desambiguar;
- fecha de consulta;
- valor original y valor normalizado;
- advertencias o ambigüedades;
- estado `candidate_generated`.

## Prompt para una sesión nueva

```text
Trabaja en /Users/dsj-imac/Developer/trago-y-letra.

Objetivo:

Preparar y ejecutar un piloto reproducible para enriquecer cinco perfiles del
inventario docs/AUTHOR_PROFILES_BACKLOG.md. El piloto debe obtener candidatos
estructurados para identidad, país o tradición, años de nacimiento y
fallecimiento, y hasta dos obras destacadas. No modifiques todavía
data/source/catalog.json y no cambies profile_status.

Criterios de listo:

1. Existe una rutina local reproducible que lee el inventario Markdown.
2. Se procesan sólo los primeros cinco autores ordinarios pendientes; excluye
   del piloto `anonimo` y `autor-no-identificado`.
3. Cada identidad queda desambiguada mediante QID y página concreta.
4. Cada valor conserva URL, fecha de consulta, procedencia y advertencias.
5. Los resultados quedan como candidatos, nunca como datos aprobados.
6. Existe un informe Markdown que separa:
   - candidatos completos;
   - datos ausentes;
   - identidades ambiguas;
   - valores contradictorios;
   - obras que requieren selección editorial.
7. La rutina tiene pruebas con respuestas sintéticas o grabadas y no depende de
   claves secretas.
8. Validación, pruebas pertinentes y git diff --check pasan.

Contratos obligatorios:

- Lee completamente AGENTS.md, docs/PRD.md y docs/RESEARCH_PROTOCOL.md.
- Trata data/source/catalog.json como fuente editorial canónica.
- Conserva los cambios preexistentes y no edites archivos ajenos al encargo.
- No uses memoria del modelo como evidencia.
- Wikipedia es una fuente de descubrimiento: puede desambiguar y orientar hacia
  referencias, pero no basta por sí sola para aprobar datos biográficos.
- Wikidata entrega candidatos estructurados, no decisiones editoriales.
- No inventes fechas, nacionalidades, obras, identificadores ni URLs.
- No copies biografías ni fragmentos extensos.
- No investigues recomendaciones de bebidas en este encargo.
- No publiques, no hagas commit y no hagas push.

Implementación esperada:

1. Inspecciona las convenciones existentes y elige la opción más simple entre
   TypeScript y Python. Prefiere dependencias ya disponibles.
2. Crea una rutina con:
   - selección explícita de autores por ID;
   - caché local o reanudación para no repetir solicitudes;
   - User-Agent identificable;
   - pausa o concurrencia conservadora;
   - timeouts, reintentos acotados y errores trazables;
   - salida determinista ordenada por ID.
3. Usa las interfaces públicas oficiales de Wikimedia:
   - búsqueda de páginas de MediaWiki para localizar candidatos;
   - Wikidata/Wikibase para recuperar la entidad y sus declaraciones;
   - páginas de Wikipedia sólo para desambiguación y referencias.
4. Para cada autor:
   - busca más de un resultado si existe ambigüedad;
   - confirma que la entidad representa a una persona y corresponde al autor;
   - registra `P569`, `P570`, `P27` y `P800` cuando existan;
   - no conviertas automáticamente múltiples ciudadanías en una sola
     nacionalidad;
   - no interpretes `P570` ausente como prueba concluyente de vida;
   - no fuerces dos obras si `P800` es insuficiente;
   - conserva las discrepancias entre el nombre del catálogo y Wikimedia.
5. Guarda los artefactos bajo
   data/research/author-profile-enrichment/:
   - `pilot-candidates.json`;
   - `PILOT_REVIEW.md`;
   - caché o fixtures únicamente si son necesarios y apropiados para Git.
6. No escribas en el catálogo. Termina con una recomendación explícita sobre si
   la rutina puede escalar, qué campos necesitan revisión humana y qué cambios
   convendría hacer antes del lote siguiente.

Esquema mínimo de cada candidato:

{
  "author_id": "",
  "catalog_name": "",
  "wikidata_id": null,
  "identity_status": "matched|ambiguous|not_found",
  "candidate": {
    "canonical_name": null,
    "aliases": [],
    "country_or_citizenship": [],
    "birth_year": null,
    "death_year": null,
    "featured_work_candidates": []
  },
  "sources": [
    {
      "kind": "wikidata|wikipedia|other",
      "url": "",
      "title": "",
      "accessed_at": ""
    }
  ],
  "warnings": [],
  "status": "candidate_generated"
}

Validación y cierre:

- Comprueba que los cinco IDs procesados pertenecen al inventario vigente.
- Comprueba que todas las URLs son reales y que cada QID resuelve.
- Comprueba que no se modificó data/source/catalog.json.
- Ejecuta las pruebas de la rutina, npm run validate:content y git diff --check.
- Informa archivos creados, cinco autores procesados, cobertura por campo,
  ambigüedades y siguiente paso recomendado.
- Detente al cerrar el piloto y espera aprobación antes de escalar o integrar.
```

## Escalamiento posterior

Si el piloto se aprueba, conviene trabajar en lotes de 10 a 20 autores y
mantener dos gates separados:

1. **Gate de extracción:** todos los autores del lote tienen salida, incluso si
   es `ambiguous` o `not_found`; no hay URLs o QID inventados.
2. **Gate de integración:** una persona o sesión revisora aprueba identidad,
   redacción y dos obras antes de tocar el catálogo.

La automatización puede resolver gran parte de fechas e identificadores. La
selección de obras representativas y la reseña original siguen siendo decisiones
editoriales, especialmente cuando Wikidata no registra `P800` o registra más de
dos obras.
