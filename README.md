<!-- SUMMONIQ-OSS-HEADER:START -->
<div align="center">

  <img src="public/branding/wordmark-navy.svg" alt="FocusFu logo" width="112">

  <h1>FocusFu</h1>
  <p>Lightning-fast macOS workspace switching. Keyboard-first, visual, built for focus.</p>

  <p>
    <a href="https://github.com/SummonIQ/focusfu"><img alt="Repository" src="https://img.shields.io/badge/github-SummonIQ%2Ffocusfu-24292f?logo=github"></a>
    <a href="https://unlicense.org/"><img alt="License: Unlicense" src="https://img.shields.io/badge/license-Unlicense-blue.svg"></a>
  </p>

</div>

---
<!-- SUMMONIQ-OSS-HEADER:END -->

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
bun run dev                  # http://localhost:30240
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
