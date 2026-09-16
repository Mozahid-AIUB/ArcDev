# ArcDev — SEO Plan

Version 1 · 17 September 2026
What "SEO friendly" means for this project, as tasks that can be checked off.

> SEO results take months, and nobody controls Google's rankings. Promise the client the foundation in this document, not "first page of Google".

Placeholders in `[BRACKETS]` need real values from the client.

---

## 1. Rendering

Google must receive finished HTML, not an empty page that fills in with JavaScript.

- [ ] Every public page is rendered on the server or pre-built by Next.js, never client-only
- [ ] Project and flat pages are pre-built, and rebuilt automatically when the admin saves a change (the API calls Next.js on-demand revalidation with a secret)
- [ ] A proper 404 page that returns a real 404 status

## 2. URLs

Short, readable, and stable. Names in the URL, never database IDs.

```
/                           Home
/services/fund              one page per service (six)
/services/landshare
/projects                   all projects
/projects/[slug]            e.g. /projects/arc-heights-[area]
/flats                      flat listings
/flats/[slug]
/gallery   /about   /contact

/login   /dashboard/*   /portal/*   /api/*      private — kept out of search
```

- [ ] One canonical domain: `https://arcdevltd.com`. The `www` version redirects to it with a 301 (a Cloudflare redirect rule)
- [ ] Every page declares its canonical URL
- [ ] Slugs are generated from the name and can be edited in the admin
- [ ] When a slug changes, the old URL redirects to the new one with a 301. Old slugs are kept in the database for this

## 3. Page metadata

Every public page has its own title and description. No two pages share one.

| Page | Title pattern |
|---|---|
| Home | ArcDev Ltd — Real Estate Developer in [CITY] |
| Service | Construction Funding for Landowners \| ArcDev Ltd |
| Project | [Project name], [Area] — Flats for Sale \| ArcDev Ltd |
| Flat | [Size] sq ft Flat at [Project name] \| ArcDev Ltd |

- [ ] Titles stay under about 60 characters, descriptions under about 155, so search results don't cut them off
- [ ] Exactly one `<h1>` per page, matching the page's subject
- [ ] Headings in order (`h1` → `h2` → `h3`), never chosen for their size

## 4. Sitemap and robots

- [ ] `sitemap.xml` generated automatically, including every project and flat, with last-updated dates
- [ ] `robots.txt` allows the public site, disallows `/dashboard`, `/portal` and `/api`, and points to the sitemap
- [ ] `/login` and every logged-in page carry `noindex`

## 5. Structured data

JSON-LD that tells Google what the business is. Most of it produces no visible change in results; it helps Google understand the site.

- [ ] `Organization` on the home page: name, logo, phone, Facebook page
- [ ] `LocalBusiness` with the office address, map coordinates, opening hours and phone
- [ ] `BreadcrumbList` on service, project and flat pages
- [ ] `Service` on each of the six service pages

## 6. Social sharing

Facebook is where these links will be shared most. A link without a preview image looks broken.

- [ ] Open Graph title, description and image on every public page
- [ ] Each project and flat uses its own cover photo as the share image
- [ ] A branded default share image for pages without a photo
- [ ] Checked in the Facebook Sharing Debugger before launch

## 7. Speed

Speed is part of ranking, and a page that stalls on mobile data loses the visitor anyway. Targets are Google's "good" range for Core Web Vitals, measured on mobile.

| Measure | Target | What it means |
|---|---|---|
| LCP | 2.5s or less | The main content has appeared |
| INP | 200ms or less | The page responds quickly to a tap |
| CLS | 0.1 or less | Nothing jumps around while loading |

- [ ] Images through `next/image`: resized per screen, WebP or AVIF, width and height set so nothing jumps
- [ ] The hero image loads first; everything below the first screen loads lazily
- [ ] Fonts self-hosted through `next/font`, so text doesn't jump when the font arrives
- [ ] Static files cached through Cloudflare

## 8. Content the admin controls

SEO breaks the moment staff add a project without it. The admin editors must ask for it.

- [ ] Project, flat and service editors have SEO title, meta description and slug fields, pre-filled with sensible defaults
- [ ] Every image upload **requires** alt text, e.g. "South-facing balcony, Arc Heights, [Area]"
- [ ] A character counter on the title and description fields

## 9. Local search

For a developer, "real estate developer near me" and "flats for sale in [AREA]" matter more than anything else.

- [ ] Google Business Profile created and verified at the office address, with photos, category and phone
- [ ] The same company name, address and phone everywhere: website footer, Google Business Profile, Facebook page
- [ ] A map on the contact page
- [ ] Ask satisfied customers for Google reviews

### Search intent per page

Starting ideas only. Replace with the real terms once Search Console shows what people actually type.

| Page | Someone searching for… |
|---|---|
| Fund | a developer to build on their land |
| Landshare | a partner to develop jointly owned land |
| Interior | interior design for their flat in [CITY] |
| Engineering | structural or engineering design for a building |
| Management | someone to manage a construction project end to end |
| Investment | property investment with regular returns |
| Projects and flats | flats for sale in [AREA] |

## 10. Language

To be decided in Phase 0.

- **One language:** nothing extra needed.
- **Bangla and English:** separate URLs (`/en/...` and `/bn/...`), `hreflang` tags linking each page to its translation, and a translated title and description for every page. Every page's content must exist in both languages, which doubles the content work for the client.

## 11. Measurement

- [ ] Google Search Console verified through a DNS TXT record in Cloudflare, and the sitemap submitted
- [ ] Google Analytics 4 installed
- [ ] Meta Pixel installed, for the Facebook ads that will drive most traffic
- [ ] Every request form submission tracked as a conversion, labelled by service

## 12. Launch checklist

- [ ] Lighthouse run on mobile for home, one service page and one project page
- [ ] No page accidentally left `noindex` from staging
- [ ] Staging is **not** indexed: `staging.arcdevltd.com` is `noindex` or behind a password
- [ ] Sitemap opens, and contains real URLs, not staging ones
- [ ] Every public page has a unique title and description
- [ ] Share previews checked on Facebook and WhatsApp
- [ ] Search Console shows no crawl errors a week after launch
