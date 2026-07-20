#!/bin/bash
set -e
MSG="${1:-deploy}"

git add -A
git commit -m "$MSG"

echo "🚀 Deploy ke Vercel..."
OUT=$(npx vercel deploy --prod --yes 2>&1)
echo "$OUT"

URL=$(echo "$OUT" | grep "Production" | awk '{print $NF}')
if [ -z "$URL" ]; then
  echo "❌ Gagal dapat URL deployment"
  exit 1
fi
echo "   ✅ $URL"

echo "🔗 Assign carofeed.vercel.app..."
echo "y" | npx vercel alias set "$URL" carofeed.vercel.app 2>&1

echo "🗑️  Hapus carousel-studio-app.vercel.app..."
echo "y" | npx vercel alias rm carousel-studio-app.vercel.app 2>&1 || true

echo "✅ Selesai! https://carofeed.vercel.app"
echo "⚠️  Git push belum dijalankan. Jalankan 'git push' secara terpisah jika ingin sinkron ke GitHub."
