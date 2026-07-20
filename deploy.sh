#!/bin/bash
set -e
MSG="${1:-deploy}"

git add -A
git commit -m "$MSG"

echo "🚀 Deploy ke Vercel..."
OUT=$(npx vercel deploy --prod --yes 2>&1)
echo "$OUT"

DEPLOY_ID=$(echo "$OUT" | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g; s/\x1b\][0-9;]*[^\x1b]*\x1b\\//g' | grep "Inspect" | tail -1 | awk '{print $NF}' | sed 's|.*/||')
if [ -z "$DEPLOY_ID" ]; then
  echo "❌ Gagal dapat deployment ID"
  exit 1
fi
echo "   ✅ ID: $DEPLOY_ID"

echo "🔗 Assign carofeed.vercel.app..."
echo "y" | npx vercel alias set "$DEPLOY_ID" carofeed.vercel.app 2>&1

echo "🗑️  Hapus carousel-studio-app.vercel.app..."
echo "y" | npx vercel alias rm carousel-studio-app.vercel.app 2>&1 || true

echo "✅ Selesai! https://carofeed.vercel.app"
echo "⚠️  Git push belum dijalankan. Jalankan 'git push' secara terpisah jika ingin sinkron ke GitHub."
