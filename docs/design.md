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
| `gold` | `#a8802c` | Lines, progress bars, small marks — not text |
| `gold-bright` | `#d2ab55` | Buttons, and any gold on a navy ground |
| `gold-deep` | `#7f611f` | Gold text on a light ground (plain `gold` is too faint to read) |
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

## 4. Responsive layout

Every page, public and admin, must work from a 320px phone to a wide desktop.

**Mobile first.** Most visitors will arrive from Facebook on a phone, and the client's own sketch is a phone screen. Design the phone layout first, then widen it — never shrink a desktop design down.

### Breakpoints

Styles are written for the phone, then extended upward with `min-width` queries.

| Name | From | Designed for |
|---|---|---|
| base | 0 | Phones, designed at 360px |
| `sm` | 640px | Large phones in landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

### How each part adapts

| Element | Phone | Tablet | Desktop |
|---|---|---|---|
| Header | Logo, Login, menu button | Same | Full navigation inline |
| Service tiles | 2 columns | 3 columns | 3 columns |
| Project cards | 1 column | 2 columns | 3 columns |
| Project photos | Swipeable carousel | 2-column grid | 3-column grid |
| Request forms | Single column, full width | Single column, max 560px | Form beside the service explanation |
| WhatsApp and Call | Floating, bottom right | Same | Same |
| Admin sidebar | Drawer behind a menu button | Icons only | Full sidebar |
| Admin tables | Each row becomes a card | Scrolls sideways inside its box | Full table |
| Installment schedule | Scrolls sideways inside its box | Full table | Full table |

### Rules

- The page itself never scrolls sideways, down to 320px. Only a wide table may scroll, inside its own box.
- Tap targets are never smaller than 44px.
- Form inputs use at least 16px text. Anything smaller makes iPhone Safari zoom in when the field is tapped.
- Phone fields use `type="tel"` so the number keypad opens. Email fields use `type="email"`.
- Body text is 16px on every screen; nothing readable drops below 14px.
- Images are served at the size the screen needs, in WebP or AVIF, and load lazily below the first screen.
- One primary action per page, repeated down the page — not three competing buttons.

### Testing checklist

- [ ] Chrome DevTools at 360, 768 and 1280px
- [ ] A real budget Android phone on mobile data, not office Wi-Fi
- [ ] iPhone Safari, if one is available
- [ ] Phone in landscape does not break the header
- [ ] Every admin screen usable on a phone

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
