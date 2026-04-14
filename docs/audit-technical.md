# Technical SEO Audit — jezzacooks.com

**Date**: 2026-04-14
**Score**: 80 / 100

## Category scores

- Indexability: 15/15 — robots.txt clean, sitemap.xml has 14 URLs with `lastmod`, no accidental noindex anywhere.
- Canonicals: 7/10 — 12 of 14 pages declare `alternates.canonical`; `/free-diagnosis` and `/terms` silently inherit the root canonical.
- metadataBase/title: 10/10 — `metadataBase` set, `%s | Jezza Cooks` template works, no double suffixes observed.
- OpenGraph: 5/10 — OG wiring is present, but the shared OG image is **the wrong dimensions and wrong file format** (see CRIT below).
- Build health: 12/15 — build passes in ~1.3s with zero warnings, but `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` are both `true`, so real type/lint errors are hidden from CI.
- Core Web Vitals: 10/15 — next/font + priority heroes are correct, but the About hero (likely LCP) uses `unoptimized`, and 1.4–1.7 MB hero JPEGs are served at full weight.
- Crawlability: 9/10 — every sitemap URL is reachable from header or footer, all internal links use `next/link`, breadcrumb JSON-LD is on every deep page. No visible breadcrumb UI.
- Mobile/a11y: 10/10 — `viewport` meta set, `lang="nl-NL"`, every `<Image>` has an `alt` prop (decorative ones correctly use `alt=""` + `aria-hidden`), focus rings everywhere.
- Security: 2/5 — `next.config.ts` has no `headers()` export. No HSTS, X-Frame-Options, CSP, Permissions-Policy, or Referrer-Policy. Relies entirely on the hosting edge.

## Gaps (ordered by impact)

1. **[CRIT]** OG image is 896x1200 portrait PNG masquerading as a 1200x630 JPG.
   - File: `/Users/jezza/Documents/Projects/jezzacooks.com/public/pics/about-jezza.jpg`
     - `file` output: `PNG image data, 896 x 1200, 8-bit/color RGB, non-interlaced`
     - Declared dimensions: `src/app/layout.tsx:62-64` → `width: 1200, height: 630`
     - Referenced from: `src/lib/site-config.ts:225` as `SITE.ogImage`, then reused on every page's OG/Twitter card.
   - Fix: export a real 1200x630 JPEG (or PNG) dedicated OG image (e.g. `/public/og/jezza-cooks-og.jpg`), update `SITE.ogImage`, and rename the current file so its extension matches its contents. Facebook, LinkedIn, and WhatsApp will reject or aggressively crop a 896x1200 portrait when they expect 1.91:1 landscape.
   - Score impact: +5 pts

2. **[HIGH]** `/free-diagnosis` and `/terms` publish a wrong canonical and an inherited title.
   - Files:
     - `src/app/free-diagnosis/page.tsx:1-38` — no `export const metadata`
     - `src/app/terms/page.tsx:1-16` — no `export const metadata`
   - Confirmed live: `curl -s http://localhost:9003/free-diagnosis` returns `<link rel="canonical" href="https://jezzacooks.com"/>` and the root-layout title. Both pages are in `sitemap.ts` (lines 30 and 33), so Google will find conflicting signals (crawl the URL, see canonical pointing back home, de-index it).
   - Fix: add `export const metadata: Metadata = { title: ..., description: ..., alternates: { canonical: "/free-diagnosis" } };` to both pages. For `/free-diagnosis` also set `robots: { index: true }` explicitly, for `/terms` probably `robots: { index: false }` since the page body is `<p>Terms of service content...</p>` (empty placeholder — see also gap #7).
   - Score impact: +3 pts

3. **[HIGH]** About page story image uses `unoptimized` — kills LCP on /about.
   - File: `src/app/about/page.tsx:312` (`unoptimized` prop on the main story Image)
   - The image (`about-jezza.jpg`, 896x1200, 1.5 MB raw) is one of the largest elements above-the-fold on /about. `unoptimized` bypasses Next's automatic WebP/AVIF conversion, responsive `srcset`, and quality 75 compression. On a slow 4G connection this alone can add 1–2 seconds to LCP.
   - Fix: delete the `unoptimized` prop. Next already knows `remotePatterns`, so optimization will work on first request. The "stubborn caching" comment that justifies it in `src/components/logo.tsx:17` does not apply here.
   - Also do the same in `src/components/logo.tsx:17` (logo is small but shipped on every page).
   - Score impact: +2 pts

4. **[HIGH]** `next.config.ts` disables TypeScript and ESLint checks during build.
   - File: `next.config.ts:5-10`
     ```
     typescript: { ignoreBuildErrors: true },
     eslint: { ignoreDuringBuilds: true },
     ```
   - Effect: the clean build output is misleading — the only reason there are no warnings is because the build refuses to produce them. A missing alt prop, a hydration error in a Client Component, or a broken import would all pass through silently.
   - Fix: run `npm run lint` and `npx tsc --noEmit` manually, fix whatever they surface, then remove both ignore flags. Keep them off in CI so regressions are caught at PR time.
   - Score impact: +3 pts

5. **[HIGH]** `next.config.ts` has no `headers()` export — no security headers.
   - File: `next.config.ts` (entire file, no `async headers()` present)
   - Missing: `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` / `frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`.
   - Fix: add an `async headers()` block returning `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and a conservative `Content-Security-Policy` (or at least `frame-ancestors 'self'`). Only takes ~20 lines.
   - Score impact: +3 pts

6. **[MED]** Static hero images are 1.2–1.7 MB each before Next optimization.
   - Files in `/public/pics/`:
     - `hero-home.jpg` 1.4 MB
     - `consulting.jpg` 1.7 MB
     - `service-consulting.jpg` 1.6 MB
     - `service-websites.jpg` 1.3 MB
     - `results-hero.jpg` 1.4 MB
     - `aboutme.png` 1.3 MB
     - `1619197.png` 1.5 MB
   - Next will compress these on first request, but the source weight still hits the origin and initial Vercel cache. Pre-optimize to ~200–400 KB each (WebP or mozjpeg) before commit.
   - Also check whether `results-hero.jpg` and `results-proof.jpg` are literally the same file — both are `1385555` bytes and referenced from `src/app/results/page.tsx:35-36` with different IDs. If yes, dedupe.
   - Score impact: +2 pts

7. **[MED]** `/terms` is a visible placeholder shipped to production.
   - File: `src/app/terms/page.tsx:10-12` — body is literally `<p>Terms of service content...</p>`
   - It is in the sitemap (`src/app/sitemap.ts:33`) with `priority: 0.2`, so Google will index it as a "thin content" page.
   - Fix: either write real terms, or `noindex` the page until they exist, or remove it from the sitemap.
   - Score impact: +1 pt

8. **[MED]** Missing visible breadcrumb UI on deep pages.
   - Breadcrumb JSON-LD is already emitted from `/contact`, `/faq`, `/pricing`, `/portfolio`, `/services`, `/services/*` (4 sub-pages). That covers the GEO/SERP rich-result case. But there is no rendered `<nav aria-label="Breadcrumb">` on any page.
   - Fix: add a small `<Breadcrumb>` component used by every `/services/*`, `/pricing`, `/portfolio`, `/contact` page. Improves user orientation and gives Googlebot a second signal.
   - Score impact: +1 pt

9. **[LOW]** `alternates.languages` on root layout points both locales at `/`.
   - File: `src/app/layout.tsx:46-49`
     ```
     languages: { "nl-NL": "/", "en-US": "/" }
     ```
   - There is no English version of the site, so declaring `en-US` and pointing it at the Dutch home is a soft hreflang conflict. Drop the `en-US` line until there's real English content.
   - Score impact: +0.5 pts

10. **[LOW]** `metadata.openGraph.url` on child pages is a relative path.
    - Files: every child `page.tsx` sets e.g. `openGraph: { url: "/about" }`. Because `metadataBase` is set on the root layout, Next will resolve this to the absolute URL, so it's not broken — but it does rely on Next's rewrite and is brittle if someone removes `metadataBase`. Prefer explicit absolute URLs.
    - Score impact: +0.5 pts

11. **[LOW]** Search Console verification not configured.
    - File: `src/app/layout.tsx:89-90` — commented out `verification: { google: "" }`.
    - Add the real property code once verified.
    - Score impact: +0 pts (not scored, but do it).

## Evidence (build output / curl snippets)

### `npm run build` (trimmed)
```
> nextn@0.1.0 build
> NODE_ENV=production next build

   ▲ Next.js 15.5.9
   Creating an optimized production build ...
 ✓ Compiled successfully in 1338ms
   Skipping validation of types
   Skipping linting
   Collecting page data ...
   Generating static pages (0/23) ...
 ✓ Generating static pages (23/23)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ○ /                                      754 B         123 kB
├ ○ /about                                 180 B         110 kB
├ ○ /contact                             4.39 kB         117 kB
├ ○ /faq                                   726 B         115 kB
├ ○ /free-diagnosis                      12.8 kB         125 kB
├ ○ /portfolio                             162 B         105 kB
├ ○ /pricing                              3.1 kB         121 kB
├ ○ /results                               180 B         110 kB
├ ○ /robots.txt                            140 B         102 kB
├ ○ /services                              180 B         110 kB
├ ○ /services/catering                   2.51 kB         125 kB
├ ○ /services/consulting                   754 B         123 kB
├ ○ /services/seo-geo                      742 B         118 kB
├ ○ /services/websites                   13.7 kB         131 kB
├ ○ /sitemap.xml                           140 B         102 kB
└ ○ /terms                                 140 B         102 kB
+ First Load JS shared by all             102 kB
```
Note the two yellow lines: `Skipping validation of types` and `Skipping linting`. Those are the symptom of gap #4.

### `file /public/pics/about-jezza.jpg`
```
/Users/jezza/Documents/Projects/jezzacooks.com/public/pics/about-jezza.jpg:
  PNG image data, 896 x 1200, 8-bit/color RGB, non-interlaced
```
A PNG renamed `.jpg` at 896x1200 (portrait), used as `SITE.ogImage` with declared dims `1200x630`.

### `curl http://localhost:9003/robots.txt`
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Host: https://jezzacooks.com
Sitemap: https://jezzacooks.com/sitemap.xml
```
Clean. No `noindex`, explicit host, sitemap declared.

### `curl http://localhost:9003/sitemap.xml` (trimmed)
```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>https://jezzacooks.com/</loc>
  <lastmod>2026-04-14T20:34:36.542Z</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1</priority>
</url>
... 13 more urls, all with <lastmod>
```
14 URLs total, every one has `lastmod`. Matches the 14 static routes from the build. Zero discrepancies.

### `curl http://localhost:9003/free-diagnosis | grep canonical`
```
<link rel="canonical" href="https://jezzacooks.com"/>
<title>Jezza Cooks | Horeca consultancy, catering en restaurant websites</title>
```
Confirms gap #2 — free-diagnosis is publishing the root canonical.

### `curl http://localhost:9003/ | grep canonical`
```
<link rel="canonical" href="https://jezzacooks.com"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Jezza Cooks | Level up the chaos"/>
<meta name="twitter:card" content="summary_large_image"/>
```
Home canonical is correct, Twitter card type set.

### Files verified to have `alternates.canonical` set correctly
- `src/app/layout.tsx:44-50` (root `/`)
- `src/app/page.tsx:23`
- `src/app/about/page.tsx:13`
- `src/app/contact/page.tsx:18`
- `src/app/faq/page.tsx:17`
- `src/app/pricing/page.tsx:25`
- `src/app/portfolio/page.tsx:32`
- `src/app/results/page.tsx:15`
- `src/app/services/page.tsx:17`
- `src/app/services/consulting/page.tsx:33`
- `src/app/services/catering/page.tsx:28`
- `src/app/services/websites/page.tsx:11`
- `src/app/services/seo-geo/page.tsx:48`

### Missing canonical
- `src/app/free-diagnosis/page.tsx` (no `export const metadata`)
- `src/app/terms/page.tsx` (no `export const metadata`)

---

## 150-word summary

The site scores **80/100**. The build is fast and clean, indexability is airtight, `metadataBase` plus a proper title template are wired correctly, and every `<Image>` has `alt` text with `lang="nl-NL"` on `<html>`. What drags the score down is a **CRIT**-level OG image mismatch (`/public/pics/about-jezza.jpg` is a 896x1200 PNG declared as a 1200x630 JPG on every page's social card), two sitemap URLs (`/free-diagnosis`, `/terms`) that ship the root canonical because they have no `metadata` export, and an About page story Image marked `unoptimized` that is likely the LCP element. Also, `next.config.ts` hides TypeScript and ESLint errors during build and exports no security headers at all. **Top 3 fixes to reach 95/100**: (1) ship a real 1200x630 OG JPEG and update `SITE.ogImage`, (2) add `metadata` with canonical to `/free-diagnosis` and `/terms`, (3) delete `unoptimized` from `src/app/about/page.tsx:312`.
