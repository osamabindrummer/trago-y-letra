# Revisión del piloto de enriquecimiento de perfiles

**Fecha de consulta:** 2026-07-28
**Estado editorial:** todos los registros son `candidate_generated`; ninguno fue aprobado, publicado ni integrado en `data/source/catalog.json`.

## Alcance reproducible

La ejecución usó únicamente los primeros cinco autores ordinarios pendientes del inventario vigente, seleccionados explícitamente por ID:

```bash
npx tsx scripts/enrich-author-profiles.ts \
  --ids agatha-christie,aldous-huxley,alexandre-dumas,alice-sebold,anita-diamant
```

La rutina consulta la búsqueda de páginas de MediaWiki y las declaraciones de Wikidata/Wikibase, con caché local reanudable en `cache/` (ignorados sus JSON por Git), pausa conservadora, `User-Agent`, timeout y reintentos acotados. Si el API de Wikidata responde con límite de tasa, usa el endpoint público de entidad de Wikibase como respaldo. Los datos completos, sus URLs y su procedencia por campo están en [`pilot-candidates.json`](pilot-candidates.json).

## Candidatos completos

Los siguientes son candidatos estructurados completos respecto de identidad, ciudadanía(s), nacimiento, fallecimiento y hasta dos P800. Siguen requiriendo validación editorial independiente: Wikidata aporta candidatos, no decisiones publicables.

| ID | QID | Página concreta | Datos candidatos | Obras P800 candidatas |
| --- | --- | --- | --- | --- |
| `agatha-christie` | [Q35064](https://www.wikidata.org/wiki/Q35064) | [Agatha Christie](https://en.wikipedia.org/wiki/Agatha_Christie) | Agatha Christie; ciudadanías: United Kingdom, United Kingdom of Great Britain and Ireland; 1890–1976 | *The Murder of Roger Ackroyd*; *The Sittaford Mystery* |
| `aldous-huxley` | [Q81447](https://www.wikidata.org/wiki/Q81447) | [Aldous Huxley](https://en.wikipedia.org/wiki/Aldous_Huxley) | Aldous Huxley; ciudadanía: United Kingdom; 1894–1963 | *Brave New World*; *Time Must Have a Stop* |
| `alexandre-dumas` | [Q38337](https://www.wikidata.org/wiki/Q38337) | [Alexandre Dumas](https://en.wikipedia.org/wiki/Alexandre_Dumas) | Alexandre Dumas; ciudadanía: France; 1802–1870 | *The Count of Monte Cristo*; *The Three Musketeers* |

## Datos ausentes

| ID | Campo ausente | Tratamiento conservado |
| --- | --- | --- |
| `alice-sebold` | `P570` | Se dejó `death_year: null`; la ausencia no prueba que esté viva. |
| `anita-diamant` | `P570`, `P800` | Se dejó `death_year: null` y una lista de obras vacía; no se forzaron dos obras. |

## Identidades ambiguas

No quedan identidades sin resolver en esta salida. `alexandre-dumas` devolvió inicialmente dos personas de nombre coincidente (`Q38337` y `Q572684`); la rutina eligió provisionalmente `Q38337` porque sus P800 incluyen *The Count of Monte Cristo*, obra ya asociada al ID canónico. Esta decisión debe confirmarse por una persona editora antes de cualquier promoción.

## Valores contradictorios

No se detectaron valores estructurados contradictorios dentro de la respuesta de Wikidata para este lote. La doble ciudadanía de Agatha Christie se conserva como dos valores, sin reducirla a una sola nacionalidad o tradición.

## Obras que requieren selección editorial

Todas las obras son candidatas de `P800`, no una selección editorial aprobada. La revisión humana debe contrastar título, representatividad y metadatos con fuentes bibliográficas adecuadas.

| ID | Situación |
| --- | --- |
| `agatha-christie` | Hay dos P800 candidatos, distintos de las obras ya presentes en el catálogo; seleccionar deliberadamente. |
| `aldous-huxley` | Hay dos P800 candidatos; contrastar si la segunda obra es representativa para la ficha. |
| `alexandre-dumas` | Los dos P800 respaldan la identidad provisional; confirmar atribución y metadatos antes de usar. |
| `alice-sebold` | Hay dos P800 candidatos; verificar metadatos bibliográficos antes de seleccionar. |
| `anita-diamant` | Wikidata no entrega P800; buscar fuentes bibliográficas identificables, sin completar por inferencia. |

## Recomendación para el siguiente lote

La rutina puede escalar técnicamente porque la selección es explícita, determinista y reanudable. Antes del siguiente lote conviene: revisar manualmente homonimias resueltas con obras del catálogo; fijar una fuente bibliográfica de mayor jerarquía para fechas, ciudadanía/tradición y obras; y definir el criterio editorial de «obra destacada». No debe escribirse ningún candidato en el catálogo ni cambiar `profile_status` hasta completar esa revisión.
