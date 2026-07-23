#!/bin/zsh

set -u

# Resuelve la carpeta del proyecto aunque el archivo se abra con doble clic
# desde Finder o desde cualquier otra ubicación.
PROJECT_DIR="${0:A:h}"
PORT_START=28950
PORT_END=28999
SERVER_PID=""

pause_before_exit() {
  read -r "?Presiona Enter para cerrar."
}

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null
    wait "$SERVER_PID" 2>/dev/null
  fi
}

trap cleanup EXIT INT TERM

for required_command in python3 node npm curl open; do
  if ! command -v "$required_command" >/dev/null 2>&1; then
    echo "No se encontró el comando requerido: $required_command"
    echo "Instala Node.js y Python 3, o agrégalos al PATH, antes de abrir Trago y Letra."
    pause_before_exit
    exit 1
  fi
done

cd "$PROJECT_DIR" || {
  echo "No fue posible entrar a la carpeta del proyecto."
  pause_before_exit
  exit 1
}

# Instala exactamente las versiones registradas cuando todavía no existe el
# entorno local. En aperturas posteriores reutiliza las dependencias presentes.
if [[ ! -x "$PROJECT_DIR/node_modules/.bin/vite" ]]; then
  echo "Preparando dependencias por primera vez…"
  if ! npm ci; then
    echo "No fue posible instalar las dependencias del proyecto."
    pause_before_exit
    exit 1
  fi
fi

echo "Actualizando el catálogo público…"
if ! npm run build:content; then
  echo "El catálogo contiene un error y la página no puede iniciarse."
  pause_before_exit
  exit 1
fi

# Python busca un puerto disponible dentro de un rango reservado para este
# proyecto. Así el launcher no detiene servidores de otras aplicaciones.
PORT="$(python3 - "$PORT_START" "$PORT_END" <<'PY'
import socket
import sys

for port in range(int(sys.argv[1]), int(sys.argv[2]) + 1):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as candidate:
        try:
            candidate.bind(("127.0.0.1", port))
        except OSError:
            continue
        print(port)
        break
else:
    raise SystemExit(1)
PY
)"

if [[ -z "$PORT" ]]; then
  echo "No hay puertos disponibles entre $PORT_START y $PORT_END."
  pause_before_exit
  exit 1
fi

URL="http://127.0.0.1:$PORT/"

npm run dev -- --host 127.0.0.1 --port "$PORT" --strictPort &
SERVER_PID=$!

# Espera una respuesta real del sitio antes de abrir el navegador.
SITE_READY=false
for _ in {1..100}; do
  if curl --silent --fail --output /dev/null "$URL"; then
    SITE_READY=true
    break
  fi

  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    break
  fi

  sleep 0.1
done

if [[ "$SITE_READY" != true ]]; then
  echo "No fue posible iniciar Trago y Letra."
  pause_before_exit
  exit 1
fi

echo ""
echo "Trago y Letra está disponible en $URL"
echo "Mantén esta ventana abierta. Presiona Control-C para cerrar el servidor."
open "$URL"

wait "$SERVER_PID"
