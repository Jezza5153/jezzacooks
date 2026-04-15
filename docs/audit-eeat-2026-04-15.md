# E-E-A-T Audit — jezzacooks.com

Date: 2026-04-15. Method: live HTML fetch of 5 pages, JSON-LD parse, HTTP + content check on 11 press URLs, source code review under `src/`.

## TL;DR — E-E-A-T Score: 78 / 100

Jezza Cooks has a strong credentials stack (verifiable 10+ year career, real Dutch + Australian press, real Euro-Toques finalist placement) AND an unusually mature Person schema for a solo consultancy. The gap is in how those credentials are exposed **in visible prose**, not whether they exist. Most of the provenance lives inside JSON-LD and one card list on /portfolio — quality raters and AI engines that parse visible prose only see it when the inline anchor layer is built.

Biggest unlocks: (1) inline-anchor the `SITE.press` URLs at point of claim on /about, /menu-engineering and /portfolio bio — the data is already there, it just needs hyperlinking; (2) add named client testimonials (Jan Molmans, Maarten Hogeveen); (3) fix the dead `alumniOf` URL and add the missing BTW number.

---

## Credentials matrix

| Claim | Visible | Linked/verifiable | Schema | Status |
|---|---|---|---|---|
| Jeremy Arrascaeta = real person, Amersfoort | /about H1, /portfolio bio | KvK 99547619 public | `#jeremy` | OK |
| Chef-kok De Tafelaar, Kamp 8 | /about hero + experience | AD.nl, Gelderlander, indebuurt, Spotify | `hasOccupation` Role | Claim present, inline citation missing |
| 10+ years in high-end kitchens | hero + "In het kort" | Aggregated | `description` | Un-anchored |
| Finalist Euro-Toques Young Chef 2018 (Bougainville) | /about experience card | Misset Horeca + RestaurantKrant (both 200) | `award` array | **No inline link at mention** |
| Dry-aging lead Angler Stirling (2020–22) | /about + /portfolio bio | InDailySA, AGFG, Broadsheet, Aquna, YouTube (all 200) | `hasOccupation` Role | Strongest verified cluster — 5 AU sources |
| Head chef Hanson Bay + Flinders Chase, 2019-20 bushfires | /about, /portfolio bio | InDailySA confirms | `hasOccupation` Role | OK |
| Tafelaar × Jezza Cooks Catering with Jan Molmans | /portfolio bio | Spotify + Gelderlander | Offer | OK but no named testimonial from Jan |
| Hotelschool Ter Duinen | /portfolio bio | **DEAD — `www.hotelschoolterduinen.be` NXDOMAIN** | `alumniOf.url` | Schema url fails DNS |
| KvK 99547619 | Footer + /about + /portfolio | Verified via offertesvoorjou.nl footer | `identifier` | OK |
| BTW/VAT number | **No** | **No** | `vatID` empty | Missing — site-config `vat: ""` FIXME |

---

## Press URL verification

All 11 URLs in `SITE.press` fetched 2026-04-15 with a Safari desktop UA. Content = "Jeremy" or "Arrascaeta" or expected phrase in final-rendered HTML.

| Publication | HTTP | Content | Inline anchor? |
|---|---|---|---|
| AD.nl Amersfoort (gastchef-avond) | 200 | Gated (DPG Media consent wall) | No — card only |
| De Gelderlander (Jan opent) | 200 | Gated (DPG) | No — card only |
| indebuurt.nl Amersfoort | 200 | Gated (DPG) | No — card only |
| Gooische Business (Spotify) | 200 | Metadata: Jeremy, Arrascaeta, Molmans, Tafelaar | No — card only |
| **InDaily SA** | 200 | **Confirmed**: Jeremy, Arrascaeta, Angler, Hanson Bay, Flinders, Kangaroo, Netherlands, dry-age | No — card only. **Fix verified: `indailysa.com.au` = 200, old `indaily.com.au` = 403** |
| All The Gear But No Idea (YouTube) | 200 | YouTube title page | No — card only |
| **AGFG (Prance-Smith interview)** | 200 | **Confirmed**: Jeremy, Arrascaeta, Netherlands, dry-age, organised chaos | **YES** — single inline anchor on /portfolio inside the Kate Richards blockquote ("geciteerd in [Australian Good Food Guide, 2020]") |
| **Broadsheet Adelaide** | 200 | **Confirmed**: Jeremy, Arrascaeta, Angler, Prance-Smith | No — card only |
| **Aquna** | 200 | **Confirmed**: Jeremy, Arrascaeta, Angler, Stirling | No — card only |
| Misset Horeca (YCA 2018) | 200 | Dutch HTML (not gated) | No inline anchor at Euro-Toques claim on /about |
| De RestaurantKrant (YCA 2018) | 200 | 200 OK | No inline anchor at Euro-Toques claim on /about |

**Summary**: all 11 live (8 content-confirmed, 3 behind DPG Media consent walls but 200). Only **1 true inline prose anchor** (AGFG on /portfolio). The other 10 are only reachable through the /portfolio press card list. Single biggest E-E-A-T gap on the site.

---

## Person schema audit (live JSON-LD from /)

**Present and correct** (from `@id #jeremy` in the root `@graph`):
- `name`, `alternateName`, `jobTitle`, rich 900-char `description` with every credential named
- `image`, `url`, `address`, `nationality`, `knowsLanguage` ["nl","en","fr"]
- `worksFor` → `#organization` cross-referenced
- `hasOccupation` — 5 Role objects (Tafelaar, Jezza Cooks, Angler, Kangaroo Island, Bougainville)
- `alumniOf` → Hotelschool Ter Duinen (name ok, **url broken**)
- `award` → Euro-Toques finalist
- `sameAs` → 14 entries (LinkedIn, Instagram, YouTube + 11 press URLs)
- `knowsAbout` → 13 topical entities
- `/menu-engineering` Article correctly cross-references `author: #jeremy` + `publisher: #organization`

**Missing or weak:**
- `hasCredential` absent — no `EducationalOccupationalCredential` for Euro-Toques finalist, VCA, BHV or Hygienecode. Google recommends this for author E-E-A-T.
- `alumniOf.url = https://www.hotelschoolterduinen.be` → **NXDOMAIN**. Actively wrong data that a schema validator will flag. Remove the `url` field or replace with the correct VTI parent site.
- Organization `vatID` is null.

---

## Originality assessment per page

| Page | Original thinking | Photography | Verdict |
|---|---|---|---|
| `/` | Tagline "Level up the chaos" sourced from Jeremy's AGFG quote — unique, attributed | hero-home.jpg (217 KB, real) | Original |
| `/about` | First-person story in Jeremy's voice, specific career. Values section "Margins Without Killing the Food" is distinctive framing | `aboutme.png` 1.26 MB (real). Alt "Portrait of a friendly and confident chef" is **generic and should name Jeremy** | Mostly original — alt text weak |
| `/portfolio` | 5 real clients with specific roles. "Let op: de andere Jeremy Arrascaeta is Giorgian de Arrascaeta van Flamengo" disambiguation is excellent GEO signal | No client photos | Original |
| `/menu-engineering` | 3200-word article applying Kasavana-Smith to Dutch context with KHN benchmarks, NL-specific bands (lunchcafé 25-28%, shared dining 30-34%, pizzeria 22-26%), case study with exact numbers (32% → 26.1%, €897, +€8.700/mo). "Representatief geanonimiseerd voorbeeld" hedge present | service-consulting.jpg hero | **Strongly original** — the site's single best E-E-A-T asset, pillar-cite-ready |
| `/contact` | Real NAP block, hours, WhatsApp, Instagram | n/a | Standard |

No page is a generic template. The pillar is competitive with anything in Dutch horeca consultancy.

---

## Top 7 E-E-A-T gaps (ranked by impact)

1. **Zero inline press anchors at point of claim on /about.** Hero text "gefeatured in AD.nl, De Gelderlander en indebuurt.nl" and the experience bullets are plain text. Fix: wrap every publication name in the `experience` array in an inline `<a>` using the URLs already in `SITE.press`.
2. **No named client testimonials anywhere.** Only `<blockquote>` on the whole site is Jeremy quoting himself (AGFG). Zero testimonials across /, /about, /results, /portfolio, /services/*, /menu-engineering. Fix: add one named quote from Jan Molmans (De Tafelaar) and one from Maarten Hogeveen (Chef & Serve) on /portfolio with full name, role, company, quantified outcome.
3. **No `tel:` link on /contact.** Phone number is only wrapped in the WhatsApp URL. Fix: add `<a href="tel:+31634127992">` beside the WhatsApp link in `src/app/contact/page.tsx`.
4. **`alumniOf.url` returns NXDOMAIN.** `https://www.hotelschoolterduinen.be` does not resolve. Fix: in `src/lib/schema.ts buildPerson()` either drop the `url` field or point to the correct VTI parent site.
5. **Euro-Toques claim has no hyperlink to verify.** /about mentions the finalist placement as plain text — no anchor to Misset Horeca, De RestaurantKrant, or the Euro-Toques NL directory. Fix: inline-anchor "Finalist Euro-Toques Young Chef Award 2018" to Misset Horeca (primary) + `euro-toques.nl` (secondary).
6. **BTW/VAT number missing sitewide and in Organization schema.** Site-config `vat: ""` FIXME, footer shows only KvK, `Organization.vatID` is null. Fix: add `vat: "NL..."` to `src/lib/site-config.ts`, render under KvK in `src/components/layout/footer.tsx`, populate `vatID` in `buildOrganization()`.
7. **Generic alt text on Jeremy's portrait.** `placeholder-images.json` → `about-jezza.description` reads "Portrait of a friendly and confident chef" — stock-imagery phrasing. Fix: replace with "Jeremy Arrascaeta — chef-kok De Tafelaar Amersfoort en founder Jezza Cooks".

---

## YMYL warnings — claims to soften

Hospitality consulting is light-YMYL, so the bar is lower than medical/legal. Two items:

1. `src/app/menu-engineering/page.tsx` ~line 437: `"de best bestede 3 uur van je kwartaal, gegarandeerd"` — "gegarandeerd" is an outcome guarantee in a commercial context. Swap to `"zelden weggegooide tijd"` or `"doorgaans de best bestede 3 uur"`. Rest of the same page hedges correctly with "typisch 2 tot 4 procentpunten".
2. Case study outcomes (32% → 26.1%, +€8.700/mo) are hedged one line below with "Dit is een representatief geanonimiseerd voorbeeld — niet elke zaak haalt 6 procentpunten in 6 weken". Add a period line ("Cijfers geanonimiseerd, periode jan-mrt 2026") for stronger provenance.

Everything else (food cost ranges, Cornell-cited prijspsychologie effect sizes) is properly attributed. No unsubstantiated medical, legal or financial claims.

## Tier summary

- **Experience**: Strong — 6 distinct career roles across 4 countries, all named with dates.
- **Expertise**: Strong — the 3200-word /menu-engineering pillar is the proof.
- **Authoritativeness**: Real but underexposed — 11 live press URLs exist, only 1 is inline-anchored.
- **Trust**: Mostly good — KvK visible, Privacy + Terms indexable, real NAP. Held back by missing BTW, dead alumniOf URL, missing `tel:` link, zero named testimonials.

Close the inline-anchoring gap and the named-testimonials gap and this site jumps from "78 credible" to "88-90 cite-ready". The provenance is already there — it just needs surfacing in the prose layer.
