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

## Docs

- [Build plan](docs/build-plan.md) — phases, task lists, milestones, risks
- [Design notes](docs/design.md) — palette, type, layout rules, screens to design
