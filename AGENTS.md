# Alur Kerja

## Deployment

1. Setiap perbaikan WAJIB langsung deploy setelah selesai
2. Git: `git add <files> && git commit -m "pesan" && git push`
3. Vercel: `npx vercel deploy --prod --yes`
   - Tambah `--force` jika perlu skip cache
4. Pastikan alias `carofeed.vercel.app` mengarah ke deployment terbaru:
   `npx vercel alias set <deployment-url> carofeed.vercel.app`
5. URL live: https://carofeed.vercel.app