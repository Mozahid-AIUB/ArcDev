# @arcdev/web

The ArcDev website, and later the dashboard and portals. See [docs/file-structure.md](../../docs/file-structure.md) for where everything goes.

## Run it

From the repository root:

```bash
corepack pnpm install
corepack pnpm --filter @arcdev/web dev
```

Open http://localhost:3000.

`corepack` ships with Node.js, so nothing needs installing globally. Running `corepack enable` once lets you type `pnpm` directly instead.

## Environment

Copy `.env.example` to `.env.local`. Without SMTP settings, development prints each form request to the terminal instead of emailing it.

## Checks

```bash
corepack pnpm --filter @arcdev/web typecheck
corepack pnpm --filter @arcdev/web lint
corepack pnpm --filter @arcdev/web build
```

## Placeholder content

These must be replaced with ArcDev's real details before launch:

- `src/lib/site.ts`: phone, WhatsApp, email and office address
- `src/content/projects.ts`: every project is a sample
- `src/content/services.ts`: the longer copy for each service page
- `src/components/website/site-logo.tsx`: the logo
