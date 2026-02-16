# FlashRounds MVP

MVP web con Next.js + Tailwind + Auth email/password + rondas rápidas con créditos virtuales.

## Qué incluye

- Auth con email/password.
- Sesiones seguras con cookie HttpOnly (`flashrounds_session`) + tabla lógica `sessions`.
- Modelos requeridos definidos en SQL para Postgres:
  - `users`
  - `balances`
  - `rounds`
  - `round_entries`
- Motor de rondas (10s):
  - siempre existe una ronda `NEXT`
  - `entryCost=1`, `maxPlayers=100`, `prize=80`, `house=20`
  - cierre automático y selección aleatoria de ganador
  - proof de transparencia: `seedHash` + `seed`
- Anti-abuso:
  - 1 entrada por usuario por ronda
  - rate limit de `/api/rounds/enter`
- UI:
  - Home con countdown, entrar, cupo y ganadores recientes
  - Página de ronda con proof
  - Página de “ganaste” con botón compartir

## Importante (MVP)

- Sin Stripe.
- Sin cobros reales.
- Créditos virtuales únicamente.

## Variables de entorno

Crear `.env.local`:

```bash
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flashrounds
```

> `DATABASE_URL` se entrega para el flujo de Postgres/migraciones del MVP.

## Migraciones (Postgres)

SQL de migración:

- `db/migrations/001_init.sql`

Comando manual sugerido:

```bash
psql "$DATABASE_URL" -f db/migrations/001_init.sql
```

## Ejecutar local

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```
