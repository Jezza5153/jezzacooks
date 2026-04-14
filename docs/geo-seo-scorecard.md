# Jezza Cooks — GEO/SEO Scorecard

**Run date**: 2026-04-14
**Target**: jezzacooks.com
**Goal**: 95 / 100
**Baseline total**: 67.8 / 100 (average of 5 categories, weighted equal)

---

## Category scores (baseline → target)

| Category | Baseline | Target | Auditor |
|---|---:|---:|---|
| Technical SEO & Core Web Vitals | **80 / 100** | 97 | ab20b406ae5355f59 |
| Content & Passage Extraction (GEO core) | **62 / 100** | 92 | a9313d9126f35c98d |
| Schema.org / JSON-LD | **82 / 100** | 96 | af9db3618a9962888 |
| E-E-A-T & Authority | **63 / 100** | 92 | a0fa1c68aa7e71ccf |
| Local SEO (Amersfoort) | **52 / 100** | 95 | a13185895060ce1c7 |
| **Weighted average** | **67.8** | **94.4** | |

Detailed audits in:
- `docs/audit-technical.md`
- `docs/audit-content.md`
- `docs/audit-schema.md`
- `docs/audit-eeat.md`
- `docs/audit-local.md`

---

## Hard SERP baseline (via Serper API, 2026-04-14)

30 query harness — see `docs/seo-baseline-2026-04-14.json` for full data.

| Metric | Baseline |
|---|---:|
| Total queries tested | 30 |
| Ranked in top 20 | 2 (**7%**) |
| Ranked in top 10 | 2 (**7%**) |
| Ranked in top 3 | 2 |
| AI Overview triggered (NL locale) | 0 / 30 |
| AI Overview citing us | 0 |
| Local pack appearances (3 Amersfoort Places queries) | 0 / 3 |

**Ranking wins**: "jezza cooks" #1, "jezza cooks amersfoort" #1 — both pure brand queries.
**Ranking failures**: 28 / 30 queries return nothing.

**Read**: the site currently only ranks when the query contains the exact brand name. This is expected for a 3-month-old domain (KvK registered January 2026). The whole SEO/GEO job is closing this gap.

**Important note on NL AIO**: none of the 30 queries returned an AI Overview from the `nl` locale. Google AI Overviews are trailing US/UK rollout in the NL horeca vertical. This means **traditional SERP ranking matters more than AIO optimization right now for NL queries**, but ChatGPT / Perplexity / AI Mode will still cite us independently of NL AIO. Strategy: win both.

---

## Critical data discovered this session (via Serper enrichment)

These all feed directly into the fixes below.

### Verified business facts
- **Registered address**: Nijkerkerstraat 3, 3821 CD Amersfoort (Valleipoort neighborhood)
  Sources: Oozo.nl, Drimble.nl, Company.info, AdHocData (4 independent directories)
- **KvK**: 99547619 (publicly confirmed — in site-config already)
- **Official KvK sector**: 56210 Cateringdiensten op evenementen
- **Founded**: January 2026 — the domain is **3 months old**. Reframes expectations.

### Verified social / authority URLs
- **LinkedIn**: `https://nl.linkedin.com/in/jeremy-arrascaeta-b85a17179`
  Headline: "Culinary Innovation | Menu Design & Engineering"
- **YouTube podcast interview**: `https://www.youtube.com/watch?v=MtGRedLjZ3Q`
  "Episode 31: Jeremy Arrascaeta from Angler Restaurant at Stirling" — 62 min, All The Gear But No Idea (SA Fishing Podcast)
- **Press URL correction**: site-config.ts has InDaily at `indaily.com.au` (403). Correct domain is `indailysa.com.au` (200). Must fix.

### Competitive landscape (from Serper)
- **Bonico.nl owns positions 1-9** for "horeca consultant amersfoort" — every SERP slot is Bonico-owned property (homepage, Facebook, LinkedIn, company profile, sub-pages, founder's LinkedIn). Outranking head-on is a 6-12 month game.
- **Opportunity**: Bonico doesn't own "menu engineering Amersfoort", "restaurant website Amersfoort", "horeca GEO Amersfoort", or any ChatGPT/Perplexity cuisine. These are the attackable keywords.

### Flags (not auto-applied — need user input)
- Instagram handle `@chefjezz` is live (200) but Serper's KB data shows business account as `@jezzacooks_`. Both handles exist. **User must confirm which is canonical before we change schema `sameAs`.** For this session I'll keep `chefjezz` and add the others as candidates.
- BTW number still blank in site-config. Flag only.

---

## Aggregated gap list (ordered by impact → effort)

This is the master list of fixes. Each has an estimated score impact across categories.

### Tier 1 — CRITICAL (must-fix before anything else)

| # | Fix | Impact | Effort | Category hits |
|---|---|---:|---:|---|
| 1 | **Real OG image 1200×630** — current `/pics/about-jezza.jpg` is 896×1200 PNG, breaks every OG card | +5 tech | med | Technical |
| 2 | **Fill registered address in site-config** — Nijkerkerstraat 3, 3821 CD, unlock full schema PostalAddress | +6 schema, +4 local | xs | Schema, Local |
| 3 | **Delete duplicate Person/ProfessionalService inline JSON-LD in /about** — `src/app/about/page.tsx:143-190` hand-rolled a second Person that bypasses the @id graph | +5 schema | xs | Schema |
| 4 | **Add LinkedIn + YouTube + 4 press URLs to `Person.sameAs`** in `src/lib/schema.ts` | +6 eeat, +3 schema | xs | E-E-A-T, Schema |
| 5 | **Remove `unoptimized` prop from hero Images in /about and /logo.tsx** — tanks LCP | +4 tech | xs | Technical |
| 6 | **Add `alternates.canonical` to /free-diagnosis and /terms** | +2 tech | xs | Technical |
| 7 | **Fix InDaily URL** from `indaily.com.au` → `indailysa.com.au` (broken link in site-config press[0]) | +1 eeat | xs | E-E-A-T |

### Tier 2 — HIGH impact (the content sprint)

| # | Fix | Impact | Effort |
|---|---|---:|---:|
| 8 | **Unroll `/pricing` Tabs into 4 server-rendered sections** (GEO can't lift hidden tab content) | +6 content | med |
| 9 | **Add Simple/Pro/Custom table + 5 FAQs to `/services/websites`** (SSR prose) | +5 content | med |
| 10 | **Rewrite `/services/consulting` H1** from "Chase improvement." → "Restaurant consulting in Amersfoort" + add local band | +4 local, +3 content | sm |
| 11 | **Rewrite `/services/catering` hero** to name Kamp 8 / binnenstad / delivery radius | +5 local, +2 content | sm |
| 12 | **Add "Laatst bijgewerkt" + `dateModified` schema** to every service page | +4 content | sm |
| 13 | **Add "Waarom Amersfoort" band to home** echoing seo-geo page | +4 local, +2 content | sm |
| 14 | **Rewrite /about H1** from duplicate "Level up the chaos" → "Over Jeremy Arrascaeta — horeca consultant in Amersfoort" + name Bougainville, Hanson Bay, Angler Stirling in visible body | +6 eeat, +2 local | sm |
| 15 | **Wire `buildFaqPage()` to /services/consulting and /services/catering** — they have visible Q&A but no FAQPage schema | +4 schema | xs |
| 16 | **Add `contactPoint` to Organization schema** | +3 schema | xs |
| 17 | **Add `dateModified` / `datePublished` to every page's primary schema** | +2 content, +2 schema | sm |

### Tier 3 — NEW CONTENT (biggest long-tail play)

| # | Fix | Impact | Effort |
|---|---|---:|---:|
| 18 | **Build `/services/consulting/menu-engineering` pillar page** — 1500-2000 words, H2-as-questions, comparison table, 5 FAQs, citable stats. Zero competition on "menu engineering Amersfoort". | +5 content, +5 local, +3 eeat | large |
| 19 | **Rewrite `/terms` from placeholder stub to real terms** (currently "Terms of service content...") | +3 eeat | sm |
| 20 | **Create `/privacy` page** (currently 404) | +2 eeat, +1 tech | sm |
| 21 | **Add 3 real testimonials with attribution + Review schema** (Trustoo 9.8 from Tafelaar, Maarten Hogeveen from Chef & Serve, Swimcoaching founder) | +5 eeat | med |
| 22 | **Add `Person.hasOccupation` array detailing career history** with organization references (Angler Stirling, Restaurant Bougainville, Hanson Bay Sanctuary) | +3 eeat, +2 schema | sm |

### Tier 4 — POLISH (to cross 95)

| # | Fix | Impact | Effort |
|---|---|---:|---:|
| 23 | Add `next.config.ts` security headers (HSTS, X-Frame-Options, Permissions-Policy) | +3 tech | xs |
| 24 | Dedupe `results-hero.jpg` / `results-proof.jpg` (byte-identical) | +1 tech | xs |
| 25 | Compress 1.2-1.7 MB source JPEGs | +2 tech | sm |
| 26 | Remove `ignoreBuildErrors` / `ignoreDuringBuilds` from `next.config.ts`, fix any real errors surfaced | +2 tech | med |
| 27 | Replace "de enige horeca-specialist" superlative (unsubstantiated, 4 occurrences) with softer "chef-led" framing | +2 eeat | xs |
| 28 | Fix "5 landen" vs "NL/BE/FR/AU" contradiction in /about | +1 eeat | xs |
| 29 | Add visible Amersfoort neighborhood mentions (Kamp, Binnenstad, Valleipoort) on relevant pages | +2 local | xs |

---

## Projected score after Tier 1 + Tier 2 + Tier 3

| Category | Baseline | After T1 | After T2 | After T3 | Target |
|---|---:|---:|---:|---:|---:|
| Technical | 80 | 88 | 90 | 90 | 97 |
| Content | 62 | 62 | 82 | 87 | 92 |
| Schema | 82 | 96 | 99 | 99 | 96 ✓ |
| E-E-A-T | 63 | 77 | 82 | 92 | 92 ✓ |
| Local | 52 | 60 | 78 | 90 | 95 |
| **Average** | **67.8** | **76.6** | **86.2** | **91.6** | **94.4** |

Tier 1+2+3 together lands ~92. Tier 4 polish gets us to ~95. Reaching 97+ would require: actual Google Business Profile (not code), earned media, and real reviews — all off-site work for the user.

---

## Implementation plan (this session)

1. **Tier 1 fixes** — all are code changes I can ship now
2. **Tier 2 content rewrites** — edit in place
3. **Tier 3 new content** — menu engineering pillar + testimonials + terms
4. **Tier 4 polish** — config + superlatives
5. **Rebuild** — `npm run build` must pass clean
6. **Re-run scoring harness** — `npx tsx scripts/seo-baseline.ts` (expected minimal SERP movement — 3-month-old domain won't flip overnight, but query infrastructure will record the delta)
7. **Write `docs/ai-visibility-baseline.md`** — manual test protocol for ChatGPT/Perplexity/AIO to re-run next month

---

## How to re-run next month

```bash
# From project root
npx tsx scripts/seo-baseline.ts  # writes docs/seo-baseline-YYYY-MM-DD.json
```

Then diff against `docs/seo-baseline-2026-04-14.json` — the delta on `rankedCount`, `top10Count`, `aioCitedCount` is your month-over-month progress.

Manual AI visibility tests (see `docs/ai-visibility-baseline.md`) should be run on the same day.
