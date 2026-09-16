# ArcDev — Website + Webapp Build Plan

Version 1 · 17 September 2026
Estimated at 6–7 weeks for one developer working six days a week.

---

## 1. The customer journey

This flow is what the whole system is designed around.

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
| Admin | Everything — leads, projects, flats, investors, HR, BoQ, website content, users |
| Staff | Leads follow-up, projects and flats. **No** payroll or investment figures |
| Buyer | Only their own flat, installment schedule and payment history |
| Investor | Only their own investment, accrued profit and return calculator |

---

## 3. Phases

### Phase 0 — Before any code (2–3 days)

Blocking items. Without these the work stalls mid-way.

- [ ] Signed quotation and 40% advance
- [ ] Decide whether the Exchange service stays
- [ ] Collect logo, photos, About copy and ongoing project details
- [ ] Installment rules: down payment %, number of months
- [ ] Investment return rules: fixed rate or profit share
- [ ] Payroll fields
- [ ] Site language: Bangla, English or both

**Deliverable:** a written scope both sides agree on.

### Phase 1 — Foundation (week 1)

Nothing visible this week, but skipping it means rebuilding later.

- [ ] Monorepo: `apps/web`, `apps/api`, `packages/shared`
- [ ] PostgreSQL + Prisma schema
- [ ] Auth: JWT + refresh token, four roles (admin, staff, buyer, investor)
- [ ] Cloudflare R2 for images and documents
- [ ] Docker deploy to `staging.arcdevltd.com`
- [ ] Daily database backup

**Deliverable:** a working staging link where login works.

### Phase 2 — Public website (week 2)

- [ ] Home: menu, logo, Login, hero, six service tiles
- [ ] Six service pages, each with its own request form
- [ ] Form submissions create Leads, with email and notification
- [ ] Ongoing Projects section and project detail pages
- [ ] Gallery, About, Contact
- [ ] Floating WhatsApp and Call buttons
- [ ] Mobile testing, image compression, basic SEO, OG share image

**Deliverable:** the client can open the whole site on their phone.

### Phase 3 — Admin panel (week 3)

- [ ] Leads inbox with status, notes and search
- [ ] Projects: create, edit, upload photos, set status
- [ ] Edit gallery and service page copy
- [ ] Create users and assign roles
- [ ] Search, filter and pagination on every list
- [ ] Forgot password

**Milestone 1:** arcdevltd.com goes live. Second payment here.

### Phase 4 — Buyer and investor portals (week 4)

- [ ] Flat listings: project, size, price, available / booked / sold
- [ ] Installment calculator
- [ ] Admin "Record payment" screen
- [ ] Buyer portal: installment schedule and payment history
- [ ] Investor registration, subject to admin approval
- [ ] Investor portal: investment, profit and return calculator

**Deliverable:** demonstrated with a test buyer and a test investor.

### Phase 5 — HR and Engineering (week 5)

- [ ] Employee list and details
- [ ] Monthly payroll entry
- [ ] BoQ upload per project
- [ ] Status per BoQ line item
- [ ] Verify role-based visibility

**Deliverable:** all six modules running.

### Phase 6 — Testing and handover (week 6)

- [ ] Role checks on every API endpoint (an investor must not reach HR data)
- [ ] Test on phone, tablet and desktop
- [ ] Practice restoring a backup
- [ ] Client revisions and bug fixes
- [ ] Final launch on arcdevltd.com
- [ ] Admin training and a short guide

**Milestone 2:** full handover, final payment.

### Phase 7 — Buffer (week 7)

Quote seven weeks, aim to finish in six.

---

## 4. Payment

| When | Against | Amount |
|---|---|---|
| Start | Signed scope | 40% |
| Milestone 1 · week 3 | Website and admin live | 30% |
| Milestone 2 · week 6 | Full handover | 30% |

**Excluded from the price, put it in writing:** monthly hosting, client-supplied photos and copy, revisions beyond two rounds, maintenance after the first month, and any new feature.

---

## 5. Later phases

Not built now, but the database is shaped so these drop in without breaking anything.

**Mobile app** — Expo, on the same NestJS API. Engineer requisitions and approvals, material tracking, daily site reports with photos and GPS. Must work without internet on site, which is the hard part. Quoted separately.

**Web additions** — money receipt PDFs, document vault, audit log, SMS notifications, Excel export, bilingual site, blog.

---

## 6. Risks

- **Late client content.** The biggest source of delay. Collect everything in Phase 0 and use placeholders to keep moving.
- **Changing installment and profit rules.** Get them in writing and verify against one worked example.
- **"Just one more small thing".** Anything outside this list goes on the Phase 2 list.
- **Building without roles.** Not optional in a system holding money.
