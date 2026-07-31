# Biblioteca local de fuentes

Esta carpeta recibe libros en EPUB o PDF que pueden servir como fuentes para
investigaciones futuras de Trago y Letra.

## Privacidad y versionado

- `inbox/` contiene archivos recién recibidos y todavía no revisados.
- `processed/` contiene archivos cuya revisión o extracción ya terminó.
- Ambas carpetas están ignoradas por Git. Los libros completos no se publican,
  no entran al build y no deben forzarse al repositorio.
- Este `README.md` sí está versionado porque define el contrato de uso.
- Los metadatos y estados se registran en
  `data/research/library-sources.json`.

No guardes aquí claves, notas personales ajenas al proyecto ni archivos cuya
posesión o uso no sea legítimo.

## Cómo depositar un libro

1. Copia el EPUB o PDF en `library/inbox/`.
2. Usa un nombre estable y descriptivo:
   `apellido-autor--titulo-corto--edicion.ext`.
3. Agrega una entrada al inventario con:
   `data/research/library-sources.json`.
4. Ejecuta `npm run validate:library`.

Depositar un archivo sólo lo deja en cola. No demuestra una afirmación, no
aprueba evidencia y no modifica el catálogo público.

## Ejemplo de nombre

```text
chandler--the-long-goodbye--penguin-2010.epub
```

Al incorporar un hallazgo, registra en el catálogo la fuente, el localizador y
una explicación proporcional. El libro permanece privado y no entra al build.
