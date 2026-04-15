# Technical SEO Audit — 2026-04-15

Target: https://www.jezzacooks.com (Next.js 15, Vercel). Post-redeploy verification.

Legend: check = pass, warn = minor issue, fail = must fix.

## 1. Canonical + hreflang

- check — Every audited page has a canonical pointing to the www host. Sampled `/`, `/about`, `/services`, `/services/seo-geo`, `/menu-engineering`, `/services/catering`, `/portfolio`. All look like `<link rel="canonical" href="https://www.jezzacooks.com{path}"/>`.
- check — `og:url` matches canonical on every sampled page. No host or casing conflicts.
- check — `<html lang="nl-NL">` on every page.
- warn — No `<meta property="og:locale" content="nl_NL">`. Minor, only affects some social embedders.
- info — No `hreflang` tags. Acceptable for single-language site; do not add until an `/en` tree exists.

## 2. Robots + sitemap

- check — `https://www.jezzacooks.com/robots.txt` returns 200, `text/plain`, and contains both `Host: https://www.jezzacooks.com` and `Sitemap: https://www.jezzacooks.com/sitemap.xml`. `Disallow: /api/` and `/_next/` only — nothing indexable is blocked.
- check — `https://www.jezzacooks.com/sitemap.xml` returns 200 with `content-type: application/xml`. 16 URLs, all on www host, all with `lastmod` (2026-04-15T06:27:41.453Z) and sensible priorities (home = 1.0, key services = 0.9-0.95, legal = 0.2).
- check — Spot-checked 7 routes from the sitemap (`/`, `/about`, `/services/seo-geo`, `/menu-engineering`, `/portfolio`, `/services/catering`, `/privacy`): all 200.
- check — Apex `https://jezzacooks.com/` returns `307` to `https://www.jezzacooks.com/` (single hop).
- check — Trailing-slash variant `/services/seo-geo/` returns `308` to `/services/seo-geo` (single hop, canonical form is no-trailing-slash).

## 3. HTTP headers

Sampled on `/` and `/robots.txt` (both served via Vercel, same profile):

- check — `strict-transport-security: max-age=31536000; includeSubDomains`
- check — `x-content-type-options: nosniff`
- check — `x-frame-options: DENY`
- check — `referrer-policy: strict-origin-when-cross-origin`
- check — `permissions-policy: camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=()`
- check — `content-type` correct on `sitemap.xml` (`application/xml`) and `robots.txt` (`text/plain`).
- warn — HTML `cache-control: public, max-age=0, must-revalidate`. This is Next.js/Vercel's default ISR profile: the Vercel edge cache does serve `x-vercel-cache: HIT` with a populated `age` header, so it *is* caching. The `max-age=0` only tells the browser to revalidate — acceptable but not ideal. Consider a short `s-maxage` + `stale-while-revalidate` on static marketing pages if you want Chrome's disk cache to reuse between visits. Not a functional bug, just headroom.

## 4. Core Web Vitals structure

- check — Hero on `/` has `fetchPriority="high"` (`<img data-ai-hint="chef kitchen" fetchPriority="high" ... sizes="100vw" ...>`) AND a matching `<link rel="preload" as="image" imageSrcSet=... imageSizes="100vw" fetchPriority="high">` in `<head>`. Same pattern on `/about` and `/services/catering`.
- fail — Pages missing an above-the-fold `fetchPriority="high"` image hint: `/services`, `/services/seo-geo`, `/menu-engineering`, `/portfolio`. These pages have hero imagery but the `next/image` `priority` prop is not set on it. Fix: pass `priority` to the top-of-page Image component on each of those 4 pages so Next emits the preload + high priority hint. Without it the LCP candidate competes with lazy images and fonts.
- check — AVIF is live. `curl -H "Accept: image/avif" https://www.jezzacooks.com/_next/image?url=%2Fpics%2Fhero-home.jpg&w=1920&q=75` returns `content-type: image/avif`. Same URL with `Accept: image/webp` returns `image/webp`. `Vary: Accept` is set, so CDN caches both variants cleanly.
- check — Every `next/image` with `fill` layout has an explicit `sizes` attribute. 0 out of 27 sampled fill-images are missing `sizes`.
- check — All images have `alt` attributes; the one empty alt on `/about` is a decorative thumbnail (acceptable).
- info — Google Fonts are loaded via Next's font pipeline; no FOIT, no external stylesheet blocking.

## 5. JSON-LD

Block counts and types per page (from live HTML):

- `/` — 2 blocks. Graph: `Organization`, `ProfessionalService+LocalBusiness`, `Person`, `WebSite`; plus `FAQPage` (4 questions).
- `/about` — 2 blocks. Graph + `BreadcrumbList`.
- `/services` — 2 blocks. Graph + `BreadcrumbList`.
- `/services/seo-geo` — 4 blocks. Graph + `Service` + `BreadcrumbList` + `FAQPage`.
- `/menu-engineering` — 4 blocks. Graph + `Article` + `BreadcrumbList` + `FAQPage`.
- `/services/catering` — 4 blocks. Graph + `Service` + `BreadcrumbList` + `FAQPage`.
- `/portfolio` — 4 blocks. Graph + `BreadcrumbList` + `CollectionPage` + `ItemList`.

check — Cross-linking via `@id` is consistent. Every `Service` references `provider: { "@id": "https://www.jezzacooks.com/#localbusiness" }`. `Organization` and `LocalBusiness` share their `@id`s across every page.

check — `/services/catering` schema reflects the co-brand: `name` and `serviceType` both read "Tafelaar × Jezza Cooks Catering Amersfoort"; description explicitly names both Jeremy and Jan Molmans and Kamp 8.

check — `/about` Person schema is rich: `alternateName`, `jobTitle`, 5-item `hasOccupation` work history with dates, `knowsLanguage: ["nl","en","fr"]`, `knowsAbout` (13 items), nationality, postal address, and a 14-entry `sameAs` array (LinkedIn, Instagram, AD, Gelderlander, indebuurt, Spotify, InDaily, AGFG, Broadsheet, Aquna, Misset Horeca, De RestaurantKrant, YouTube × 2).

- warn — `sameAs` has `https://www.youtube.com/watch?v=MtGRedLjZ3Q` duplicated (entries 2 and 9). Harmless, but tidy up.
- warn — `Person.hasCredential` is null even though Jeremy has a concrete credential (Euro-Toques Young Chef Award 2018 finalist). Consider adding an `EducationalOccupationalCredential` object so Google can surface it.

fail — Schema.org validator (validator.schema.org) reports 8 errors on every page that renders the shared graph. Root cause is in `src/lib/schema.ts` line 99:

```ts
occupationLocation: {
  "@type": "City",   // <- "City" is not a schema.org type
  name: "Amersfoort",
}
```

`City` is not defined in schema.org. Change to `"@type": "AdministrativeArea"` (or plain `"@type": "Place"`). After that single change I expect the error count to drop to zero (the 8 reported errors all reference `occupationLocation` / `Place`; the four Role→Occupation→Place chains are themselves valid, but the validator appears to surface them because the parent Person graph hits the invalid object first). Re-run the validator after the fix to confirm.

## 6. URL hygiene

- check — No trailing slashes in sitemap or canonicals. All routes normalized to `/path` form, with `/path/` 308-ing to `/path`.
- check — No query parameters on canonical URLs.
- check — No mixed-case variations sampled.
- check — Apex → www via 307; www/HTTPS is the single canonical origin.

## 7. Broken links

Extracted 14 unique internal hrefs from `/`, `/services`, and `/about` (excluding `/_next` and `/api`) and HEAD-checked each:

```
/                    200
/about               200
/contact             200
/faq                 200
/free-diagnosis      200
/portfolio           200
/pricing             200
/privacy             200
/results             200
/services/catering   200
/services/consulting 200
/services/seo-geo    200
/services/websites   200
/terms               200
```

check — All 14 links hit a final 200 directly, no redirect chains.

## 8. Accessibility basics

- check — `<html lang="nl-NL">` on every page.
- check — Every sampled page has exactly 1 `<h1>`.
- check — Every `<img>` has an `alt` attribute.
- fail — `/services` skips heading levels: `H1: "Vier manieren om je horeca strakker te laten draaien"` → then straight to `H3: "Restaurant consulting"`, `H3: "Tafelaar × Jezza Cooks Catering"`, `H3: "Restaurant websites"`, `H3: "SEO & GEO optimalisatie"`. There are zero H2s on the page. Root cause: the service cards use `CardTitle` which in `src/components/ui/card.tsx` line 36 renders as `<h3>`. Fix on `src/app/services/page.tsx` line ~96: either wrap in `<h2>`, or give `CardTitle` an `as` prop (or use an `asChild` pattern) so the four top-level service cards render as `<h2>`. This is the only heading-hierarchy violation I found.
- info — The footer-derived `H3`s on `/services` ("Jezza Cooks", "Diensten", "Info") become fine once the card titles are promoted to H2, since they'll slot in as H3s under their siblings.

## Summary of required fixes

1. `src/lib/schema.ts` line 99 — change `"@type": "City"` to `"@type": "AdministrativeArea"`. Fixes 8 schema.org errors on every page.
2. `src/app/services/page.tsx` ~line 96 — promote service-card `CardTitle` from `<h3>` to `<h2>` so the page doesn't skip from H1 to H3. Fixes the one accessibility violation.
3. `src/app/services/page.tsx`, `src/app/services/seo-geo/page.tsx`, `src/app/menu-engineering/page.tsx`, `src/app/portfolio/page.tsx` — add `priority` to the top-of-page `next/image` so Next emits `fetchPriority="high"` + preload. Improves LCP hint quality on these 4 routes.
4. `src/lib/schema.ts` — dedupe the duplicate YouTube URL in Person `sameAs`; optionally add `hasCredential` for the Euro-Toques finalist award.
5. Optional — add `<meta property="og:locale" content="nl_NL">` to the default metadata for consistency with social embedders.

## Score

Technical SEO: **88 / 100**

Breakdown: canonical/URL/robots/sitemap/headers stack is clean (no deductions there), AVIF delivery confirmed, hreflang not required, broken-link check clean. Deductions:
- −4: schema.org validator errors on every page (single-line fix, but currently 8 errors × 7 pages).
- −3: four pages missing LCP `priority` hint on their hero image.
- −3: heading hierarchy skip (H1→H3) on `/services`.
- −1: `sameAs` duplicate, missing `og:locale`, missing `hasCredential`, `max-age=0` on HTML (all minor).

All findings are small, localized edits. Nothing blocks indexing or crawling today.
