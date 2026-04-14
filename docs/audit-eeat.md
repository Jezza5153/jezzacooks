# E-E-A-T & Authority Audit — jezzacooks.com

**Date**: 2026-04-14
**Score**: 63 / 100
**Auditor context**: Jeremy Arrascaeta (Chef Jezz), Amersfoort NL — chef + horeca web/SEO/GEO builder. KvK 99547619 (Eenmanszaak). Portfolio of 5 verified live clients. 4 verified press mentions (2 AU, 2 NL).

---

## Category scores

| # | Category | Score | Verdict |
|---|---|---|---|
| 1 | About page depth | 9 / 15 | Good structure & 20+ yr framing, but real restaurants (Bougainville, Angler Stirling, Flinders Chase, Hanson Bay) are NEVER NAMED on /about — named only on /portfolio. Experience blocks are anonymized. |
| 2 | Author / founder entity | 8 / 15 | Person schema exists in global @graph AND is duplicated (slimmer) on /about. sameAs only has Instagram. No LinkedIn, no ORCID, no portfolio URL crosslinks, no press URL crosslinks. |
| 3 | Portfolio proof | 14 / 15 | /portfolio is the strongest page on the site — 5 real URLs, specific roles, CollectionPage + CreativeWork schema, grouped by category. Missing: per-client metrics (only Tafelaar mentions Trustoo 9.8, and only in summary text — no dedicated testimonials block). |
| 4 | Press mentions | 9 / 10 | 4 real dated press items, rendered with NewsArticle schema on /portfolio, with excerpts and outbound links. Only gap: disambiguation note at bottom is good, but the "Michelin three-star experience" phrase inside the InDaily excerpt is unverified and could be challenged — it's quoted from the journalist, which is defensible, but flag for clarity. |
| 5 | Reviews / testimonials | 2 / 10 | Near-zero first-party testimonials. No Google reviews link. No Trustoo profile link. Trustoo 9.8 mentioned once (in site-config portfolio summary for Tafelaar, not as a quote). No client-quote block anywhere. |
| 6 | Contact completeness | 7 / 10 | Email, WhatsApp, Instagram, city, region, hours all present on /contact and in schema. Missing: physical street + postal code (FIXME in site-config), no separate phone-only contact point (phoneDisplay only appears under "WhatsApp"). |
| 7 | Legal / trust pages | 1 / 5 | /terms is a placeholder: literally `<p>Terms of service content...</p>`. No /privacy page exists. KvK appears only in footer — not in /terms, not in /contact visibly. No BTW/VAT on site. |
| 8 | Consistency (NAP & claims) | 4 / 5 | NAP is internally consistent (SITE singleton feeds footer, contact, schema). "20+ jaar" and "4 landen" match across /about and /portfolio. Minor: /about says "5 landen" in the 3-stat grid but text says "Nederland, België, Frankrijk, Australië" (4 countries) — self-contradiction. |
| 9 | No unsubstantiated claims | 6 / 10 | "De enige horeca-specialist SEO/GEO dienst in Amersfoort" appears on /, /services, and /services/seo-geo (3 instances). This is a #1 / uniqueness claim. It IS partially backed up in /services/seo-geo by a competitor analysis section referencing Bonico Horeca Consultancy, which is better than most sites, but the phrasing still trips Google's superlative spam policy and LLMs tend to discount unqualified "only" claims. |
| 10 | Multilingual handling | 3 / 5 | `alternateLocale: ["en_US"]` set in root layout OpenGraph. `locales: ["nl-NL", "en"]` declared in site-config. BUT there is no /en or /en-us route — `languages: { "nl-NL": "/", "en-US": "/" }` both point to the same Dutch URL, which tells Google the English version doesn't exist. /about never references the AU career in a way an English-speaking crawler can parse. `descriptionEn` exists in site-config but isn't emitted anywhere in schema/metadata. |

**Total: 63 / 100**

---

## Current strengths

- **/portfolio page is genuinely best-in-class for a solo consultant.** 5 real client cases grouped into "Volledig gebouwd" and "SEO & GEO" categories, each with location badge, role, summary, outbound live link, CreativeWork microdata, and CollectionPage JSON-LD referencing `#jeremy` by `@id`. This is the primary LLM citation surface and it's doing real work.
- **Press block is defensible and honest.** 4 real verified URLs (InDaily, AGFG, Misset Horeca, De RestaurantKrant), all with NewsArticle schema, dated, excerpted, and linked. Plus a disambiguation footnote about Giorgian de Arrascaeta (Flamengo footballer) — that kind of proactive disambiguation is exactly what LLM citation algorithms reward.
- **Real quote with attribution.** The AGFG "organised chaos" quote is real, sourced, and it's even the origin story for the "Level up the chaos" tagline — this is E-E-A-T gold and it's in a `<figure>` with a `<blockquote>` + `<figcaption>` (semantically correct).
- **Global schema @graph with stable @id references.** `/src/lib/schema.ts` emits Organization + LocalBusiness + Person + WebSite once in root layout, and per-page schema references `#organization` / `#jeremy` by @id. This is the textbook GEO pattern.
- **NAP singleton.** `/src/lib/site-config.ts` is a single source of truth for name, phone, hours, KvK, services — footer and contact page both read from it, so visible text matches schema automatically.
- **KvK 99547619 is present** in footer via `SITE.kvk`.
- **FAQ schema exists** via `buildFaqPage()` and is used on home + faq page.
- **alternateLocale en_US is set** in OpenGraph.

---

## Gaps (ordered by impact)

### CRIT

#### C1. /terms is a placeholder and /privacy does not exist
- **Issue**: `/src/app/terms/page.tsx` literally renders `<p>Terms of service content...</p>`. There is no `/src/app/privacy` route. For a commercial service selling €1.300/jr SEO contracts and processing contact-form personal data under GDPR, this is a legal and trust-signal liability — Google's algorithmic quality raters are explicitly instructed to downgrade sites without substantive terms/privacy.
- **Fix**:
  1. Write real Dutch `/terms` content: scope, pricing (ex BTW), payment terms, cancellation, liability cap, governing law (Nederlands recht), rechtbank Midden-Nederland, KvK 99547619, Eenmanszaak Jeremy Arrascaeta.
  2. Create `/privacy` with GDPR-compliant notice: which data the contact form collects, retention, Resend/mailer processor, lawful basis (contract/gerechtvaardigd belang), Rechten betrokkene, contact DPO = Jeremy.
  3. Link both from footer.legal.
- **Evidence**: `/src/app/terms/page.tsx:11` — `<p>Terms of service content...</p>`. No `/src/app/privacy/page.tsx` file exists.

#### C2. /about never names the real restaurants Jeremy worked at
- **Issue**: The most authoritative thing about Jeremy is WHERE he worked — Restaurant Bougainville (Amsterdam), Hanson Bay Sanctuary (Kangaroo Island), Flinders Chase Café (Kangaroo Island), Angler Stirling (Adelaide). These names appear on `/portfolio` inside the bio, but `/about` only has anonymized labels like "Sous Chef (Australië)" and "General Manager (high-end visrestaurant)". This is the #1 LLM-citation waste in the audit — LLMs can only cite proper nouns, and Jeremy owns the AGFG and InDaily bylines. They should be on /about, not hidden on /portfolio.
- **Fix**: Rewrite the `experience` array in `/src/app/about/page.tsx` to name: Restaurant Bougainville (2016–2018), Euro-Toques Young Chef Award 2018 finalist, Hanson Bay Sanctuary + Flinders Chase Café (2019–2020, Kangaroo Island), Angler Stirling (2020–2022, dry-aging lead under Sam Prance-Smith). Add a small "Geciteerd in" strip with InDaily + AGFG logos/links directly on /about.
- **Evidence**: `/src/app/about/page.tsx:73-114` — every role is labelled with a job title only ("Sous Chef (Australië)"), no employer name. Compare to `/src/app/portfolio/page.tsx:263-289` which names all four.

#### C3. Person schema sameAs only has Instagram
- **Issue**: `buildSameAs()` in `/src/lib/schema.ts:47-49` returns `[SITE.contact.instagram].filter(Boolean)` — a single URL. For LLM entity resolution, `sameAs` is the primary lateral link graph. Jeremy should be pointing to: his own portfolio company URLs (offertesvoorjou.nl, boekeerlijk.nl) where his name already appears in the footer (KvK 99547619), the AGFG article, the InDaily article, the Euro-Toques 2018 finalist Misset Horeca page, and ideally a LinkedIn profile.
- **Fix**: Expand `buildSameAs()` to return an array containing Instagram + the 4 press URLs + the 2 portfolio client footers that credit him (offertesvoorjou.nl/boekeerlijk.nl). Separately, create a LinkedIn profile for Jeremy if none exists — this is the single highest-leverage external action.
- **Evidence**: `/src/lib/schema.ts:47-49`, `/src/app/about/page.tsx:168` — both places emit `sameAs: ["https://instagram.com/chefjezz"]` only.

### HIGH

#### H1. Zero on-site testimonials / client quotes
- **Issue**: No client has anything on record on the site. The strongest credibility signal Jeremy has — "Trustoo 9.8 score" for Tafelaar Amersfoort — is only in a paragraph description in site-config portfolio, not pulled out as a pull-quote with attribution. Maarten Hogeveen (Chef & Serve founder, ex-Lute) is named but not quoted. BoekEerlijk and OffertesVoorJou are self-built so those don't count as client proof.
- **Fix**: Add a `testimonials` array to site-config with 3 short quotes — one from Maarten Hogeveen (or a "resultaat:" metric for Chef & Serve), one referencing Tafelaar's Trustoo 9.8 ("na de website rebuild staat De Tafelaar op Trustoo 9.8 en domineert Amersfoort shared dining SERPs"), one for Swimcoaching.nl. Render as a testimonials section on /portfolio and optionally on /about. Add Review schema under the Person or LocalBusiness.
- **Evidence**: `/src/app/portfolio/page.tsx` has no testimonials block. Grep for `testimonial|klant zegt|review` returns no matches in any page content file.

#### H2. "De enige horeca-specialist SEO/GEO dienst in Amersfoort" as a #1 claim
- **Issue**: This appears verbatim 3 times: `src/app/page.tsx:64`, `src/app/services/page.tsx:56`, `src/app/services/seo-geo/page.tsx:52` + 245. "De enige" = "the only" = uniqueness claim. It's PARTIALLY supported by the competitor analysis section of /services/seo-geo (which specifically cites Bonico Horeca Consultancy as the one overlapping local competitor), but the meta description and home-page versions have no such disclaimer. Google's 2024 superlative policy and LLM answer-grounding both discount unqualified "only" claims.
- **Fix**: Either (a) add a micro-disclaimer like "voor zover bekend" / "van de horeca-specialisten in Amersfoort die tegelijk Google én AI Overviews bedienen", or (b) downgrade to "de enige chef-led SEO/GEO dienst in Amersfoort" (chef-led is verifiable), or (c) replace with a fact claim: "Gebouwd door een chef met 20+ jaar ervaring in Nederland, België, Frankrijk en Australië." Option C is cleanest for GEO — LLMs love substitutable facts.
- **Evidence**: 3 file locations cited above. Plus duplicated at `src/app/services/seo-geo/page.tsx:245`.

#### H3. /about duplicates a minimal Person schema instead of referencing the global @graph Person
- **Issue**: `/src/app/about/page.tsx:146-169` emits a second `Person` JSON-LD block with no `@id`, no `worksFor`, no `knowsLanguage`, no `url`, and no `image`. Google and schema.org's entity reconciliation will treat this as a different Person unless it references `#jeremy`. This actually dilutes the Person entity rather than strengthening it.
- **Fix**: Replace the inline Person block on /about with `buildPerson()` from `/src/lib/schema.ts`, OR just delete the block entirely since the global @graph in root layout already emits it on every page. The /about page's only schema needs are breadcrumbs + a `ProfileType: ProfilePage mainEntity: { "@id": "#jeremy" }`.
- **Evidence**: `/src/app/about/page.tsx:143-179` vs `/src/lib/schema.ts:123-144`.

#### H4. VAT/BTW, street address, postal code, and legalName are FIXME placeholders
- **Issue**: `/src/lib/site-config.ts:16, 48, 51, 86` — all flagged as FIXME in the file. An Eenmanszaak whose legal name is "Jezza Cooks" alone is likely inaccurate (legal name of an Eenmanszaak is typically the owner's full name or a registered trade name combined with it). BTW is empty. Without BTW on the site, B2B clients can't add you to their supplier list and AI answer engines flag the entity as sub-threshold.
- **Fix**: Fill in: `legalName: "Jezza Cooks (Eenmanszaak Jeremy Arrascaeta)"`, `vat: "NL..."` once registered (or explicitly `vat: "KOR-regeling"` if using the small-business VAT exemption — LLMs understand this). Street/postal only if there's a registered business address; for a solo consultancy a postbus is acceptable.
- **Evidence**: `/src/lib/site-config.ts:16,48,51,86`.

### MED

#### M1. en_US alternateLocale is set but there's no English content
- **Issue**: `/src/app/layout.tsx:46-49` declares `languages: { "nl-NL": "/", "en-US": "/" }` — both point at the Dutch homepage. `descriptionEn` in site-config is unused. The AU press (AGFG, InDaily) is in English and Jeremy's international career is his strongest differentiator — a minimal English /en/about would let ChatGPT cite him in English-language answers about Dutch restaurant consultants or Kangaroo Island dry-aging chefs.
- **Fix**: Option A (cheap): add a visible "English summary" accordion on /about that uses `SITE.descriptionEn` plus the AU career paragraph, and drop the hreflang claim. Option B (ideal): create `/en/about` and `/en/portfolio` with a short English bio (~300 words) and have the global layout switch `<html lang>` accordingly.
- **Evidence**: `/src/app/layout.tsx:44-50`, `/src/lib/site-config.ts:20-22`.

#### M2. /about's "In het kort" stats block says "5 landen" but body text lists 4
- **Issue**: `/src/app/about/page.tsx:329-335` — "5 landen". Bio copy: "Nederland, België, Frankrijk, Australië" = 4. Earlier in hero also says "Nederland, België, Frankrijk, Australië". The 5th country isn't explained anywhere.
- **Fix**: Either make it "4" OR explicitly add the 5th (Spain? Italy? stagiaire somewhere?) in the Experience section with a year. Inconsistent numerics are the exact signal LLMs use to downgrade pages via factual-consistency checks.
- **Evidence**: `/src/app/about/page.tsx:329-335` vs `:240, 264-267`.

#### M3. Contact page has no phone-only contact point
- **Issue**: `phoneDisplay` is shown on /contact only under the WhatsApp dt/dd label. There's no `<a href="tel:...">` link. For LLMs (and for users who aren't WhatsApp-first) this is an unnecessary gap. The schema ContactPoint does emit `telephone`, but visible/schema mismatch is mild.
- **Fix**: Add a separate "Bellen" row in the contact NAP block with `<a href="tel:+31634127992">`.
- **Evidence**: `/src/app/contact/page.tsx:91-108` — phone is labelled WhatsApp only.

#### M4. No Trustoo / Google Reviews link anywhere on site
- **Issue**: If Jeremy has any review presence — Google Business Profile, Trustoo, The Fork for catering — it's not linked. Even a single outbound "Lees reviews op Google" link gives LLMs a verification target.
- **Fix**: If GBP is set up, add a "Reviews" block to the /about or /contact footer-block with live outbound link(s). If not, create GBP now and come back.
- **Evidence**: Grep for `trustoo|google.*reviews` across `/src` returns 0 matches outside the Tafelaar portfolio summary.

### LOW

#### L1. legalName duplicated from `name` prevents Organization.legalName being emitted
- **Issue**: `/src/lib/schema.ts:58` — `legalName: SITE.legalName || SITE.name` means schema always gets "Jezza Cooks" as legalName, which is probably the trade name, not the KvK-registered legal name.
- **Fix**: Set real legalName in site-config (see H4).

#### L2. No `knowsAbout` entry for "catering" on Person schema
- **Issue**: `buildPerson()` knowsAbout lists menu engineering, food cost control, kitchen operations, hospitality team training — but not "catering" or "private chef", even though that's one of the 4 services. `/src/lib/schema.ts:135-141`.
- **Fix**: Add "catering", "private chef services", "dry-aging", "seafood cookery" (the last two are Jeremy's specific AGFG-documented expertise and would feed directly into LLM topical match).

#### L3. Opening hours are schema-only; not visible on /about
- **Issue**: Only shown on /contact. LLM answer engines cross-check visible text — having hours on the landing pages reassures "is this business alive?" heuristics.
- **Fix**: Add a one-line "Bereikbaar ma–vr 09:00–18:00 (NL)" next to the about page contact CTAs.

#### L4. No BreadcrumbList schema on /about
- **Issue**: /contact has it, /portfolio has it, /about does not. Grep confirms.
- **Fix**: Add `buildBreadcrumbList([{Home,/}, {Over mij,/about}])` to /about.

#### L5. "Michelin three-star experience" in the InDaily excerpt
- **Issue**: `/src/lib/site-config.ts:190` — the excerpt text attributes "Michelin three-star experience" to Jeremy. This IS a quote from the journalist and that's defensible as earned media, but it's a claim that cannot be substantiated by Jeremy's own experience listing (his roles pre-2019 in Europe were at 1-star / non-starred restaurants per the Bougainville era). Best practice: keep the quote since it's real earned media, but add a note in the operator bio clarifying Bougainville's 1-star status so Jeremy never has to defend a 3-star claim he didn't make.
- **Fix**: Leave the excerpt unchanged (it's a third-party quote), but in the /portfolio "De operator" bio body, explicitly state that Bougainville (under Sjoerd Van der Stok) held 1 Michelin star during Jeremy's tenure, so the claim reads as "worked alongside Michelin-starred talent" not "held 3 stars himself".

---

## Specific rewrites recommended

| File | Current state | What to change | Impact |
|---|---|---|---|
| `/src/app/terms/page.tsx` | 16-line placeholder | Write real Dutch terms with KvK, BTW, Eenmanszaak, service scope, liability, governing law | +4 (C1) |
| `/src/app/privacy/page.tsx` (new file) | Does not exist | Create with Dutch GDPR notice covering contact form + mailer | +2 (C1) |
| `/src/app/about/page.tsx` `experience` array (lines 73-114) | Anonymized job titles | Name Bougainville, Hanson Bay, Flinders Chase, Angler Stirling with years + bullet links to the press mentions | +5 (C2) |
| `/src/app/about/page.tsx` JSON-LD block (lines 143-179) | Duplicate minimal Person | Replace with `buildBreadcrumbList([...])` + `ProfilePage mainEntity: { "@id": "#jeremy" }` | +2 (H3) |
| `/src/lib/schema.ts` `buildSameAs()` (lines 47-49) | Returns Instagram only | Return Instagram + 4 press URLs + offertesvoorjou.nl + boekeerlijk.nl + (new) LinkedIn | +4 (C3) |
| `/src/lib/site-config.ts` FIXMEs (lines 16, 48, 51, 86) | Placeholders | Fill legalName, vat (or KOR), optional street | +2 (H4) |
| `/src/lib/site-config.ts` add `testimonials` block | Does not exist | Add 3 attributed client quotes with title + company + metric | +6 (H1) |
| `/src/app/portfolio/page.tsx` (add testimonial section) | No testimonials rendered | Render the new site-config block between bio and press | +2 (H1) |
| `/src/app/page.tsx:64`, `/src/app/services/page.tsx:56`, `/src/app/services/seo-geo/page.tsx:52,245` ("De enige ...") | Unqualified #1 claim | Replace with "Chef-led SEO/GEO voor horeca" or qualify per H2 | +3 (H2) |
| `/src/app/about/page.tsx:329-335` "5 landen" | Inconsistent with body | Change to "4" or name the 5th | +1 (M2) |
| `/src/app/contact/page.tsx:91-108` | Phone under WhatsApp only | Add dedicated Bellen row with tel: link | +1 (M3) |
| `/src/app/about/page.tsx` (new section) | No English summary | Add short English-language accordion / paragraph citing AGFG + InDaily | +2 (M1) |
| `/src/lib/schema.ts` `buildPerson()` `knowsAbout` (lines 135-141) | 5 items | Add catering, private chef, dry-aging, seafood cookery | +1 (L2) |

**Estimated score after all fixes: ~90 / 100**

---

## New content recommendations (biggest LLM citation lift)

These are genuinely NEW content additions, not tweaks. Each one creates a NEW entity or fact that LLMs can cite.

1. **A full `/portfolio/angler-stirling` (or `/cases/angler-stirling`) page** — dedicated page for Jeremy's dry-aging work at Angler Stirling, cross-linking both AGFG and InDaily articles, explaining the sashimi/fish-sausage/barramundi-crackling/carp-burger program, with images if permissions allow. This is the single most citation-worthy story on the site and it currently lives only as two paragraphs buried in /portfolio bio. Getting it to a canonical URL means LLMs can cite `jezzacooks.com/portfolio/angler-stirling` whenever someone asks about "Australian dry-age chefs" or "Sam Prance-Smith's team at Angler".

2. **A LinkedIn profile for Jeremy Arrascaeta** — and link it from `Person.sameAs`. This is free, takes 30 minutes, and single-handedly bridges the entity graph between jezzacooks.com and the rest of the professional web. LinkedIn is the #1 `sameAs` target LLMs trust for Person entities.

3. **Three verifiable testimonials with metrics** — one from Maarten Hogeveen (Chef & Serve), one referencing Tafelaar Trustoo 9.8 (ideally with a screenshot on-page), one from Swimcoaching.nl. Written quotes with attributable role + company + specific result. Rendered with Review schema. This is the gap that converts "Jezza has clients" into "Jezza has happy clients who say measurable things", which is the exact threshold GPT-4.5 and Claude use for "recommend this vendor" answers.

---

## Summary recap

- **Score: 63 / 100.** Strong where it matters most (portfolio + press on a dedicated page with correct CreativeWork + NewsArticle schema), weak on legal/trust infrastructure (stub terms, missing privacy), and leaking the biggest asset (AU career and named restaurants) because they only appear on /portfolio, not on /about.
- **Top 3 highest-leverage fixes**:
  1. Name the real restaurants on /about (C2) — unlocks the 2 verified AU press mentions as direct /about citations.
  2. Expand `Person.sameAs` to include LinkedIn + press URLs + portfolio client footers (C3) — bridges the entity graph.
  3. Write real /terms + /privacy (C1) — unblocks B2B trust and Google quality-rater signals.
- **Biggest new-content lift for LLM citation**: A dedicated `/portfolio/angler-stirling` case page that names Sam Prance-Smith, links AGFG + InDaily by URL, and explains the dry-aging program — plus a LinkedIn profile that the Person schema's `sameAs` can point to. Both unlock lateral entity links that don't currently exist.
