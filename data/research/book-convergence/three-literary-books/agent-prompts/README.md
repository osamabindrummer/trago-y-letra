# Paquete de prompts — normalización de los tres libros

Este paquete procesa los 242 hallazgos que permanecen después del primer lote expansivo.

## Orden

1. `00-terra-main-search-provisional.md` puede ejecutarse de inmediato.
2. Ejecuta Luna 01–14. Son independientes y no se solapan; usa como máximo tres simultáneos.
3. Ejecuta Terra 15 después de Luna 01–02.
4. Ejecuta Terra 16 después de Luna 03–06.
5. Ejecuta Terra 17 después de Luna 07–14.
6. Ejecuta Terra 18 al final.

Los agentes Luna sólo crean resultados de normalización. Los agentes Terra son los únicos autorizados para modificar el catálogo canónico y publicar.

## Distribución

- Literary Eats: 21 hallazgos en 2 lotes Luna.
- Sip and Sensibility: 65 hallazgos en 4 lotes Luna.
- Literary Libations: 156 hallazgos en 8 lotes Luna.
- Total: 242.

No ejecutes dos prompts Terra de promoción al mismo tiempo porque todos modifican `data/source/catalog.json`.
