# PRD — Trago y Letra

**Estado:** listo para implementación secuencial  
**Versión:** 1.1
**Fecha:** 2026-07-22
**Nombre de trabajo:** Trago y Letra  
**Documento complementario:** `docs/RESEARCH_PROTOCOL.md`

### Perfil de ejecución esperado

- **Agente orquestador e implementador:** `gpt-5.6-terra`.
- **Esfuerzo recomendado:** `medium` para arquitectura, integración y gates; `low` es aceptable para tareas mecánicas bien especificadas.
- **Subagentes investigadores:** `gpt-5.6-luna`.
- **Esfuerzo de investigación:** `low` por defecto; `medium` sólo ante evidencia contradictoria o difícil de clasificar.
- **Coordinación:** las fases del PRD se completan secuencialmente. Dentro de la fase editorial se permiten subagentes independientes, con un autor por encargo y resultados estructurados.

La sesión limpia debe iniciarse con Terra seleccionado por el usuario. Antes de delegar investigación, el agente comprobará que Luna esté disponible como override de subagente en ese entorno. La disponibilidad de Luna mediante API no garantiza que una superficie particular de Codex permita seleccionarlo como subagente.

## 1. Resumen ejecutivo

Trago y Letra será una webapp en español que responde una pregunta sencilla: **“¿A quién lees?”**. El usuario escribe el nombre de un autor o autora y recibe una ficha breve con una recomendación de bebida para acompañar la lectura.

La diferencia principal no será una asociación estética generada al vuelo. Cada recomendación publicada deberá indicar por qué existe la relación:

1. la bebida fue consumida o preferida por el autor, según fuentes fiables;
2. la bebida aparece en una obra o es consumida por un personaje;
3. excepcionalmente, es un maridaje editorial inspirado y está rotulado como tal.

La aplicación no dependerá de un LLM durante el uso normal. Toda ficha visible provendrá de datos versionados, revisados y compilados con anterioridad. Un modelo liviano podrá ayudar a descubrir y estructurar candidatos durante la etapa editorial, pero no tendrá autoridad para publicarlos.

## 2. Problema y oportunidad

Las listas de “tragos de escritores” suelen mezclar hechos, leyendas, publicidad turística y asociaciones inventadas. Al mismo tiempo, la literatura contiene una gran cantidad de escenas, personajes, cartas, diarios y biografías vinculadas con bebidas.

La oportunidad consiste en convertir ese material disperso en una experiencia:

- inmediata y entretenida;
- trazable hasta una fuente;
- honesta respecto del grado de certeza;
- ampliable autor por autor.

## 3. Objetivo de la primera versión

Construir una webapp estática, rápida y adaptable a dispositivos móviles que permita buscar entre **20 autores publicados**, mostrar al menos una recomendación respaldada por autor y entregar una ficha literaria y una receta comprensible.

### Resultado esperado

Al finalizar este PRD debe existir un proyecto que:

- se pueda instalar y ejecutar localmente con instrucciones reproducibles;
- se compile sin errores como sitio estático;
- permita buscar por nombre, apellido, seudónimo o variante sin tilde;
- contenga 20 autores publicables de la primera oleada;
- muestre dos obras recomendadas por autor;
- muestre al menos una bebida y la explicación de su vínculo;
- muestre el tipo de vínculo, nivel de certeza y fuentes;
- incluya una receta breve y comprensible;
- funcione sin llamadas a modelos o servicios externos en tiempo de navegación;
- incluya validaciones automáticas para impedir datos incompletos o no aprobados.

## 4. Fuera de alcance de la primera versión

- Cuentas de usuario, comentarios, puntuaciones o perfiles.
- Recomendaciones personalizadas según gustos o inventario doméstico.
- Generación de fichas en tiempo real con un LLM.
- Aplicaciones móviles nativas.
- Compras, afiliación, geolocalización o venta de alcohol.
- Traducción automática a otros idiomas.
- Catálogo exhaustivo de obras o ediciones.
- Panel administrativo web.
- Uso de fotografías o portadas sin licencia comprobada.
- Afirmar que una bebida fue “favorita” cuando la fuente sólo demuestra que fue consumida o mencionada.

## 5. Usuarios y casos de uso

### Usuario principal

Lector adulto que busca una experiencia lúdica para acompañar una lectura, organizar una reunión literaria o conocer una anécdota cultural.

### Casos de uso prioritarios

1. Buscar “Hemingway” y recibir una ficha documentada.
2. Buscar una variante como “Fitzgerald”, “Scott Fitzgerald” o un nombre sin tilde.
3. Abrir la explicación y comprender si la conexión viene de la vida, una obra o una decisión editorial.
4. Consultar ingredientes y preparación.
5. Pedir otra recomendación cuando exista más de una aprobada.
6. Abrir la fuente para revisar el respaldo.
7. Recibir sugerencias útiles cuando no haya coincidencia.

## 6. Principios de producto y contenido

1. **La procedencia es parte de la experiencia.** La fuente no se esconderá en una nota técnica.
2. **No inventar es más importante que completar.** Un autor sin evidencia queda pendiente o se sustituye antes de publicar.
3. **Distinguir hecho de interpretación.** “Bebida documentada”, “Aparece en la obra” y “Maridaje editorial” deben verse diferentes.
4. **No romantizar la dependencia.** Cuando exista adicción o recuperación, se describirá con sobriedad y sin convertirla en rasgo pintoresco.
5. **Juego directo para personas adultas.** La interfaz entrega la combinación sin avisos paternalistas ni alternativas obligatorias ajenas al resultado editorial.
6. **Diseño contenido.** El buscador domina el primer pantallazo; la respuesta se organiza en tres tarjetas y se evita todo preámbulo innecesario.
7. **La base editorial es el activo canónico.** La interfaz consume los datos; no los corrige ni los completa.

## 7. Alcance funcional

### RF-01 — Portada

La portada mostrará:

- nombre de trabajo del producto;
- pregunta “¿A quién lees?”;
- campo de búsqueda con autocompletado;
- una sola línea breve que sintetice el juego;
- acceso a un autor aleatorio.

El campo de búsqueda deberá ser el centro de atención del primer pantallazo. La portada utilizará una imagen atmosférica original de una cantina de los años cincuenta, con libros y coctelería, cuya procedencia quede registrada en el repositorio.

### RF-02 — Búsqueda

La búsqueda deberá:

- funcionar completamente en el navegador;
- ignorar mayúsculas, tildes y espacios redundantes;
- reconocer alias y seudónimos;
- tolerar errores menores mediante búsqueda difusa;
- limitar las sugerencias a autores con estado `published`;
- permitir teclado y lector de pantalla;
- mostrar un estado vacío con nombres sugeridos.

### RF-03 — Ficha de autor

Cada ficha mostrará:

- nombre canónico;
- país o tradición literaria;
- años de nacimiento y muerte cuando corresponda;
- reseña original de 50 a 90 palabras conservada en la base editorial y disponible sólo en un detalle ampliado, no en la tarjeta principal;
- dos obras recomendadas, sin sinopsis extensas;
- bebida principal;
- tipo de vínculo visible;
- explicación original de 40 a 100 palabras;
- nivel de confianza disponible en los datos y en el detalle ampliado, sin competir con la recomendación principal;
- enlace o referencia bibliográfica de respaldo;
- receta;
- botón “otra opción” si existe más de una recomendación aprobada.

En escritorio y tablet, la respuesta se mostrará en tres tarjetas contiguas: autor, recomendación con procedencia y preparación. En móvil, las mismas tarjetas se apilarán en ese orden.

### RF-04 — Tipos de vínculo

Se admitirán solamente estos valores:

- `author_documented`: consumo o preferencia del autor respaldado por una fuente.
- `appears_in_work`: bebida presente de manera identificable en una obra.
- `editorial_pairing`: asociación propuesta por el equipo y rotulada explícitamente.
- `abstinence_or_recovery`: vínculo relevante con abstinencia, recuperación o rechazo del alcohol.

`editorial_pairing` no podrá representarse visualmente como hecho biográfico.

### RF-05 — Fuentes

Cada recomendación deberá tener una o más fuentes. La interfaz mostrará una versión breve y un enlace cuando exista una URL pública. Para libros impresos se mostrará una referencia bibliográfica con localizador verificado.

### RF-06 — Recetas

Cada bebida deberá incluir:

- nombre normalizado;
- categoría;
- ingredientes en unidades métricas;
- máximo de seis pasos breves;
- tipo de vaso;
- decoración opcional;
- indicador alcohólico o sin alcohol;
- nota cuando una versión histórica difiera de la receta propuesta.

La redacción será propia. No se copiarán instrucciones expresivas de recetarios contemporáneos.

### RF-07 — Experiencia directa

- La interfaz principal no mostrará advertencias de consumo responsable ni avisos de mayoría de edad.
- No se exigirá ni se propondrá una alternativa sin alcohol junto a cada recomendación.
- Una bebida sin alcohol podrá ser la recomendación principal cuando la evidencia editorial lo justifique, por ejemplo en un vínculo de abstinencia o recuperación.
- El contenido metodológico y las fuentes permanecerán disponibles, pero no competirán visualmente con la búsqueda ni con el resultado.

### RF-08 — Página metodológica

La aplicación incluirá una página “Cómo elegimos las bebidas” con:

- definición de los tipos de vínculo;
- jerarquía de fuentes;
- tratamiento de mitos y contradicciones;
- política frente a adicción y recuperación;
- política de correcciones;
- fecha de última actualización del conjunto de datos.

### RF-09 — Página de fuentes y créditos

Se listarán las fuentes empleadas, licencias de datos, autoría de textos y créditos visuales. No se incluirá una imagen sin procedencia y licencia registradas.

## 8. Requisitos no funcionales

### Rendimiento

- El sitio debe funcionar como contenido estático.
- No debe descargar el corpus editorial completo si una representación indexada más pequeña es suficiente.
- La búsqueda debe responder perceptiblemente de inmediato para 20 autores y seguir siendo razonable con 500.
- Las imágenes, si se incorporan, deberán estar optimizadas y declarar dimensiones.

### Accesibilidad

- Navegación completa mediante teclado.
- Etiquetas asociadas a campos y botones.
- Contraste suficiente y foco visible.
- No depender sólo del color para identificar el tipo de vínculo.
- Movimiento reducido cuando el sistema lo solicite.
- Estructura semántica y mensajes de estado anunciables.

### Privacidad y seguridad

- Sin cuenta, cookies publicitarias ni seguimiento personal en V1.
- Sin claves API en el cliente ni en el repositorio.
- `OPENAI_API_KEY` sólo podrá usarse en el proceso editorial local mediante variables de entorno.
- Los enlaces externos deberán tratarse como contenido no confiable durante la investigación.
- Los textos importados se validarán contra esquema antes de entrar al build.

### Calidad editorial

- Ningún registro `draft`, `needs_review` o `rejected` entrará al artefacto público.
- Toda afirmación biográfica material tendrá una fuente.
- Las citas textuales almacenadas serán breves y tendrán localizador.
- Las reseñas y explicaciones publicadas serán redacción propia en español.

## 9. Arquitectura recomendada

### Decisión

Usar una aplicación estática con **React, TypeScript y Vite**, sin backend en V1.

### Justificación

- El conjunto inicial es pequeño y versionable.
- No existen escrituras del usuario.
- El sitio puede desplegarse en cualquier hosting estático.
- La ausencia de backend reduce costo, operación y superficie de seguridad.
- La arquitectura permite migrar a una base de datos cuando el catálogo o el flujo editorial lo justifique.

### Componentes

```text
data/source/*.json
        │
        ▼
validación por JSON Schema + reglas editoriales
        │
        ▼
scripts/build-content
        │
        ├── índice liviano de búsqueda
        └── fichas públicas compiladas
                    │
                    ▼
             aplicación React
```

### Dependencias sugeridas

- Vite, React y TypeScript.
- Validador de JSON Schema como Ajv.
- Búsqueda difusa liviana como Fuse.js, sólo si la búsqueda normalizada propia resulta insuficiente.
- Vitest y Testing Library para pruebas.
- Playwright para el flujo crítico de navegador.
- ESLint y Prettier, respetando las configuraciones vigentes al implementar.

No se deben añadir CMS, ORM, servidor o librería de estado global sin una necesidad demostrada.

## 10. Estructura de repositorio esperada

```text
/
├── README.md
├── AGENTS.md
├── package.json
├── .env.example
├── docs/
│   ├── PRD.md
│   └── RESEARCH_PROTOCOL.md
├── data/
│   ├── authors/
│   ├── drinks/
│   ├── recommendations/
│   ├── sources/
│   ├── research/
│   │   ├── candidates/
│   │   └── rejected/
│   └── schema/
├── scripts/
│   ├── validate-content.ts
│   ├── build-content.ts
│   └── research-author.ts
├── src/
│   ├── components/
│   ├── pages/
│   ├── content/
│   ├── lib/
│   └── styles/
├── public/
└── tests/
```

Los nombres definitivos podrán adaptarse a las convenciones generadas por Vite, pero la separación entre fuente editorial, candidatos de investigación y contenido público es obligatoria.

## 11. Modelo de datos canónico

### Author

Campos mínimos:

```text
id, slug, canonical_name, aliases[], country, birth_year,
death_year, bio_es, featured_works[], status, reviewed_at
```

### Work

Campos mínimos:

```text
id, author_id, original_title, display_title_es, publication_year,
language, identifiers{}, notes
```

### Drink

Campos mínimos:

```text
id, name_es, aliases[], category, alcoholic, ingredients[],
steps[], glassware, garnish, zero_proof_alternative_id?, recipe_note
```

### Recommendation

Campos mínimos:

```text
id, author_id, work_id?, drink_id, relationship_type,
headline_es, explanation_es, confidence, evidence_ids[],
editorial_status, reviewed_by, reviewed_at
```

### Evidence

Campos mínimos:

```text
id, recommendation_id, source_id, claim, support_excerpt?, locator,
evidence_kind, supports_claim, checked_at
```

### Source

Campos mínimos:

```text
id, source_type, title, author_or_publisher, publication_date?,
url?, isbn?, edition?, accessed_at, language, reliability_tier
```

### Enumeraciones y reglas

- `status`: `draft | needs_review | published | rejected`.
- `confidence`: `high | medium | low`.
- `reliability_tier`: `primary | scholarly | reputable_secondary | discovery_only`.
- Una recomendación publicable requiere al menos una evidencia de tipo `primary`, `scholarly` o `reputable_secondary`.
- `discovery_only` nunca basta para publicar.
- `confidence: low` no se publica en V1.
- Las relaciones contradictorias deben conservar evidencias a favor y en contra, y no publicarse como preferencia inequívoca.

## 12. Primera oleada editorial

La primera versión investigará secuencialmente:

1. Ernest Hemingway
2. F. Scott Fitzgerald
3. William Faulkner
4. Raymond Chandler
5. Dashiell Hammett
6. Dorothy Parker
7. Charles Bukowski
8. Jack Kerouac
9. Hunter S. Thompson
10. John Cheever
11. Raymond Carver
12. Eugene O’Neill
13. Edgar Allan Poe
14. Stephen King
15. Pablo Neruda
16. Julio Cortázar
17. Juan Carlos Onetti
18. Guillermo Cabrera Infante
19. Miguel de Cervantes
20. Ramón del Valle-Inclán

El procedimiento, límites y formato de salida están definidos en el protocolo complementario.

## 13. Flujo editorial y estados

```text
queued
  → candidate_generated
  → sources_checked
  → needs_review
  → approved
  → published

En cualquier etapa:
  → rejected
  → blocked_insufficient_evidence
```

El modelo de investigación sólo puede producir `candidate_generated`. La promoción a `approved` requiere una revisión separada de que las fuentes existen, dicen lo atribuido y sostienen el tipo de vínculo.

### Contrato entre orquestador y subagentes

- El orquestador Terra conserva las decisiones de arquitectura, integración, validación y publicación.
- Cada subagente Luna recibe exactamente un autor, sus obras iniciales, el esquema de salida y los límites del protocolo.
- El subagente devuelve candidatos y evidencia; no modifica registros canónicos con estado `published`.
- El orquestador valida la estructura, abre las fuentes relevantes y decide promoción o rechazo.
- En el piloto se procesa un autor a la vez. Después se permiten lotes de hasta tres subagentes simultáneos, siempre con autores distintos.
- El mismo autor no se delega a varios agentes salvo una segunda pasada documentada para resolver contradicciones.
- Si Luna no está disponible como subagente, el agente puede continuar hasta el Gate 3 y luego debe seguir el fallback explícito del protocolo; no debe sustituir el modelo silenciosamente.

## 14. Plan secuencial de implementación

El agente ejecutor debe completar una fase y su gate antes de comenzar la siguiente. Puede corregir decisiones técnicas menores sin pedir aprobación, pero debe detenerse ante cambios de alcance, gastos externos o problemas de licencia.

### Fase 0 — Inicialización y registro de decisiones

1. Crear repositorio o estructura de proyecto dentro del directorio autorizado.
2. Copiar este PRD y el protocolo a `docs/`.
3. Crear `AGENTS.md` con comandos, convenciones y gates del proyecto.
4. Crear un registro breve de decisiones técnicas.
5. Confirmar versiones disponibles de Node y gestor de paquetes antes de fijarlas.

**Gate 0:** estructura legible, documentación presente y ningún secreto almacenado.

### Fase 1 — Contratos de datos

1. Implementar los esquemas de Author, Work, Drink, Recommendation, Evidence y Source.
2. Crear fixtures válidos e inválidos completamente sintéticos.
3. Implementar validación estructural y reglas editoriales cruzadas.
4. Probar duplicados de `id`, referencias rotas, estados no publicables y recomendaciones sin evidencia.

**Gate 1:** los fixtures válidos pasan; cada fixture inválido falla por la razón esperada.

### Fase 2 — Prototipo de contenido

1. Crear dos autores sintéticos o claramente rotulados como fixtures, no hechos reales.
2. Crear dos bebidas y recomendaciones sintéticas.
3. Generar el índice público a partir de la fuente canónica.
4. Demostrar que los estados no aprobados no aparecen en el resultado público.

**Gate 2:** pipeline reproducible y separación efectiva entre candidatos y publicación.

### Fase 3 — Interfaz vertical mínima

1. Crear portada y búsqueda.
2. Crear ficha de autor.
3. Mostrar tipo de vínculo, confianza y fuentes.
4. Mostrar la receta.
5. Implementar estados vacío, no encontrado y error de contenido.
6. Diseñar primero para pantalla móvil y verificar escritorio.

**Gate 3:** un usuario puede completar el flujo portada → búsqueda → ficha → fuente usando sólo fixtures.

### Fase 4 — Investigación piloto de calibración

1. Comprobar la disponibilidad efectiva de `gpt-5.6-luna` para subagentes.
2. Delegar Hemingway a un subagente Luna con esfuerzo `low` y revisar su resultado.
3. Después de cerrar Hemingway, delegar Chandler a un subagente Luna con esfuerzo `low`.
4. Revisar desde el orquestador Terra cada URL, fragmento y clasificación recibidos.
5. Ajustar el esquema sólo si ambos casos revelan una carencia general.
6. Medir tokens, fuentes consultadas, candidatos rechazados y tiempo por ficha.

**Gate 4:** dos fichas reales aprobadas, sin afirmaciones huérfanas y con trazabilidad reproducible.

### Fase 5 — Primera oleada completa

1. Procesar autores en el orden de la sección 12, delegando un autor por subagente Luna.
2. Tras el piloto, permitir como máximo tres investigaciones simultáneas; integrar y aprobar cada ficha por separado.
3. Reutilizar bebidas ya normalizadas; no duplicar recetas por diferencias de nombre.
4. Registrar mitos, contradicciones y candidatos descartados.
5. Si un autor alcanza el límite de investigación sin evidencia publicable, marcarlo como bloqueado y sustituirlo por el siguiente candidato de alta disponibilidad documentado en el backlog.

**Gate 5:** 20 autores publicables; cada uno con dos obras, una recomendación respaldada, receta y fuentes verificadas.

### Fase 6 — Calidad integral

1. Ejecutar validación de contenido, pruebas unitarias y pruebas de componentes.
2. Probar búsqueda con tildes, alias, errores menores y teclado.
3. Ejecutar pruebas end-to-end del flujo principal.
4. Ejecutar build de producción.
5. Revisar visualmente móvil y escritorio.
6. Revisar accesibilidad básica y ausencia de enlaces rotos.
7. Comprobar que el bundle público no contenga candidatos, extractos internos ni variables secretas.

**Gate 6:** todas las pruebas pasan y no quedan defectos críticos o altos.

### Fase 7 — Entrega de V1

1. Completar README con instalación, desarrollo, validación, investigación y build.
2. Generar inventario de autores, bebidas y fuentes.
3. Registrar limitaciones conocidas y siguientes candidatos.
4. Preparar artefacto estático desplegable.
5. Entregar informe único con alcance real, pruebas ejecutadas y pendientes.

**Gate 7:** otra persona puede clonar, instalar, validar, ejecutar y compilar usando únicamente el README.

## 15. Pruebas mínimas obligatorias

### Datos

- IDs únicos.
- Slugs únicos y estables.
- Referencias entre archivos existentes.
- Cero recomendaciones publicadas sin evidencia suficiente.
- Cero autores no publicados en el índice.
- Toda URL tiene protocolo permitido.
- Fechas y enumeraciones válidas.

### Búsqueda

- Nombre completo.
- Sólo apellido.
- Alias.
- Sin tilde.
- Diferencia de mayúsculas.
- Error tipográfico menor.
- Sin coincidencias.

### Interfaz

- Navegación por teclado.
- Anuncio del resultado de búsqueda.
- Render de cada tipo de vínculo.
- Render de fuente con y sin URL.
- Cambio entre varias recomendaciones.
- Vista móvil y escritorio.
- Preferencia de movimiento reducido.

### Investigación

- El JSON producido por el modelo cumple el esquema.
- Una URL inexistente o inaccesible no puede aprobarse.
- Una fuente que sólo repite un mito se conserva como pista, no como prueba.
- Una contradicción reduce confianza o bloquea la afirmación.
- Un extracto no sostiene una afirmación más fuerte que su redacción.

## 16. Analítica de V1

La primera versión puede funcionar sin analítica. Si se incorpora una solución respetuosa de privacidad, sólo se medirán eventos agregados:

- búsqueda con resultado o sin resultado;
- autor consultado;
- solicitud de otra bebida;
- apertura de una fuente.

No se almacenará el texto libre de búsquedas sin una evaluación de privacidad.

## 17. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Confundir una leyenda con un hecho | Jerarquía de fuentes, evidencia contraria y gate editorial |
| Copiar textos o recetas protegidas | Extractos mínimos para verificación y redacción propia |
| Romantizar dependencia | Guía editorial, relación `abstinence_or_recovery` y lenguaje sobrio |
| Inconsistencia de nombres de bebidas | Catálogo normalizado y alias |
| Costos de investigación | `gpt-5.6-luna`, razonamiento bajo, esquema estricto y límites por autor |
| Dependencia de APIs | Ninguna API en runtime; importaciones y build locales |
| Demorar la interfaz por investigar demasiado | Vertical con fixtures antes del corpus real |
| Forzar 20 asociaciones débiles | Sustituir un autor bloqueado por otro de alta disponibilidad |
| Imágenes con licencias dudosas | Lanzar sin retratos si la licencia no está registrada |

## 18. Definición de “listo” para V1

- [ ] Aplicación estática instalable y compilable.
- [ ] 20 autores con estado `published`.
- [ ] Dos obras recomendadas por autor.
- [ ] Una o más recomendaciones por autor.
- [ ] Toda recomendación publicada posee evidencia suficiente.
- [ ] Recetas normalizadas y redactadas originalmente.
- [ ] Búsqueda por nombres y alias.
- [ ] Página metodológica y página de fuentes.
- [ ] Validación de esquemas y reglas cruzadas.
- [ ] Pruebas unitarias, de componentes y end-to-end aprobadas.
- [ ] Build de producción aprobado.
- [ ] QA visual móvil y escritorio realizado.
- [ ] README reproducible y limitaciones declaradas.
- [ ] Sin secretos ni llamadas a LLM en el cliente.

## 19. Referencias de diseño y tecnología

- Drinkify combinaba metadatos musicales con una base propia de bebidas: <https://www.bonappetit.com/trends/article/let-drinkify-suggest-the-perfect-cocktail-for-your-music>
- Open Library ofrece API para consultas puntuales y volcados para uso masivo: <https://openlibrary.org/developers/api>
- Wikidata ofrece datos CC0 y diversos mecanismos de acceso: <https://www.wikidata.org/wiki/Wikidata:Data_access/en>
- Project Gutenberg ofrece catálogo procesable y metadatos de dominio público: <https://dev.gutenberg.org/policy/robot_access.html>
- Guía vigente de modelos GPT-5.6: <https://developers.openai.com/api/docs/guides/latest-model.md>
