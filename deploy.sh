#!/bin/bash
set -e
MSG="${1:-deploy}"

git add -A
git commit -m "$MSG"
git push

echo "⏳ Menunggu deployment selesai..."
for i in $(seq 1 20); do
  URL=$(npx vercel list --prod 2>/dev/null | head -1 | awk '{print $1}')
  if [ -n "$URL" ]; then
    STATE=$(npx vercel inspect "$URL" 2>/dev/null | grep status | head -1 | awk '{print $NF}' || true)
    if [ "$STATE" = "Ready" ]; then
      echo "   ✅ READY: $URL"
      break
    fi
  fi
  sleep 15
done

if [ -z "$URL" ] || [ "$STATE" != "Ready" ]; then
  echo "❌ Timeout menunggu deployment"
  exit 1
fi

echo "🔗 Assign carofeed.vercel.app..."
echo "y" | npx vercel alias set "$URL" carofeed.vercel.app 2>&1

echo "🗑️  Hapus carousel-studio-app.vercel.app..."
echo "y" | npx vercel alias rm carousel-studio-app.vercel.app 2>&1 || true

echo "✅ Selesai! https://carofeed.vercel.app"
