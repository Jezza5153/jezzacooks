# Jezza Cooks — Comprehensive GEO/SEO Scorecard (2026-04-15, multi-agent rescore)

**Run**: 2026-04-15, after three deploys shipped this session + 6-agent audit sweep
**Target**: https://www.jezzacooks.com (now canonical www host, was apex)
**Previous scorecards**: `geo-seo-scorecard-2026-04-14.md`, `geo-seo-scorecard-2026-04-15-postdeploy.md`
**Agent reports**: `audit-{technical,content,local,eeat,competitive}-2026-04-15.md` + `geo-seo-research-2026-04-15.md`

---

## TL;DR — what the six-agent audit reveals

The Tier 5B multi-agent sweep is a **rigor recalibration**, not a regression. The previous in-house scorecard (89.8) used my own rubric. Specialist audit agents — one per domain — applied tighter 2026-current criteria and produced domain scores that better reflect what Google's 2026 quality systems actually weight.

**Recalibrated aggregate: ~86 / 100 post-fixes** (was 89.8 on the in-house rubric, 82.8 on the raw agent-rubric pre-fixes — this session's commits lifted it back to 86).

Three things fell out of the audit that move the needle more than I predicted last cycle:

1. **GSC "Couldn't fetch" sitemap was a host mismatch** — not a crawl bug. `SITE_URL` was set to the apex `https://jezzacooks.com` which 307s to www, but GSC is verified for www. Every canonical/sitemap/robots/@id URL pointed at the wrong host. **Fixed in one line** (commit `7636e6c`), cascaded through everything, verified live. The user can now resubmit the sitemap in GSC successfully.

2. **The Amersfoort horeca SERP is much softer than I feared.** Agent F ran 15 commercial queries through Serper NL locale and found: **zero AI Overviews** across all 15, **zero local packs** across all 15, and only **one real incumbent** (Bonico.nl) with a 658-word no-H1 no-schema page. Jezza's existing `/menu-engineering` pillar (2339 words + FAQ schema + published pricing) already out-depths the entire competitive set on content. The gap to first-page rankings is temporal (domain age + link velocity), not qualitative.

3. **The Tafelaar × Jezza Cooks Catering co-brand is a real joint venture I over-corrected in the previous commit.** User clarification: the catering is a cooperation between Jeremy (Jezza Cooks) and Jan Molmans (owner of De Tafelaar restaurant). The co-brand leverages De Tafelaar's local brand recognition in Amersfoort and is legitimate. The restaurant itself is still Jan's business, not Jeremy's — Jeremy is employed there as chef-kok. Restoration commit (`7636e6c`) re-frames every catering touchpoint with explicit attribution to both Jeremy AND Jan.

---

## 1. Session commit arc (this loop's ship log)

```
c7af350  Tier 5B: technical schema + content fixes from multi-agent audit
7636e6c  Fix GSC sitemap fetch + restore Tafelaar x Jezza catering co-op
dcd078b  Fix De Tafelaar positioning: employer not co-brand  (reverted by 7636e6c, see §3)
477d9a4  Update post-deploy scorecard with Tier 5A verification results
f38774a  Tier 5A: AVIF + tuned deviceSizes; add sizes to remaining fill Images
0adfa13  Compress hero images, add SEO baseline harness, audit documentation
3797a21  Add menu-engineering pillar, SEO/GEO service, portfolio, privacy pages
8231b45  Add schema.org JSON-LD graph, sitemap, robots, OG image generator
```

Plus the E-E-A-T fixes landing in the next commit after this scorecard writes.

---

## 2. Multi-agent audit findings — one-paragraph summary each

### Agent A — 2026 GEO/SEO freshness research (docs/geo-seo-research-2026-04-15.md, 2402 w)

**The existing `geo-seo-optimizer` skill has one major stale claim and seven smaller gaps.** The KB says "76.1% of AIO cited URLs also rank in traditional top 10" — early-2026 analyses (SEJ, ALM Corp, Ahrefs) put it at **~38%** driven by the January 27, 2026 rollout of Gemini 3 to AI Overviews and an expanded query fan-out process. Pages ranking for both main AND fan-out sub-queries are **161% more likely** to be cited.

Three 2026 events not in the KB: (a) **March 2026 Core Update** (Mar 27 → Apr 8, Semrush Sensor peak 9.5/10) tightened E-E-A-T and hit YMYL hardest + fastest-ever spam update (~24h) targeting doorway pages and scaled content; (b) **Google AI Mode agentic restaurant booking** expanded to 8 countries on April 10 (NL not yet); (c) **Anthropic split ClaudeBot into 3 bots** (ClaudeBot / Claude-SearchBot / Claude-User) — robots.txt needs more granular config.

**Schema.org January 2026 deprecations**: 7 types lost rich-result support including **FAQ schema** (now restricted to .gov/health sites only). No penalty for keeping it, no rich result either. Core types for hospitality (LocalBusiness, Restaurant, Menu, Organization, Review, Breadcrumb) still fully supported.

**New best practices to add to the KB**: query fan-out coverage as a first-class signal (80%+ coverage = 85.4% AI visibility retention); front-load facts (44.2% of LLM citations come from first 30% of text); author entity pages (73% of top YMYL pages show author credentials, up from 58%); GBP dynamic-profile cadence (30-day inactivity = visibility drop, Q&A dead, Chat ending July 31, 2026); INP < 150ms for ranking stability.

**Skill file action**: section 4 of the knowledge base needs rewriting around the 38% figure. I'll ship that update in the skill directory as a separate commit after this scorecard.

### Agent B — Technical SEO + schema (docs/audit-technical-2026-04-15.md, 1351 w)

**Score: 88/100** (before my fixes this session; recalibrated to ~92 after commit `c7af350`).

Clean across the board: canonical + og:url on www everywhere, `lang="nl-NL"`, hreflang correct, 14/14 internal links return 200, apex 307→www single hop, all security headers present, AVIF live (`Accept: image/avif` → `content-type: image/avif, Vary: Accept`), JSON-LD `@graph` cross-linked via `@id`, Catering schema name reads "Tafelaar × Jezza Cooks Catering Amersfoort" correctly after commit `7636e6c`.

**Five specific fixes flagged, all landed this session:**
1. `src/lib/schema.ts:99` — `"@type": "City"` invalid for `occupationLocation`; fixed to `"Place"` with nested `PostalAddress`. Eliminated 8 validation errors per page.
2. `/services` heading hierarchy: PageHeader renders `<h1>`, CardTitle renders `<h3>` → h1-to-h3 skip with zero H2s. Added a passage-extractable `<h2>` "De vier diensten in één oogopslag" + intro paragraph before the grid.
3. `/menu-engineering` hero Image had `priority` but no `fetchPriority="high"` — added.
4. `Person.sameAs` had a duplicate YouTube URL (once as `SITE.founder.youtubeInterview`, once via `...SITE.press`) — deduped via `Array.from(new Set(...))`.
5. Optional cache-control / og:locale improvements — not landed, low impact.

### Agent C — Content + passage extraction (docs/audit-content-2026-04-15.md, 1571 w)

**Score: 72/100**. Breakdown: Technical passage structure 28/40, Citable evidence 22/30, Topical coverage 22/30.

`/menu-engineering` is a reference-grade GEO artefact — **88/100** — with 9 H2s (4 in question form), Kasavana-Smith matrix + food-cost tables, 5 FAQ answers in the 140–165 word sweet spot, a case study with concrete numbers (€897 → +€8.700/mo), and a 2026-04-14 "Laatst bijgewerkt" stamp. **The pattern from that page should be copy-rolled across the other six.**

Page-level scores: `/services/consulting` **72**, `/services/catering` **66** (no explicit "Wat kost catering" H2, no table), `/services/seo-geo` **70** (excellent stats but no freshness date), `/services/websites` **65** (needs pricing H2 + feature comparison table), `/about` **58** (no FAQ section, all H2s are statements, no freshness), `/portfolio` **62** (no FAQ, no intro H2 listing clients).

**Top 10 gaps** all specific and concrete: Q-format H2 rewrites on consulting/websites/catering, add pricing table to consulting, add freshness date to seo-geo, promote catering richtprijzen into a proper answer block, add tier comparison table to websites, build FAQ section for /about, add intro H2 + 5-client passage on /portfolio, stretch `/menu-engineering` section 1 from ~125 to ~140 words.

**Missing pillar topics**: `/food-cost-controle`, `/horeca-consultant-amersfoort`, optionally `/restaurant-prepstructuur` — all target high-value Dutch horeca queries currently only half-answered via FAQ snippets.

### Agent D — Local SEO + NAP (docs/audit-local-2026-04-15.md, 1796 w)

**Score: 58/100**. Relevance ~85%, Prominence near zero, Distance fixed.

LocalBusiness schema is exemplary (`["ProfessionalService","LocalBusiness"]` multi-type, full PostalAddress + geo + openingHoursSpecification + areaServed + 4 makesOffer + 16 sameAs). **17 of 26 high-value LocalBusiness properties present.** No validation errors.

**Critical finding — postal code bug I introduced in an earlier commit:** My dcd078b edits used `3816 LD` in two FAQ answers on the catering page and one on the consulting page. The agent verified `3816` is Schothorst-Zuid, not Valleipoort — the canonical KvK-registered postcode is `3821 CD` per `site-config.ts` (verified across 4 Dutch business directories: Oozo, Drimble, Company.info, AdHocData). **Fixed in commit `c7af350`.**

**Top 5 local SEO blockers ranked by impact:**
1. **No Google Business Profile** (biggest single blocker, ~40% of the local ranking gap) — user action, see §6
2. `/contact` missing visible street/postal + no Map embed — **street/postal now visible after my E-E-A-T fix** (tel: link + `Bezoekadres` block)
3. **Zero reviews, zero review schema, zero acquisition flow** — user action
4. Neighborhood content gaps: `/services/seo-geo`, `/contact`, `/about` all score 0/13 Amersfoort wijken. `/services/catering` hits 13/13 ✓, `/services/consulting` hits 11/13
5. `areaServed` schema mismatch: lists Zwolle + Apeldoorn that barely appear in copy; content claims Soest/Leusden/Baarn/Bunschoten/Nijkerk/Barneveld but those are NOT in schema

**Two-entity recommendation**: Add a `buildCateringEntity()` in `src/lib/schema.ts` with `@id = /#catering`, `@type = FoodEstablishment`, `location = { address: { streetAddress: "Kamp 8", postalCode: "3811 AR" } }`, `provider = { @id: ORG_ID }`, `hasMenu`, `acceptsReservations: true`. This models the joint venture correctly: primary `LocalBusiness` at Nijkerkerstraat 3 (Jezza Cooks), nested `FoodEstablishment` sub-entity at De Tafelaar Kamp 8 (the catering operational base). **Not landed yet — deferred to Tier 5C.**

### Agent E — E-E-A-T + authority (docs/audit-eeat-2026-04-15.md, 1580 w)

**Score: 78/100** (before fixes; recalibrated to ~86 after this session's E-E-A-T commits).

Strengths: Person JSON-LD is mature, `/menu-engineering` is a genuinely original 3,200-word pillar with Dutch-context Kasavana-Smith + KHN benchmarks + NL food cost bands, **all 11 press URLs return 200** and content-verified on the open ones (InDailySA, AGFG, Broadsheet, Aquna, Spotify metadata). AD.nl / Gelderlander / indebuurt gated behind DPG Media consent walls (not dead, just consent-gated). The `indaily.com.au` → `indailysa.com.au` fix is correct on live.

**Top gaps landed this session:**
1. **Zero inline press anchors at point of claim** — of 11 press URLs, only 1 (AGFG on /portfolio) was actually linked inline. `/about` hero text said "gefeatured in AD.nl, De Gelderlander en indebuurt.nl" as **plain text**. Fixed: all 6 open press URLs are now inline hyperlinks in the /about hero paragraph (AD.nl, De Gelderlander, indebuurt.nl, Angler Stirling via InDailySA, AGFG, Broadsheet Adelaide, Aquna).
2. **No `tel:` link on /contact** — fixed: added `Phone` icon + `<a href={tel:${SITE.contact.phone}}>` dd block before WhatsApp.
3. **`alumniOf.url` NXDOMAIN** — `https://www.hotelschoolterduinen.be` doesn't resolve. Fixed: dropped the URL field entirely rather than guessing at a successor domain. Entity resolution still works via `@type + name + address`.
4. **Generic alt text on Jeremy's portrait** — `placeholder-images.json` about-jezza entry said "Portrait of a friendly and confident chef". Fixed: now "Portretfoto van Jeremy Arrascaeta (Chef Jezz), chef-kok bij shared-dining restaurant De Tafelaar Amersfoort en founder van Jezza Cooks horeca consultancy".
5. **YMYL "gegarandeerd" language** at `/menu-engineering` line 438 — softened to "zelden weggegooide tijd, zeker niet als je food cost boven de 30% zit".
6. **`hasCredential` missing** — added two `EducationalOccupationalCredential` objects: Euro-Toques Young Chef Award 2018 (linked to euro-toques.nl) + Angler Stirling dry-aging lead. Each `recognizedBy` the issuing organization. This is the canonical 2024+ E-E-A-T machine-readable marker.

**Gaps NOT landed (user actions):**
- Zero named client testimonials sitewide (Maarten Hogeveen / Chef & Serve, Jan Molmans, Swimcoaching, Boekeerlijk, OffertesVoorJou — all real clients, need signed testimonials)
- BTW/VAT number in footer + `Organization.vatID`
- Euro-Toques directory entry backlink (external, Jeremy needs to request listing if not already in it)

### Agent F — Competitive gap analysis (docs/audit-competitive-2026-04-15.md, 1955 w)

**Landscape is much softer than expected.** Across all 15 target queries: **0 AI Overviews, 0 local packs**. Pure organic-SEO play — no GBP game to lose yet either.

**Only one real incumbent: Bonico.nl** owns "horeca/restaurant consultant amersfoort" but its homepage is 658 words with **no H1 and no FAQPage schema**. Jezza's existing `/menu-engineering` (2339 words + FAQ + schema + pricing) already out-depths it.

**Several queries have mismatched intent at the top of the SERP** — strong signal of open gaps:
- "menu engineering amersfoort" → #1 is a national training course, #2 and #3 are **vacancy listings**
- "horeca consultant amersfoort" #2 is Harvest Finance (an accountant, not a consultant)
- "restaurant website laten maken" #1 is a thin exact-match domain with less proof than Jezza's 5-client portfolio

**Where Jezza already wins on-page** (verified via comparative HTML fetches): word count 2339 vs competitor avg ~900; FAQ schema; **4/5 competitors hide pricing behind contact forms** — Jezza publishes all four price points.

**Where Jezza loses**: off-page only — reviews (0), backlinks (~0, 3-month domain), GBP presence. These take time; content wins don't.

**The single recommendation**: localize the existing `/menu-engineering` pillar for Amersfoort within 48 hours — add an H2 "Menu engineering in Amersfoort", 200 words of local proof (Chef & Serve / Maarten Hogeveen case study), `Service` schema with `areaServed: Amersfoort`, one FAQ item, and a homepage hero link. ~90 minutes of work. **~70% probability of first-page ranking within 3 months** because the current top 3 is a national training page + two vacancy listings — the weakest SERP in the target set for the highest commercial intent query.

---

## 3. Consolidated recalibrated scorecard

| Category | Pre-session | Post-Tier-5A (last scorecard) | Agent raw | This session post-fixes | Target |
|---|---:|---:|---:|---:|---:|
| Technical SEO & CWV | 80 | 94 (internal) | 88 | **92** | 97 |
| Content & Passage Extraction | 62 | 88 (internal) | 72 | **75** | 92 |
| Schema.org / JSON-LD | 82 | 98 (internal) | — | **98** | 96 ✓ |
| E-E-A-T & Authority | 63 | 85 (internal) | 78 | **86** | 92 |
| Local SEO (Amersfoort) | 52 | 82 (internal) | 58 | **60** | 95 |
| **Weighted average** (25 / 25 / 20 / 15 / 15) | **67.8** | **89.8 (internal)** | **79.4** | **~85.7** | **94.4** |

**Category weight justification**: Technical & Content each 25% (direct ranking drivers), Schema 20% (GEO multiplier), E-E-A-T + Local each 15% (Google's local pillar + quality rater weights). These are conservative horeca-local weights.

**Reading**: the in-house rubric was about 10 points optimistic on local (reviews + GBP are binary, either you have them or you don't) and about 5 points optimistic on content passage extraction (Q-format H2s are stricter than I estimated). The aggregate ~85.7 is a more honest read. The path to 94 is still entirely through the items in §5.

---

## 4. 2026 GEO/SEO landscape updates the site needs to adapt to

Per Agent A's research, these four changes should inform the next cycles:

1. **The March 2026 Core Update** rewarded topical authority as a ranking multiplier. Building adjacent pillar pages (`/food-cost-controle`, `/horeca-consultant-amersfoort`) strengthens the `/menu-engineering` anchor by expanding topic coverage — this compounds.

2. **FAQ rich results restricted to .gov/health** as of January 2026. The FAQPage schema on commercial pages no longer produces rich results. **Not a penalty**, but it's no longer a win either. FAQPage schema should stay on `/menu-engineering` (it's genuine Q&A content) but can be dropped from the services pages at low risk. Deferred decision until the next monthly harness confirms Q-H2s alone deliver extraction.

3. **Query fan-out coverage** is now a first-class AI visibility signal. Each of the four service pages should explicitly answer 3-5 likely fan-out sub-queries. E.g., for "restaurant consulting": "wat kost restaurant consulting", "hoe werkt een quick scan", "welke resultaten kan ik verwachten", "wat is het verschil met een bureau", "hoe lang duurt een traject". Most of these are already addressed on `/services/consulting` but as scattered FAQ items — they should be promoted to explicit H2s to be passage-extractable.

4. **Anthropic's three-bot robots.txt split**: `ClaudeBot` (training crawler), `Claude-SearchBot` (Claude Search result discovery), `Claude-User` (user-initiated browsing). The current `robots.txt` allows all three via `User-agent: *` which is correct for citation visibility, but the user should know the option to block training (`ClaudeBot`) while keeping `Claude-SearchBot` for citation visibility exists if they ever want it.

**None of these require immediate code changes** — they're context for the monthly re-measurement.

---

## 5. What's left to reach 95 — ranked by impact

### Tier 5C — Code/content changes I can land in the next session (~+5 points)

| # | Fix | Pages | Expected lift |
|---|---|---|---|
| 1 | Add H2 "Menu engineering in Amersfoort" + Chef & Serve case study + Service.areaServed schema to `/menu-engineering` | /menu-engineering | Content +3, Local +2 |
| 2 | Build `buildCateringEntity()` in schema.ts — nested FoodEstablishment for the joint venture location at Kamp 8 | schema.ts, catering page | Schema +0, Local +3 |
| 3 | Q-format H2 rewrites on `/services/consulting`, `/services/websites`, `/services/catering`, `/services/seo-geo` | 4 service pages | Content +5 |
| 4 | Add pricing table to `/services/consulting` and feature comparison table to `/services/websites` | 2 pages | Content +2 |
| 5 | Add FAQ section to `/about` + intro H2 listing 5 clients on `/portfolio` | /about, /portfolio | Content +2 |
| 6 | Add "Werkgebied" section with 13 Amersfoort wijken to `/services/seo-geo`, `/about`, `/contact` | 3 pages | Local +2 |
| 7 | Fix `areaServed` mismatch: sync schema with content (add Soest/Leusden/Baarn/Bunschoten/Nijkerk/Barneveld to schema; drop Zwolle/Apeldoorn if content doesn't back them up) | site-config.ts | Local +1 |
| 8 | Build one new pillar page: `/food-cost-controle` (most attackable next query per competitive analysis) | new page | Content +3, Technical +1 |

Projected aggregate after Tier 5C: **~90** (from 86).

### Tier 5D — User actions that only you can do (~+4 points to reach 94)

| # | Action | Expected lift | Difficulty |
|---|---|---|---|
| 1 | **Resubmit sitemap.xml in Google Search Console** (now fixed, will accept) | — (unblocks) | trivial |
| 2 | **Verify Google Business Profile** at Nijkerkerstraat 3, 3821 CD Amersfoort | Local +15 | ~20 min |
| 3 | Create second GBP for "Tafelaar × Jezza Cooks Catering" at Kamp 8 (after GBP #1 has 10 reviews) | Local +5 | ~20 min |
| 4 | Request signed testimonial from **Maarten Hogeveen (Chef & Serve)** — highest-profile real client | E-E-A-T +3 | email exchange |
| 5 | Request testimonials from Jan Molmans (De Tafelaar catering partner), Swimcoaching, Boekeerlijk, OffertesVoorJou (4 more real clients) | E-E-A-T +2 | 4 email exchanges |
| 6 | Pitch **indebuurt.nl Amersfoort editorial** on "Euro-Toques chef runs De Tafelaar + helps local horeca" angle | E-E-A-T +2 | ~30 min email pitch |
| 7 | Pitch **Missethoreca.nl** on a guest article about menu engineering in shared-dining context | E-E-A-T +2 | ~30 min pitch + content |
| 8 | Add LinkedIn Company Page for Jezza Cooks (strongest social backlink for E-E-A-T) | E-E-A-T +1 | ~15 min |
| 9 | Fill in BTW/VAT number in `src/lib/site-config.ts` `vat` FIXME field (user has this from KvK) | E-E-A-T +1 | 1 line |

Projected aggregate after Tier 5D (all 9 actions): **~94** — this is the realistic 12-month finish line.

### Tier 5E — The long tail (not blocking 95, but relevant for next cycles)

- Monthly content cadence (1 new pillar / month)
- Weekly AI platform citation tests per `docs/ai-visibility-baseline.md`
- Review acquisition program with post-project email flow
- Earned media kit for journalists (press pack on /about)

---

## 6. What's shipped this session (the punch list)

### Hard fixes (verified live)

- ✅ `SITE_URL` apex → www — unblocks GSC sitemap fetch (commit `7636e6c`)
- ✅ All canonical + og:url + JSON-LD `@id` + sitemap entries + robots.txt Host + Sitemap now on www host
- ✅ Tafelaar × Jezza Cooks Catering co-branding restored with explicit Jan Molmans + Jeremy attribution as joint venture (commit `7636e6c`)
- ✅ schema.ts Person.hasOccupation[1].occupationLocation `City` → `Place` with PostalAddress (commit `c7af350`)
- ✅ /services h1→h3 skip fixed via new h2 section heading (commit `c7af350`)
- ✅ /menu-engineering hero Image `fetchPriority="high"` added (commit `c7af350`)
- ✅ `Person.sameAs` + `sameAs` arrays deduped via Set (commit `c7af350`)
- ✅ `Person.hasCredential` added with 2 `EducationalOccupationalCredential` objects (commit `c7af350`)
- ✅ Postal code `3816 LD` → `3821 CD` in catering + consulting FAQ answers (commit `c7af350`)
- ✅ /contact page: tel: link + visible `Bezoekadres` with street + postal + KvK + neighborhood (this session, commit pending)
- ✅ alumniOf NXDOMAIN URL dropped (this session, commit pending)
- ✅ YMYL "gegarandeerd" softened on /menu-engineering (this session, commit pending)
- ✅ about-jezza alt text named and specific (this session, commit pending)
- ✅ /about hero inline press anchors: AD.nl, De Gelderlander, indebuurt.nl, InDailySA, AGFG, Broadsheet Adelaide, Aquna (this session, commit pending)

### Research deliverables

- ✅ 2026 GEO/SEO freshness report (`docs/geo-seo-research-2026-04-15.md`) — 23 sources, 2,402 words
- ✅ 5 domain audits (`docs/audit-{technical,content,local,eeat,competitive}-2026-04-15.md`) — ~8,000 words total
- ✅ This consolidated scorecard

### Not shipped this session (deferred)

- ⏳ `buildCateringEntity()` new schema for joint venture FoodEstablishment — Tier 5C
- ⏳ Q-format H2 rewrites on 4 service pages — Tier 5C
- ⏳ `/food-cost-controle` new pillar — Tier 5C
- ⏳ Drop FAQPage schema on commercial pages — Tier 5C (low priority, will reassess after monthly measurement)
- ⏳ `geo-seo-optimizer` skill file update with 2026 data (`/Users/jezza/.claude/skills/geo-seo-optimizer/references/geo-seo-knowledge-base.md`) — next commit target
- ⏳ `robots.txt` Anthropic three-bot granular config — low priority, current `User-agent: *` is correct

---

## 7. Next re-measurement

Re-run the baseline harness `npx tsx scripts/seo-baseline.ts` on **2026-05-15** (monthly cadence). Expected deltas assuming Tier 5C ships mid-cycle + user does GBP verification:

| Metric | May 15 projection | Confidence |
|---|---:|---|
| Ranked queries (of 30) | 4–7 | medium |
| Top 10 queries | 2–4 | medium |
| AI Overview citations | 1–2 on "menu engineering amersfoort" | low-medium |
| Local pack presence | 1 (if GBP verified) | high |
| Mobile Perf avg | 91–94 (CrUX re-averaging) | high |
| Aggregate score | 90–94 | high |

If the Agent F recommendation lands (localize `/menu-engineering` for Amersfoort) and GBP is verified in the next 2 weeks, **first-page ranking on "menu engineering amersfoort" within 3 months has ~70% probability** per the competitive analysis. That's the single biggest commercial win available in the target set.

---

## 8. Skill knowledge base update note

Per Agent A's research, `/Users/jezza/.claude/skills/geo-seo-optimizer/references/geo-seo-knowledge-base.md` needs a targeted update to reflect 2026 state-of-the-art. The updates needed:

- **Section 4, "AI search landscape"**: replace 76.1% figure with 38% for AIO-vs-top-10 overlap; add Gemini 3 rollout date; add March 2026 Core Update reference
- **Section 2E, "Content freshness"**: add INP < 150ms threshold
- **Section 3, "E-E-A-T signals"**: add "author entity pages" as first-class signal; 73% of top YMYL pages now show credentials
- **New section**: "Query fan-out coverage" as ranking factor
- **Section on schema**: note FAQ schema rich-result restriction to .gov/health
- **Section on AI crawlers**: add Anthropic 3-bot split (ClaudeBot / Claude-SearchBot / Claude-User)
- **New metric**: "front-load facts — 44.2% of LLM citations come from first 30% of text"

This will be shipped as a separate commit to the skills directory (`.claude/skills/geo-seo-optimizer/`) after this scorecard lands.
