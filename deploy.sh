#!/bin/bash
set -e
MSG="${1:-deploy}"

TOKEN=$(cat ~/Library/Application\ Support/com.vercel.cli/auth.json | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
TEAM="team_huU4gZ4yxJfvHSUwOevNsX71"

git add -A
git commit -m "$MSG"

echo "🚀 Deploy..."
OUT=$(npx vercel deploy --prod --yes 2>&1)
echo "$OUT"

URL=$(echo "$OUT" | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g' | grep "Production" | grep -Eo 'https?://[a-z0-9-]+\.vercel\.app' | tail -1 | sed 's|https://||')
echo "   ✅ $URL"

echo "🔗 Assign carofeed.vercel.app..."
curl -s -X POST "https://api.vercel.com/v2/deployments/$URL/aliases?teamId=$TEAM" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"alias":"carofeed.vercel.app"}' | python3 -c "import sys,json; print(json.load(sys.stdin).get('alias','FAIL'))"

echo "🗑️  Hapus carousel-studio-app.vercel.app..."
curl -s -X DELETE "https://api.vercel.com/v2/aliases/carousel-studio-app.vercel.app?teamId=$TEAM" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','already gone'))" 2>/dev/null || echo "   (already removed)"

echo "✅ Selesai! https://carofeed.vercel.app"
