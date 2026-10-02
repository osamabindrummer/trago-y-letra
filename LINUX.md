# Uso en Linux (Arch, Manjaro u otras distribuciones)

Abre una terminal en la carpeta raíz de este repositorio clonado. Para revisar archivos y editar código, no necesitas ejecutar el servidor: usa tu editor y Git normalmente. Los comandos siguientes sirven para abrir la aplicación local. Detén un servidor con `Ctrl+C`. Los archivos `.command` son accesos rápidos de macOS; en Linux usa estos comandos.

## Aplicación local

Instala Node.js y npm. Desde la raíz:

```sh
npm ci
npm run dev
```

Abre `http://127.0.0.1:5173/`. El catálogo versionado se prepara con el comando de desarrollo. Los libros privados de `library/inbox/` y `library/processed/` no viajan con Git. Véase [README.md](README.md).
