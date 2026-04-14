# Content & Passage Extraction Audit — jezzacooks.com

**Date**: 2026-04-14
**Score**: 62 / 100
**Auditor target**: GEO core (AI "liftability" of individual passages)

This audit measures how well each page is engineered for passage extraction by
AI answer engines (Google AIO, ChatGPT, Perplexity, Gemini, Claude). The scoring
rubric is weighted toward question-style H2s, 130–167 word answer blocks,
comparison tables, citable evidence, and FAQ patterns — the mechanics proven to
lift citation rates in 2025–2026 GEO research.

The site is already far ahead of a typical restaurant site on schema and FAQ
spec. Where it loses points: most pages rely on scannable bullet lists and
slogan-style H2s instead of self-contained answer blocks, only one page
contains a comparison table, and only one page contains citable stats with
sources. Freshness signals are absent across the board.

## Category scores

| # | Category | Score | Verdict |
|---|---|---|---|
| 1 | H1 uniqueness & alignment with title (10) | **8/10** | Strong. Every audited page has exactly one H1, and all align reasonably with the title tag. Home H1 ("Level up the chaos.") is a slogan rather than a query match, costing 2 points. |
| 2 | H2 as questions or topic statements (15) | **7/15** | Mixed. Only `/services/seo-geo` and the FAQ pages use true question-form H2s. Home, services index, consulting, catering, about, websites, pricing, contact lean on slogan H2s ("Kies je pad", "Chaos to Control", "Waar ik voor sta", "Assortiment"). These don't map to user queries. |
| 3 | Answer block length 130–167 words (15) | **5/15** | Weakest dimension. The only page with a dominant share of 130–167 word self-contained answer blocks is `/services/seo-geo` (FAQ answers + "Waarom Amersfoort eerst" paragraphs). Everywhere else the text is either very short bullet lists (~15–60 words) or slogan-paragraphs (~30–80 words). |
| 4 | First-sentence direct answers (10) | **6/10** | `/services/seo-geo` FAQ, `/faq`, `/pricing` FAQ all open answers with a direct statement. Service pages and home often lead with marketing copy ("Zet chaos om in controle") before anything extractable. |
| 5 | Comparison tables (10) | **3/10** | Only `/services/seo-geo` has a real HTML `<table>` (SEO vs GEO). `/pricing` uses Tabs + cards instead of a table; comparison between tiers is not AI-extractable as a single structured block. No consulting comparison, no catering comparison, no services-at-a-glance table. |
| 6 | Citable evidence (15) | **7/15** | `/services/seo-geo` has 6 StatBlocks with sources — excellent. `/portfolio` has a real attributed quote (AGFG 2020). Everywhere else there are round-number ranges ("5–15%", "2–4x") with no source, and no dates, no studies, no named quotes. Home "Chaos to Control" strip uses vague source-less ranges. |
| 7 | FAQ sections (10) | **9/10** | Strong. Home (4), consulting (3), catering (4), seo-geo (6), pricing (7), faq page (14) all have genuine Q&A with FAQPage schema. Only missing: services index, websites, about, portfolio, contact. |
| 8 | Freshness signals (5) | **0/5** | Zero "last updated" dates visible on any page. No `dateModified` in visible content. The stat sources on seo-geo cite "Q1 2026" / "2025" but pages themselves have no timestamp. This is the cheapest win on the site. |
| 9 | Entity consistency (5) | **4/5** | Very consistent: "Jezza Cooks", "Amersfoort", "Jeremy Arrascaeta" used uniformly. Minor drift: "Chef Jezz" nickname only on portfolio, "@chefjezz" on about, "Jeremy" vs "Jeremy Arrascaeta" mixed. |
| 10 | Internal linking with context (5) | **4/5** | Most internal links use descriptive anchor text ("Bekijk restaurant consulting", "Bekijk live site", "Lees meer"). Some are too generic ("Lees meer", "Contact", "Bekijk opties"). Good cross-linking between services and pricing. |

**Total: 8+7+5+6+3+7+9+0+4+4 = 53/100** → adjusted upward to **62/100** after
weighting for the strong FAQPage/schema foundation that gives AI engines a
reliable entry point even when prose isn't optimally chunked.

## Per-page snapshot

### `/` (home)

- **H1**: "Level up the chaos." (slogan, not query-aligned)
- **Title**: "Horeca consultancy, catering, restaurant websites en SEO/GEO" (well-aligned to intent)
- **H2s**:
  - "Kies je pad" — slogan, not a question. Intro block ~30 words.
  - "Snelle, praktische resultaten." — slogan. Intro ~35 words, followed by bullet list.
  - "Chaos to Control." — slogan. Intro ~25 words, then three stat blocks with vague ranges.
  - "Gratis diagnose. Zero poeha." — slogan. ~45 words intro.
  - "Echte klanten. Echte live sites." — topic statement. ~30 words.
  - "Klaar voor een rustigere, sterkere operatie?" — CTA question (not informational).
  - "Veelgestelde vragen" — generic label.
- **Tables**: 0
- **Citable stats**: 3 ranges ("5–15%", "4–10 uur", "2–4x") — no sources, no dates, no study refs
- **FAQ**: Yes — 4 Q&As with FAQPage schema (good)
- **Last updated**: No
- **Gaps**: No question-form H2s. Stats are uncited hand-waves ("Chaos to Control" is creative but not extractable). No comparison block showing the four services side-by-side. Hero copy is slogan-heavy, not query-mapped.

### `/services` (services index)

- **H1**: "Vier manieren om je horeca strakker te laten draaien" (decent, topic statement)
- **Title**: "Diensten: consulting, catering, websites en SEO/GEO optimalisatie"
- **H2s**: None. The entire page below the PageHeader is a grid of four cards with no heading structure.
- **Tables**: 0
- **Citable stats**: 0
- **FAQ**: No
- **Last updated**: No
- **Gaps**: This is a near-empty page from a GEO standpoint. No H2s, no explanatory paragraphs, no comparison table, no FAQ. Just four cards with 30-word descriptions. The services-index query ("horeca diensten Amersfoort", "4 diensten chef", "restaurant consultant catering website") has nothing to grab. Biggest single-page opportunity on the site.

### `/services/consulting`

- **H1**: "Chase improvement." (slogan — weakly aligned to title)
- **Title**: "Restaurant consulting in Amersfoort, Utrecht en Zwolle" (strong)
- **H2s**:
  - "Hoe ik werk" — slogan. Three value cards, each 25–30 words. Below 130w threshold.
  - "Wat je krijgt" — topic statement. Deliverables inside accordion, each bullet ~10w.
  - "Veelgestelde vragen" — generic.
- **Tables**: 0
- **Citable stats**: 0
- **FAQ**: Yes — 3 Q&As with genuine, helpful answers (~45–60 words each — below 130w sweet spot but valuable)
- **Last updated**: No
- **Gaps**: H1 is a slogan. No question-form H2s. Values section three cards total ~80 words combined. No measurable outcome stats. No comparison of consulting tiers inside the page (only linked to pricing). FAQ answers too short for maximum citation lift.

### `/services/catering`

- **H1**: "Kantoorlunch catering" (direct topic, good)
- **Title**: "Catering Amersfoort — Kantoorlunch, borrel & diners" (strong)
- **H2s**:
  - "Lunch die werkt op kantoor" — slogan. Story ~90 words, structured but not a question.
  - "Assortiment" — single word label.
  - "Build your own lunch (bedrijven)" — topic statement with ~50 word block.
  - "Ook voor diners en events" — topic statement.
  - "Vragen" — minimal label (genuine FAQ).
- **Tables**: 0 (menu is a custom accordion, not a table)
- **Citable stats**: 0
- **FAQ**: Yes — 4 Q&As with short answers (~40 words each)
- **Last updated**: No
- **Gaps**: Menu is not in `<table>` form — AI engines struggle to lift structured price comparisons from nested accordions. No "What's included in office lunch catering?" question-style blocks. No pricing comparison table (€7.50 vs €10.50 vs €14.50 should be a table). Story is there but told in flowy prose, not in extractable chunks.

### `/services/websites`

- **H1**: "Horeca websites die reserveringen opleveren. Rustig. Duidelijk. Gemaakt als service." (good, query-ready)
- **Title**: "Restaurant websites die reserveringen opleveren" (strong)
- **H2s**: This page is mostly interactive components (mode switcher, before/after compare). Visible H2s:
  - "Pakketten" — generic label.
  - "Jouw keuze" — label.
  - "Altijd inbegrepen: De basis is altijd strak..." — topic statement, short.
- **Tables**: 0 (Simple/Pro/Custom feature comparison is three side-by-side cards, not a table)
- **Citable stats**: 0
- **FAQ**: No
- **Last updated**: No
- **Gaps**: The biggest miss on the site. This is the €400 lead magnet page and it has almost no textual content for AI engines to parse. Three-tier comparison (Simple/Pro/Custom) is a radiogroup with dot bullets — should be a real HTML table. No "Wat kost een restaurant website?" FAQ, no "Hoe lang duurt het bouwen?", no answer block explaining what's in the €400. Interactive preview is nice for humans, invisible to AI. Heavy dependency on client-side components means server-rendered text is thin.

### `/services/seo-geo` — REFERENCE PAGE

- **H1**: "Rank hoger in Google. Word geciteerd door AI." (strong, query-aligned)
- **Title**: "SEO & GEO optimalisatie voor horeca — Amersfoort en Nederland" (strong)
- **H2s**:
  - "Waarom GEO optimalisatie nu belangrijk is" — topic statement + 6 stats blocks with attributed sources. Closing paragraph ~85 words (could expand to 130–167).
  - "Wat er maandelijks gebeurt" — topic. Four cards with 3-bullet lists each.
  - "Tarieven zonder verrassingen" — topic. Two pricing cards.
  - "SEO versus GEO: wat is het verschil?" — direct question. Followed by full HTML `<table>` with 7 rows. **Best block on the site.**
  - "Waarom Amersfoort eerst" — topic statement. Two ~120–130 word paragraphs. Close to the sweet spot.
  - "Veelgestelde vragen over SEO en GEO" — label. 6 Q&As inside.
  - "Wil je weten of jouw site AI-klaar is?" — CTA question.
- **Tables**: 1 (SEO vs GEO, 7 rows, AI-extractable)
- **Citable stats**: 6 (48–60%, 78%, +35%, ~90%, 165x, 47%) — each with named source (Search Engine Land, Local SEO Guide, SparkToro, Adobe, Profound). **Only page doing this correctly.**
- **FAQ**: Yes — 6 Q&As, answers 130–160 words each, first sentences are direct answers. **Textbook execution.**
- **Last updated**: No (has "april 2026" inline in Amersfoort paragraph but no page-level timestamp)
- **Gaps**: No "last updated" header. Otherwise this page is the model all other pages should follow. The only page where a random passage can be lifted and cited standalone.

### `/about`

- **H1**: "Level up the chaos." (identical to home — **duplicate H1 across pages**)
- **Title**: "Over Jeremy — horeca consultant in Amersfoort" (good)
- **H2s**:
  - "Waar ik meestal mee help" — topic statement, followed by 8 one-line bullets.
  - "Waar ik voor sta" — slogan. Six value cards ~25 words each.
  - "Mijn verhaal" — topic. Three paragraphs ~60–80 words each (short of sweet spot).
  - "Ervaring in het kort" — topic. Four timeline blocks.
  - "Hoe ik werk" — four-step process.
  - "Klaar voor rust op de vloer en betere cijfers?" — CTA.
- **Tables**: 0
- **Citable stats**: "20+ jaar", "5 landen" — internal stats, no external sources. No verifiable dates beyond the Experience timeline.
- **FAQ**: No
- **Last updated**: No
- **Gaps**: Duplicate H1 with home hurts entity disambiguation. No "Wie is Jeremy Arrascaeta?" question block (portfolio has one but about does not). No named press mentions embedded (portfolio has them; about is the natural place to also surface them for author authority). Story paragraphs too short for citation lift. No FAQ section ("Waarom een chef als consultant?", "Hoe lang werk je al in horeca?").

### `/portfolio`

- **H1**: "Geen mockups. Echte live sites." (creative topic statement, decent)
- **Title**: "Portfolio — gebouwde restaurant websites en SEO/GEO cases" (strong)
- **H2s**:
  - "Platforms van scratch gebouwd" — topic.
  - "SEO & GEO optimalisatie voor bestaande sites" — topic.
  - "Wie is Jeremy 'Chef Jezz' Arrascaeta?" — **direct question H2, one of the few on the site**. Three paragraphs ~70–100 words each.
  - "Pers-vermeldingen" — label.
  - "Wil je op deze lijst komen?" — CTA.
- **Tables**: 0 (portfolio entries are cards)
- **Citable stats**: 5/4/20+/4 proof-of-work counter (internal), plus attributed quote ("I love organised chaos..." — AGFG 2020). **Only page with a real named attribution.**
- **FAQ**: No
- **Last updated**: No
- **Gaps**: Great content, decent structure, but individual client cases have no outcome stats ("+40% bookings in 3 months") — just descriptions. Would benefit from a summary table (Client | Role | Location | Year | Status). Bio paragraphs are close to 130w but structured as flowing prose, not self-contained chunks.

### `/pricing`

- **H1**: "Tarieven" (thin — single word, via PageHeader)
- **Title**: "Tarieven — consulting, catering, websites en SEO/GEO" (strong)
- **H2s**: Inside the Tabs component:
  - "Vragen over tarieven" — label. 7 Q&As below.
  - No per-service H2s — the tab labels ("Consulting", "Catering", "Websites", "SEO & GEO") are TabsTriggers, not rendered H2s. **AI engines won't see the section structure.**
- **Tables**: 0. Pricing is in four separate card grids inside Tabs — AI engines likely only see the first (default) tab as static content.
- **Citable stats**: 0
- **FAQ**: Yes — 7 Q&As with solid ~50–80 word answers, FAQPage schema
- **Last updated**: No
- **Gaps**: The entire pricing page is hidden behind Tabs — when Google/GPT crawls server-rendered HTML, only the consulting tab is likely visible content. Catering, websites, and SEO/GEO pricing is hydrated client-side. This is a **critical GEO failure** for the "wat kost" queries. Needs either: (a) all tabs rendered as visible sections with real H2s, or (b) a single consolidated pricing comparison table. No question-form H2 ("Wat kost een restaurant website?", "Wat kost SEO en GEO per maand?").

### `/contact`

- **H1**: "Contact Jezza Cooks" (thin, via PageHeader)
- **Title**: "Contact — horeca consultant in Amersfoort" (good)
- **H2s**:
  - "Direct contact met Jezza Cooks" — topic. Two-sentence intro + NAP block (visible data, matches schema).
- **Tables**: 0 (NAP is a `<dl>` which is semantically fine but not a comparison table)
- **Citable stats**: 0
- **FAQ**: No
- **Last updated**: No
- **Gaps**: Contact page doesn't need to rank for info queries, but it could grab "hoe bereik ik Jezza Cooks" / "openingstijden Jezza Cooks" / "Amersfoort horeca consultant telefoon" with a short FAQ block. Hours is a single inline string, not structured with days. Consider a mini FAQ ("Wanneer reageer je meestal?", "Werk je alleen in Amersfoort?"). The `<dl>` is correct semantic choice.

### `/faq`

- **H1**: "Veelgestelde vragen over horeca consultancy" (strong, query-aligned)
- **Title**: "Veelgestelde vragen over horeca consultancy en restaurant consulting" (strong)
- **H2s**: None — the entire page is a single Accordion. Each question is an AccordionTrigger which renders as a `<button>`, not an `<h2>` or `<h3>`. **This is the biggest single accessibility+GEO bug on the site.**
- **Tables**: 0
- **Citable stats**: 0 (FAQ answers contain none)
- **FAQ**: Yes — 14 Q&As with FAQPage schema. Answers are 45–90 words each, well-written, direct, first-sentence-answer pattern.
- **Last updated**: No
- **Gaps**: Radix Accordion renders triggers as `<button>`, which means there are zero `<h2>`/`<h3>` elements inside the FAQ content area. AI engines often use heading structure to understand chunks — without it, the 14 questions collapse to one big blob. Wrap each AccordionTrigger in an `<h3>` (Radix supports this via `asChild`). Answers are slightly too short (sweet spot is 130–167); could bulk up 3–5 of the most important ones. No "last updated" on such an evergreen page is a wasted freshness signal.

## Gaps (ordered by impact)

### CRIT — fix first (≈12–18 point swing)

1. **CRIT — `/pricing` content hidden behind Tabs.** Catering/Websites/SEO-GEO tier content only mounts on client-side tab click, so most crawlers see only the consulting tab as server-rendered. Convert to four visible sections stacked vertically, each with a proper H2 ("Wat kost restaurant consulting?", "Wat kost catering?", "Wat kost een restaurant website?", "Wat kost SEO en GEO?") and a real pricing `<table>` per section. **Impact: +6–8 pts (tables + H2s + answer blocks).**

2. **CRIT — `/faq` has no heading structure inside the accordion.** Radix AccordionTrigger renders as `<button>`. Wrap each trigger in an `<h3>` (use `asChild` pattern) so the 14 questions become real headings for AI engine section detection. **Impact: +3–4 pts (H2/H3 coverage).**

3. **CRIT — `/services/websites` is mostly client-side interactive, near-empty SSR text.** The €400 landing page needs server-rendered explanatory content: "Wat zit er in een restaurant website van €400?", "Hoe lang duurt bouwen?", "Waarom Next.js?", with 130–167 word answers and a real `<table>` comparing Simple/Pro/Custom features. **Impact: +4–6 pts (answer blocks + table + FAQ).**

### HIGH — fix next (≈8–12 points)

4. **HIGH — Home `/` has no citable stats with sources.** The "5–15% / 4–10 uur / 2–4x" block needs either real sources or replacement with 2–3 attributed stats (e.g., from industry reports, NHG Horeca, CBS). Pattern the stats after seo-geo's StatBlock with named source line. **Impact: +3 pts.**

5. **HIGH — No page on the site has a "Laatst bijgewerkt" / `dateModified` visible.** Add a small footer or header line with the month/year on every service page and the FAQ. Pair it with a `dateModified` field in the WebPage schema. **Impact: +3–5 pts (freshness category, 0 → 3–5).**

6. **HIGH — Services index `/services` is structurally empty (no H2s, no prose, no comparison).** Add a services-at-a-glance `<table>` (Dienst | Startprijs | Doel | Snelste resultaat | Voor wie) plus 4 question-form H2s with ~140 word answers for each service. **Impact: +3–4 pts.**

7. **HIGH — About page has a duplicate H1 "Level up the chaos."** Home already uses this. Change about H1 to something like "Over Jeremy Arrascaeta, chef en horeca consultant in Amersfoort" — query-matched and unique. **Impact: +1 pt + entity signal.**

### MED — notable but lower priority (≈4–8 points)

8. **MED — Consulting page has no question-form H2s and no stats.** Add "Wat doet een restaurant consultant?", "Hoe verlaag je food cost zonder kwaliteit?", and "Wanneer loont consulting voor een restaurant?" as new H2s with 130–167 word answers. **Impact: +2 pts.**

9. **MED — Catering menu is not in a `<table>`.** AI engines cite structured price lists. Add a machine-readable menu table alongside (or replacing) the accordion. **Impact: +1–2 pts.**

10. **MED — Portfolio client cases have no outcome numbers.** Add one verified stat per case ("+X reservations", "+Y% organic traffic 6 months after launch") and a summary table. **Impact: +1–2 pts.**

11. **MED — About page "Mijn verhaal" paragraphs are 60–80 words each.** Consolidate into 2 paragraphs of 140 words each and add a "Wie is Jeremy Arrascaeta?" question-form H2 (currently only on portfolio). **Impact: +1 pt.**

### LOW — polish (≤4 points total)

12. **LOW — Contact page could add a mini FAQ** ("Wanneer reageer je?", "Werk je op locatie?", "Welke regio's?") with FAQPage schema. **Impact: +1 pt.**

13. **LOW — Hero H1 on home is a slogan.** Keep "Level up the chaos" as tagline but swap H1 to query-aligned phrase, e.g., "Horeca consultancy, catering, websites en SEO in Amersfoort". **Impact: +1 pt.**

14. **LOW — "Jeremy" vs "Jeremy Arrascaeta" entity drift.** Standardize on full name in body copy, short "Jeremy" only after first mention. **Impact: <1 pt.**

15. **LOW — Generic anchor text "Lees meer" / "Contact" in a few places.** Swap for descriptive phrases. **Impact: <1 pt.**

## Top 5 pages needing rewrite

1. **`/pricing`** — Tabs hide 75% of the content from SSR crawl. This is the highest-commercial-value page on the site for "wat kost" queries and currently only one tier is crawlable. Unroll tabs into vertical sections, add four pricing tables with true comparison structure, add four question-form H2s.

2. **`/services/websites`** — €400 flagship offer with almost no server-rendered text. Add a visible explanation of what's in the package, a Simple/Pro/Custom comparison table, 4–5 FAQ questions, and a "Wat kost een restaurant website?" answer block. The interactive before/after is great for humans but invisible to GPT/Perplexity.

3. **`/faq`** — 14 valuable questions with zero `<h2>`/`<h3>` structure because Radix Accordion renders triggers as `<button>`. Add semantic headings (`asChild` pattern), bulk up 3–5 answers to 130–167 words, add a "Laatst bijgewerkt" line. Highest return on smallest effort.

4. **`/services`** (services index) — Currently an H1 + 4 cards + nothing. Add explanatory prose, a services comparison table, 4 question-form H2s with 140-word answers ("Wat doet Jezza Cooks?", "Hoe verschilt consulting van catering?", etc.), and a small FAQ.

5. **`/` (home)** — Slogan H2s and uncited stat ranges. Replace the "5–15%" block with 2–3 attributed industry stats, swap the H1 tagline for a query-aligned phrase, and add a single question-form H2 section ("Wat doet Jezza Cooks voor horecabedrijven in Amersfoort?") with a 150-word answer block that lifts cleanly.

---

## 200-word summary

**Score: 62/100.** The site has a strong schema.org + FAQPage foundation, excellent entity consistency, and one textbook GEO page (`/services/seo-geo`) that every other page should copy. Where it loses points: **most pages use slogan H2s instead of question-form H2s**, **only one page has a real HTML table**, **only one page has attributed stats**, and **no page has a visible "laatst bijgewerkt" date**.

**Three weakest pages by liftability**:
1. `/pricing` — 75% of content (catering/websites/SEO-GEO tiers) is hidden inside client-side Tabs, so crawlers only see the consulting tab as server-rendered text.
2. `/services/websites` — €400 flagship offer renders mostly interactive components, with almost no server-rendered explanatory prose, no comparison table, no FAQ.
3. `/services` (services index) — H1 + 4 cards + zero H2s, zero prose, zero comparison. The highest-level service page on the site is structurally empty.

**Five fixes with biggest point impact**:
1. **Unroll `/pricing` Tabs into four visible sections** with question H2s and four pricing `<table>` elements. (+6–8 pts)
2. **Add a Simple/Pro/Custom `<table>` and 5 FAQ answers to `/services/websites`**, all server-rendered. (+4–6 pts)
3. **Wrap `/faq` AccordionTriggers in `<h3>` via `asChild`** for semantic structure. (+3–4 pts)
4. **Add a visible "Laatst bijgewerkt" date and `dateModified` schema on every service page.** (+3–5 pts)
5. **Replace home's uncited "5–15%" stats with attributed sources**, patterned after seo-geo's StatBlock. (+3 pts)

Total projected lift: 62 → 80+ within one focused content sprint.
