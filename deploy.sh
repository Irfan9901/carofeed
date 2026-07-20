#!/bin/bash
set -e
MSG="${1:-deploy}"

git add -A
git commit -m "$MSG"
git push

echo "⏳ Menunggu deployment selesai..."
for i in $(seq 1 30); do
  DEPLOY_URL=$(npx vercel list --prod 2>/dev/null | head -1 | awk '{print $1}')
  if [ -n "$DEPLOY_URL" ]; then
    STATE=$(npx vercel inspect "$DEPLOY_URL" 2>/dev/null | grep -i "ready\|state" | head -1 | awk '{print $NF}')
    if [ "$STATE" = "READY" ]; then
      LATEST="$DEPLOY_URL"
      echo "   ✅ READY: $LATEST"
      break
    fi
  fi
  sleep 5
done

if [ -z "$LATEST" ]; then
  echo "❌ Timeout menunggu deployment"
  exit 1
fi

echo "🔗 Assign carofeed.vercel.app..."
echo "y" | npx vercel alias set "$LATEST" carofeed.vercel.app 2>&1

echo "🗑️  Hapus carousel-studio-app.vercel.app..."
echo "y" | npx vercel alias rm carousel-studio-app.vercel.app 2>&1 || true

echo "✅ Selesai! https://carofeed.vercel.app"
