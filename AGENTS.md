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
