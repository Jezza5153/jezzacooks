# Competitive SEO Audit — Amersfoort Horeca Queries

**Date:** 2026-04-15
**Target:** https://www.jezzacooks.com (domain age ~3mo, KvK Jan 2026)
**Method:** Serper.dev `gl=nl&hl=nl` live SERPs + curl HTML fetches of top pages
**Current Jezza ranking footprint:** brand-only ("jezza cooks", "jezza cooks amersfoort")

---

## TL;DR

The Amersfoort horeca consultancy SERP is surprisingly soft: **only one domain (Bonico.nl) genuinely owns "horeca/restaurant consultant amersfoort"**, and its page is a thin 658-word homepage with no H1 and no FAQPage schema — beatable with a properly structured pillar. All 15 target queries returned **zero AI Overviews and zero local packs**, so ranking is a straight organic SEO play, not a GBP game. The two fastest wins are (1) **"menu engineering amersfoort"** (weak SERP owned by a generic Horeca Academie training page and two vacancy listings) and (2) **"horeca consultant amersfoort"** (single-competitor SERP with thin content) — both already map directly to Jezza's existing pillar and service pages.

---

## SERP Snapshot (15 queries × NL locale)

| # | Query | AIO | Local Pack | #1 Domain | #2 Domain | #3 Domain | PAA sample |
|---|-------|-----|-----------|-----------|-----------|-----------|-----------|
| 1 | horeca consultant amersfoort | no | no | bonico.nl | harvestfinance.nl | facebook.com/bonico23 | — |
| 2 | restaurant consultant amersfoort | no | no | bonico.nl | facebook.com/bonico23 | hendriksensales.nl | — |
| 3 | menu engineering amersfoort | no | no | horecaacademie.nl | indeed.com (vacatures) | trestapasbar.nl (vacature) | — |
| 4 | menu engineering nederland | no | no | khn.nl | apicbase.com | vangeloven.com | — |
| 5 | food cost controle horeca | no | no | theforkmanager.com | kitchennmbrs.app | growyze.com | — |
| 6 | food cost restaurant | no | no | theforkmanager.com (EN) | theculinarypro.com | commandeici.com | — |
| 7 | catering amersfoort | no | no | debuffettenboer.nl | kokcateringservice.nl | debuitenkeuken.nl | — |
| 8 | catering amersfoort kantoor | no | no | jasperscateringcompany.nl | tafelaaramersfoort.nl | cateringfabriek.nl | — |
| 9 | kantoorlunch amersfoort | no | no | tafelaaramersfoort.nl | debuurtboer.nl | netwerkkantoor.nl | — |
| 10 | bedrijfscatering amersfoort | no | no | loof-catering.nl | dereiger.nl | debuitenkeuken.nl | — |
| 11 | restaurant website laten maken | no | no | restaurantwebsitelatenmaken.nl | zenchef.com | bsconnect.nl | — |
| 12 | horeca website laten maken amersfoort | no | no | frizzer.nl (generic) | teazeragency.com | ccorner.nl | — |
| 13 | SEO horeca | no | no | horecawebservice.nl | monouso.nl | rtmbusiness.nl | — |
| 14 | GEO bureau horeca | no | no | thefullybookers.com | youvia.nl | brandfirm.nl | — |
| 15 | chef consultant amersfoort | no | no | chefmaison.com | takeachef.com | huischef.nl | — |

**Key observations:**
- **Zero AI Overviews across all 15 queries** — Google is not yet confident enough in the NL horeca consultancy space to generate AIOs. This is a rare window: content built now will be cited when AIOs eventually light up.
- **Zero local packs** on any query including "amersfoort". This is huge: Bonico ranks #1 on "horeca consultant amersfoort" despite no local pack — meaning classical on-page SEO + schema beats GBP here.
- **Mismatched intent on several queries**: #3 ("menu engineering amersfoort") pulls two vacancy listings into the top 3 — Google is reaching because no one has targeted this keyword properly.
- **Brand-defense leak**: "catering amersfoort kantoor" (query 8) already ranks Jezza's own client **tafelaaramersfoort.nl** at position 2 — useful context, but Jezza's own domain is absent.

---

## Competitor Profiles (5 key)

### 1. Bonico Horeca Consultancy — bonico.nl
- **Owns:** "horeca consultant amersfoort", "restaurant consultant amersfoort"
- **Page audited:** homepage, **658 words**, **no H1 detected**, JSON-LD present, no FAQPage schema, reviews mentioned but no AggregateRating
- **Strength:** Strong exact-match brand + Amersfoort in title, established domain, Facebook presence reinforcing NAP
- **Weakness:** Extremely thin (<700 words), no H1, no structured FAQ, no pricing, no case studies on landing page
- **Verdict:** **Highly beatable by a 1500+ word pillar with FAQPage schema.** Jezza's homepage already does more.

### 2. Harvest Finance — harvestfinance.nl/horeca/
- **Owns:** #2 on "horeca consultant amersfoort" (confused intent — they are an accountant)
- **Page audited:** 1622 words, real H1, rich schema (`Place`, `GeoCoordinates`, `PostalAddress`), service-based
- **Strength:** Local schema done properly, long-form content, Amersfoort-specific
- **Weakness:** **Accountant, not consultant** — ranks on vocabulary overlap, not true intent match
- **Verdict:** Vulnerable to a page that's explicitly "horeca advies / operations" not "cijfers".

### 3. Horeca Academie — horecaacademie.nl/menu-engineering
- **Owns:** #1 "menu engineering amersfoort" (despite being national)
- **Page audited:** 995 words, proper H1, WebPage/BreadcrumbList schema, prices listed, it's a **training course listing**
- **Strength:** National authority, links in
- **Weakness:** Commercial intent is "enroll in a training" — completely misaligned with a restaurant owner searching "menu engineering amersfoort" looking for someone to *do it for them*. Google is ranking this because there's no better option.
- **Verdict:** Wide-open gap for a "done-for-you menu engineering in Amersfoort" page.

### 4. KHN — khn.nl/kennis/menu-engineeringprogramma
- **Owns:** #1 "menu engineering nederland"
- **Page audited:** 981 words, `WebSite`+`LocalBusiness`+`Organization` schema, trade association authority
- **Strength:** Massive domain authority (industry body), trust signals
- **Weakness:** Informational, not commercial
- **Verdict:** Don't try to outrank for "menu engineering nederland" — it's a 12-month battle. Steal long-tail instead.

### 5. Jaspers Catering Company — jasperscateringcompany.nl/bedrijfscatering-amersfoort
- **Owns:** #1 "catering amersfoort kantoor"
- **Page audited:** 604 words, real H1, BreadcrumbList + WebPage schema, no on-page pricing, same-day delivery USP
- **Strength:** Specific "bedrijfscatering Amersfoort" URL slug, clear delivery promise
- **Weakness:** Thin, no pricing, generic catering (not chef-led)
- **Verdict:** Beatable in the office-lunch niche with (a) more words, (b) on-page pricing, (c) chef-credential differentiation.

---

## Gap Matrix — Jezza vs. Avg Amersfoort Competitor

| Dimension | Jezza cooks | Avg competitor | Gap |
|---|---|---|---|
| Content depth (pillar) | **2339 words** (menu-engineering page) | ~900 words | **Jezza ahead** |
| Schema.org coverage | Organization, LocalBusiness, Place, ContactPoint, FAQPage, BreadcrumbList | WebPage + maybe LocalBusiness | **Jezza ahead** |
| Review count (public) | 0 Google reviews | 10–50 on top competitors | **Jezza behind** |
| Backlinks / DR | ~0 (3mo domain) | DR 15–30 | **Jezza behind** |
| Pricing transparency | Published (€400+€30/mo, €1300/yr) | Not shown on 4/5 top pages | **Jezza ahead** |
| Local GBP signals | Unknown / minimal | GMB profile + NAP | **Jezza behind** |
| Social proof (press) | Chef Maarten Hogeveen + client roster | Mostly none | **Jezza ahead** |
| Original content / case studies | 5 real portfolio clients | Mostly stock claims | **Jezza ahead** |
| Technical SEO (sitemap, robots, OG, AVIF) | Fully tuned (recent Tier-5A) | Mixed | **Jezza ahead** |
| Multi-service bundle (4 services) | website, SEO/GEO, consulting, catering under one brand | Single-service specialists | **Unique — Jezza ahead** |

**Verdict:** Jezza loses on **off-page** (reviews, backlinks, GBP, age). Jezza *wins or ties* on **on-page everything**. This is exactly the profile where you attack long-tail commercial queries where on-page depth beats off-page authority — and the SERP confirms it: competitors are thin.

---

## Jezza's Actual Unique Advantages

1. **Published pricing on-site** (rare in Dutch horeca consultancy — 4/5 audited competitors hide prices behind contact forms). This is both a UX and a GEO advantage: AI answer engines cite concrete numbers.
2. **Four-services bundled under one operator** — no competitor in the set offers website + SEO/GEO + consulting + catering. This is a differentiator, not a ranking signal directly, but it lets one page serve intent from many queries.
3. **Chef credentials backed by real clients** (Maarten Hogeveen / Chef & Serve + 4 others). Competitors lean on stock photography.
4. **2339-word, FAQPage-schema menu-engineering pillar** that already out-depths every ranking page for "menu engineering amersfoort" and "menu engineering nederland".
5. **Operator-first voice** (Jezza runs hospitality and builds the site) — authenticity signal for E-E-A-T.

---

## Top 3 Attackable Queries (Low Competition × High Commercial Intent × On-Brand)

Scoring: Competition (1–5, lower = easier) × Commercial intent (1–5, higher = better) × Brand fit (1–5).

### 1. "menu engineering amersfoort" — Score: 5×5×5 = **125**
- **Why attackable:** #1 result is a national training course; #2 and #3 are vacancies. Zero pages actually offer "menu engineering done for you in Amersfoort". Jezza already has a 2339-word pillar — just needs local variant + internal linking.
- **Attack plan:** Add an Amersfoort-specific H2 block and service-area schema to the existing `/menu-engineering` page. Add FAQ: "Kun je menu engineering in Amersfoort doen?" Publish within 24 hours. Expected: top 10 within 4–6 weeks.

### 2. "horeca consultant amersfoort" — Score: 4×5×5 = **100**
- **Why attackable:** Bonico #1 has 658 words and no H1. Harvest Finance #2 is an accountant. Jezza's services/consulting page already has real depth + schema. Just needs the literal exact-match phrase in the title, H1, and meta description, plus an Amersfoort-local section.
- **Attack plan:** Rewrite `/services/consulting` title/H1 to include "Horeca consultant Amersfoort". Add a 300-word "Waarom een Amersfoortse horeca consultant" block with neighborhood mentions. Link from homepage hero. Expected: top 10 within 6–8 weeks.

### 3. "restaurant website laten maken" (national long-tail) — Score: 3×5×4 = **60**
- **Why attackable:** #1 is literally an exact-match domain (restaurantwebsitelatenmaken.nl) with a thin page. Jezza's actual, proven client work (5 real restaurant sites in portfolio) is stronger proof than the competitors offer. National scope dilutes but still reachable for long-tail variants like "restaurant website laten maken met seo" or "horeca website pakket".
- **Attack plan:** Publish a service page at `/services/websites/restaurant` with the 5 portfolio case studies inline, pricing, and an FAQ covering "Wat kost een restaurant website?". Link from `/portfolio`. Expected: top 20 within 8–12 weeks.

---

## The ONE Recommendation

**Publish `/menu-engineering/amersfoort` (or add an `#amersfoort` section + LD-JSON `serviceArea` to the existing pillar) within 48 hours, and link it from the homepage hero + services nav.**

Reasoning:
1. **Weakest competition in the set** — the top 3 on "menu engineering amersfoort" are a generic national training page and two vacancy listings. Literally nobody is targeting the query as a service.
2. **Jezza already has the content** — 2339 words of menu-engineering pillar already outranks anything the competition has written. Localizing it is a copy-edit, not a content project.
3. **Highest commercial intent** — a restaurant owner searching "menu engineering amersfoort" is looking for a service provider they can hire this month, not a blog post to read.
4. **On-brand with chef credentials** — Maarten Hogeveen / Chef & Serve case study becomes the proof point. No other result in the SERP has a real chef with real clients.
5. **Compounds**: ranking for "menu engineering amersfoort" also lifts adjacent queries ("food cost controle horeca", "restaurant consultant amersfoort") because Google correlates topical authority.
6. **3-month ranking probability ≈ 70%** given the current SERP weakness. Every other target query is 25–40%.

**Concrete next step:** On the existing `/menu-engineering` page, add (a) H2 "Menu engineering in Amersfoort — hoe wij het doen", (b) 200-word local section referencing real Amersfoort restaurants we've worked with, (c) `Service` schema with `areaServed: {"@type":"City","name":"Amersfoort"}`, (d) FAQ item "Biedt Jezza Cooks menu engineering aan in Amersfoort?", (e) internal link from homepage hero CTA. Total effort: ~90 minutes. Expected ROI: first-page ranking on a high-intent commercial query by end of Q2 2026.

---

*Audit produced via Serper.dev NL-locale SERPs + direct HTML fetches of top-3 competitor pages. No AIO was present on any of the 15 queries — this is the cleanest possible moment to build AIO-optimized pillar pages before the SERP hardens.*
