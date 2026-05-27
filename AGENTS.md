# AGENTS.md

## Cursor Cloud specific instructions

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
