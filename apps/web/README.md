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

## Animation

Scroll animations are driven by data attributes (`data-reveal`, `data-count`, `data-progress`, `data-line`, `data-parallax`) and run by `src/components/motion/motion-root.tsx` with GSAP ScrollTrigger. Pages stay server components and the HTML is complete without JavaScript. Visitors who prefer reduced motion see no animation.

## Placeholder content

The live site shows a "Preview site" bar and stays out of search engines until launch. Before launch, replace:

- `src/lib/site.ts`: phone, WhatsApp, email and office address
- `src/content/company.ts`: facts, statistics, process durations, areas, FAQs, About page story, milestones and leadership
- `src/content/services.ts`: all service page copy, facts and FAQs
- `src/content/projects.ts`: every project is invented
- `src/content/gallery.ts` and `public/images/sample/`: CC0 stock photos, none of them ArcDev's work (see `CREDITS.md`)
- `src/components/website/site-logo.tsx`: the logo

Then set `NEXT_PUBLIC_ALLOW_INDEXING=true` as a build variable in Coolify and redeploy. That removes the preview bar and lets search engines index the site.
