# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Lumina Mentis is a React 18 SPA (Vite + Tailwind CSS + shadcn/ui) backed by Supabase (PostgreSQL, Auth, Realtime, Storage). See `README.md` for basic setup steps.

### Running the app

```bash
npm run dev          # starts Vite dev server on http://localhost:5173
```

The Vite config sets `logLevel: 'error'`, so startup is silent — no "ready" banner appears. Verify the server is up with `curl -s http://localhost:5173 | head -5`.

### Environment variables

The app requires a `.env.local` with at minimum:
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous key

Without valid Supabase credentials the UI renders but all data fetches and auth flows fail. Placeholder values allow the dev server to start and the build to succeed.

### Lint / Build / Test

| Task | Command | Notes |
|------|---------|-------|
| Lint | `npm run lint` | ESLint 9 flat config; only lints `src/components/`, `src/pages/`, `src/Layout.jsx` |
| Build | `npm run build` | Vite production build |
| Dev | `npm run dev` | Vite dev server (HMR) |

There are no automated test suites in this repository (no Jest, Vitest, or similar configured).

### Caveats

- `npm run lint` (runs `eslint . --quiet`, errors only) currently passes with exit code 0. Plain `eslint .` reports ~15 pre-existing unused-var **warnings** (no errors); these are not regressions.
- The `typecheck` script (`tsc -p ./jsconfig.json`) is defined in package.json but TypeScript is not fully configured (the project is JavaScript/JSX).
### Overview

Lumina Mentis is a React SPA (Vite + React 18 + Tailwind CSS + shadcn/ui) with Supabase as the backend (auth, database, realtime, storage). There is no local backend server to run — all backend services are hosted by Supabase.

### Running the dev server

```bash
npm run dev
```

The Vite config sets `logLevel: 'error'`, so you will not see the usual "ready on localhost:5173" message. The server is still running — verify with `curl http://localhost:5173/`.

### Linting

```bash
npm run lint        # errors only (--quiet)
npm run lint:fix    # auto-fix unused imports etc.
```

ESLint is configured with flat config (`eslint.config.js`). It only targets `src/components/**`, `src/pages/**`, and `src/Layout.jsx`; it ignores `src/lib/` and `src/components/ui/`.

### Building

```bash
npm run build
```

### Environment variables

A `.env.local` file is required with at minimum:

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase public anon key

Without real Supabase credentials the app still renders (guest mode works, pages load) but data fetches will fail. The app supports guest mode (click "Continue as Guest" on the login prompt) for UI-only testing.

### Guest mode

The app shows a login/guest prompt on first load. Click "Continue as guest" to bypass authentication and browse the UI. Guest mode is stored in `sessionStorage` (`lumina_guest`).

### Key paths

- `src/api/base44Client.js` — Supabase client and entity API layer
- `src/lib/AuthContext.jsx` — Auth state management
- `src/App.jsx` — Router + route definitions
- `supabase/schema.sql` — Full database schema
- `supabase/sample_disorders_seed.sql` — Seed data for disorders table
