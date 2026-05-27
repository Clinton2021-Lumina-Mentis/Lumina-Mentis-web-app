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

- The codebase has pre-existing unused-import lint errors (~55). These are not regressions.
- `npm run lint` exits non-zero due to these pre-existing errors; use `npm run lint 2>&1 | grep -c error` to count if checking for regressions.
- The `typecheck` script (`tsc -p ./jsconfig.json`) is defined in package.json but TypeScript is not fully configured (the project is JavaScript/JSX).
