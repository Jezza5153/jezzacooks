# Jezza Cooks — SEO/GEO team handoff (2026-04-15 baseline)

**Audit baseline date**: 2026-04-15. **Use this date as the reference for "as of"; re-verify all live third-party facts on the execution date.**

**Audience**: jezzacooks devs + external SEO/GEO consultants

**Status snapshot**: 18+ commits shipped this iteration. Aggregate internal score ~92/100. Ranking 2/30 commercial queries (both pure brand). All on-page work is at or near ceiling. The ranking gap is **off-site discovery + entity trust**, not on-page weakness.

---

## Executive summary

Per Google's own [local search ranking model](https://support.google.com/business/answer/7091) (relevance + distance + prominence), Jezza Cooks scores high on relevance (perfect schema, deep content, Q-format H2s, passage extraction) but near-zero on prominence (no GBP, no own Trustoo, 0 third-party directory profiles, no editorial backlinks). 19 of 30 tested queries are "discovery-dependent" — they require local pack / Maps / directory presence to surface — and we're in 0 of those 19.

The Tier 5H content+code work shipped today closes the on-page side of the gap further (3 new attackable-query landings + cross-pillar linking + schema fix). The remaining ranking work is **off-site, user-gated, and starts the same day as code task #1** — see Deliverable C in `/Users/jezza/.claude/plans/encapsulated-hopping-candle.md` and the extended `docs/ov-profile-correction-2026-04-15.md`.

---

## Critical rules — read before changing anything

### Date freshness rule

> Anything in this document referring to a specific factual claim with a date — Trustoo review count, profile URLs, GBP category labels, phone numbers, redirects, platform availability — must be **re-verified on the execution date**, not copied from the 2026-04-15 audit baseline. The filename date marks when the audit ran. Live data drifts.

### Review-count source rule

> De Tafelaar's review-count is source-specific. **96** is the number currently in our schema's `aggregateRating` (committed in Tier 5E). **102** is what Trustoo showed live on 2026-04-15. Never mix these counts across Jezza Cooks, De Tafelaar, Trustoo, or OffertesVoorJou. Re-verify the live count from `https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/` on the execution date. **Do NOT blindly copy third-party review counts into JSON-LD.** Only update `memberOf.aggregateRating.reviewCount` if (a) the rating/count is visibly shown on the page, (b) clearly attributed to De Tafelaar/Trustoo, and (c) passes schema validation. Treat `AggregateRating` here as **entity clarity, not a guaranteed Google review rich-result lever** — Google's review-snippet rules disallow self-controlled aggregation of third-party reviews.

### FAQ schema honesty

> FAQPage schema is included for **passage extraction and LLM answer-engine clarity**, not for Google rich-result visibility. Google's current documentation limits FAQ rich results to well-known, authoritative government-focused or health-focused websites. Keep the FAQs for semantic coverage and conversion clarity, but do not expect normal FAQ rich snippets for Jezza Cooks.

### Schema entity types — allowed list (canonical schema.org primitives only)

`Person` (with `jobTitle: "Chef"` for chef bio) · `Organization` · `LocalBusiness` · `Restaurant` · `FoodEstablishment` · `FoodService` · `Service` (with `serviceType: "Catering"` etc.) · `Article` · `FAQPage` · `BreadcrumbList` · `WebSite` · `WebPage` · `ContactPage` · `EducationalOccupationalCredential` · `AggregateRating` · `Offer` · `OpeningHoursSpecification` · `PostalAddress` · `GeoCoordinates` · `QuantitativeValue`

**Do NOT use fabricated types** like `Chef` or `CateringService`. The Tier 5H ship just removed a `["FoodEstablishment", "CateringService"]` multi-type from `buildCateringEntity()` because `CateringService` is not a canonical schema.org primitive — replaced with `["FoodEstablishment", "Service"]` + `serviceType: "Catering"`.

### OffertesVoorJou stale-data leak

The OV profile still shows "opgericht in 2019 / 7 jaar ervaring" — confirmed by ChatGPT discovery test. Every LLM that cross-references OV repeats it. **User-action gated**. Correction template lives in `docs/ov-profile-correction-2026-04-15.md`.

---

## What shipped today (Tier 5A → 5H)

### Tier 5A — deploy fixes
- `next.config.ts`: AVIF format support, image compression
- All 4 previously-404 pages (`/services/seo-geo`, `/menu-engineering`, `/portfolio`, `/privacy`) now live
- Hero images compressed
- Sitemap regenerated

### Tier 5B — technical schema
- `src/lib/schema.ts`: `Place.City` → `Place.AdministrativeArea`
- `/services` heading hierarchy fix (`<h2>` instead of skipped `<h1>` → `<h3>`)
- `Person.hasCredential` for Euro-Toques + Angler Stirling
- `Person.sameAs` deduplication

### Tier 5C — content overhaul
- `src/app/food-cost-controle/page.tsx` — NEW pillar page (~3,500 words, FAQPage + Article schema)
- `src/app/menu-engineering/page.tsx` — localized for Amersfoort with Chef & Serve case study
- Q-format H2s on 4 service pages
- Pricing tables: `/services/consulting`, `/services/websites`, `/services/seo-geo`
- `/about` FAQ section (5 long-form Q&As)
- `/portfolio` intro passage
- `/contact` Werkgebied block
- `src/lib/schema.ts`: `buildCateringEntity()` — joint-venture FoodEstablishment

### Tier 5D — catering enhancement
- Chef bio passage with 4 inline press anchors at point of claim
- Differentiation section ("Waarom Tafelaar × Jezza?")
- 5 event use cases
- 4 new operational FAQs

### Tier 5E — third-party validation
- Trustoo `aggregateRating` (9.8/96) attached to **`memberOf` Restaurant entity** (NOT to Jezza Cooks — schema-correct attribution; see review-count source rule)
- `/about` verification grid: KvK + press + Trustoo
- Home page "Verifieerbaar bij derden" strip
- Timeline reconciliation passage explaining 2015/2019/2026 timeline (chef-kok since ~2015, digital builder via OV since 2019, Jezza Cooks eenmanszaak KvK Jan 2026)

### Tier 5F — big events
- "Kunnen jullie ook grote en high-risk events aan?" section + 6 operational FAQs
- `numberOfEmployees: 10` schema for De Tafelaar memberOf

### Tier 5G — discovery surface
- Above-fold capability strip on `/services/catering` (6 chips: Trustoo / 10-staff / 10-150+ / backup-chef / KHN-HACCP / response-<1u)
- "Welke soorten catering doen we?" 10-category discovery grid

### Tier 5H — attackable-query landings (this commit cycle)
- `src/app/services/catering/kantoorlunch-amersfoort/page.tsx` — NEW landing targeting "kantoorlunch amersfoort" (tafelaaramersfoort.nl ranks #1; we ride via partner cross-link). 13-wijken delivery list, 4-step process, 6 FAQs.
- `src/app/services/catering/private-chef-amersfoort/page.tsx` — NEW landing targeting "private chef amersfoort" (top 3 are aggregator platforms; we attack with named chef + verifiable credentials). Pricing table, 4-step process, 8 FAQs.
- `src/app/services/websites/restaurant-website-laten-maken/page.tsx` — NEW landing targeting "restaurant website laten maken Amersfoort" (top 3 are thin auto-generated sites). 5 client case studies, timeline, 7 FAQs.
- `src/app/services/catering/page.tsx` — "Ons partner-restaurant" callout above Trustoo strip with explicit deep-link to tafelaaramersfoort.nl + 3 new long-form FAQs (annulering, verzekeringen, reistoeslag)
- `src/lib/schema.ts` — **schema bug fix**: `["FoodEstablishment", "CateringService"]` → `["FoodEstablishment", "Service"]` + `serviceType: "Catering"`. CateringService is not a canonical schema.org type.
- `ui` constants exported from `src/app/services/catering/page.tsx` so child landings reuse without cloning Tailwind
- `scripts/seo-baseline.ts` — added 4 new URLs to `PAGESPEED_URLS`
- Cross-pillar inline anchors on `/menu-engineering` + `/food-cost-controle` (kantoorlunch landing now has 5 inbound internal links)

### Tier 5H — DEFERRED items (with rationale)
- **P1 #4 (Catering CWV mobile 79→85+)**: deferred. The catering page has only 1 image (hero logo), no below-fold images, no iframes. The Accordion is already client-hydrated by Radix. Agent 1's own diagnosis estimated max 3-5 points improvement (within noise band). Going higher requires reducing content (kills SEO) or splitting accordion to `next/dynamic ssr: false` (would remove FAQPage from server-rendered HTML, kills GEO). Net: not worth refactor for noise-band CWV gain.
- **P3 #11 (Compression assertion in harness)**: deferred. Vercel CDN handles gz/br at the Edge automatically; jezzacooks.com is hosted on Vercel; therefore compression is verified by platform. Adding a header-assertion in the harness was specified as "verify only, not a fix" — verification value vs. harness complexity isn't worth it.

---

## Per-query ranking diagnosis (30 queries, harness 2026-04-15)

**Source**: `docs/seo-baseline-2026-04-15-tier5c.json` + Phase 1 Agent 1 analysis

### 5 attackable queries (P0/P1 targets)

| Query | Win prob | Timeline | What we have | What's still needed (off-site) |
|---|---|---|---|---|
| "menu engineering amersfoort" | **70%** | 4-6 wk | 3,600w pillar localized, Chef & Serve case study, FAQPage, real pricing | Brand age + 1-2 backlinks |
| "horeca consultant amersfoort" | 60% | 6-8 wk | Bonico #1 has no H1 + 658w + no schema; we beat that decisively | GBP + brand age |
| "restaurant website laten maken Amersfoort" | 55% | 8-12 wk | NEW landing with 5 case studies + Article schema | GBP + 1-2 backlinks |
| "kantoorlunch amersfoort" | 45% | 8-12 wk | NEW landing + tafelaaramersfoort.nl ranks #1 (cross-link) | GBP + reciprocal Tafelaar link |
| "private chef amersfoort" | 40% | 12+ wk | NEW landing with named chef + 4 inline press anchors | GBP + brand age |

### 5 deprioritized queries (skip)
- "restaurant consultant nederland" — DA fight, national scope
- "horeca consultancy nederland" — DA fight, national scope
- "wat is generative engine optimization" — info-intent, no commercial fit
- "goedkope restaurant website" — marketplace dominance (Groupon, etc.)
- "bonico horeca alternatief" — competitor brand query

### 19 discovery-dependent queries (blocked off-site)
Includes: "catering amersfoort" head term, "kantoorlunch amersfoort" head, "private chef amersfoort", "horeca consultant amersfoort", "menu engineering amersfoort" — all require GBP / Trustoo / Eventplanner / Maps presence to surface in first-pass discovery results. **Code can't fix discovery** — only the off-site action plan in Deliverable C can.

---

## The off-site gap

Per Phase 1 Agent 2 audit:

| Platform | Jezza Cooks | De Tafelaar | Avg competitor |
|---|---|---|---|
| Google Business Profile | ❌ Absent | ✅ 4.8/90+ reviews | ✅ 4-5 of 5 competitors |
| Trustoo profile | ❌ Absent | ✅ 9.8 / 96 reviews / TOP PRO 2026 | 2-3 of 5 |
| GoudenGids | ❌ Absent | ❌ | 0-1 of 5 |
| Yelp | ❌ Absent | ❌ | 0 (NL low-coverage) |
| Eventplanner.net | ❌ Absent | ✅ Listed | 1 of 5 (Floris en van Maurik) |
| Meetings.nl | ❌ Absent | ✅ Listed | 0 of 5 |
| TripAdvisor | ❌ Absent | ✅ 34k+ reviews | 0 (NL caterers rarely listed) |
| Eet.nu | ❌ Absent | ❌ | 0-1 |
| Telefoonboek.nl | ❌ Absent | ✅ Listed | 1 of 5 |
| Editorial backlinks | 0 confirmed | 4 NL press + 4 AU press | 2-5 each |

**Diagnosis**: Jezza Cooks has 0 third-party directory profiles. De Tafelaar has 5. The competitors that show up in ChatGPT's first-pass discovery list have 1-5 each. **The directory-presence gap is the single biggest ranking blocker.**

**Action plan**: see `docs/ov-profile-correction-2026-04-15.md` Tier 5H 5-platform section.

---

## Roadmap (Tier 5H+)

This iteration shipped:
1. ✅ **Code**: 3 new attackable-query landings + 1 schema bug fix + 5 cross-pillar links + harness expansion + 3 catering FAQs (P0/P1/P2 batches)
2. ⏳ **User actions** (gated, not started yet): GBP, Trustoo, Eventplanner, Meetings.nl, Eet.nu — see `docs/ov-profile-correction-2026-04-15.md` Tier 5H section

**Next iteration (Tier 5I+, after off-site lands)**:
1. Earned media — pitch to indebuurt.nl Amersfoort + Misset Horeca + AD.nl Amersfoort food editor (3-6 month timeline)
2. Review acquisition flow on Jezza-owned GBP and Trustoo profiles (target 5 reviews in 30 days post-GBP)
3. LinkedIn Company Page for Jezza Cooks (E-E-A-T)
4. Consider second pillar pages (`/restaurant-prepstructuur`, `/horeca-consultant-amersfoort`) only after Tier 5H lands and harness re-measures

**Defer indefinitely (out of scope until ROI shifts)**:
- hreflang nl-BE / EN — risk of canonical dilution unless international scope confirmed
- Catering page mobile CWV refactor — already at functional ceiling for content density
- Compression assertion in harness — Vercel CDN handles automatically

---

## References — do not duplicate

- `docs/audit-technical-2026-04-15.md` (Agent B — technical SEO audit)
- `docs/audit-content-2026-04-15.md` (Agent C — content + passage extraction)
- `docs/audit-local-2026-04-15.md` (Agent D — local SEO + NAP)
- `docs/audit-eeat-2026-04-15.md` (Agent E — E-E-A-T + authority)
- `docs/audit-competitive-2026-04-15.md` (Agent F — competitive gap)
- `docs/geo-seo-research-2026-04-15.md` (Agent A — 2026 freshness research)
- `docs/geo-seo-scorecard-2026-04-15-full.md` + `docs/geo-seo-scorecard-2026-04-15-tier5c.md` (consolidated scorecards)
- `docs/seo-baseline-2026-04-14.json` (pre-deploy baseline) + `docs/seo-baseline-2026-04-15-tier5c.json` (Tier 5C post-deploy)
- `docs/ov-profile-correction-2026-04-15.md` (NAP + GBP + Trustoo + Eventplanner + Meetings.nl + Eet.nu templates — extend, don't rewrite)
- `/Users/jezza/.claude/plans/encapsulated-hopping-candle.md` (the approved Tier 5H plan)

---

## Glossary + harness pointer

**Run the harness**:
```bash
npx tsx scripts/seo-baseline.ts
```
Outputs JSON to `docs/seo-baseline-<UTC-date>.json`. Compares week-over-week deltas across 30 queries + 12 PageSpeed URLs.

**Glossary**:
- **Passage extraction** — LLMs (ChatGPT, Perplexity, Google AI Mode) chunk pages into ~130-167 word passages to cite. Q-format H2s + standalone answer paragraphs maximize extraction probability.
- **AIO** — Google AI Overviews. Currently 0 of our 30 queries trigger AIO in the NL locale (per harness).
- **AI Mode** — Google's conversational mode (different from AIO). Same NL-locale absence.
- **Fan-out coverage** — single search query expands to multiple sub-queries inside the LLM. Cover the sub-queries with FAQ entries to capture citation share.
- **Discovery vs evaluation** — discovery = "does the LLM/SERP know we exist?"; evaluation = "once we're prompted, what does the LLM say about us?". We're winning evaluation, losing discovery.
- **GBP** — Google Business Profile. Currently absent. Single biggest ranking blocker.

---

**Last updated**: 2026-04-15. Audit data in this document is source-tagged with that date. **Re-verify all live third-party facts on execution date** before action.
