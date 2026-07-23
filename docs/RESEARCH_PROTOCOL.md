# Protocolo de investigación editorial de autores

**Proyecto:** Trago y Letra  
**Versión:** 1.0  
**Fecha:** 2026-07-20  
**Uso:** investigación delegada de la primera oleada de 20 autores

## 1. Propósito

Este protocolo permite descubrir, comprobar y estructurar relaciones entre autores, obras y bebidas sin depender de generación en tiempo real y sin convertir conocimiento del modelo en evidencia.

El proceso usa uno o varios subagentes livianos para buscar y organizar **candidatos**. La aceptación editorial ocurre después en el agente orquestador y exige comprobar las fuentes. El resultado canónico es el conjunto de archivos versionados del proyecto, no la conversación con el modelo.

## 2. Configuración de modelos

### Perfil del orquestador

```yaml
orchestrator_model: gpt-5.6-terra
reasoning_effort_default: medium
reasoning_effort_allowed_for_mechanical_steps: low
```

El orquestador implementa el producto, mantiene el estado del plan, asigna autores, valida fuentes e integra únicamente hallazgos aprobados.

### Perfil recomendado de los subagentes investigadores

```yaml
research_model: gpt-5.6-luna
reasoning_effort: low
reasoning_effort_escalation: medium
text_verbosity: low
max_candidates_per_author: 6
max_sources_per_candidate: 3
max_search_rounds_per_author: 4
authors_per_subagent: 1
max_concurrent_research_subagents: 3
```

La documentación oficial describe `gpt-5.6-luna` como opción eficiente para cargas de alto volumen. Antes de delegar, el orquestador debe comprobar por separado que la organización tenga acceso al modelo y que la superficie de agentes permita usarlo como override de subagente. Si no está disponible, no debe sustituirlo silenciosamente.

Orden de fallback:

1. usar subagentes Luna cuando la superficie lo permita;
2. si Luna está disponible mediante Responses API pero no como override de subagente, ejecutar el mismo contrato mediante `scripts/research-author` sólo si existe `OPENAI_API_KEY` y el usuario autorizó ese gasto;
3. si ninguna vía está disponible, continuar la implementación hasta el Gate 3, registrar el bloqueo y pedir una decisión antes de investigar con Terra u otro modelo.

El esfuerzo `medium` de Luna se permite únicamente para una segunda pasada justificada: contradicción material, fuente difícil de interpretar o primer resultado estructuralmente insuficiente.

### Perfil de revisión excepcional del orquestador

```yaml
review_model: gpt-5.6-terra
reasoning_effort: medium
use_only_when:
  - existen fuentes contradictorias
  - el fragmento no permite clasificar el vínculo con seguridad
  - hay que distinguir mito, inferencia y hecho
```

La revisión pertenece al orquestador Terra. El modelo nunca reemplaza la lectura de la fuente.

### Restricciones de costo y tokens

- Un autor por subagente y por ejecución.
- Máximo tres subagentes de investigación activos después del piloto; uno durante el piloto.
- No reenviar las fichas completas de autores anteriores.
- Reutilizar un prompt de sistema estable y breve.
- Solicitar JSON estricto, sin ensayo explicativo.
- Limitar candidatos y fuentes según la configuración.
- No pedir biografías extensas al modelo.
- Detener búsquedas que repitan las mismas fuentes o afirmaciones.
- No usar un modelo superior sólo para mejorar estilo; la redacción final se hace después de aprobar hechos.
- Registrar tokens, llamadas, búsquedas y resultado por autor cuando la API entregue esos datos.

## 3. Autoridad y límites

El modelo de descubrimiento puede:

- proponer términos de búsqueda;
- localizar fuentes candidatas;
- extraer fragmentos breves;
- proponer una clasificación del vínculo;
- detectar posibles contradicciones;
- estructurar resultados según esquema.

No puede:

- declarar una ficha aprobada;
- usar su memoria como fuente;
- inventar páginas, capítulos, citas, URLs o ISBN;
- inferir “favorito” desde una sola mención;
- convertir consumo de un personaje en hábito del autor;
- presentar un artículo que repite una leyenda como fuente primaria;
- llenar campos ausentes con datos plausibles;
- recomendar una receta como históricamente exacta sin respaldo;
- diagnosticar retrospectivamente una dependencia sin una fuente fiable.

## 4. Primera oleada y foco inicial

| Orden | Autor | Obras o archivos iniciales | Hipótesis de búsqueda, no afirmación |
|---:|---|---|---|
| 1 | Ernest Hemingway | *The Sun Also Rises*, *A Moveable Feast*, *Islands in the Stream* | vida, daiquiri, vermut, bebidas descritas |
| 2 | F. Scott Fitzgerald | *The Great Gatsby*, *Tender Is the Night* | Gin Rickey, fiestas, vida biográfica |
| 3 | William Faulkner | novelas, cartas y biografías | julep, whisky, contexto sureño |
| 4 | Raymond Chandler | *The Long Goodbye*, *The Big Sleep* | gimlet y bebidas de Marlowe |
| 5 | Dashiell Hammett | *The Thin Man*, *The Maltese Falcon* | cócteles de personajes |
| 6 | Dorothy Parker | “Big Blonde”, poesía, Algonquin | cócteles documentados y obra |
| 7 | Charles Bukowski | *Post Office*, *Factotum*, poemas | cerveza y vino en vida y obra |
| 8 | Jack Kerouac | *On the Road*, *Big Sur* | vida, bares y escenas narrativas |
| 9 | Hunter S. Thompson | *Fear and Loathing in Las Vegas*, cartas | registros biográficos y obra |
| 10 | John Cheever | diarios y cuentos | diarios, consumo y recuperación |
| 11 | Raymond Carver | cuentos, poemas y ensayos | consumo, sobriedad y obra |
| 12 | Eugene O’Neill | *Long Day’s Journey into Night*, *The Iceman Cometh* | vida y bebidas dramáticas |
| 13 | Edgar Allan Poe | “The Cask of Amontillado”, biografías | vino en la obra y mitos biográficos |
| 14 | Stephen King | *The Shining*, *On Writing* | ficción, memorias y recuperación |
| 15 | Pablo Neruda | *Confieso que he vivido*, odas, testimonios | vino, whisky, gastronomía y memorias |
| 16 | Julio Cortázar | *Rayuela*, cartas y entrevistas | cafés, bares, personajes y preferencias |
| 17 | Juan Carlos Onetti | *El astillero*, *Juntacadáveres*, entrevistas | vida, bares y atmósfera narrativa |
| 18 | Guillermo Cabrera Infante | *Tres tristes tigres*, memorias | noche habanera, ron y personajes |
| 19 | Miguel de Cervantes | *Don Quijote*, *Novelas ejemplares* | vino y escenas verificables en dominio público |
| 20 | Ramón del Valle-Inclán | *Luces de bohemia*, biografías | tabernas, bohemia y personajes |

Las palabras de la última columna sólo sirven para iniciar búsquedas. No deben copiarse a la ficha publicada.

## 5. Jerarquía de fuentes

### Nivel A — Primarias

- Obra literaria en edición verificable.
- Cartas, diarios y memorias del autor.
- Entrevistas directas y grabaciones.
- Documentos de archivo con procedencia institucional.

### Nivel B — Académicas o especializadas

- Biografías con aparato de fuentes.
- Artículos académicos.
- Ediciones críticas.
- Sociedades de autores, archivos universitarios o museos especializados.
- Historia de bebidas elaborada por especialistas y con referencias.

### Nivel C — Secundarias reputadas

- Medios periodísticos reconocidos que identifican su fuente.
- Editoriales que describen libros especializados.
- Instituciones culturales y bibliotecas.

### Nivel D — Sólo descubrimiento

- Listas de “tragos favoritos”.
- Blogs sin referencias.
- Wikipedia y otras enciclopedias colaborativas.
- Redes sociales, foros y sitios de recetas.
- Páginas comerciales, bares o marcas.

Nivel D puede entregar vocabulario o pistas, pero nunca basta para aprobar una afirmación. Wikipedia puede orientar hacia sus referencias; no debe ser la única evidencia publicada.

## 6. Tipos de afirmación permitidos

### `author_documented`

Requiere una fuente que demuestre consumo, preparación, pedido o preferencia. La fuerza de la redacción debe coincidir con la evidencia:

- “bebió” no significa “prefería”;
- “solía pedir” no significa “inventó”;
- “fue fotografiado con” no prueba el contenido del vaso;
- una marca concreta no debe inferirse desde una categoría genérica.

### `appears_in_work`

Requiere obra, escena y localizador. Debe identificarse quién bebe o menciona la bebida y por qué la escena resulta relevante. Una aparición casual puede ser correcta, pero no necesariamente merece ser la recomendación principal.

### `editorial_pairing`

Se utiliza sólo cuando no existe una conexión directa suficiente. Debe explicar los criterios editoriales —época, lugar, atmósfera, ingredientes o ritual— y nunca fingir procedencia histórica.

### `abstinence_or_recovery`

Permite tratar con honestidad a autores cuya historia relevante sea la sobriedad, recuperación o rechazo del alcohol. Puede conducir a una recomendación sin alcohol.

## 7. Esquema de salida del descubrimiento

Cada ejecución debe devolver un único objeto JSON equivalente a:

```json
{
  "author_id": "ernest-hemingway",
  "run": {
    "model": "gpt-5.6-luna",
    "reasoning_effort": "low",
    "executed_at": "2026-07-20T00:00:00Z",
    "search_rounds": 0
  },
  "candidates": [
    {
      "drink_name_candidate": "",
      "relationship_type_candidate": "author_documented",
      "work_candidate": null,
      "claim_candidate": "",
      "why_it_matters": "",
      "confidence_candidate": "medium",
      "sources": [
        {
          "url": "",
          "title": "",
          "author_or_publisher": "",
          "publication_date": null,
          "source_tier_candidate": "reputable_secondary",
          "support_excerpt": "",
          "locator": "",
          "accessed_at": "2026-07-20"
        }
      ],
      "contradicting_evidence": [],
      "verification_notes": [],
      "status": "candidate_generated"
    }
  ],
  "queries_used": [],
  "unresolved_questions": [],
  "stop_reason": ""
}
```

### Reglas del esquema

- `support_excerpt` tendrá como máximo 25 palabras por fuente.
- Si no existe fragmento accesible, se dejará vacío y se indicará qué debe comprobarse.
- `locator` debe ser página, capítulo, sección, minuto o párrafo identificable; no puede inventarse.
- La URL debe apuntar a la fuente, no a la página de resultados de un buscador.
- `confidence_candidate` nunca equivale a aprobación.
- Una lista vacía de candidatos es una salida válida.

## 8. Prompt de sistema para el modelo liviano

Usar un prompt breve y estable como el siguiente:

```text
Eres un asistente de investigación bibliográfica para una base editorial sobre
literatura y bebidas. Tu trabajo es descubrir candidatos, no aprobar hechos.

Usa sólo fuentes que puedas identificar. Nunca uses tu memoria como evidencia ni
inventes citas, localizadores, títulos, páginas o URLs. Distingue estrictamente:
consumo documentado del autor, bebida presente en una obra, maridaje editorial y
abstinencia o recuperación. Una mención no demuestra preferencia. Lo que bebe un
personaje no demuestra lo que bebía el autor.

Devuelve sólo el JSON solicitado. Conserva las contradicciones. Si no encuentras
evidencia suficiente dentro de los límites, devuelve candidatos vacíos y explica
el motivo en stop_reason.
```

## 9. Prompt por autor

```text
Investiga un solo autor: {{AUTHOR_NAME}}.

Objetivo: encontrar hasta 6 relaciones candidatas entre el autor, sus obras y
bebidas concretas. Prioriza fuentes primarias, académicas, archivos, entrevistas
y biografías con referencias. Usa listas populares sólo para descubrir pistas.

Obras iniciales: {{INITIAL_WORKS}}.
Hipótesis de búsqueda no verificadas: {{SEARCH_HINTS}}.

Para cada candidato entrega una afirmación mínima, un máximo de 3 fuentes, un
fragmento de respaldo de hasta 25 palabras, localizador, evidencia contradictoria
y tareas de verificación. No redactes la reseña final ni una receta. Detente tras
4 rondas de búsqueda o cuando las nuevas consultas repitan los mismos resultados.

Devuelve exclusivamente el objeto definido por el esquema.
```

## 10. Procedimiento por autor y coordinación de subagentes

Las fases del proyecto permanecen secuenciales. La investigación piloto también es secuencial. Sólo después de aprobar Hemingway y Chandler pueden investigarse autores en lotes de hasta tres. Cada resultado se valida e integra por separado antes de marcar el autor como terminado.

### Paso 1 — Identidad

1. Confirmar nombre canónico, seudónimos, fechas y nacionalidad.
2. Obtener identificadores de Wikidata y Open Library cuando existan.
3. Desambiguar homónimos antes de investigar bebidas.

### Paso 2 — Búsqueda de fuentes directas

1. Buscar el nombre junto con entrevistas, cartas, diarios, memorias y biografías.
2. Buscar términos de bebidas en idioma original y español.
3. Buscar dentro de obras legalmente accesibles cuando sea posible.
4. Registrar consultas exactas y URLs visitadas.

### Paso 3 — Descubrimiento estructurado

1. Asignar el autor a un subagente Luna con el prompt y esquema.
2. Guardar la salida sin editar en `data/research/candidates/`.
3. Validar JSON y límites automáticamente.
4. Si el JSON es inválido, realizar una sola reparación estructural sin nueva investigación.

### Paso 4 — Verificación

Por cada candidato:

1. Abrir la fuente original.
2. Confirmar título, autor o editor, fecha y URL.
3. Localizar el fragmento en contexto.
4. Comprobar que respalda exactamente la afirmación.
5. Buscar si la fuente remite a otra más primaria.
6. Revisar al menos una fuente independiente cuando la afirmación sea biográfica o controvertida.
7. Buscar evidencia contraria para asociaciones famosas o turísticas.

### Paso 5 — Decisión

- `approved`: evidencia suficiente y redacción proporcional.
- `needs_review`: fuente real, pero clasificación o fuerza dudosa.
- `rejected`: mito, fuente circular, contradicción no resuelta o relación trivial.
- `blocked_insufficient_evidence`: límite alcanzado sin candidato publicable.

Toda decisión debe tener una nota breve. Los descartes se conservan para evitar repetir trabajo.

### Paso 6 — Redacción editorial

Sólo después de aprobar la evidencia:

1. Redactar reseña del autor en 50–90 palabras.
2. Elegir dos obras representativas.
3. Redactar explicación del vínculo en 40–100 palabras.
4. Evitar diagnósticos, eufemismos y celebración de conductas dañinas.
5. Nombrar contradicciones relevantes de manera concisa.
6. Preparar o vincular una receta normalizada.
7. Si la evidencia justifica una bebida sin alcohol, tratarla como recomendación principal; no generar una alternativa automática.

### Paso 7 — Promoción

1. Convertir candidatos aprobados al esquema canónico.
2. Ejecutar validación completa.
3. Revisar el diff para detectar cambios ajenos al autor actual.
4. Promover sólo ese autor y sus dependencias nuevas.
5. Ejecutar pruebas y registrar el cierre antes de pasar al siguiente autor.

## 11. Estrategia de consultas

Usar consultas breves y específicas. Ejemplos:

```text
"{{AUTHOR}}" favorite drink interview
"{{AUTHOR}}" drinking biography letters
"{{AUTHOR}}" cocktail myth
"{{AUTHOR}}" archive correspondence drink
"{{WORK}}" wine whisky beer cocktail
site:.edu "{{AUTHOR}}" alcohol
site:.org "{{AUTHOR}}" letters drink
```

Para autores hispanohablantes, repetir las búsquedas pertinentes con:

```text
"{{AUTHOR}}" bebida entrevista
"{{AUTHOR}}" vino whisky ron cartas
"{{WORK}}" vino taberna bar bebida
```

No usar búsquedas masivas que mezclen varios autores: dificultan la trazabilidad y desperdician contexto.

## 12. Reglas para obras y derechos de autor

- Utilizar textos completos sólo cuando el acceso y uso sean legítimos.
- Project Gutenberg y otras bibliotecas de dominio público pueden servir para búsquedas reproducibles, respetando sus políticas.
- Para obras protegidas, almacenar únicamente referencia, localizador y un fragmento breve necesario para verificación.
- No incorporar libros completos al repositorio.
- No traducir y publicar pasajes extensos.
- Las portadas y retratos requieren su propia licencia; una URL pública no equivale a permiso de reutilización.

## 13. Reglas de contradicción y mitos

Crear una bandera `myth_risk` cuando:

- la asociación aparece principalmente en bares, marcas o turismo;
- muchos artículos repiten la misma frase sin identificar origen;
- una cita célebre no aparece en escritos o entrevistas verificables;
- el nombre del autor forma parte posterior del nombre comercial del cóctel;
- distintas fuentes asignan bebidas incompatibles como “favorita”.

Ante `myth_risk`:

1. buscar el origen más antiguo localizable;
2. separar “asociado culturalmente” de “consumido por”;
3. conservar la refutación si es sólida;
4. preferir una bebida descrita en una obra antes que una leyenda biográfica;
5. no publicar `confidence: high` sin evidencia primaria o especializada fuerte.

## 14. Límite de esfuerzo y sustituciones

Un autor queda `blocked_insufficient_evidence` cuando se cumplen todas estas condiciones:

- se completaron cuatro rondas de búsqueda;
- se revisaron al menos seis resultados plausibles;
- los nuevos resultados repiten fuentes anteriores;
- no existe una afirmación publicable con confianza media o alta.

No se debe forzar un maridaje para cumplir una cuota. Para mantener 20 autores en V1, sustituir al bloqueado por el siguiente candidato de alta disponibilidad, comenzando por:

1. Truman Capote
2. Tennessee Williams
3. Patricia Highsmith
4. Carson McCullers
5. Jorge Luis Borges
6. Roberto Bolaño
7. Gabriel García Márquez
8. Jorge Amado
9. Benito Pérez Galdós
10. Enrique Vila-Matas

## 15. Control de calidad por ficha

- [ ] Identidad del autor desambiguada.
- [ ] Dos obras seleccionadas y títulos comprobados.
- [ ] Al menos una recomendación con evidencia suficiente.
- [ ] La afirmación no es más fuerte que la fuente.
- [ ] Personaje y autor no están confundidos.
- [ ] Fuentes abiertas y metadatos comprobados.
- [ ] Evidencia contraria registrada cuando corresponde.
- [ ] Fragmentos breves y con localizador.
- [ ] Reseña y explicación redactadas originalmente.
- [ ] Receta normalizada, no copiada.
- [ ] Una recomendación sin alcohol, cuando corresponda, está respaldada y posee receta propia.
- [ ] Lenguaje sobrio ante dependencia o recuperación.
- [ ] Esquema y reglas cruzadas aprobados.
- [ ] Estado final y nota de decisión registrados.

## 16. Métricas de la investigación

Registrar por autor:

- número de consultas;
- fuentes abiertas;
- fuentes útiles por nivel;
- candidatos generados;
- candidatos aprobados, rechazados y bloqueados;
- contradicciones detectadas;
- tokens de entrada, salida y razonamiento cuando estén disponibles;
- modelo y configuración efectivos;
- duración de la ejecución técnica;
- tiempo de revisión editorial;
- causas de retrabajo.

La métrica principal es **fichas publicables con evidencia válida**, no cantidad de texto generado ni velocidad aislada.

## 17. Referencias operativas

- Modelos GPT-5.6 y selección de `gpt-5.6-luna`: <https://developers.openai.com/api/docs/guides/latest-model.md>
- APIs y volcados de Open Library: <https://openlibrary.org/developers/api>
- Acceso y licencia CC0 de Wikidata: <https://www.wikidata.org/wiki/Wikidata:Data_access/en>
- Catálogo procesable de Project Gutenberg: <https://dev.gutenberg.org/policy/robot_access.html>
