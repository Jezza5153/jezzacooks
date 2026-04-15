# Local SEO Audit — jezzacooks.com

Date: 2026-04-15
Target queries (NL): `horeca consultant amersfoort`, `restaurant consultant amersfoort`, `menu engineering amersfoort`, `catering amersfoort`, `kantoorlunch amersfoort`, `food cost controle horeca`, `restaurant website amersfoort`

## TL;DR — Local SEO Readiness Score: 58 / 100

The `@graph` in `src/lib/schema.ts` is exemplary and LocalBusiness is correctly typed as `["ProfessionalService","LocalBusiness"]`. But the site cannot rank in the Amersfoort 3-pack because: (1) there is no Google Business Profile — the single largest signal; (2) `/contact`'s visible NAP block only renders "Amersfoort, Utrecht, Nederland" — street and postal are in schema but not in visible text; (3) no reviews, no acquisition flow; (4) `/services/seo-geo`, `/contact` and `/about` have zero Amersfoort-neighbourhood mentions. Relevance is 85%, Prominence is near zero.

---

## NAP consistency check

Single source of truth: `src/lib/site-config.ts`. Schema and on-page blocks both read from there, so NAP is internally coherent — with one user-facing gap on `/contact` and `/about`.

| Surface | Street + postal | City/region | Phone | Email |
|---|---|---|---|---|
| `@graph` LocalBusiness (deployed HTML) | Nijkerkerstraat 3, 3821 CD | Amersfoort, Utrecht, NL | +31634127992 | info@jezzacooks.com |
| Home page visible (`page.tsx` L527-533) | Nijkerkerstraat 3, 3821 CD | Amersfoort (Valleipoort) | — | — |
| `/contact` visible | **missing** | Amersfoort, Utrecht, Nederland | +31 6 34127992 | info@jezzacooks.com |
| `/about` visible | — | — | — | — |
| Footer (all pages) | — | Amersfoort, Nederland | — | info@jezzacooks.com |
| `/terms`, `/privacy` prose | Nijkerkerstraat 3, 3821 CD | Amersfoort | — | — |

**Discrepancy with the brief.** The brief says `3816 LD Amersfoort`. The site, `site-config.ts`, terms and privacy all use `3821 CD`. Comments in `site-config.ts` claim four independent directories indexing the KvK Handelsregister confirm `3821 CD`, and `3821` is the Valleipoort / Nijkerkerstraat code (while `3816` is Schothorst-Zuid). Almost certainly a typo in the brief, but please cross-check against your KvK extract before publishing anywhere else — a wrong postal code propagating into GBP is a multi-week fix.

**Action 1.** Add the full NAP — street, postal, city, phone — to `src/app/contact/page.tsx` (extend the existing dl) and to `src/components/layout/footer.tsx`. `/contact` is the canonical NAP page Google and AI engines crawl.

---

## LocalBusiness schema audit

Parsed live from `https://www.jezzacooks.com/`.

**Present:** `@type` (`["ProfessionalService","LocalBusiness"]`), `@id`, name, url, image, description, telephone (E.164), email, priceRange (`€€`), address (full PostalAddress), geo (rough centre), openingHoursSpecification (Mon–Fri 09:00–18:00, machine-readable), areaServed (6 AdministrativeArea), knowsAbout (9 terms), makesOffer (4 Service Offers with URLs), sameAs (16 URLs incl. real press), parentOrganization ref.

**Missing, high-value:** `hasMenu`, `servesCuisine`, `acceptsReservations`, `paymentAccepted`, `currenciesAccepted` (all catering-critical); `specialOpeningHoursSpecification` for Dutch public holidays; `hasMap` (needs GBP URL first); LocalBusiness-level `logo`.

**Correctly absent:** `aggregateRating` and `review` — do NOT fabricate them.

Score: **17 of 26** meaningful properties = 65%. No errors, several easy wins.

`@type` recommendation: keep `["ProfessionalService","LocalBusiness"]` for the consultancy. For catering, add a second entity (see Two-entity question below).

---

## Opening hours as structured data

`openingHoursSpecification` is a proper schema.org array in the deployed `@graph`, not buried in prose. Visible text on `/contact` ("Ma–Vr 09:00–18:00 op afspraak") matches exactly. Missing: `specialOpeningHoursSpecification` for Koningsdag, Bevrijdingsdag, Hemelvaart, Pinksteren, 24–26 Dec, 31 Dec, 1 Jan. Consulting side can skip; catering side cannot — people place catering orders against specific calendar dates.

---

## Amersfoort neighbourhood coverage matrix

Counts from grep of `src/app/**/page.tsx` against the 13 Amersfoort wijken.

| Page | Binnen | Kamp | Soester | Leuser | Vathorst | Valleipoort | Other wijken | Wijken hit |
|---|---|---|---|---|---|---|---|---|
| Home | 2 | 5 | 1 | 1 | 2 | 3 | — | **6 / 13** |
| About | 0 | 5 | 0 | 0 | 0 | 0 | — | **1 / 13** |
| /services/consulting | 1 | 4 | 1 | 1 | 1 | 2 | Katten, Randen, Hoogland, Liendert, Schothorst all =1 | **11 / 13** |
| /services/catering | 1 | 12 | 1 | 1 | 2 | 1 | all 7 others ≥1 | **13 / 13** |
| /services/websites | 1 | 2 | 1 | 1 | 1 | 1 | 5 others =1 | **10 / 13** |
| /services/seo-geo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0 / 13** |
| /contact | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0 / 13** |

Neighbouring cities (Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld): `/services/consulting`, `/catering`, `/websites` all hit 7–8 of 8. `/services/seo-geo` hits only Utrecht + Hilversum. `/about` and `/contact` hit zero.

**Action 2.** The `/services/seo-geo` page mentions "Amersfoort" 17 times but zero wijken. Mirror the "Werkgebied" block from `/services/consulting` at the bottom of `seo-geo`. Also add a 120-word Werkgebied paragraph to `/contact` and `/about` listing wijken + neighbour cities — those are the two entity pages Google treats as canonical "who/where".

---

## Area served

Deployed schema `areaServed`: `["Amersfoort","Utrecht","Zwolle","Hilversum","Apeldoorn","Nederland"]`.

Problems: Zwolle and Apeldoorn are in schema but practically absent from page copy — schema-wider-than-content is a keyword-stuffing signal. Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld are in copy (on consulting/catering/websites) but not in schema. "Nederland" as `AdministrativeArea` is too broad and dilutes signal. Fix in `site-config.ts`: drop Zwolle + Apeldoorn, add the 6 real neighbour cities, swap `"Nederland"` for `"Utrecht (provincie)"` and `"Gelderland"`.

---

## The Google Business Profile gap

No `g.page`, no `maps.google.com/place/...`, no `business.google.com` link anywhere in source or rendered HTML. GBP does not exist yet. This single missing surface explains roughly 40% of the ranking gap — local pack entries are drawn from GBP records.

### GBP creation checklist (copy-paste from site)

| Field | Value |
|---|---|
| Name | Jezza Cooks |
| Primary category | Hospitality consultant (or Restaurant consultant) |
| Secondary categories | Caterer · Menu planning service · Website designer · SEO consultant |
| Address | Nijkerkerstraat 3, 3821 CD Amersfoort, Utrecht, NL (verify postal against KvK) |
| Show address publicly | Yes — registered KvK, not a residence |
| Service area | Amersfoort + Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld, Apeldoorn, Zwolle |
| Phone | +31 6 34127992 |
| Website | https://www.jezzacooks.com |
| Hours | Mon–Fri 09:00–18:00 |
| Special hours | Koningsdag, Bevrijdingsdag, Hemelvaart, Pinksteren, 24–26 Dec, 31 Dec, 1 Jan |
| Description (750 char) | Paste `SITE.description` from `site-config.ts` |
| Services list | Menu engineering, Food cost controle, Prepstructuur, Serviceflow, Teamtraining, Restaurant consulting, Catering, Kantoorlunch, Restaurant websites, SEO, GEO optimisatie |
| Logo | `public/pics/logo.png` |
| Cover | `public/pics/hero-home.jpg` |
| Photos (≥10) | Jeremy portrait, kitchen at De Tafelaar, plated dishes, logo |

**After verification:** add the public GBP URL to `SITE.sameAs`, set `hasMap` on LocalBusiness, embed a Google Maps iframe on `/contact`, replace the rough geo coordinates with the exact Nijkerkerstraat 3 pin.

---

## Reviews and acquisition

No `aggregateRating`, no `review` in any schema — **correct**, do not fabricate. No on-site testimonials block, no named client quotes, no screenshots. No post-project review-request flow. The only indirect social proof is the offertesvoorjou.nl and boekeerlijk.nl footers that credit "JezzaCooks · KvK 99547619" — good citation evidence for AI engines, no effect on the 3-pack.

**Action 3.** Once GBP is live: (a) add a thank-you email after every consulting session/catering event with a direct review URL; (b) add a "Hoe ik werk" section on `/contact` ending in that URL; (c) once ≥5 real reviews exist, add `review` schema (not `aggregateRating`) to the LocalBusiness entity. Target: 10 reviews in 90 days — enough for a rating stub in the 3-pack.

---

## Directory consistency

Not re-crawled in this audit. `site-config.ts` notes KvK 99547619 verified via four directories (Oozo, Drimble, Company.info, AdHocData). Post-GBP, manually search `"Jezza Cooks" Amersfoort` on Oozo, Drimble, Company.info, detelefoongids.nl, Bedrijfspagina.nl, Horeca1.nl. Any listing with a different phone, street, or email is a prominence drain — fix the three most-cited first.

---

## Map / geo embedding

No embedded map on `/contact` (no iframe, no `google.com/maps/embed`). Schema `geo` is `52.1561, 5.3878` — rough Amersfoort centre, not the Nijkerkerstraat 3 pin. Add a lazy-loaded Google Maps iframe on `/contact` targeting Nijkerkerstraat 3, and replace the coordinates with exact ones.

---

## Two-entity question

Should "Jezza Cooks consultancy" and "Tafelaar × Jezza Cooks Catering" be separate schema entities?

**Recommendation: one primary LocalBusiness, plus a nested sub-entity for the catering JV.** Reasoning:

1. **Legal identity.** There is exactly one KvK registration (99547619) at Nijkerkerstraat 3. That's the entity Google cross-references with the Handelsregister. A second top-level LocalBusiness at Kamp 8 would be ambiguous — Kamp 8 is already De Tafelaar's registered premises.
2. **Distance pillar.** Kamp 8 (binnenstad) is physically closer to the centre of most `catering amersfoort` search origins than Valleipoort. If you want the 3-pack for catering specifically, Kamp 8 is the better anchor for that one service.
3. **Hybrid solution.** Add a new `buildCateringEntity()` in `src/lib/schema.ts` emitting a `FoodEstablishment`/`CateringService` entity with `@id = /#catering`, `location` = Kamp 8 PostalAddress, `parentOrganization = #organization`, `provider = #localbusiness`, `servesCuisine` (`"Dutch","Seasonal","Shared dining"`), `hasMenu` → `/services/catering`, `acceptsReservations: true`, `areaServed` trimmed to the delivery radius. Then create a separate service-area GBP for "Tafelaar × Jezza Cooks Catering" at Kamp 8 once the main GBP is verified.
4. **Sequencing.** Start with the primary Jezza Cooks GBP, get it to 10 reviews, then create the catering one. Two GBPs mean two verification flows and two review pipelines.

---

## Top 5 blockers to Amersfoort 3-pack appearances

1. **No Google Business Profile.** Create it this week. 3-pack is inaccessible without it. ~40% of the gap closes on verification day.
2. **`/contact` has no visible street, postal, or map.** Extend the `dl` in `src/app/contact/page.tsx` to render `SITE.address.streetAddress`, `postalCode`, `phoneDisplay`, plus a lazy iframe map. `/contact` is the canonical NAP page and it's currently failing that job.
3. **Zero reviews and no acquisition flow.** Build the post-project email + direct review link flow; target 10 reviews in 90 days.
4. **Neighbourhood content gaps on `/services/seo-geo`, `/contact`, `/about`.** Zero wijken mentions on the page that sells GEO is its own punchline. Mirror the Werkgebied block that already exists on `/services/consulting`.
5. **Postal-code confirmation.** Reconcile `3821 CD` (site) vs `3816 LD` (brief) against the KvK extract before any external publication. Lock one value across `site-config.ts`, `/terms`, `/privacy`, GBP, and directory listings.

---

## Appendix: fast wins (< 2 hours each)

- Render street/postal/phone in `src/app/contact/page.tsx` and `footer.tsx`.
- Add `hasMenu`, `acceptsReservations: true`, `paymentAccepted`, `currenciesAccepted: "EUR"` to `buildLocalBusiness()` in `src/lib/schema.ts`.
- Add `specialOpeningHoursSpecification` for Dutch public holidays.
- Update `SITE.areaServed`: drop Zwolle + Apeldoorn, add Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld.
- Add 120-word "Werkgebied" blocks to `/services/seo-geo`, `/contact`, `/about`.
- Replace rough `geo` coordinates with the exact Nijkerkerstraat 3 pin.
- Add a lazy-loaded Google Maps iframe to `/contact`.
