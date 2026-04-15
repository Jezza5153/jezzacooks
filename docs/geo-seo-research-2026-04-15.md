# GEO/SEO Knowledge Base Audit — April 15, 2026

Research sweep of GEO/SEO developments Oct 2025 → April 2026, comparing against `/Users/jezza/.claude/skills/geo-seo-optimizer/references/geo-seo-knowledge-base.md` (last updated 2026-04-11).

## 1. TL;DR — What's NEW since the KB was last touched

1. **Gemini 3 is now powering AI Overviews (global rollout January 27, 2026)** and this materially changed citation selection. The top-10 overlap dropped from ~76% → 38% in early-2026 analyses. Query fan-out is doing much more of the work; topical-depth and multi-angle coverage now beat raw SERP rank.
2. **March 2026 Core Update (Mar 27 → Apr 8, 12d 4h)** was one of the most volatile in recent history (Semrush Sensor peak 9.5/10). Focus: Information Gain, tightened E-E-A-T, topical authority as a multiplier. YMYL hit hardest. The March 24–25 spam update was the fastest on record (~24h), targeting doorway pages, scaled content, and cloaking.
3. **Google AI Mode agentic restaurant booking went international April 10, 2026** to UK, Australia, Canada, Hong Kong, India, New Zealand, Singapore, South Africa. **Netherlands NOT yet in the rollout** — but the mechanism matters: AI Mode now reads reservation platforms directly and books via natural-language queries.
4. **7 schema types lost rich-result support in January 2026**: Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing, Practice Problems. FAQ schema is now restricted to government/health sites only. No ranking penalty for keeping the markup, but no rich result either.
5. **Anthropic split ClaudeBot into three agents (Feb 25, 2026)**: ClaudeBot (training), Claude-SearchBot (Claude's search feature), Claude-User (on-demand user fetches). robots.txt directives now need per-bot granularity if you want to distinguish training from citation.

---

## 2. Claims in the current KB that need updating

### 2a. "AI Overviews trigger on ~48–60% of all searches"

**Still broadly correct** (~58% overall as of early 2026 per Ahrefs / BrightEdge). Keep the wording but add that local-intent queries are an outlier: **only ~7.9% of local "near me" style queries trigger AIO** — the 58% average hides the fact that hyperlocal intent remains largely AIO-free. ([BrightEdge via SEJ](https://www.searchenginejournal.com/google-ai-overviews-surges-across-9-industries/568448/))

### 2b. "Restaurant queries: AI Overview triggering went from 10% → 78% in 12 months"

**Still correct** as a directional stat (BrightEdge Feb 2025 → Feb 2026). But add the nuance: this is *restaurant category* queries ("best italian restaurants amersfoort"), NOT *local pack / near-me* queries. Operator signal: informational restaurant queries are AIO-heavy; transactional "book a table" queries are now routing through AI Mode's agentic booking, not AIO.

### 2c. "AI Overviews reduce organic CTR by ~58%"

**Confirmed and possibly understated.** Ahrefs Dec 2025 update: up to -58% for position-1. Seer Interactive (42 orgs, 25.1M impressions): organic CTR -61% (1.76% → 0.61%), paid -68%. The Ahrefs 58% figure is safer to quote but the Seer data is worth adding as a stronger upper bound. Zero-click rate for AIO-triggered searches is now ~83%, vs ~60% for non-AIO queries. ([Ahrefs](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/), [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update))

### 2d. "Pages cited in AIO get +35% more clicks"

**Still correct.** Ahrefs confirms +35% organic, +91% paid. The framing should shift though: because top-10 overlap has collapsed, *citation is now more independent from rank* — pages can be cited without ranking, so the "cited-in-AIO" bonus is now available to a much wider pool.

### 2e. "76.1% of AIO cited URLs also rank in traditional top 10" — **OUTDATED, MUST CHANGE**

Current KB Signal Matrix says: `"76.1% of cited URLs also rank in traditional top 10"` and `"Strong correlation with existing SERP authority"`. 

**Replacement:** "Only **38% of AIO cited URLs rank in the traditional top 10** (down from 76% in mid-2025), per early-2026 analysis. The shift is attributed to the Gemini 3 upgrade (rolled out globally January 27, 2026) and Google's query fan-out expansion — AIO now draws from pages ranking for *sub-queries*, not just the main keyword. Pages ranking for both main AND fan-out queries are **161% more likely to be cited** than those ranking only for main keywords." ([SEJ](https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/), [ALM Corp](https://almcorp.com/blog/google-ai-overview-citations-drop-top-ranking-pages-2026/))

This is the single biggest change in the KB. It also means the current Platform-Specific section ("76.1% of cited URLs also rank in traditional top 10") in section 4 is wrong and must be rewritten.

### 2f. "ChatGPT Search cites very differently: ~90% of citations come from pages ranking position 21+"

**Still broadly valid** but note the counter-data: Lily Ray's Feb 2026 analysis of 11 sites hit by Google's January algo update showed ChatGPT citations dropped -27.8% closely tracking a -26.7% organic drop — which suggests ChatGPT's live-browse layer is leaning more on Google/Bing results than raw position 21+ mining implies. Best framing: "ChatGPT Search pulls heavily from pages outside the top 10, but when browsing is active, it shows ~87% correlation with Bing's top 10. Losing organic visibility hurts ChatGPT visibility by roughly the same percentage." ([Lily Ray substack](https://lilyraynyc.substack.com/p/are-citations-in-ai-search-affected))

### 2g. "Domain Authority correlation has dropped to r=0.18 for AI citations"

**Still directionally correct** and some sources now cite r=0.18 (down from r=0.23 in 2024). For some verticals it's negative (r=-0.12). But the stronger 2026 predictors are brand web mentions (strongest single factor), co-citation count (~0.74 with ChatGPT mention rate), and brand search volume (~0.334). **Add**: "Brand search volume has overtaken DA as the top predictor of AI citations; cross-platform brand mentions (Quora, Reddit, review sites, YouTube) correlate higher than links."

### 2h. "47% of AI citations come from pages below position #5"

**Confirmed.** Still holds in 2026 analyses. Keep as-is.

### 2i. "AIO volatility — AI Mode self-consistency at 9.2%"

**Likely outdated post-Gemini 3.** No clean replacement number found in my search, but multiple sources note Gemini 3 increased citations per AIO by ~32% and changed source selection materially. Flag as "pre-Gemini-3 figure; likely lower now, pending fresh measurement."

---

## 3. New best practices to ADD to the KB

### 3a. Query fan-out coverage as a first-class signal
Sites with 80%+ topical coverage across sub-queries retain ~85.4% of AI visibility. Brands that rank only for head terms miss 87.5–89.8% of AI citation opportunities. **Action**: for every pillar topic, ship 6–12 FAQ/subtopic pages answering the fan-out variants. ([ALM Corp query fan-out guide](https://almcorp.com/blog/the-query-fan-out-impact/))

### 3b. March 2026 YMYL/E-E-A-T tightening
Google added an "Authors" section to Search Central docs on Feb 1, 2026. Industry tracking: 73% of top-ranking YMYL pages now show detailed author credentials (up from 58%). **Action**: every non-trivial content page needs a named author with a verifiable bio/credentials page, linked from the article. Not just a byline — a full author entity page. ([Stanventures](https://www.stanventures.com/news/google-john-mueller-schema-update-2026-5719/), [Digital Applied](https://www.digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide))

### 3c. Schema deprecations (January 2026)
Don't use: Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing, Practice Problems. FAQ schema: restricted to .gov/health sites — on a commercial site it produces nothing and should either be removed or kept only for structured-data understanding (no rich result). Still supported and worth investing in: LocalBusiness, Restaurant, Menu/MenuItem, Article, Organization, Person, Review/AggregateRating, Event, Video, Recipe, Breadcrumb. ([Viserx / ALM Corp](https://viserx.com/blog/seo/google-drops-7-schema-types))

### 3d. GBP 2026 changes
- **GBP Q&A feature discontinued** (late 2025/early 2026). Replaced by "Ask Maps" which lets Gemini synthesize answers from profile + website + reviews. Action: make sure Q&A-style content lives on the site, not the GBP.
- **GBP Chat feature ending July 31, 2026.**
- **Dynamic profile signal**: profiles inactive 30+ days (no new photos/posts) see measurable visibility drops. Action: monthly photo + post cadence minimum.
- **Review signals** rose from 16% → 20% of local pack weight (Whitespark/BrightLocal survey, Nov 2025). A business with 200 reviews @ 4.7 now "almost always" outranks 30 reviews @ 5.0.
- **NAP consistency** quantified: each inconsistency = trust penalty; full consistency averages +28% local pack rank lift. ([Sterling Sky](https://www.sterlingsky.ca/google-local-changes/), [SEJ dynamic profiles](https://www.searchenginejournal.com/why-dynamic-profiles-are-the-new-local-ranking-factor/568200/))

### 3e. AI Mode agentic restaurant booking (April 2026)
In 8 countries (UK, Aus, Can, HK, IN, NZ, SG, ZA) AI Mode can now book a table end-to-end. Netherlands is NOT included yet, but partnerships are with reservation platforms (OpenTable-equivalents). **Action for Dutch hospitality**: ensure the restaurant is listed on whatever reservation platforms Google will likely partner with in NL (TheFork, Resengo, Formitable / Eveve are the likely candidates). Once NL lands, only restaurants that are bookable *via one of the connected partners* will be surfaced. ([9to5Google](https://9to5google.com/2026/04/10/google-ai-mode-redesign/))

### 3f. Anthropic's three-bot split (robots.txt)
As of Feb 25, 2026:
- `ClaudeBot` — training crawler (block/allow based on your training policy).
- `Claude-SearchBot` — powers Claude's search feature, provides citations + links.
- `Claude-User` — fetches pages on-demand when a Claude user asks.
**Recommended robots.txt for a citation-seeking site**: allow `Claude-SearchBot` and `Claude-User`, optionally block `ClaudeBot` if you don't want training use. Same pattern applies to `OAI-SearchBot` (ChatGPT Search) vs `GPTBot` (training) and `PerplexityBot` vs training-only bots. ([SEJ](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/))

### 3g. Content placement: intro matters more than you thought
44.2% of LLM citations extract from the **first 30%** of the text. Action: front-load verifiable facts, stats, and the answer itself in the first ~2 paragraphs.

### 3h. INP threshold tightening
INP < 200ms is now the "good" threshold per Google, but sites with INP < 150ms show measurable ranking stability. 43% of sites still fail the 200ms bar — INP is the most commonly failed CWV metric in 2026.

### 3i. Gemini 3 on AI Overviews increased sources per answer by ~32%
Expect more cited URLs per AIO (was 13.3 avg, now higher). More slots = more opportunity, but also more competition per slot.

---

## 4. What DIDN'T change (KB still correct)

- **Local three pillars** (relevance / distance / prominence): unchanged.
- **Retrieval pipeline description** (sparse + dense + rerank + passage selection): still accurate; just more critical post-Gemini 3 because fan-out amplifies the reranker's influence.
- **Passage self-containment + 130–167 word sweet spot**: multiple 2026 sources confirm this range (one says 134–167).
- **Doorway pages are still high-risk**: March 2026 spam update explicitly targeted them. KB's guidance on legitimate location-page uniqueness remains correct.
- **Schema spam warning**: still valid, and tightened — FAQ schema abuse was a contributor to the 2024 restriction.
- **CTR manipulation risk**: Google's detection only got better; KB warning holds.
- **NAP consistency → entity resolution**: still the mechanism, now with a quantified +28% local pack lift per full-consistency correction.
- **JSON-LD LocalBusiness / Restaurant / Menu schema**: all still supported and still important. In fact schema is now *more* influential because Gemini cross-references against the Knowledge Graph for entity resolution.

---

## 5. Specific recommendations for jezzacooks.com

Based on the 2026 updates and the business context (Dutch hospitality operator, 4 services, local Amersfoort focus):

1. **Rewrite the KB's 76.1% / top-10 correlation claim and the "strong correlation with existing SERP authority" framing**. Update both `geo-seo-knowledge-base.md` Section 4 (Platform-Specific) and Section 7 (Statistics) to reflect 38% top-10 overlap and fan-out dominance.

2. **Build fan-out coverage for every service pillar.** For each of the 4 services (website build, SEO/GEO, consulting, catering) generate 8–12 Q-formed subtopic answers covering pricing, timelines, comparison ("vs. X"), outcomes, and use-cases. The KB already lists the query templates in Section 5 — use them to generate the actual pages.

3. **Front-load verifiable facts in every page's intro** (first 2 paragraphs). Put the price, timeline, and a stat from a real client case in the first 150 words. 44.2% of LLM citations come from the top 30% of text.

4. **Monthly GBP cadence**: if jezzacooks.com uses a GBP, add 1–2 photos and 1 post every 30 days minimum to avoid the "inactive profile" dampener.

5. **Author bio pages for Jezza**. Given the March 2026 E-E-A-T tightening, every blog/service page should link to a "/about/jezza" page with: named credential ("hospitality operator in Amersfoort since [year], built [N] client sites"), verifiable track record, LinkedIn link. The 5 real-client portfolio counts as experience evidence.

6. **Reservation-platform listings for chefandserve / tafelaaramersfoort** (the two hospitality clients in the portfolio): make sure they're on TheFork, Resengo, and any Dutch-market reservation platform. When Google extends AI Mode agentic booking to NL, only restaurants on connected partner platforms will be bookable directly.

7. **Drop any FAQ schema on commercial pages** (no rich result since 2024, restricted to gov/health since 2026). Keep the Q&A content in prose/h2 + answer form; drop the JSON-LD.

8. **Update robots.txt** if not done already: explicitly allow `Claude-SearchBot`, `Claude-User`, `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `Bingbot`. Optionally block `ClaudeBot`, `GPTBot`, `CCBot` if training-data avoidance matters.

9. **Measure INP on every page**; anything > 200ms field-data is a ranking liability in 2026.

10. **Citation targets**: run a weekly check on whether jezzacooks.com or its portfolio sites get cited for queries like "website laten maken horeca amersfoort", "menu engineering consulting nederland", "seo voor restaurants utrecht". Citation share is now the primary success metric; rank alone is a lagging indicator.

---

## 6. Sources (all 2026 unless noted)

- [Google March 2026 Core Update complete — Search Engine Land (Apr 8)](https://searchengineland.com/google-march-2026-core-update-rollout-is-now-complete-473883)
- [Google's March 2026 Core Update Has Completed — Search Engine Roundtable](https://www.seroundtable.com/google-march-2026-core-update-complete-41145.html)
- [SEJ — AIO citations from top-10 drop from 76% to 38%](https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/)
- [SEJ — AIO surges across 9 industries (BrightEdge data, Feb '25–Feb '26)](https://www.searchenginejournal.com/google-ai-overviews-surges-across-9-industries/568448/)
- [ALM Corp — Google AI Overview citations drop 76% → 38%](https://almcorp.com/blog/google-ai-overview-citations-drop-top-ranking-pages-2026/)
- [ALM Corp — Query fan-out impact 2026 guide](https://almcorp.com/blog/the-query-fan-out-impact/)
- [ALM Corp — Google AIO running on Gemini 3 (Jan 27, 2026)](https://almcorp.com/blog/google-ai-overviews-gemini-3-update-seo-impact-2026/)
- [SEJ — Anthropic's three Claude bots (Feb 25, 2026)](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/)
- [SEJ — Dynamic GBP profiles as new local ranking factor](https://www.searchenginejournal.com/why-dynamic-profiles-are-the-new-local-ranking-factor/568200/)
- [Sterling Sky — Google My Business updates 2026 log](https://www.sterlingsky.ca/google-local-changes/)
- [Ahrefs — AI Overviews reduce clicks update (58%)](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)
- [Seer Interactive — AIO CTR impact September 2025 update](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update)
- [Lily Ray — Citations in AI search affected by Google organic visibility changes (Feb 2026)](https://lilyraynyc.substack.com/p/are-citations-in-ai-search-affected)
- [9to5Google — AI Mode redesign + agentic restaurant booking globally (Apr 10, 2026)](https://9to5google.com/2026/04/10/google-ai-mode-redesign/)
- [Winbuzzer — AI Mode restaurant booking 8 countries (Apr 13, 2026)](https://winbuzzer.com/2026/04/13/google-ai-mode-rolls-out-restaurant-booking-to-8-countries-xcxwbn/)
- [Viserx — Google drops 7 schema types (Jan 2026)](https://viserx.com/blog/seo/google-drops-7-schema-types)
- [Stan Ventures — John Mueller clarifies schema changes 2026](https://www.stanventures.com/news/google-john-mueller-schema-update-2026-5719/)
- [Digital Applied — E-E-A-T March 2026 experience content](https://www.digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide)
- [SparkToro / Rand Fishkin — zero-click 2024 baseline](https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/)
- [Aleyda Solís — Google query fan-out SEO guide](https://www.aleydasolis.com/en/ai-search/google-query-fan-out/)
- [Google Search Central — Core Web Vitals docs](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [SEJ — March 2026 spam update 24h rollout](https://www.searchenginejournal.com/google-clarifies-how-helpful-content-system-works/500010/)
- [Position.digital — 100+ AI SEO statistics (April 2026 update)](https://www.position.digital/blog/ai-seo-statistics/)

---

**Bottom line for the monthly re-measurement loop**: the biggest playbook change is that *rank ≠ citation anymore*. The KB's core framing still works but the 76% top-10 overlap number is the main thing to fix, and query fan-out coverage should be promoted from a tactical note to a first-class optimization target.
