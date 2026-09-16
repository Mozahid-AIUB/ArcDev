# ArcDev — File Structure

Version 2 · 17 September 2026

The complete layout for the website, dashboard, portals, API and mobile app, in one repository. Folders are created phase by phase (section 8), so none of this has to exist on day one.

Tooling assumed: pnpm workspaces + Turborepo, Next.js App Router with Tailwind CSS, NestJS with Prisma, Expo Router. If any of these change, update this file first.

---

## 1. Top level

```
arcdev/
├── apps/
│   ├── web/                  Next.js — website, dashboard, buyer and investor portals
│   ├── api/                  NestJS — one API for both web and mobile
│   └── mobile/               Expo — engineers' app (last phase)
├── packages/
│   ├── shared/               types, validation, roles and calculators used by all three apps
│   └── config/               shared TypeScript and ESLint settings
├── infra/                    Docker, reverse proxy, backups
├── .github/workflows/        checks and deploys
├── docs/                     plans and decisions
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .gitignore
└── README.md
```

---

## 2. `apps/web` — website, dashboard and portals

One Next.js app, split into areas. Each area has its own layout and its own access rule.

| Area | URL | Who |
|---|---|---|
| Website | `/`, `/services/*`, `/projects/*`, `/flats/*`, `/gallery`, `/about`, `/contact` | Everyone |
| Sign in | `/login`, `/register`, `/forgot-password`, `/reset-password` | Everyone |
| Dashboard | `/dashboard/*` | Admin, staff, HR, engineer — each sees only their own sections |
| Portal | `/portal/*` | Buyer, investor |

```
apps/web/
├── public/
│   ├── logo.svg
│   ├── og-default.jpg                  share image for pages without a photo
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                  root: fonts, base metadata
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts                  every public page, project and flat
│   │   ├── robots.ts
│   │   │
│   │   ├── (website)/                  ── public site, no login ──
│   │   │   ├── layout.tsx              header, footer, WhatsApp and Call buttons
│   │   │   ├── page.tsx                home
│   │   │   ├── services/
│   │   │   │   └── [slug]/page.tsx     fund · landshare · interior · engineering · management · investment
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx            ongoing / completed / upcoming
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── flats/
│   │   │   │   ├── page.tsx            listings and installment calculator
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   │
│   │   ├── (auth)/                     ── sign in ──
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx       investors register themselves; the office creates buyer accounts
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   │
│   │   ├── dashboard/                  ── admin, staff, HR, engineer ──
│   │   │   ├── layout.tsx              sidebar, menu filtered by role
│   │   │   ├── page.tsx                today's summary, different per role
│   │   │   │
│   │   │   ├── leads/                  admin, staff
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── projects/               admin, staff
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── flats/                  admin, staff
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── content/                admin, staff
│   │   │   │   ├── services/page.tsx
│   │   │   │   ├── gallery/page.tsx
│   │   │   │   └── about/page.tsx
│   │   │   │
│   │   │   ├── buyers/                 admin
│   │   │   │   ├── page.tsx            includes receipts waiting to be confirmed
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx        booking form and installment schedule
│   │   │   │       └── payments/page.tsx   confirm receipts, void with a reason
│   │   │   ├── investors/              admin
│   │   │   │   ├── page.tsx            registrations and applications waiting to be confirmed
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── users/page.tsx          admin
│   │   │   │
│   │   │   ├── hr/                     admin, hr
│   │   │   │   ├── employees/page.tsx
│   │   │   │   └── payroll/page.tsx
│   │   │   │
│   │   │   └── engineering/            admin, engineer
│   │   │       ├── page.tsx            projects
│   │   │       └── [projectId]/
│   │   │           ├── boq/page.tsx        upload BoQ, line items
│   │   │           ├── schedule/page.tsx   work schedule
│   │   │           └── status/page.tsx     progress per line item
│   │   │
│   │   ├── portal/                     ── buyers and investors ──
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                sends each role to its own home
│   │   │   ├── profile/page.tsx
│   │   │   ├── buyer/
│   │   │   │   ├── page.tsx            my flat
│   │   │   │   ├── booking/page.tsx    booking form
│   │   │   │   ├── installments/page.tsx
│   │   │   │   └── payments/page.tsx   history, and upload a receipt
│   │   │   └── investor/
│   │   │       ├── page.tsx            my confirmed investments and profit
│   │   │       ├── apply/page.tsx      apply to invest: amount and term
│   │   │       └── calculator/page.tsx
│   │   │
│   │   └── api/
│   │       └── revalidate/route.ts     the API calls this after an admin save
│   │
│   ├── components/
│   │   ├── ui/                         button, input, select, dialog, table
│   │   ├── website/                    header, footer, hero, service-tile, project-card,
│   │   │                               request-form, contact-buttons
│   │   ├── dashboard/                  sidebar, data-table, status-badge, image-upload,
│   │   │                               seo-fields, confirm-or-void
│   │   └── portal/                     installment-schedule, payment-history, receipt-upload,
│   │                                   investment-summary
│   │
│   ├── lib/
│   │   ├── data.ts                     getProjects(), getProject() … — reads content/ in Phase 1,
│   │   │                               the API from Phase 2
│   │   ├── submit-request.ts           emails the office in Phase 1, posts to the API from Phase 2
│   │   ├── api-client.ts               from Phase 2
│   │   ├── auth.ts                     session and role helpers
│   │   ├── seo.ts                      metadata and structured data builders
│   │   └── site.ts                     company name, contact details, production URL
│   │
│   ├── content/                        Phase 1 only — deleted once the API serves this
│   │   ├── projects.ts
│   │   └── services.ts
│   │
│   └── proxy.ts                        keeps each role out of areas it may not enter
│                                       (Next.js 16 name; middleware.ts in older versions)
│
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Pages never read `content/` or call the API directly. They only use `lib/data.ts` and `lib/submit-request.ts`. That is what lets the website go live before the API exists, and switch over later without rewriting a single page.

---

## 3. `apps/api` — the API

```
apps/api/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                         first admin user, the six services
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   └── env.ts                      refuses to start if an environment variable is missing
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── common/
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts       is anyone logged in
│   │   │   └── roles.guard.ts          is this role allowed here
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts      @Roles('admin', 'hr')
│   │   │   ├── public.decorator.ts     @Public() for website endpoints
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   └── pipes/
│   │       └── zod-validation.pipe.ts  validates with the schemas in packages/shared
│   │
│   └── modules/
│       │   ── website and webapp ──
│       ├── auth/                       login, refresh, forgot and reset password
│       ├── users/                      create users, assign roles
│       ├── leads/                      website requests
│       ├── projects/                   projects, photos, status
│       ├── content/                    service copy, gallery, about
│       ├── flats/                      listings
│       ├── bookings/                   booking form, installment schedule
│       ├── payments/                   receipts from buyers, confirmed by admin — never deleted
│       ├── investors/                  registration, approval
│       ├── investments/                applications, confirmed amounts, returns — never deleted
│       ├── hr/                         employees, payroll — payroll never deleted
│       ├── engineering/                BoQ, schedule, status
│       ├── uploads/                    signed upload links for R2
│       ├── notifications/              email now; SMS and push later
│       ├── revalidate/                 tells the website to rebuild a page
│       │
│       │   ── mobile app phase ──
│       ├── sites/                      construction sites and assigned engineers
│       ├── requisitions/               engineer requests → admin approves
│       ├── work-orders/
│       ├── storage/                    storage list, deliveries, movement between sites
│       └── site-reports/               daily reports, photos, GPS
│
├── test/
├── .env.example
├── nest-cli.json
├── package.json
└── tsconfig.json
```

Every module has the same shape:

```
leads/
├── leads.module.ts
├── leads.controller.ts                 routes, and which roles may call each one
├── leads.service.ts                    the actual work
└── leads.service.spec.ts
```

There is no separate `dto/` folder. Request shapes are the zod schemas in `packages/shared`, so the website form and the API reject exactly the same input.

---

## 4. `apps/mobile` — engineers' app

Used by the `engineer` role on site, and by `admin` to approve requisitions.

```
apps/mobile/
├── app/                                one file per screen
│   ├── _layout.tsx
│   ├── (auth)/
│   │   └── login.tsx
│   └── (app)/
│       ├── _layout.tsx                 bottom tabs, different for engineer and admin
│       ├── index.tsx                   today: my sites, what needs action
│       ├── requisitions/
│       │   ├── index.tsx
│       │   ├── new.tsx                 engineer raises a request
│       │   └── [id].tsx                admin approves or rejects here
│       ├── work-orders/
│       │   ├── index.tsx
│       │   ├── new.tsx
│       │   └── [id].tsx
│       ├── storage/
│       │   ├── index.tsx               storage list per site
│       │   ├── receive.tsx             record a delivery
│       │   └── transfer.tsx            move stock between sites
│       ├── reports/
│       │   ├── index.tsx
│       │   └── new.tsx                 camera, GPS, work done, labour count
│       └── profile.tsx
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   │   ├── api-client.ts
│   │   └── secure-token.ts             login tokens in the phone's secure storage
│   └── offline/                        keeps working with no signal on site
│       ├── local-db.ts                 SQLite on the phone
│       ├── outbox.ts                   actions waiting to be sent
│       └── sync.ts                     sends the outbox when signal returns
│
├── assets/
├── app.json
├── eas.json                            build and Play Store settings
├── package.json
└── tsconfig.json
```

---

## 5. `packages` — code shared by every app

```
packages/shared/
├── src/
│   ├── constants/
│   │   ├── roles.ts                    the six roles, and what each may do
│   │   ├── services.ts                 the six services and their slugs
│   │   └── statuses.ts                 lead, project, flat, payment and requisition statuses
│   ├── types/                          Project, Lead, Flat, Booking, Payment, Investment, Employee …
│   ├── schemas/                        zod: request-form, booking-form, payment, requisition …
│   ├── calc/
│   │   ├── installment.ts              one formula for the website, portal and API
│   │   └── investment-return.ts
│   └── index.ts
├── package.json
└── tsconfig.json

packages/config/
├── tsconfig.base.json
└── eslint.config.js
```

> If the installment calculator on the website and the schedule in a buyer's portal ever show different numbers, the client stops trusting the whole system. Writing the formula once, in `calc/`, is what prevents that.

---

## 6. `infra` and CI

```
infra/
├── docker/
│   ├── web.Dockerfile
│   └── api.Dockerfile
├── docker-compose.yml                  web, api, postgres, caddy
├── Caddyfile                           arcdevltd.com → web · api.arcdevltd.com → api
└── backup/
    └── backup-db.sh                    daily database dump, copied to R2

.github/workflows/
├── ci.yml                              lint, type check and tests on every push
└── deploy.yml                          deploys main to the VPS
```

---

## 7. Roles

Six roles, plus the public.

| Role | Arrives in | Enters or uploads | Where |
|---|---|---|---|
| Public | Phase 1 | Request forms | Website |
| `admin` | Phase 3 | Everything. Confirms payments and investments, approves requisitions | Dashboard, mobile app |
| `staff` | Phase 3 | Leads follow-up, projects, flats, website content | Dashboard |
| `buyer` | Phase 4 | Booking form, payment receipts | Portal |
| `investor` | Phase 4 | Registration, applications to invest (amount and term) | Portal |
| `hr` | Phase 5 | Employees, monthly payroll | Dashboard |
| `engineer` | Phase 5 | BoQ, schedule and status on the web; requisitions, work orders, storage list and site reports in the mobile app | Dashboard, mobile app |

### Dashboard access

| Section | `admin` | `staff` | `hr` | `engineer` |
|---|---|---|---|---|
| Leads | Full | Full | — | — |
| Projects | Full | Full | — | View |
| Flats | Full | Full | — | — |
| Website content | Full | Full | — | — |
| Buyers and payments | Full, confirms | — | — | — |
| Investors and investments | Full, confirms | — | — | — |
| HR and payroll | Full | — | Full | — |
| Engineering: BoQ, schedule, status | Full | — | — | Full |
| Users and roles | Full | — | — | — |

### Money rules

- **Buyers and investors never enter an amount that counts.** A buyer uploads a receipt, an investor applies. Nothing reaches their balance until an admin confirms it against the bank.
- **Payments, payroll entries and investments are never deleted.** A mistake is voided with a reason, and the original stays on record.
- **Calculators save nothing,** so anyone may use them.

### Where roles are checked

Roles are defined once, in `packages/shared/src/constants/roles.ts`, and checked in two places:

- `apps/web/src/proxy.ts` keeps a role out of pages it may not see.
- `apps/api/src/common/guards/roles.guard.ts` refuses API calls a role may not make.

**The API check is the one that matters.** Hiding a page does not stop someone calling the API directly.

---

## 8. What gets built in which phase

| Phase | Created |
|---|---|
| 1 · Website | Root files, `.github/workflows`, `packages/config`, `packages/shared` (services, statuses, request-form schema), `apps/web` with `(website)` except flats, `content/`, `lib/data.ts`, `lib/submit-request.ts`, `sitemap.ts`, `robots.ts`, `web.Dockerfile`, `Caddyfile` |
| 2 · Backend | `apps/api` core with `auth`, `users`, `leads`, `projects`, `content`, `uploads`, `notifications`, `revalidate`; `docker-compose.yml`, `backup/`. **`apps/web/src/content/` is deleted** |
| 3 · Admin | `admin` and `staff` roles; web `(auth)` login and password pages, `dashboard/` leads, projects, content, users; `proxy.ts` |
| 4 · Portals | `buyer` and `investor` roles; API `flats`, `bookings`, `payments`, `investors`, `investments`; web `(website)/flats`, `register`, `dashboard/` flats, buyers, investors, `portal/`; `shared/calc` |
| 5 · HR, Engineering | `hr` and `engineer` roles; API `hr`, `engineering`; web `dashboard/hr`, `dashboard/engineering` |
| Mobile | `apps/mobile`; API `sites`, `requisitions`, `work-orders`, `storage`, `site-reports`; `engineer` and `admin` gain mobile access |

---

## 9. Naming

- Files and folders: lowercase with hyphens — `request-form.tsx`, `site-reports/`
- React components inside them: PascalCase — `RequestForm`
- Prisma models: singular PascalCase — `Lead`, `SiteReport`
- One `.env.example` per app. Real `.env` files never enter git
