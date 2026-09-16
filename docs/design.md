# ArcDev — Design Notes

Version 1 · 17 September 2026
Decisions made before any screen is drawn. Update this file when the client's logo arrives.

---

## 1. Direction

A real estate developer sells trust before it sells floor space. The site should read as established and careful, not as a startup.

- **Deep navy** as the base — authority, used for the header, footer and section grounds.
- **Gold** as the single accent — used only for calls to action and small marks, never as a fill.
- **Off-white** page ground so project photographs carry the colour.

One accent, used sparingly. Everything loud on the page should be a photograph, not a colour.

## 2. Colour

| Token | Light | Use |
|---|---|---|
| `navy` | `#16274a` | Header, footer, headings, primary buttons |
| `gold` | `#a8802c` | Call to action, active states, small marks |
| `ground` | `#f7f5f0` | Page background |
| `panel` | `#ffffff` | Cards, forms, tables |
| `ink` | `#101a2e` | Body text |
| `ink-soft` | `#46536b` | Secondary text |
| `line` | `#dfd9cd` | Borders and dividers |

Status colours are separate from the accent and used only in the admin panel: `#2f6b4f` ok, `#9a5a12` warning, `#93321f` stop.

> Placeholder until the client's logo arrives. Once it does, pull the real values from it and update this table — do not keep two palettes running.

## 3. Type

- **Headings** — a serif or a strong geometric sans, set tight. Chosen once the logo lands so the two agree.
- **Body** — Hind Siliguri, which covers both Bangla and English at the same weight. Important if the site becomes bilingual.
- **Numbers** — tabular figures everywhere money appears: installment tables, payroll, investment returns. Columns of digits must line up.

Body text stays near 65 characters wide. Uppercase labels get letter-spacing; nothing else does.

## 4. Layout rules

- **Mobile first.** Over 80% of traffic will be on a phone, and the client's own sketch is a phone screen. Design the phone layout first, then widen it.
- Tap targets are never smaller than 44px.
- Service tiles sit in a 2-column grid on a phone, 3 columns on desktop.
- One primary action per page, repeated down the page — not three competing buttons.
- Photographs are compressed before upload. A slow connection that stalls loses the visitor.

## 5. Screens to design

| Screen | Notes |
|---|---|
| Home (mobile) | Menu, logo, Login, hero, six service tiles, Ongoing Projects, More Details |
| Home (desktop) | Same content, wider grid |
| Service page | One layout reused by all six. Explanation, past work, request form |
| Project detail | Photos, location, progress, amenities, brochure download |
| Flat listing | Filter by project, size and price. Installment calculator |
| Admin — leads | The screen staff use most. Table, status, search, filter |
| Admin — project edit | Photo upload and status |
| Buyer portal | Installment schedule and payment history |
| Investor portal | Investment, accrued profit, return calculator |

## 6. Trust elements

A developer's site is judged on these more than on its layout.

- Management profile with real photographs
- Approval and licence information
- Completed project count, delivered square feet, years in business
- Customer testimonials
- FAQ answering the questions a landowner actually asks

## 7. Content still needed from the client

- [ ] Logo in vector form, and the brand colours if they exist
- [ ] High quality 3D renders and project photographs
- [ ] Management photographs and short profiles
- [ ] Approval and licence details
- [ ] Real project numbers for the trust section
- [ ] Office address for the contact map

Blurry phone photographs will make the site look cheap regardless of how well it is built. This is worth pushing the client on.
