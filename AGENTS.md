# Instrucciones para agentes

## Idioma y calidad

- Responde y documenta en español.
- Los comentarios de código deben estar en español y ser comprensibles para personas con poca experiencia.
- Prioriza corrección, legibilidad, trazabilidad y cambios pequeños.

## Documentos canónicos

1. Lee completamente `docs/PRD.md`.
2. Lee completamente `docs/RESEARCH_PROTOCOL.md` antes de investigar autores.
3. Ejecuta las fases y gates del PRD en orden.
4. No debilites un criterio de aceptación para hacer pasar una fase.
5. Actualiza el README y el registro de decisiones cuando cambien comandos o arquitectura.

## Modelos y delegación

- El agente principal debe ejecutarse con `gpt-5.6-terra`, preferentemente `medium`.
- Usa `low` sólo para trabajo mecánico claramente especificado.
- Delega un autor por subagente `gpt-5.6-luna`, `low` por defecto y `medium` sólo ante una segunda pasada justificada.
- No delegues investigación antes de aprobar el Gate 3 y comenzar la Fase 4.
- En el piloto usa un subagente a la vez. Después, como máximo tres investigadores simultáneos.
- Un investigador entrega candidatos; nunca aprueba ni publica.
- Si Luna no está disponible como subagente, sigue el fallback del protocolo y no ocultes el cambio.

## Datos editoriales

- No uses memoria del modelo como evidencia.
- No inventes citas, URLs, páginas, capítulos, recetas ni preferencias.
- Conserva candidatos rechazados y contradicciones.
- No publiques estados distintos de `published`.
- Toda afirmación debe ser proporcional a su fuente.
- No romantices adicción o dependencia.

## Seguridad

- Nunca guardes claves o tokens en Git.
- Usa variables de entorno y mantén `.env` ignorado.
- No incorpores obras completas o imágenes sin derechos claros.
- Detente ante gastos externos no autorizados, acciones destructivas o una expansión material del alcance.

## Verificación

- Cierra cada fase con su gate verificable.
- Usa fixtures sintéticos antes de datos reales.
- Antes de entregar, ejecuta validación de contenido, tests, build y QA visual definidos en el PRD.
