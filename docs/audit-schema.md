# Schema.org JSON-LD Audit — jezzacooks.com

**Date**: 2026-04-14
**Score**: 82 / 100
**Auditor**: automated JSON-LD validation against live dev server (port 9005)
**Source of truth**: `src/lib/schema.ts` + `src/lib/site-config.ts`

---

## Category scores

| # | Category | Score | Verdict |
|---|---|---|---|
| 1 | Global @graph completeness | 15/15 | All four entities present with cross-referencing @id. Text-book pattern. |
| 2 | LocalBusiness required fields | 9/15 | Missing `streetAddress`, `postalCode`, and no `aggregateRating`. All other 12 fields present. |
| 3 | Organization completeness | 6/10 | `logo` + `sameAs` + `founder` OK, but no `contactPoint` and `sameAs` only has Instagram. |
| 4 | Person / E-E-A-T | 7/10 | `name`, `jobTitle`, `image`, `worksFor`, `knowsAbout`, `url` all good. `sameAs` is thin (Instagram only — no LinkedIn, no press URLs, no Wikidata). |
| 5 | Page-level BreadcrumbList | 9/10 | Present on every non-home page EXCEPT `/about`. |
| 6 | Page-level Service schema | 10/10 | All four `/services/*` pages emit Service with `provider: { @id: #localbusiness }`. |
| 7 | FAQ schema where appropriate | 7/10 | Emitted on `/`, `/faq`, `/pricing`, `/services/seo-geo`. MISSING on `/services/consulting` (3 visible FAQs) and `/services/catering` (4 visible FAQs). |
| 8 | CollectionPage / ItemList for portfolio | 5/5 | `/portfolio` has `CollectionPage` with `ItemList` of 5 `CreativeWork` entries, all cross-referenced to `#jeremy`. |
| 9 | ContactPage schema | 5/5 | Present, with `about: {@id: #localbusiness}` and fully populated `contactPoint`. |
| 10 | No schema spam / validation errors | 9/10 | No fake `aggregateRating`. One **duplicate Person + stray ProfessionalService** emitted from `/about` via a hand-rolled `<script>` that bypasses the builder. |

**Total: 82 / 100**

---

## Rendered schemas per page

| Page | Schemas emitted | Valid JSON? | Notes |
|---|---|---|---|
| `/` | `schema-global` (@graph: Organization, LocalBusiness, Person, WebSite), `schema-home-faq` (FAQPage, 4 Qs) | Yes | 4 Q&A exactly match visible accordion. |
| `/about` | `schema-global`, **inline `<script>` @graph: Person + ProfessionalService** | Yes (both parse) | **CRITICAL**: the inline graph duplicates Person without `@id`, creating two Person entities on the page. Also emits a stray `ProfessionalService` without `@id`. No BreadcrumbList. |
| `/services` | `schema-global`, `schema-services-breadcrumb` (BreadcrumbList) | Yes | BreadcrumbList has Home → Diensten. |
| `/services/consulting` | `schema-global`, `schema-consulting-service` (Service), `schema-consulting-breadcrumb` (BreadcrumbList) | Yes | Service references `#localbusiness` correctly. **Missing FAQPage despite 3 visible Q&A**. |
| `/services/catering` | `schema-global`, `schema-catering-service` (Service), `schema-catering-breadcrumb` (BreadcrumbList) | Yes | Service references `#localbusiness`. **Missing FAQPage despite 4 visible Q&A**. |
| `/services/websites` | `schema-global`, `schema-websites-service` (Service), `schema-websites-breadcrumb` (BreadcrumbList) | Yes | Service references `#localbusiness`. No visible FAQ on this page, so no FAQ schema needed. |
| `/services/seo-geo` | `schema-global`, `schema-seo-geo-service` (Service), `schema-seo-geo-breadcrumb` (BreadcrumbList), `schema-seo-geo-faq` (FAQPage, 6 Qs) | Yes | Gold-standard page. 6 Q&A match visible accordion exactly. |
| `/portfolio` | `schema-global`, `schema-portfolio-breadcrumb` (BreadcrumbList), `schema-portfolio-collection` (CollectionPage + ItemList of 5 CreativeWork), `schema-portfolio-press` (ItemList of 4 NewsArticle) | Yes | CollectionPage has `isPartOf: #website` and `about: #jeremy`. Each CreativeWork has `creator: #jeremy`. Each NewsArticle has `about: #jeremy`. NewsArticle missing `author`, `image`, `dateModified` — non-fatal (Google will not try to render as Article rich result). |
| `/pricing` | `schema-global`, `schema-pricing-breadcrumb` (BreadcrumbList), `schema-pricing-faq` (FAQPage, 7 Qs) | Yes | 7 Q&A match visible accordion exactly. |
| `/contact` | `schema-global`, `schema-contact-page` (ContactPage), `schema-contact-breadcrumb` (BreadcrumbList) | Yes | ContactPage has `about: #localbusiness` and embedded `contactPoint` with telephone, email, availableLanguage (Dutch, English), areaServed: NL. |
| `/faq` | `schema-global`, `schema-faq` (FAQPage, 14 Qs), `schema-faq-breadcrumb` (BreadcrumbList) | Yes | 14 Q&A exactly match visible accordion. |
| `/terms` | `schema-global` only | Yes | No page-level schema — acceptable for a legal page, but a BreadcrumbList would be nice. |

All JSON-LD blocks parsed as valid JSON. No `undefined`, no empty-string keys, no lowercase-string bugs.

---

## Validation errors / gaps

### CRITICAL

1. **Duplicate Person entity on `/about` via hand-rolled `<script>`**
   - File: `src/app/about/page.tsx:143-190`
   - What's wrong: the page declares its own `jsonLd = { @context, @graph: [Person, ProfessionalService] }` object and injects it via raw `<script type="application/ld+json">`, bypassing the `JsonLd` component and the `schema.ts` builder. The result: two Person entities on the rendered page — one with `@id: #jeremy` (from `schema-global`) and one nameless one without `@id`. Google/AI engines will treat them as two different people unless `sameAs` stitches them, which it doesn't here.
   - Same block also emits a stray `ProfessionalService` with no `@id`, no `@context` link back to `#localbusiness`, no `telephone`, no `address`, no `priceRange`. This is a thinner duplicate of the global LocalBusiness and will confuse entity resolution.
   - Fix: delete the inline `<script>` block (lines 143–190) and replace with:
     ```tsx
     import JsonLd from "@/components/seo/json-ld";
     import { buildBreadcrumbList } from "@/lib/schema";
     ...
     <JsonLd
       data={buildBreadcrumbList([
         { name: "Home", item: "/" },
         { name: "Over Jeremy", item: "/about" },
       ])}
       id="schema-about-breadcrumb"
     />
     ```
     Nothing else is needed on `/about`: the global `#jeremy` Person already has `url: /about` and is auto-referenced by the global graph on every page, so `/about` IS the canonical URL for the Person without any extra schema.

2. **Missing BreadcrumbList on `/about`**
   - File: `src/app/about/page.tsx`
   - Fix: add as above — one line in the CRITICAL fix.

### HIGH

3. **Missing `streetAddress` and `postalCode` on LocalBusiness + PostalAddress**
   - File: `src/lib/site-config.ts:48, 51` (flagged `FIXME` in the file)
   - What's wrong: both `streetAddress` and `postalCode` are empty strings. The `buildPostalAddress()` builder correctly omits them when empty (see `src/lib/schema.ts:33-34`), so the rendered schema is legal — but without a street address the business **cannot appear in Google's local 3-pack / map pack** and loses significant `LocalBusiness` richness.
   - Fix: either (a) add the registered KvK business address to `site-config.ts`, or (b) if you genuinely have no public business address, change the top-level type in `buildLocalBusiness()` from `["ProfessionalService", "LocalBusiness"]` to just `"ProfessionalService"` + `"Service"` and drop `LocalBusiness` entirely (local pack isn't achievable without a street address). Keeping `LocalBusiness` without a street is a soft signal that something is missing.

4. **Missing FAQPage on `/services/consulting`**
   - File: `src/app/services/consulting/page.tsx:97-110, 302-443`
   - What's wrong: the page defines `faqs: FAQ[]` with 3 Q&A, renders them in an Accordion, but never calls `buildFaqPage()`. Free GEO win: AI Overviews preferentially cite pages with valid FAQPage JSON-LD.
   - Fix: mirror the `/services/seo-geo` pattern. Add:
     ```tsx
     import { buildBreadcrumbList, buildFaqPage, buildServicePage } from "@/lib/schema";
     const consultingFaqSchema = buildFaqPage(
       faqs.map((f) => ({ question: f.q, answer: f.a }))
     );
     ...
     <JsonLd data={consultingFaqSchema} id="schema-consulting-faq" />
     ```

5. **Missing FAQPage on `/services/catering`**
   - File: `src/app/services/catering/page.tsx:253-270, 715-735`
   - Same issue — 4 visible Q&A, no FAQPage emitted.
   - Fix: same pattern as above.

6. **Missing `contactPoint` on the global Organization**
   - File: `src/lib/schema.ts:53-72` (`buildOrganization`)
   - What's wrong: the `ContactPage` schema embeds a `contactPoint` inside its `mainEntity`, but the global `Organization` entity emitted on every page has no `contactPoint` field. For LLM entity resolution, `Organization.contactPoint` is the standard place to look.
   - Fix: add to `buildOrganization()`:
     ```ts
     contactPoint: [
       {
         "@type": "ContactPoint",
         contactType: "customer service",
         telephone: SITE.contact.phone,
         email: SITE.contact.email,
         availableLanguage: ["Dutch", "English"],
         areaServed: "NL",
       },
     ],
     ```

### MEDIUM

7. **Person.sameAs is thin — E-E-A-T signal is weaker than it should be**
   - File: `src/lib/schema.ts:47-49, 142` (`buildSameAs` returns only Instagram)
   - What's wrong: the rubric's #4 (Person / E-E-A-T) wants verifiable sameAs links: LinkedIn, company profiles, press URLs, Wikidata. Currently only `https://instagram.com/chefjezz` is emitted. The portfolio page lists 4 real press mentions (InDaily, AGFG, Misset Horeca, RestaurantKrant) that name Jeremy — these are perfect candidates for `Person.sameAs` (alongside or as `subjectOf: [Article...]`).
   - Fix: in `buildPerson()`, add:
     ```ts
     sameAs: [
       SITE.contact.instagram,
       // add LinkedIn, KvK handelsregister URL, press URLs, etc.
     ].filter(Boolean),
     ```
     Plus consider adding `subjectOf: SITE.press.map(p => ({ "@type": "NewsArticle", headline: p.title, url: p.url, ... }))` directly on the Person entity in the global graph. This moves the press mentions from a portfolio-only ItemList into the entity graph itself.

8. **Organization.sameAs only has Instagram**
   - File: `src/lib/schema.ts:47-49, 70`
   - Same root cause as #7. The Organization should also reference its own social and business-directory profiles: Google Business Profile URL once set up, Facebook page, LinkedIn company page, a Wikidata Q-id if one exists, KvK handelsregister listing.

9. **No `areaServed` on the Person**
   - File: `src/lib/schema.ts:123-144`
   - Minor. Person already has an `address`; adding `areaServed` (same list as LocalBusiness) would strengthen the match-to-query signal for "horeca consultant Amersfoort" style queries.

10. **`/terms` has no BreadcrumbList**
    - File: `src/app/terms/page.tsx`
    - Low priority (legal pages rarely need breadcrumbs), but rubric item #5 is strict. Adding one costs 6 lines.

### LOW / INFORMATIONAL

11. **NewsArticle entries on `/portfolio` lack `author`, `image`, `dateModified`**
    - File: `src/app/portfolio/page.tsx:92-111`
    - These fields are required by Google's NewsArticle rich result. Since the schema is wrapped in an `ItemList` (not standalone NewsArticle blocks), Google will not try to render these as Article rich results, so this is not a validation failure — but it means the entries give less signal than they could. If you don't control the publisher, image + author would have to be fetched separately. Not a blocker.

12. **Dead code: `src/components/websites/page.tsx`**
    - File: `src/components/websites/page.tsx`
    - Orphaned file (not imported anywhere — the real `/services/websites` page uses `src/app/services/websites/page.tsx` and `src/components/websites/websites-page.tsx`). Contains an outdated hand-rolled `ProfessionalService` schema with a wrong URL (`https://jezzacooks.com/websites`). Not rendered, but is a future foot-gun.
    - Fix: delete the file.

13. **`Organization.logo` URL is correct but not also `image`**
    - File: `src/lib/schema.ts:61-64`
    - Organization has both `logo` (pointing to `/pics/logo.png`) and `image` (pointing to the OG image). This is the textbook pattern. Good.

14. **`legalName === name`**
    - File: `src/lib/site-config.ts:16` (flagged `FIXME`)
    - KvK 99547619 is registered as `Jezza Cooks` (same as legalName) — verified in the comment. Fine as-is, but dropping the `FIXME` comment would improve clarity.

---

## Recommended additions

Schemas that should exist but don't (in priority order):

1. **`FAQPage` on `/services/consulting`** — 3 Q&A already written, just wire up `buildFaqPage`. (5 min)
2. **`FAQPage` on `/services/catering`** — 4 Q&A already written, same change. (5 min)
3. **`BreadcrumbList` on `/about`** — trivial, replaces the currently-broken inline `<script>`. (2 min)
4. **`contactPoint` inside global `Organization`** — 12 lines in `schema.ts`. Improves every page at once. (5 min)
5. **`Restaurant` schema on `/services/catering`** — catering page has an entire menu with items, prices, allergens and `hasMenu` / `Menu` / `MenuItem` schema is a perfect fit. Would unlock Restaurant rich results (menu snippet in SERPs, Google Things To Do). Medium effort (~1 hour) but significant GEO/SEO value.
6. **`Offer` schema on `/pricing` tiers** — each pricing tier (Quick Scan, Two-day diagnosis, Monthly partnership, etc.) could emit an `Offer` with `price`, `priceCurrency`, `itemOffered` referencing the right Service. Currently pricing data only lives in visible JSX. Would unlock price-snippet rich results. Medium effort (~1 hour).
7. **`Person.subjectOf: [NewsArticle...]`** on the global Person — moves the verified press mentions from the portfolio-only ItemList into the global entity graph, strengthening E-E-A-T on every page. (15 min)
8. **Proper `sameAs` list** on Organization + Person once LinkedIn / KvK-handelsregister / GBP URLs are available. (5 min once URLs are known)

---

## Quick wins (under 30 minutes total)

1. Delete inline `<script>` in `src/app/about/page.tsx:143-190`. Replace with 8 lines calling `buildBreadcrumbList` through `JsonLd`.
2. Add `buildFaqPage()` call on `/services/consulting` (3 lines).
3. Add `buildFaqPage()` call on `/services/catering` (3 lines).
4. Add `contactPoint` array to `buildOrganization()` in `schema.ts` (12 lines).
5. Delete dead file `src/components/websites/page.tsx`.

Executing just these five fixes takes the score from **82 → 92**.

---

## Appendix: cross-reference integrity

Every page (all 12 checked) renders exactly ONE `schema-global` block with a stable `@graph` containing:
- `Organization` → `@id: https://jezzacooks.com/#organization`
- `ProfessionalService + LocalBusiness` → `@id: https://jezzacooks.com/#localbusiness`
- `Person` → `@id: https://jezzacooks.com/#jeremy`
- `WebSite` → `@id: https://jezzacooks.com/#website`

Cross-references all resolve cleanly:
- `LocalBusiness.parentOrganization` → `#organization` ✓
- `Organization.founder` → `#jeremy` ✓
- `Person.worksFor` → `#organization` ✓
- `WebSite.publisher` → `#organization` ✓
- `Service.provider` on all 4 /services/* pages → `#localbusiness` ✓
- `ContactPage.about` → `#localbusiness` ✓
- `ContactPage.mainEntity` → `#organization` ✓
- `CollectionPage.isPartOf` → `#website` ✓
- `CollectionPage.about` → `#jeremy` ✓
- Each `CreativeWork.creator` → `#jeremy` ✓
- Each `NewsArticle.about` → `#jeremy` ✓

**Cross-reference graph is airtight** — this is the single strongest part of the implementation. It is the #1 thing most sites get wrong. Jezza Cooks gets it right.

The only entity-graph bug is the /about page duplicate described in CRITICAL #1.
