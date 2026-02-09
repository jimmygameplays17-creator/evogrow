# Civitas MVP

MVP de crowdfunding local con transparencia BOM (piezas financiables) para obras comunitarias.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- API Routes (in-memory)

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Notas
- Los datos se inicializan con seeds en memoria. Al reiniciar el servidor se restauran.
- Las donaciones son simuladas desde la UI con "Confirmar donación".
- El panel Admin permite aprobar proyectos pendientes para que aparezcan en Home.
