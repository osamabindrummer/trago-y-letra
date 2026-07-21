# Prompt para iniciar una sesión limpia

Antes de enviar este prompt, abre una sesión nueva dentro de `/Users/dsj-air/Developer/trago-y-letra` y selecciona **gpt-5.6-terra con esfuerzo medium**. Terra `low` también puede ejecutar el PRD, pero `medium` es la recomendación para conservar criterio en arquitectura, integración y validación.

```text
Trabaja de principio a fin en la primera versión de Trago y Letra dentro del
repositorio actual. Tu objetivo es implementar y verificar la V1 definida en
docs/PRD.md, no rediseñar el alcance.

Antes de modificar archivos:

1. Lee completamente AGENTS.md.
2. Lee completamente docs/PRD.md.
3. Lee completamente docs/RESEARCH_PROTOCOL.md.
4. Inspecciona el estado del repositorio y las herramientas disponibles.
5. Resume el objetivo, la definición de listo y un plan de máximo 10 pasos.

Después ejecuta las fases del PRD en orden y no avances a la siguiente mientras
su gate no esté aprobado. Trabaja autónomamente en cambios locales, reversibles y
dentro del alcance. No pidas aprobaciones rutinarias. Detente únicamente ante un
gasto externo no autorizado, una acción destructiva, un problema real de licencia
o una decisión que amplíe materialmente el producto.

Modelo y delegación:

- Esta sesión principal debe actuar como orquestador e implementador Terra.
- Usa razonamiento medium para arquitectura, integración, revisión editorial y
  gates; low es suficiente para tareas mecánicas bien definidas.
- No investigues autores con el agente principal salvo para validar fuentes y
  decidir su promoción editorial.
- En la Fase 4, delega Hemingway y Chandler, uno por vez, a subagentes
  gpt-5.6-luna con razonamiento low.
- Después de aprobar el piloto, puedes usar hasta tres subagentes Luna en paralelo,
  siempre con un solo autor por subagente y respetando el orden de la primera
  oleada.
- Eleva un investigador Luna a medium sólo en una segunda pasada justificada por
  contradicciones, ambigüedad o salida insuficiente.
- Entrega a cada subagente únicamente el autor, obras iniciales, hipótesis de
  búsqueda, prompt, esquema y límites definidos en docs/RESEARCH_PROTOCOL.md.
- Los subagentes sólo generan candidatos. Tú debes abrir y comprobar las fuentes,
  validar la estructura y decidir approved, rejected o blocked.
- Antes de la Fase 4, comprueba si esta superficie permite gpt-5.6-luna como
  override de subagente. Si no lo permite, sigue exactamente el fallback del
  protocolo: no sustituyas silenciosamente el modelo ni ejecutes las 20
  investigaciones con Terra.

Reglas de implementación:

- Usa fixtures completamente sintéticos antes de incorporar datos reales.
- Mantén separados candidatos de investigación y contenido publicado.
- No uses memoria de modelo como evidencia ni inventes citas, URLs, páginas,
  capítulos, bebidas favoritas o recetas históricas.
- No incorpores dependencias, backend, CMS o servicios externos que el PRD no
  justifique.
- No expongas claves en el cliente o en Git.
- Conserva un registro breve de decisiones y el estado de cada gate.
- Revisa los cambios existentes y no sobrescribas trabajo ajeno.

La tarea termina sólo cuando se cumpla la definición de listo de docs/PRD.md:
datos validados, 20 autores publicables, interfaz funcional, pruebas aprobadas,
build de producción, QA visual móvil y escritorio, accesibilidad básica y README
reproducible. Si un autor carece de evidencia tras alcanzar el límite del
protocolo, sustitúyelo por el siguiente candidato autorizado; nunca fuerces una
asociación.

Al finalizar entrega un único informe honesto con:

- alcance implementado;
- autores y recomendaciones incorporados;
- gates y pruebas ejecutadas con sus resultados;
- configuración efectiva de modelos y uso de subagentes;
- limitaciones, sustituciones y candidatos rechazados;
- comandos exactos para ejecutar, validar y compilar el proyecto.
```

