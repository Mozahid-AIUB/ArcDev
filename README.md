# ArcDev

ArcDev Ltd (arcdevltd.com) — website + office management webapp.

## Services

| Service | What it does |
|---|---|
| Fund | Construction funding for landowners |
| Landshare | Joint land development with co-owners |
| Interior | Interior design solutions |
| Engineering | Engineering design solutions |
| Management | A–Z project management |
| Investment | Managed customer investments and profit |

## Scope

- **Website** — public marketing site: home, six service pages with request forms, projects, gallery, about, contact.
- **Webapp** — office management behind login: leads, projects, flats, investors, HR, engineering (BoQ), content and users.
- **Mobile app** — a later phase: engineer requisitions, material tracking, site reports.

## Stack

- Next.js (web + admin)
- NestJS (API, shared with the future mobile app)
- PostgreSQL + Prisma
- Cloudflare R2 for images and documents
- Docker on a VPS, DNS on Cloudflare

## Run the website

```bash
corepack pnpm install
corepack pnpm --filter @arcdev/web dev
```

Open http://localhost:3000. More in [apps/web/README.md](apps/web/README.md).

## Docs

- [Build plan](docs/build-plan.md) — phases, task lists, milestones, risks
- [Design notes](docs/design.md) — palette, type, responsive layout, screens to design
- [SEO plan](docs/seo.md) — rendering, URLs, metadata, structured data, speed, launch checklist
- [File structure](docs/file-structure.md) — every app and folder, roles, and what gets built in which phase
