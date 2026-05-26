# FocusFu

Lightning-fast macOS workspace switching. Keyboard-first, visual, built for focus.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Auth:** Better-auth + Prisma adapter
- **DB:** Postgres (Neon via Vercel Marketplace)
- **Payments:** Stripe (Checkout + webhooks)
- **Styling:** Tailwind 4
- **Motion:** Framer Motion
- **Package manager:** Bun

## Dev

```bash
bun install
cp .env.example .env.local   # fill in
bun run db:push
bun run dev                  # http://localhost:3030
```

In another terminal, forward Stripe webhooks:

```bash
bun run stripe:listen
```

## Deploy

Linked to Vercel project `summoniq/focusfu` and production domain `focusfu.com`.

```bash
vercel deploy --prod
```
