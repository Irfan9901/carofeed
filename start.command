#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=${PORT:-8090}
cd "$DIR"

# Cek node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 Menginstall dependencies..."
  npm install 2>&1 | tail -3
fi

echo "🚀 Starting Carousel Studio at http://localhost:$PORT"
echo "   Password default: admin / admin@cps.local"
echo "   Tekan Ctrl+C untuk berhenti"

# Buka browser setelah server siap
(sleep 2 && open "http://localhost:$PORT") &

node api/index.js
