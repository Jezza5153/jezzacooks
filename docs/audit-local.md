# Local SEO Audit — jezzacooks.com (Amersfoort focus)

**Date**: 2026-04-14
**Score**: 52 / 100

---

## Category scores

| # | Category | Score | Verdict |
|---|---|---|---|
| 1 | City name density | 9 / 15 | Metadata strong, visible body copy weak. Home body has 1 visible Amersfoort mention. Consulting H1 has zero. Catering H1 has zero. |
| 2 | Neighborhood / landmark mentions | 0 / 10 | No Kamp, Binnenstad, Leusderkwartier, Muurhuizen, Onze Lieve Vrouwetoren, Hof, Soesterkwartier, Vathorst, Kattenbroek, Hoogland anywhere. Tafelaar is literally at Kamp 8 and this is never used. |
| 3 | Service-area coverage | 7 / 10 | `areaServed` exists everywhere but is inconsistent across pages. Websites page ships `["Amersfoort","Utrecht","Nederland"]` while consulting/catering/seo-geo list 5-6 cities. Needs to be sourced from `site-config.ts`. |
| 4 | Local NAP on contact page | 8 / 10 | Email, WhatsApp, city, region, hours, Instagram — all visible and mirror schema. Missing: postal code, street address (both marked FIXME in site-config), and no phone-as-telephone CTA (only WhatsApp link). |
| 5 | Local-intent content | 7 / 15 | `/services/seo-geo` has an excellent "Waarom Amersfoort eerst" section naming bonico.nl and the exact keyword gap. `/services/consulting` and `/services/catering` have NO equivalent local positioning section — only metadata. `/services/websites` is fully generic. |
| 6 | Directory / citation signals | 2 / 5 | KvK 99547619 shown in footer. No mention of KHN (Koninklijke Horeca Nederland), MKB Amersfoort, Ondernemersfonds Amersfoort, Citymarketing Amersfoort, or any local network. No CoC link-out. |
| 7 | Maps embed / geo clarity | 2 / 5 | `GeoCoordinates` present in `LocalBusiness` schema (52.1561, 5.3878 — city center). NO embedded Google Map or OSM tile on `/contact`. Contact page shows a `MapPin` icon with plain text only. |
| 8 | Opening hours clarity | 5 / 5 | Visible "Ma–Vr 09:00–18:00 (op afspraak)" + `OpeningHoursSpecification` in schema, sourced from one place. Clean. |
| 9 | Unique local positioning | 9 / 15 | The seo-geo page has the right argument ("geen horeca-specialist bureau dekt deze stad", bonico.nl gap called out by name) — this is gold. But it lives on ONE page. The other three services don't repeat or build on it. The home page never tells the Amersfoort differentiation story at all. |
| 10 | Local landing page strategy | 3 / 10 | Single page per service + `areaServed` array. No dedicated city landing pages (no `/locaties/utrecht`, no `/services/consulting/amersfoort`). That is defensible for now, but it means Utrecht / Zwolle / Hilversum rankings have no page to anchor. |

**Total: 52 / 100**

---

## Amersfoort signal density (visible body copy + metadata combined)

Counts from `rg -c Amersfoort src/app`:

| Page | Mentions | Notes |
|---|---|---|
| `/` (home) | 4 | 3 in metadata/OG, only **1 visible in body** (the "De Tafelaar Amersfoort" tile in the portfolio strip). H1 = "Level up the chaos." — no city. |
| `/about` | 7 | Metadata + 2 visible ("Werkgebied: Amersfoort en omgeving", "restaurants en teams in Amersfoort en omgeving"). Decent. |
| `/services` (index) | 5 | Metadata + structured cards. Visible but thin. |
| `/services/consulting` | 4 | Metadata + 1 FAQ answer. **H1 is "Chase improvement." — zero local signal in hero.** |
| `/services/catering` | 7 | Metadata strong ("Catering Amersfoort" in title). **H1 is "Kantoorlunch catering" — no city.** Body copy never says "Amersfoort" — only generic "op kantoor". |
| `/services/websites` | 1 | Only in `areaServed` schema. **Zero visible Amersfoort copy.** H1 and subcomponents never mention the city. |
| `/services/seo-geo` | 16 | Strong. Full "Waarom Amersfoort eerst" section, bonico.nl named, keyword gap articulated. This is the model other pages should copy. |
| `/portfolio` | 3 | De Tafelaar Amersfoort tile + CTA copy mentioning Amersfoort. Fine. |
| `/contact` | 4 | Metadata + visible NAP block + hero subtitle. OK. |
| `/pricing` | 2 | Weak, almost accidental. |
| `/layout.tsx` | 3 | Meta keywords & global title. |

Neighborhoods (Kamp / Binnenstad / Leusder / Muurhuizen / Vrouwetoren / Soesterkwartier / Vathorst / Kattenbroek / Hoogland): **0 matches across all of `src/app`**.

Secondary cities in visible copy: Utrecht appears on seo-geo & consulting pages, Zwolle only on consulting, Hilversum & Apeldoorn only in schema `areaServed` — never in visible body. That means none of them have a real ranking anchor.

---

## Gaps (ordered by impact)

### CRIT — Home H1 and hero have no Amersfoort signal
The home page's visible body contains exactly one "Amersfoort" (inside the portfolio tile for Tafelaar). The H1 is "Level up the chaos." Hero subtitle is "Don't chase perfection. Chase improvement." — zero geographic anchor. For the primary landing page of a local business this is the single biggest leak.
**Fix**: add a visible line under the hero buttons or inside the first "Kies je pad" subtitle like *"Chef-led horeca specialist in Amersfoort. Ook Utrecht, Zwolle, Hilversum en heel Nederland."* Add a one-paragraph "Waarom Amersfoort" band before the benefits section, mirroring the /services/seo-geo block but shorter (2-3 sentences + link to the long version).
**Score impact**: +6 (Cat 1, Cat 9)

### CRIT — `/services/consulting` H1 has no local anchor
Consulting is the service with the broadest "X in Amersfoort" search intent ("horeca consultant Amersfoort", "restaurant consultant Amersfoort", "menu engineering Amersfoort"). The H1 currently reads "Chase improvement." — tagline, not keyword. Metadata title says "Restaurant consulting in Amersfoort, Utrecht en Zwolle" but the visible H1 does not.
**Fix**: replace H1 with something like "Restaurant consulting in Amersfoort" and push "Chase improvement." down as an eyebrow or subtitle. Add one visible paragraph naming the service area + why local-on-site matters vs. a remote bureau.
**Score impact**: +4 (Cat 1, Cat 5)

### HIGH — `/services/catering` body copy never mentions Amersfoort
Metadata title is "Catering Amersfoort" but the entire visible hero + story block talks about "op kantoor" generically. Tafelaar is literally at Kamp 8 in the Binnenstad and this geographic story is never told. Largest wasted local-intent opportunity on the site — "catering Amersfoort" is a real commercial keyword.
**Fix**: H1 becomes "Kantoorlunch catering in Amersfoort" (or "Catering in Amersfoort — kantoorlunch, borrel en diners"). Add a trust paragraph: "Vanuit De Tafelaar in de binnenstad van Amersfoort (Kamp 8) leveren we aan kantoren in Amersfoort, Leusden, Soest, Nijkerk en Utrecht." Name the delivery radius explicitly.
**Score impact**: +5 (Cat 1, Cat 2, Cat 5)

### HIGH — `/services/websites` has zero visible Amersfoort copy
The entire visible page is generic "restaurant websites" language. Even `areaServed` here is downgraded to `["Amersfoort","Utrecht","Nederland"]` instead of the full list used on the other three services — so the schema is inconsistent with the copy AND with the other services pages.
**Fix**: sync `areaServed` to the full list in `site-config.ts` (or import `SITE.areaServed` directly). Add an Amersfoort positioning paragraph (mirror the pattern from /services/seo-geo): "Restaurant website laten maken in Amersfoort? Vanaf €400 eenmalig. Geen abonnementen, geen lock-in. Ook Utrecht, Zwolle, Hilversum en heel Nederland." This also unlocks the "restaurant website €400 Amersfoort" niche identified as open.
**Score impact**: +4 (Cat 1, Cat 3, Cat 5)

### HIGH — No neighborhood or landmark signals anywhere
Zero mentions of Kamp, Binnenstad, Muurhuizen, Onze Lieve Vrouwetoren, Soesterkwartier, Vathorst, Leusderkwartier, Hof. These are the proofs-of-place that Google uses to distinguish "actually in Amersfoort" from "buying Amersfoort as a keyword." Bonico.nl probably has at least one neighborhood reference; you have none.
**Fix**: add a small "Werkgebied Amersfoort" block on /about and /contact listing the neighborhoods you cover. Use them naturally in the Tafelaar portfolio caption ("Kamp 8, binnenstad Amersfoort"). Mention "5 minuten lopen van de Onze Lieve Vrouwetoren" on contact. Don't keyword-stuff — one paragraph each is enough.
**Score impact**: +7 (Cat 2, Cat 9)

### HIGH — Unique local positioning lives on one page only
The /services/seo-geo "Waarom Amersfoort eerst" section — naming bonico.nl, Doelbewust, Ranking Masters, and the exact keyword gap — is the single strongest local-SEO asset on the entire site. It answers "why should I hire *you* over a generic Amersfoort bureau?" with specifics. But nothing on the home page, consulting, catering or websites page echoes it.
**Fix**: write a shorter version for the home page ("Waarom Amersfoort"). On /services/consulting add "Waarom een lokale consultant in Amersfoort" (vs a traveling bureau). On /services/catering add "Waarom een chef uit de Amersfoortse binnenstad" (provenance). Each ~150 words, each linking back to the long seo-geo version.
**Score impact**: +6 (Cat 9)

### MED — No embedded map on /contact
Contact shows a `MapPin` icon with text only. A static Google Map or OSM embed centered on Amersfoort city center (or the Tafelaar Kamp 8 pin as a symbolic "home base") adds a visual trust signal, ties the page to the GeoCoordinates already in schema, and helps local pack evaluation. Without a street address you cannot get into the 3-pack, but the visual still helps.
**Fix**: add a minimal iframe embed of Amersfoort centrum (no place name needed if you don't want to reveal a home address). Loading="lazy". Privacy-friendly: use `https://www.openstreetmap.org/export/embed.html?bbox=...`.
**Score impact**: +3 (Cat 7)

### MED — `areaServed` inconsistency across pages
`site-config.ts` defines `["Amersfoort","Utrecht","Zwolle","Hilversum","Apeldoorn","Nederland"]` but:
- consulting uses the full list ✓
- catering uses `["Amersfoort","Utrecht","Hilversum","Apeldoorn","Zwolle"]` (no "Nederland" — inconsistent)
- websites uses `["Amersfoort","Utrecht","Nederland"]` (missing 3 cities)
- seo-geo uses a 6-item custom list
Search engines compare schema across pages of the same entity; conflicting `areaServed` arrays weaken the signal.
**Fix**: import `SITE.areaServed` from `site-config.ts` in every service page instead of hardcoding. Single source of truth.
**Score impact**: +2 (Cat 3)

### MED — No directory / chamber / local network references
Footer has KvK number only. No mention of KHN, MKB-Nederland, Ondernemersfonds Amersfoort, Binnenstad Management Amersfoort, Citymarketing Amersfoort, or any local chamber. These are cheap citation-style signals.
**Fix**: if Jezza is a member of KHN or any local network, link it from the footer. If not, a one-time €100-€200 KHN membership is the cheapest E-E-A-T signal on the market. At minimum link to KvK profile from the footer KvK number (it's public anyway).
**Score impact**: +2 (Cat 6)

### MED — No secondary-city landing depth
Utrecht, Zwolle, Hilversum and Apeldoorn are in `areaServed` but have no visible anchor content. Google won't rank a page for "horeca consultant Utrecht" when Utrecht is mentioned once, in a schema array.
**Fix**: don't build doorway pages. Instead, add one "Werk ik ook in [city]?" FAQ entry per secondary city on each service page (consulting/catering/seo-geo already has the Utrecht + Zwolle FAQ — reuse that pattern). Alternatively, a single `/locaties` page with 4 sections (one per city) is enough to anchor.
**Score impact**: +4 (Cat 10)

### LOW — Phone number is WhatsApp-first, not tel:-first
`/contact` exposes `+31 6 34127992` inside a `wa.me/` link but there is no `tel:` link and no visible phone CTA for non-WhatsApp users. Also hurts accessibility.
**Fix**: add a second row with a `tel:+31634127992` link next to the WhatsApp one. Same number, two CTAs.
**Score impact**: +1 (Cat 4)

### LOW — Missing postal code / street address placeholders in `site-config.ts`
Marked FIXME. Without a street address you cannot appear in Google's local 3-pack. Not required for organic ranking but required for map pack.
**Fix**: decide — do you want the 3-pack? If yes, register a business address (co-working, virtual office, or agreed address). If no, leave as-is and accept the ceiling.
**Score impact**: 0 for current rubric; +3 to +6 ceiling if the 3-pack becomes feasible.

### LOW — No review/rating schema
`AggregateRating` is not emitted on any page. Trustoo 9.8 is referenced in the portfolio caption but not structured.
**Fix**: if Trustoo reviews are verifiable, emit `AggregateRating` on the LocalBusiness schema. Also visible stars on home + contact.
**Score impact**: +1 (Cat 9)

---

## Recommended new content

| Page / location | What to add | Est. rank lift |
|---|---|---|
| `/services/consulting/amersfoort` (or inline section) | Pillar block: "Horeca consultant in Amersfoort" — 600-900 words naming menu engineering, food cost, prep, SOP, training, with an explicit section "Waarom een lokale consultant (niet een bureau uit Rotterdam)". Link internally from home and /services. | HIGH — opens "horeca consultant Amersfoort", "restaurant consultant Amersfoort", "menu engineering Amersfoort" |
| `/services/catering` hero rewrite | H1 → "Catering in Amersfoort — kantoorlunch, borrel en diners". First paragraph references Kamp 8 / binnenstad Amersfoort + delivery radius (Leusden, Soest, Nijkerk, Utrecht). Add a visible "Bezorggebied Amersfoort en omgeving" list. | HIGH — "catering Amersfoort" is a direct commercial keyword |
| New `/diensten/menu-engineering-amersfoort` pillar | Stand-alone 1500-2000 word pillar on menu engineering specifically positioned for Amersfoort. Includes a worked Dutch-menu example (broodjes €7.50 → Tafelaar pricing), the matrix (stars/plowhorses/puzzles/dogs), local context. This is the single most defensible niche because no Amersfoort bureau and no NL horeca consultant ranks for it. | VERY HIGH — near-zero competition, high commercial intent |
| Home "Waarom Amersfoort" band | Short (120-150 word) band between hero and services grid, naming Amersfoort + surrounding cities and linking to the long version on seo-geo. Gives the home page its first real local anchor. | HIGH — home has the most backlinks; adding a local anchor here lifts all other pages |
| `/contact` map embed | OSM iframe of Amersfoort centrum + a neighborhood list ("Werkgebied: Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Kattenbroek, Hoogland"). | MED — local proof signal + first neighborhood mentions on the site |
| `/locaties` hub | Single page with four sections: Amersfoort (primary), Utrecht, Zwolle, Hilversum. Each 200-250 words, each with a different angle (Amersfoort = thuisbasis; Utrecht = grote markt, bereikbaar in 20 min; Zwolle = al gewerkt met X; Hilversum = media horeca). Links to relevant service pages. | MED — anchors secondary cities without doorway-page penalty |
| `/about` neighborhood block | One paragraph + list naming the Amersfoort neighborhoods worked in, with a mention of Onze Lieve Vrouwetoren or Hof as landmark. | MED — neighborhood signal, hits Cat 2 gap |
| `/services/websites` Amersfoort section | Mirror the "Waarom Amersfoort eerst" pattern from seo-geo: "Restaurant website in Amersfoort — €400 eenmalig". Names bonico.nl gap + local web bureaus that don't do horeca. | MED — opens "restaurant website Amersfoort" niche |

---

## Priority order for next 30 days

1. **Rewrite `/services/consulting` H1 and add local intro paragraph** (1 hour) → +4 pts, opens the broadest set of local consulting keywords.
2. **Rewrite `/services/catering` H1 and add Kamp 8 / binnenstad provenance block** (1 hour) → +5 pts, hits direct commercial keyword.
3. **Ship `menu-engineering-amersfoort` pillar page** (1-2 days) → unlocks the most defensible niche on the site; near-zero competition confirmed.
4. **Add "Waarom Amersfoort" band to home + local CTA under hero** (30 min) → +6 pts, lifts every other page via internal linking.
5. **Fix `areaServed` inconsistency** (15 min) → +2 pts, zero-risk cleanup.
6. **Add OSM embed + neighborhood list on `/contact`** (45 min) → +3 pts, fills Cat 2 and Cat 7 gaps at the same time.
7. **Rewrite `/services/websites` to include Amersfoort positioning paragraph** (1 hour) → +4 pts, opens "restaurant website €400 Amersfoort" niche.

Estimated cumulative score after priorities 1-7: **~80 / 100**.
