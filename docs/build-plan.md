# ArcDev — Website + Webapp Build Plan

Version 2 · 17 September 2026
Estimated at 7–8 weeks for one developer working six days a week.

The website ships first, on its own, with no backend. The webapp follows and takes over the website's data once it exists.

---

## 1. The customer journey

This flow is what the whole system is designed around. It describes the finished system; steps 4–6 arrive with the webapp.

| # | Where | What happens |
|---|---|---|
| 1 | Website | A landowner clicks a Facebook ad and opens arcdevltd.com on their phone. |
| 2 | Website · Fund page | Six service tiles on the home page. They tap FUND and read how it works, see past projects, find a form. |
| 3 | Website → Webapp | They submit "I want fund for construction". It becomes a Lead in the office system and notifies the admin. |
| 4 | Webapp · Leads | Staff see the new lead, call, and move its status to Contacted. Nothing is lost in a diary. |
| 5 | Webapp · Projects | Once signed, the admin opens a project, uploads photos, sets it Ongoing. It appears on the website at once. |
| 6 | Webapp · Portal | The customer logs in and follows their own project, investment or installments without phoning the office. |

Step 6 is why a webapp is needed. A website alone introduces the company; it cannot show a customer their own numbers.

---

## 2. Who sees what

| Role | Access |
|---|---|
| Public (no login) | Home, six service pages, project gallery, flat listings, about, contact |
| Admin | Everything. Confirms buyer payments and investments, approves requisitions |
| Staff | Leads follow-up, projects, flats and website content. **No** money figures |
| HR | Employees and payroll only |
| Engineer | BoQ, schedule and status on the web. Requisitions, work orders and storage list in the mobile app |
| Buyer | Their own flat: fills the booking form, uploads payment receipts, sees installments |
| Investor | Registers, applies to invest, sees their own confirmed investments and profit |

Buyers and investors never enter an amount that counts: an admin confirms every payment and investment first. Money records are voided with a reason, never deleted. Full detail in [file structure § 7](file-structure.md#7-roles).

---

## 3. Phases

### Phase 0 — Before any code (2–3 days)

Only what the website needs. Without these the work stalls mid-way.

- [ ] Signed quotation and 40% advance
- [ ] Decide whether the Exchange service stays
- [ ] Collect logo, photos, About copy and ongoing project details
- [ ] Site language: Bangla, English or both
- [ ] Office email address that should receive form submissions

**Deliverable:** a written scope both sides agree on.

---

### Website

### Phase 1 — Public website (weeks 1–2)

Something live the client can share, before any backend exists. Placeholder photos and copy are fine while the client's content is on its way.

- [x] Monorepo with `apps/web` only. `apps/api` joins in Phase 2
- [x] Types for Project and Service in `packages/shared`, in the same shape the API will return later
- [x] Home: menu, logo, hero, six service tiles. No Login button until the webapp exists
- [x] Six service pages, each with its own request form
- [x] Form validation and a hidden spam trap
- [ ] Forms email the office — code done, needs the client's SMTP details to test for real
- [ ] Cloudflare Turnstile on the forms
- [x] Ongoing Projects section and project detail pages, content from data files in the repo (sample projects for now)
- [x] Contact page
- [ ] Gallery and About — waiting on the client's photos and copy
- [x] Floating WhatsApp and Call buttons
- [ ] Responsive from 320px up, tested at 360, 768 and 1280px — see [design notes](design.md#4-responsive-layout)
- [ ] SEO foundation: server rendering, metadata, sitemap, robots, structured data, share images — see [SEO plan](seo.md)
- [ ] Google Search Console and Google Business Profile set up now, since search results take months
- [ ] Responsive testing checklist and SEO launch checklist passed
- [ ] Live on arcdevltd.com

**Milestone 1:** website live. Second payment here.

> Until the admin panel exists, project updates go through the developer. Tell the client this up front.

---

### Webapp

### Before the webapp starts

These rules shape the database. Get them in writing before Phase 2.

- [ ] Installment rules: down payment %, number of months, any charges
- [ ] Investment return rules: fixed rate or profit share, and the term
- [ ] Payroll fields: basic, allowances, deductions
- [ ] Who approves what, and which staff see which data

### Phase 2 — Backend foundation (week 3)

The website looks the same to visitors afterwards, but now runs on the database.

- [ ] `apps/api` with NestJS
- [ ] PostgreSQL + Prisma schema
- [ ] Auth: JWT + refresh token, four roles (admin, staff, buyer, investor)
- [ ] Cloudflare R2 for images and documents
- [ ] Move project content from repo files into the database
- [ ] Forms save a Lead as well as sending the email
- [ ] Daily database backup
- [ ] API deployed with Docker, staging at `staging.arcdevltd.com`

**Deliverable:** the website reads from the database, and every new request is stored.

### Phase 3 — Admin panel (week 4)

- [ ] Login button appears on the website
- [ ] Leads inbox with status, notes and search
- [ ] Projects: create, edit, upload photos, set status
- [ ] Edit gallery and service page copy
- [ ] Create users and assign roles
- [ ] Search, filter and pagination on every list
- [ ] Forgot password
- [ ] SEO fields in every editor: title, description, slug, and required image alt text
- [ ] Saving in the admin rebuilds the matching public page

**Deliverable:** the office updates the website without the developer.

### Phase 4 — Buyer and investor portals (week 5)

- [ ] `buyer` and `investor` roles
- [ ] Flat listings: project, size, price, available / booked / sold
- [ ] Installment calculator
- [ ] Buyer portal: booking form, installment schedule, payment history
- [ ] Buyers upload payment receipts; admin confirms before the amount counts
- [ ] Investor registration, subject to admin approval
- [ ] Investment applications; admin confirms once the money arrives, and only then does profit accrue
- [ ] Investor portal: confirmed investments, profit and return calculator
- [ ] Payments and investments are voided with a reason, never deleted

**Deliverable:** demonstrated with a test buyer and a test investor.

### Phase 5 — HR and Engineering (week 6)

- [ ] `hr` role: employee list and details
- [ ] Monthly payroll entry, voided with a reason, never deleted
- [ ] `engineer` role: BoQ upload per project
- [ ] Work schedule per project
- [ ] Status per BoQ line item
- [ ] Verify each role sees only its own sections

Requisitions, work orders and the storage list are not in this phase. They come with the mobile app.

**Deliverable:** all six roles working.

### Phase 6 — Testing and handover (week 7)

- [ ] Role checks on every API endpoint (an investor must not reach HR data)
- [ ] Responsive testing checklist — see [design notes](design.md#testing-checklist)
- [ ] SEO launch checklist again, for the pages the webapp now generates — see [SEO plan](seo.md#12-launch-checklist)
- [ ] Practice restoring a backup
- [ ] Client revisions and bug fixes
- [ ] Admin training and a short guide

**Milestone 2:** full handover, final payment.

### Phase 7 — Buffer (week 8)

Quote eight weeks, aim to finish in seven.

---

## 4. Payment

| When | Against | Amount |
|---|---|---|
| Start | Signed scope | 40% |
| Milestone 1 · week 2 | Website live | 30% |
| Milestone 2 · week 7 | Webapp handover | 30% |

**Excluded from the price, put it in writing:** monthly hosting, client-supplied photos and copy, revisions beyond two rounds, maintenance after the first month, and any new feature.

---

## 5. Later phases

Not built now, but the database is shaped so these drop in without breaking anything.

**Mobile app** — Expo, on the same NestJS API. Engineer requisitions and approvals, material tracking, daily site reports with photos and GPS. Must work without internet on site, which is the hard part. Quoted separately.

**Web additions** — money receipt PDFs, document vault, audit log, SMS notifications, Excel export, bilingual site, blog.

---

## 6. Risks

- **Late client content.** The biggest source of delay. Build with placeholders and swap in real content as it arrives.
- **Webapp rules still undecided when Phase 2 starts.** The website is already live and paid for, so this delays the webapp but puts nothing delivered at risk.
- **Changing installment and profit rules.** Get them in writing and verify against one worked example.
- **"Just one more small thing".** Anything outside this list goes on the later-phases list.
- **Building without roles.** Not optional in a system holding money.
