# Trago y Letra

## Fuente y edición

- `data/source/catalog.json` es la única fuente editorial canónica.
- `src/content/generated.ts` se genera desde el catálogo; nunca se edita a mano.
- Se pueden añadir o corregir fuentes, autores, obras, bebidas y recomendaciones cuando la persona propietaria lo solicite. No hay fases, cuotas, gates ni modelos obligatorios.
- Examina un libro, una página o un documento sólo cuando la persona propietaria lo entregue o indique expresamente. `library/` no inicia trabajo automático.

## Incorporación de datos

- Cada recomendación conserva un autor, una bebida, un tipo de relación, una fuente/evidencia, `confidence`, `explanation_es` y fechas de revisión. Reutiliza autores, obras y bebidas existentes cuando sean equivalentes reales; conserva opciones distintas del mismo autor cuando aporten una recomendación diferente.
- La fuente autorizada por la persona propietaria basta como procedencia de trabajo. Registra su URL, referencia o localizador disponible y la fuerza real de lo que dice; no impongas una jerarquía automática de fuentes ni eleves una mención genérica a una preferencia concreta.
- `confidence` (`high`, `medium`, `low`) es metadato editorial, no un bloqueo ni una excusa visible. La persona propietaria puede fijarlo para una incorporación; si no lo hace, asígnalo de forma proporcional y nunca lo eleves por conveniencia.
- `relationship_type` clasifica el vínculo para la etiqueta de la interfaz. No transforma una aparición en una obra, un gesto de un personaje o una mención de categoría en un hábito o preferencia del autor.
- Para recetas, reutiliza una bebida normalizada si corresponde. Sólo crea una receta cuando exista una preparación entregada, una adaptación explícita o una receta de la casa decidida editorialmente; usa `serving_only` para una bebida que se sirve directamente. No inventes cócteles para completar una ficha.

## Criterio editorial

- Conserva en el catálogo la fuente y una redacción proporcional a lo que ésta respalda.
- No inventes citas, URLs, localizadores, recetas ni datos biográficos.
- `explanation_es` es una invitación breve, literaria, positiva y juguetona: usa una escena, un gesto reconocible o un maridaje concreto.
- El copy visible no explica su método ni se defiende. No menciones fuentes, evidencia, informes, fichas, niveles de confianza, límites, negaciones ni frases como “no afirma”, “sin atribuir”, “la evidencia corresponde” o equivalentes. La etiqueta comunica el tipo de relación; los datos conservan el resto.
- Cuando un criterio se aplique a más de una ficha, revisa el catálogo completo, no sólo el ejemplo que motivó el cambio.

## Biblioteca local

- Los EPUB y PDF privados van en `library/inbox/` o `library/processed/`; esas carpetas no se versionan.
- `data/research/library-sources.json` sólo registra su inventario. Depositar un libro no modifica por sí solo el catálogo.

## Verificación

Tras cambiar datos o código, ejecuta la comprobación proporcional al cambio. Para contenido: `npm run validate:content`, `npm run build:content`, `npm run test` y `npm run build`.

Mantén el README alineado con los comandos y la arquitectura vigentes.

## Puertos y servidores locales

- El lanzador usa exclusivamente el rango `127.0.0.1:28950–28999`. El desarrollo manual usa `5173` y la vista previa manual `4173`.
- Antes de añadir o cambiar un servidor, revisar los puertos documentados en los demás repositorios de `~/Developer`; reservar una dirección propia y actualizar en el mismo cambio el lanzador, la configuración, los enlaces internos y el README.
- Los lanzadores deben fallar con un mensaje claro si su puerto está ocupado. No usar una respuesta HTTP de otro proceso como prueba de que arrancó el servidor propio; verificar el proceso o una señal de identidad antes de abrir el navegador.
- No iniciar automáticamente otro puerto si el puerto esperado está ocupado, salvo que el proyecto tenga un rango exclusivo documentado y muestre la dirección elegida.
