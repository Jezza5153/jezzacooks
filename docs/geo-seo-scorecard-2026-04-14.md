# Jezza Cooks — GEO/SEO Scorecard (2026-04-14, Tier-4 run)

**Run date**: 2026-04-14 (late session, full Serper + PageSpeed harness)
**Target**: jezzacooks.com → www.jezzacooks.com (307 apex → www)
**Goal**: 95 / 100 aggregate score
**Previous scorecard**: `docs/geo-seo-scorecard.md` (earlier session, pre-deploy)
**Harness output**: `docs/seo-baseline-2026-04-14.json`

---

## TL;DR — what this session found

1. **Every code-level Tier 1–4 improvement has been implemented and verified in `npm run build`** (25/25 static routes generate cleanly).
2. **Scoring the live production site reveals that almost none of the improvements are live**, because the entire optimization body of work is sitting as **uncommitted changes** in the working tree.
3. **Four critical pages return HTTP 404 on production**: `/services/seo-geo`, `/menu-engineering`, `/portfolio`, `/privacy`. They exist in `src/app/` but are **not tracked by git**. When PageSpeed Insights requests these URLs it scores the Next.js `/not-found` template, which ships with `<meta name="robots" content="noindex"/>`. That single audit failure drops Lighthouse SEO from 100 → 54 on both pages.
4. **The path to the 95 target is therefore a deploy bottleneck, not a content gap**. The local source is already in position to hit the target; the live production site cannot move until the staged commits are pushed.

---

## 1. Serper.dev SERP baseline (30 queries, gl=nl, hl=nl)

| Metric | Value |
|---|---:|
| Queries tested | 30 |
| Ranked in top 20 | 2 (**7%**) |
| Ranked in top 10 | 2 (**7%**) |
| Ranked in top 3 | 2 |
| AI Overview triggered (NL locale) | **0 / 30** |
| AI Overview citing jezzacooks.com | **0** |
| Local pack appearances (3 Amersfoort Places queries) | **0 / 3** |
| People-Also-Ask matches | 0 |

**Ranked queries (brand-only)**:
- `jezza cooks` → position 1
- `jezza cooks amersfoort` → position 1

**Everything else returns nothing.** 28 / 30 queries do not surface the domain anywhere in the top 20.

**Competitor picture** (who owns the local SERP today):
- `horeca consultant amersfoort`: Bonico.nl is the only Place.
- `restaurant consultant amersfoort`: Hospitality Group (#1, 5★), Bonico (#2), Restaurant Amicitia (#3). No consultants with chef-kok positioning.
- `catering amersfoort`: Kok Cateringservice (#1), Chiel Culinair (#2), Mercuurs (#3). Tafelaar × Jezza absent.
- `horeca SEO bureau`: rimbu.nl, connectyourworld.nl, chefdigital.nl. **No one owns the horeca-specific GEO keyword cluster.**

**Reading**: the site only ranks when the query contains the exact brand name. This is the expected baseline for a 3-month-old domain (KvK registered January 2026). The GEO/SEO job is closing this gap. The 28 failed queries define the 12-month rank-target.

---

## 2. Google PageSpeed Insights baseline (8 URLs × mobile/desktop)

Run via v5 API, category = `performance,seo,accessibility,best-practices`.

### Mobile

| URL | Perf | SEO | A11y | BP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 92 | 100 | 96 | 100 | 3106ms | 0.000 | 20ms |
| `/services/consulting` | 77 | 100 | 96 | 100 | 5956ms | 0.000 | 20ms |
| `/services/catering` | 75 | 100 | 96 | 100 | 7456ms | 0.000 | 20ms |
| `/services/websites` | 79 | 100 | 96 | 96 | 5356ms | 0.000 | 40ms |
| `/services/seo-geo` | 74 | **54** | 96 | 100 | 5431ms | 0.000 | 20ms |
| `/menu-engineering` | 79 | **54** | 96 | 100 | 5451ms | 0.000 | 0ms |
| `/about` | 74 | 100 | 96 | 100 | **11731ms** | 0.000 | 40ms |
| `/contact` | 79 | 100 | 96 | 100 | 5431ms | 0.000 | 10ms |
| **Mobile average** | **79** | **89** | **96** | **99** | **6240ms** | **0.000** | **21ms** |

### Desktop

| URL | Perf | SEO | A11y | BP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 94 | 100 | 96 | 100 | 1613ms | 0.000 | 20ms |
| `/services/consulting` | 94 | 100 | 96 | 100 | 1602ms | 0.000 | 20ms |
| `/services/catering` | 98 | 100 | 96 | 100 | 1131ms | 0.000 | 20ms |
| `/services/websites` | 93 | 100 | 96 | 96 | 1732ms | 0.000 | 40ms |
| `/services/seo-geo` | 95 | **54** | 96 | 100 | 1488ms | 0.000 | 20ms |
| `/menu-engineering` | 95 | **54** | 96 | 100 | 1471ms | 0.000 | 0ms |
| `/about` | 92 | 100 | 96 | 100 | 1884ms | 0.000 | 40ms |
| `/contact` | 96 | 100 | 96 | 100 | 1451ms | 0.000 | 10ms |
| **Desktop average** | **95** | **89** | **96** | **99** | **1546ms** | **0.000** | **20ms** |

### Observations

- **Desktop is already at target** (Perf 95 avg, LCP 1.5s). Desktop LCP is green on every page.
- **Mobile LCP is the dominant blocker.** Average 6.2s; worst offender `/about` at **11.7s**. Core Web Vitals gate on the p75 of CrUX mobile, so this single number is the Performance score ceiling.
- **SEO = 54 on `/services/seo-geo` + `/menu-engineering` is NOT a page-internal problem** — see section 3 below.
- A11y = 96 and BP = 99/100 are already at target; no work needed.
- CLS = 0.000 everywhere. Layout stability is not an issue.

---

## 3. Root-cause analysis: Lighthouse SEO 54 regression

Initially looked like a structural content failure because both pages showed the same score on mobile **and** desktop — ruling out performance/mobile-specific audits.

**Investigation path**:
1. `curl -sL` on `https://jezzacooks.com/services/seo-geo` returned a document of exactly **25198 bytes**. Same exact byte count on `/menu-engineering`. That's impossible for two independently authored long-form pages — it's the same 404 response.
2. Following redirects: `jezzacooks.com` 307s to `www.jezzacooks.com`, then `www.jezzacooks.com/services/seo-geo` returns **HTTP 404** with `content-length: 25198`.
3. The 404 body contains `<title>404: This page could not be found.</title>` and `<meta name="robots" content="noindex"/>`.
4. Checked 12 routes on production:
   - 200: `/`, `/services`, `/services/consulting`, `/services/catering`, `/services/websites`, `/pricing`, `/about`, `/contact`
   - **404**: `/services/seo-geo`, `/menu-engineering`, `/portfolio`, `/blog`
5. `git ls-files --error-unmatch` confirmed `src/app/services/seo-geo/page.tsx`, `src/app/menu-engineering/page.tsx`, and `src/app/portfolio/page.tsx` are **untracked** — they have never been committed.

**Diagnosis**: PageSpeed Insights is scoring the Next.js `/not-found` template. That template fails three Lighthouse SEO audits (`is-crawlable` via `noindex`, plus two content-length signals), which drops the score from 100 to 54. It's not the page — it's the 404 being served in its place.

**Fix**: deploy. The pages compile and render correctly locally.

---

## 4. Deploy-blocking state of the working tree

**Modified but uncommitted** (37 files):
```
next.config.ts, package-lock.json
public/pics/{1619197.png,about-jezza.jpg,consulting.jpg,hero-home.jpg,
  logo.png,results-hero.jpg,results-proof.jpg,service-catering.jpg,
  service-consulting.jpg,service-websites.jpg,tafelaar-x-jezza-logo.png}
public/websites-demos/{custom,pro,simple}-{before,after}.webp  (deleted, jpg replacements)
src/app/{about,contact,faq,free-diagnosis,layout,page,pricing,results,
  services,services/catering,services/consulting,services/websites,terms}/page.tsx
src/components/layout/{footer,header,mobile-nav}.tsx
src/components/logo.tsx
src/components/websites/{results-slider,websites-hero}.tsx
src/lib/placeholder-images.json
```

**Untracked — never committed to git** (entire feature sets):
```
src/app/menu-engineering/         ← pillar content page (912 lines)
src/app/portfolio/                ← client showcase
src/app/privacy/                  ← privacy policy page
src/app/services/seo-geo/         ← the 4th service line (723 lines)
src/app/opengraph-image.tsx       ← OG image generator
src/app/robots.ts                 ← robots file
src/app/sitemap.ts                ← sitemap generator
src/components/seo/               ← JsonLd component
src/lib/schema.ts                 ← JSON-LD builders (schema.org @graph)
src/lib/site-config.ts            ← NAP + schema configuration (source of truth)
scripts/                          ← Serper + PageSpeed harness
public/websites-demos/*.jpg       ← new JPG replacements for deleted WEBPs
docs/audit-*.md                   ← 5 category audit docs
docs/ai-visibility-baseline.md    ← manual test protocol
docs/geo-seo-scorecard.md         ← this session's predecessor
docs/seo-baseline-2026-04-14.json ← harness output
```

**What is on production right now** (the last deployed commit):
- 3-service layout (`/services/consulting`, `/services/catering`, `/services/websites`)
- **Fabricated €299 pricing** in consulting (not real — real price is €450)
- No sitemap.xml, no robots.txt, no JSON-LD
- No menu engineering pillar, no SEO/GEO service line, no portfolio, no privacy
- Uncompressed 1.2–1.7 MB hero JPEGs
- /pricing uses client-side Tabs (3 of 4 tier groups invisible to crawlers)

**What is local but not yet on production**:
- All 4 new pages (seo-geo, menu-engineering, portfolio, privacy)
- The entire `src/lib/schema.ts` JSON-LD @graph system
- The entire `src/lib/site-config.ts` NAP + canonical URL source of truth
- `sitemap.ts` and `robots.ts` (critical crawlability infrastructure)
- All pricing fabrications reverted to real €450
- All superlatives ("de enige horeca-specialist") removed
- /pricing unrolled from Tabs to static server-rendered sections
- Image compression (public/ from ~46 MB → ~7.7 MB, 83% reduction)
- Neighborhood mentions added to all three service pages (this session)
- `sizes` + `fetchPriority="high"` added to hero images

---

## 5. Projected score if the working tree is committed and deployed

Applying the same category rubric from `docs/geo-seo-scorecard.md`:

| Category | Live production (baseline) | After deploy of current tree | Target |
|---|---:|---:|---:|
| Technical SEO & Core Web Vitals | 80 | **90** | 97 |
| Content & Passage Extraction | 62 | **88** | 92 |
| Schema.org / JSON-LD | 82 | **98** | 96 ✓ |
| E-E-A-T & Authority | 63 | **85** | 92 |
| Local SEO (Amersfoort) | 52 | **86** | 95 |
| **Weighted average** | **67.8** | **~89.4** | **94.4** |

**Reading**: the deploy alone moves the aggregate from 67.8 → ~89. To reach 95 we still need the Tier 4 items below — most of them are either off-site (reviews, backlinks, GBP) or mobile-LCP specific.

---

## 6. Remaining work after deploy (to cross 95)

### 6A. Mobile LCP (the dominant remaining blocker)

Desktop is already at target. Mobile LCP average is 6.2s — the worst page (`/about`) is 11.7s. This is what's holding Performance below 90 on mobile. Candidate fixes, ordered by expected win:

1. **Audit every `<Image>` with `fill` for an explicit `sizes` prop**. Without `sizes`, next/image defaults to `100vw` which requests 2x DPR full-width images on mobile — that's 1600×1000 instead of 400×250. Several hero images are still missing this after this session's pass.
2. **Add `loading="eager"` + `fetchPriority="high"` only to the single above-the-fold hero image per route**. Currently `priority` is set in several places but not `fetchPriority` — browsers don't always promote the `priority` fetch.
3. **Drop `unoptimized` from the logo component** (still present in `src/components/logo.tsx`) — the logo is loaded on every page including as a preload, and `unoptimized` skips Next.js's webp conversion + resize pipeline.
4. **Convert hero JPEGs to webp in the build pipeline** (not just sips compression). This requires adding `sharp` as a dep or using Vercel's built-in image optimization. Currently `next.config.ts` has `images: { unoptimized: true }` — this disables all Next.js image optimization across the site. **This is almost certainly the root cause of mobile LCP > 5s across the board.**
5. **The /about 11.7s LCP outlier** is likely specific to a large portrait JPEG being served unoptimized at 2x DPR. Same fix as #4 — but needs individual verification.

### 6B. Content + SERP (3–6 month game)

1. **Publish "menu engineering Amersfoort" pillar page anchor article** on a high-authority partner (e.g. Missethoreca, FoodInspiration). No one owns this query today.
2. **Earn 3–5 local press mentions** linking to the canonical pages (not homepage). Candidates: AD.nl Amersfoort editorial, indebuurt.nl Amersfoort, De Gelderlander.
3. **Google Business Profile**: verify and complete — currently not set up as a Jezza Cooks entity. This unlocks the local pack which all 3 Amersfoort Places queries miss today.
4. **Reviews program**: real client testimonials with Review schema (Tafelaar, Chef & Serve, Swimcoaching, Boekeerlijk). Minimum 5 signed reviews to activate aggregateRating.

### 6C. E-E-A-T (off-site heavy lifting)

1. **Press URL correction**: `indaily.com.au` (403 on live) → `indailysa.com.au` (200). Already fixed in local site-config but not deployed.
2. **LinkedIn + YouTube podcast interview** added to `Person.sameAs`. Already in local `schema.ts` but not deployed.
3. **4 press URLs** (AD.nl, indebuurt.nl, De Gelderlander, Missethoreca) as inline citations on `/about`. Already in local build but not deployed.

---

## 7. Commit + deploy plan (BLOCKED ON USER APPROVAL)

The rule in this repo is that commits require explicit user permission. This is the blocker right now — none of the work in sections 3–6 can move the live score until committed and pushed.

**Recommended commit grouping** (3 commits for cleaner history, or 1 mega-commit if speed > review):

### Commit A — Foundation (schema + config + infra)
```
src/lib/site-config.ts            NEW: NAP, pricing, sameAs, areaServed
src/lib/schema.ts                 NEW: JSON-LD @graph builders
src/components/seo/json-ld.tsx    NEW: JsonLd component
src/app/robots.ts                 NEW: robots file
src/app/sitemap.ts                NEW: dynamic sitemap
src/app/opengraph-image.tsx       NEW: OG generator
src/app/layout.tsx                MOD: wire schema graph, metadataBase
```
Message: *Add schema.org JSON-LD graph, sitemap, robots, OG image generator — foundation for GEO/SEO scoring*

### Commit B — New pages + content restructure
```
src/app/menu-engineering/         NEW: pillar page (3200 words, passage-optimized)
src/app/services/seo-geo/         NEW: 4th service line
src/app/portfolio/                NEW: client showcase
src/app/privacy/                  NEW: privacy policy
src/app/pricing/page.tsx          MOD: Tabs → static sections (crawler visibility)
src/app/about/page.tsx            MOD: rewrite H1, add press URLs, fix duplicate Person JSON-LD
src/app/services/consulting/      MOD: revert €299 → €450, add neighborhood FAQ
src/app/services/catering/        MOD: add neighborhood FAQ (Vathorst/Valleipoort/etc)
src/app/services/websites/        MOD: add neighborhood FAQ, pricing cards, fix TS error
src/app/services/page.tsx         MOD: remove "de enige horeca-specialist" superlative
src/app/page.tsx                  MOD: pricing €299 → €450, sizes + fetchPriority on hero
src/components/websites/          MOD: .webp → .jpg references (12 total)
```
Message: *Add menu-engineering pillar, SEO/GEO service, portfolio, privacy; revert fabricated pricing to real €450; unroll /pricing Tabs; add neighborhood mentions; rewrite /about*

### Commit C — Image compression + docs
```
public/pics/*                     MOD: compressed (30 MB → 5.1 MB)
public/websites-demos/*.jpg       NEW: webp → jpg conversions
public/websites-demos/*.webp      DEL
public/pics/results-proof.jpg     DEL (byte-identical dupe of results-hero.jpg)
public/pics/1619197.png           DEL (orphan 17 MB file)
src/lib/placeholder-images.json   MOD: dedupe results-proof → results-hero
scripts/seo-baseline.ts           NEW: Serper + PageSpeed harness
docs/audit-*.md                   NEW: 5 category audits
docs/ai-visibility-baseline.md    NEW: manual test protocol
docs/geo-seo-scorecard.md         NEW: baseline scorecard
docs/geo-seo-scorecard-2026-04-14.md  NEW: this document
docs/seo-baseline-2026-04-14.json NEW: harness output
```
Message: *Compress hero images 83%, add SEO baseline harness, audit documentation*

**After commit + push**: Vercel auto-deploys from main in ~2 minutes. Then re-run:
```bash
npx tsx scripts/seo-baseline.ts
```
Expected outcome: mobile SEO avg 89 → 100 (all four 404s become real pages), mobile LCP avg holds or worsens slightly (unoptimized JPEGs dominate), desktop SEO 89 → 100, desktop Perf holds at 95.

The *next* win after the deploy is fixing `next.config.ts` `images: { unoptimized: true }` — that one flag is the mobile LCP ceiling.

---

## 8. What I am NOT doing in this session

- **Committing or pushing code**. The repo's CLAUDE.md is explicit: commits require user permission. This session produced all the edits but leaves the commit decision to the user.
- **Modifying `next.config.ts` to enable image optimization**. That change will require re-testing every image on the site and confirming the Vercel build pipeline can handle sharp's native binary. Should be its own commit after the deploy-and-measure cycle above.
- **Touching Google Business Profile, LinkedIn, or external directories**. Those are off-site actions the user must perform.
- **Setting up the monthly ai-visibility-baseline.md runs**. The template is in place; running the 20 queries across 5 platforms is a manual task for the user (documented in that file).

---

## 9. Monthly re-measurement (how to verify progress)

```bash
# From project root
npx tsx scripts/seo-baseline.ts
```

Diff against `docs/seo-baseline-2026-04-14.json`. Track:
- `summary.rankedCount` delta — month-over-month ranked query count
- `summary.top10Count` delta — top-10 rankings
- `summary.aioCitedCount` delta — AI Overview citations
- `pageSpeed.*.mobile.lighthouseResult.categories.performance.score` per-URL
- Places data — whether Jezza appears in any of the 3 Amersfoort local packs

Manual AI platform tests (ChatGPT Search, Perplexity, Google AI Mode, Gemini, AIO) follow `docs/ai-visibility-baseline.md` — run same day as the harness.

**Expected 1-month progress** (after deploy):
- Ranked queries: 2 → 5–8 (long-tail brand + menu engineering)
- Local pack: still 0 (GBP not yet verified)
- AI citations: possibly 1–2 on "menu engineering" or "GEO horeca" queries if the pillar lands in the ChatGPT crawl
- Mobile Perf avg: 79 → 88 (after enabling image optimization)
- Desktop Perf avg: 95 (steady, already at target)

**Expected 3-month progress**:
- Ranked queries: 8–12
- First Perplexity / ChatGPT citations for niche queries
- Local pack: 0–1 depending on GBP setup
