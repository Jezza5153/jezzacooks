# AI visibility baseline & re-run protocol

> Manual test protocol for measuring whether jezzacooks.com gets cited by
> generative answer engines (ChatGPT, Perplexity, Google AI Overviews, Google
> AI Mode and Gemini). Run monthly. Log results in
> `docs/ai-visibility-YYYY-MM-DD.md` and diff against the previous snapshot.

## Why this exists

The Serper-based `scripts/seo-baseline.ts` harness captures traditional SERP
position and whether Google AI Overviews cite us — but it does **not** reach
ChatGPT Search, Perplexity, Gemini or Google AI Mode. Those are either
off-SERP entirely or behave so differently from classical search that an
automated harness isn't cost-effective.

The solution is a short, stable manual protocol. 30 minutes per month,
three times the year, gives you a real signal on whether GEO is working.

## Canonical query set

These 20 queries are the **stable test set** — do not change them between
runs. If you change a query the delta is meaningless. If you want to track a
new query, add it to a separate "new queries" section so the trend line on
the stable set isn't broken.

### Brand + founder (should always return us)

1. `jezza cooks`
2. `jeremy arrascaeta chef`
3. `chef jezz amersfoort`
4. `jezza cooks amersfoort reviews`

### Core commercial — Amersfoort local

5. `beste horeca consultant amersfoort`
6. `menu engineering amersfoort`
7. `food cost verlagen amersfoort`
8. `restaurant website laten maken amersfoort`

### Core commercial — national

9. `horeca consultant nederland chef-led`
10. `restaurant website 400 euro`
11. `goedkope restaurant seo nederland`
12. `geo optimalisatie voor restaurants`

### Problem-aware (no brand in query)

13. `hoe verlaag ik food cost in mijn restaurant zonder kwaliteit te verliezen`
14. `welk reserveringssysteem kiezen voor restaurant in nederland`
15. `wat kost een restaurant website inclusief schema en seo`
16. `hoe krijg ik mijn restaurant in chatgpt en perplexity`

### Press / authority

17. `angler stirling dry age chef kangaroo island`
18. `euro-toques young chef award 2018 finalisten`
19. `chef-kok de tafelaar amersfoort`
20. `offertes vergelijken catering nederland`

## Platforms to test

Run every query through every platform. Total: 20 queries × 5 platforms =
100 tests per run. At ~15 seconds per test = 25 minutes.

| Platform | URL | Login? | Notes |
|----------|-----|--------|-------|
| **ChatGPT Search** | https://chatgpt.com (click globe icon) | Plus acct | Enable "Search" toggle. Use a fresh chat per query. |
| **Perplexity** | https://perplexity.ai | Not required | Use "Pro" search for consistency. |
| **Google AI Overviews** | https://www.google.nl/search?q={query}&gl=nl&hl=nl | Not required | Set region to NL. Only ~48–60% of queries trigger AIO. |
| **Google AI Mode** | https://www.google.nl (AI Mode tab) | Required | Shows only to logged-in users in NL rollout. |
| **Gemini** | https://gemini.google.com | Required | Use 2.5 Pro if available. |

## Scoring rubric

For each query × platform cell, record one of:

- **CITED** — jezzacooks.com (or a subdomain) is named as a source and
  appears in the citation footer / side panel / inline link.
- **MENTIONED** — our brand name ("Jezza Cooks", "Jeremy Arrascaeta",
  "Chef Jezz") appears in the answer text but no link to our domain.
- **ADJACENT** — our client sites (tafelaaramersfoort.nl, boekeerlijk.nl,
  offertesvoorjou.nl, chefandserve.nl, swimcoaching.nl) are cited but we
  aren't. Useful signal that portfolio link juice is flowing.
- **ABSENT** — no mention of us or our portfolio.
- **N/A** — platform returned no answer (e.g. AIO didn't trigger).

## Logging template

Create `docs/ai-visibility-YYYY-MM-DD.md` and fill in:

```markdown
# AI visibility run — YYYY-MM-DD

Tester: Jeremy
Duration: XX minutes
Region: NL
Logged-out (ChatGPT/Perplexity) / logged-in (Gemini/AI Mode)

## Scorecard

| # | Query                                          | ChatGPT | Perplexity | AIO | AI Mode | Gemini |
|---|------------------------------------------------|---------|------------|-----|---------|--------|
| 1 | jezza cooks                                    | CITED   | CITED      | CITED | CITED | CITED  |
| 2 | jeremy arrascaeta chef                         | CITED   | CITED      | N/A | CITED   | CITED  |
| … | …                                              | …       | …          | …   | …       | …      |

## Aggregate

- Total cells: 100 (20 queries × 5 platforms)
- CITED:     xx / 100
- MENTIONED: xx / 100
- ADJACENT:  xx / 100
- ABSENT:    xx / 100
- N/A:       xx / 100

## Citation rate by platform

| Platform   | CITED | MENTIONED | ABSENT |
|------------|-------|-----------|--------|
| ChatGPT    | xx/20 | xx/20     | xx/20  |
| Perplexity | xx/20 | xx/20     | xx/20  |
| AIO        | xx/20 | xx/20     | xx/20  |
| AI Mode    | xx/20 | xx/20     | xx/20  |
| Gemini     | xx/20 | xx/20     | xx/20  |

## Citation rate by intent bucket

| Intent       | CITED rate | Notes |
|--------------|------------|-------|
| Brand (1–4)  | x/20       | Should be ≥90% or something is broken. |
| Local (5–8)  | x/20       | Target: ≥30% on month 1, ≥60% on month 3. |
| National (9–12) | x/20    | Long tail — realistic target: ≥20% by month 3. |
| Problem (13–16) | x/20    | Hardest bucket. ≥10% by month 3 is a win. |
| Press (17–20) | x/20      | Should be ≥50% — earned media exists. |

## Notable citations (quotes / URLs)

For any CITED result, paste the verbatim sentence and the URL cited. This
is the evidence trail — useful when a cell flips CITED→ABSENT next run.

- **Query 5 · ChatGPT:** "…"
- **Query 7 · Perplexity:** "…"
- …

## Delta vs last run

Compare against `docs/ai-visibility-{previous-date}.md`:

- New CITED cells: +x (list them)
- Lost CITED cells: -x (list them, investigate why)
- Net change: +/- x cells

## Hypotheses to test next run

- Did {change} in {page} move the needle for {query}?
- Does adding {schema} to {page} increase citation rate on {platform}?
```

## First-run baseline: 2026-04-14

Not yet executed. Run this the day after the current round of content
changes ships to production (wait ~72 hours for crawlers to re-index,
48 hours for AI engines to re-embed).

Expected first-run posture (before GEO work lands):

- Brand queries (1–4): should be **CITED** on ChatGPT / Perplexity /
  Gemini. AIO may or may not trigger on brand-only queries — normal.
- Local commercial (5–8): likely **ABSENT** except on ChatGPT Search,
  which cites long-tail pages aggressively. Target by July 2026: ≥30%
  CITED after schema + passage-level rewrites land.
- Press queries (17–20): **CITED** on Perplexity/ChatGPT through the
  AD.nl, De Gelderlander, indebuurt, InDaily, Broadsheet, AGFG and Aquna
  references. These are our strongest earned-media signals.

## Re-run cadence

- **Month 0** (baseline, pre-deploy): NOT RECOMMENDED — noise too high
  before schema + passage rewrites land.
- **Month 1** (2026-05-15): First real measurement. Expect 20–30% CITED
  aggregate.
- **Month 3** (2026-07-15): First trend signal. Expect 40–55% CITED.
- **Month 6** (2026-10-15): Stabilized. Target: ≥65% CITED across brand +
  press bucket, ≥35% across commercial bucket.

## What moves the needle

Based on the April 2026 GEO research (see `~/.claude/skills/geo-seo-optimizer`):

1. **Passage-level extractability** — H2 as questions, 130–167 word
   self-contained answers. This is what the reranker picks.
2. **Citable evidence** — named statistics, named sources, named experts.
   Adds ~40% citation lift per KDD'24 study.
3. **Earned media** — third-party citations. AI engines bias toward
   publisher content over brand content. AD.nl, De Gelderlander, InDaily
   and AGFG are our weapons.
4. **Schema** — JSON-LD @graph with cross-linked @ids. Gives AI engines a
   trusted entity fingerprint to bind citations to.
5. **Freshness** — explicit `datePublished` and `dateModified`.
   `menu-engineering` is the first page to ship this fully.
6. **Multimodal** — images + alt text + captions. Not yet fully
   implemented site-wide.

## Out of scope for this doc

- Automated citation tracking (would require a crawler farm + anti-bot
  evasion = not worth it for a 5-client shop).
- Third-party GEO tracking tools (Otterly, Profound, AthenaHQ) — cost
  €300–€1500/mo. Skip until month 6.
- ChatGPT plugin marketplaces — not relevant for local horeca queries.
