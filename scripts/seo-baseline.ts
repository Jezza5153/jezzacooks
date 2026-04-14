#!/usr/bin/env tsx
/**
 * SEO/GEO baseline harness.
 *
 * Runs a fixed query set through Serper (Google SERP + AI Overviews + Places)
 * and writes a timestamped JSON snapshot to docs/seo-baseline-<YYYY-MM-DD>.json.
 *
 * Usage:
 *   # Requires SERPER_API_KEY in .env.local (see README)
 *   npx tsx scripts/seo-baseline.ts
 *
 * Re-run monthly. Delta between snapshots = actual SEO progress.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// --- Load .env.local without any dependency ---------------------------------
function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvLocal();

const SERPER = process.env.SERPER_API_KEY;
if (!SERPER) {
  console.error("ERROR: SERPER_API_KEY not set. Add it to .env.local");
  process.exit(1);
}

// PageSpeed is optional — if the key is missing we skip CWV checks.
const PAGESPEED = process.env.PAGESPEED_API_KEY;

const TARGET_DOMAIN = "jezzacooks.com";
const TARGET_URL = "https://jezzacooks.com";

// Key URLs to run through PageSpeed Insights. These are the pages that
// matter most for conversion and citation — keep the list stable so deltas
// between monthly runs are comparable.
const PAGESPEED_URLS = [
  "/",
  "/services/consulting",
  "/services/catering",
  "/services/websites",
  "/services/seo-geo",
  "/menu-engineering",
  "/about",
  "/contact",
] as const;

// --- Query set: mix of brand, commercial, local, and GEO intents ------------
// Keep this list STABLE across runs so deltas mean something.
const QUERIES: { q: string; intent: string; note?: string }[] = [
  // Brand queries (should always rank)
  { q: "jezza cooks", intent: "brand" },
  { q: "jezza cooks amersfoort", intent: "brand" },
  { q: "jeremy arrascaeta chef", intent: "brand" },
  { q: "chef jezz amersfoort", intent: "brand" },

  // Core commercial — Amersfoort local
  { q: "restaurant consultant amersfoort", intent: "commercial-local", note: "primary target" },
  { q: "horeca consultant amersfoort", intent: "commercial-local", note: "primary target" },
  { q: "menu engineering amersfoort", intent: "commercial-local", note: "open niche" },
  { q: "food cost controle amersfoort", intent: "commercial-local" },
  { q: "catering bedrijf amersfoort", intent: "commercial-local" },
  { q: "private chef amersfoort", intent: "commercial-local" },

  // Core commercial — national
  { q: "horeca consultancy nederland", intent: "commercial-national" },
  { q: "restaurant consultant nederland", intent: "commercial-national" },
  { q: "horeca seo bureau", intent: "commercial-national", note: "GEO target" },
  { q: "horeca geo optimalisatie", intent: "commercial-national", note: "GEO target" },

  // Website pricing — highly specific commercial intent
  { q: "goedkope restaurant website", intent: "commercial-national" },
  { q: "restaurant website laten maken", intent: "commercial-national" },
  { q: "restaurant website 400 euro", intent: "commercial-national", note: "long-tail match" },

  // GEO / LLM visibility — informational
  { q: "wat is generative engine optimization", intent: "informational" },
  { q: "ranken in chatgpt", intent: "informational" },
  { q: "geciteerd worden door ai overviews", intent: "informational" },

  // Problem-aware — what the customer actually searches
  { q: "hoe verlaag ik food cost restaurant", intent: "problem" },
  { q: "menukaart optimaliseren restaurant", intent: "problem" },
  { q: "prep structuur keuken verbeteren", intent: "problem" },
  { q: "restaurant team training amersfoort", intent: "problem" },

  // Competitor / alternative queries
  { q: "bonico horeca alternatief", intent: "competitor" },
  { q: "horeca adviesbureau amersfoort", intent: "competitor" },

  // Tafelaar-adjacent (portfolio bleed-through)
  { q: "shared dining restaurant amersfoort", intent: "portfolio-adjacent" },
  { q: "tafelaar amersfoort", intent: "portfolio-adjacent", note: "Jezza built the site" },

  // Press / authority
  { q: "angler stirling kangaroo island dry age chef", intent: "press-adjacent", note: "AU history" },
  { q: "euro-toques young chef award 2018 bougainville", intent: "press-adjacent" },
];

// --- Serper client ----------------------------------------------------------
type SerperOrganic = {
  title?: string;
  link?: string;
  snippet?: string;
  position?: number;
};

type SerperResponse = {
  organic?: SerperOrganic[];
  peopleAlsoAsk?: { question: string; snippet?: string; link?: string }[];
  relatedSearches?: { query: string }[];
  knowledgeGraph?: unknown;
  aiOverview?: { snippet?: string; sources?: { title?: string; link?: string }[] };
  error?: string;
};

async function serperSearch(q: string): Promise<SerperResponse> {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": SERPER!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q, gl: "nl", hl: "nl", num: 20 }),
  });
  if (!res.ok) {
    return { error: `HTTP ${res.status}: ${await res.text()}` };
  }
  return (await res.json()) as SerperResponse;
}

async function serperPlaces(q: string): Promise<unknown> {
  const res = await fetch("https://google.serper.dev/places", {
    method: "POST",
    headers: {
      "X-API-KEY": SERPER!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q, gl: "nl", hl: "nl" }),
  });
  if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
  return await res.json();
}

// --- PageSpeed Insights client ----------------------------------------------
//
// Uses the free Lighthouse-based PageSpeed Insights API (v5). Returns Core
// Web Vitals (LCP, INP, CLS), Lighthouse category scores (Performance, SEO,
// Accessibility, Best Practices) and field data from CrUX where available.
// Running both mobile + desktop per URL because Google's indexing is
// mobile-first but desktop is still what most business users browse on.

type CwvMetric = {
  numericValue?: number;
  score?: number | null;
  displayValue?: string;
};

type LighthouseCategory = {
  score?: number | null;
  title?: string;
};

type PageSpeedResponse = {
  id?: string;
  lighthouseResult?: {
    finalUrl?: string;
    categories?: {
      performance?: LighthouseCategory;
      seo?: LighthouseCategory;
      accessibility?: LighthouseCategory;
      "best-practices"?: LighthouseCategory;
    };
    audits?: {
      "largest-contentful-paint"?: CwvMetric;
      "cumulative-layout-shift"?: CwvMetric;
      "total-blocking-time"?: CwvMetric; // proxy for INP in lab data
      "interactive"?: CwvMetric;
      "first-contentful-paint"?: CwvMetric;
      "speed-index"?: CwvMetric;
    };
  };
  loadingExperience?: {
    metrics?: {
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile?: number; category?: string };
      INTERACTION_TO_NEXT_PAINT?: { percentile?: number; category?: string };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile?: number; category?: string };
      FIRST_CONTENTFUL_PAINT_MS?: { percentile?: number; category?: string };
    };
    overall_category?: string;
  };
  error?: { message?: string };
};

type PageSpeedResult = {
  url: string;
  strategy: "mobile" | "desktop";
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  // Lab data (Lighthouse synthetic)
  lcpMs: number | null;
  cls: number | null;
  tbtMs: number | null;
  // Field data (CrUX real user metrics)
  field: {
    overall: string | null;
    lcpMs: number | null;
    lcpCategory: string | null;
    inpMs: number | null;
    inpCategory: string | null;
    cls: number | null;
    clsCategory: string | null;
  };
  error?: string;
};

async function pageSpeedRun(
  url: string,
  strategy: "mobile" | "desktop",
): Promise<PageSpeedResult> {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", strategy);
  api.searchParams.set("locale", "nl");
  api.searchParams.set("key", PAGESPEED!);
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) {
    api.searchParams.append("category", c);
  }

  const res = await fetch(api.toString());
  if (!res.ok) {
    return {
      url,
      strategy,
      performance: null,
      seo: null,
      accessibility: null,
      bestPractices: null,
      lcpMs: null,
      cls: null,
      tbtMs: null,
      field: {
        overall: null,
        lcpMs: null,
        lcpCategory: null,
        inpMs: null,
        inpCategory: null,
        cls: null,
        clsCategory: null,
      },
      error: `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`,
    };
  }

  const data = (await res.json()) as PageSpeedResponse;
  const lh = data.lighthouseResult;
  const cats = lh?.categories;
  const audits = lh?.audits;
  const fe = data.loadingExperience?.metrics;

  return {
    url,
    strategy,
    performance: cats?.performance?.score ?? null,
    seo: cats?.seo?.score ?? null,
    accessibility: cats?.accessibility?.score ?? null,
    bestPractices: cats?.["best-practices"]?.score ?? null,
    lcpMs: audits?.["largest-contentful-paint"]?.numericValue ?? null,
    cls: audits?.["cumulative-layout-shift"]?.numericValue ?? null,
    tbtMs: audits?.["total-blocking-time"]?.numericValue ?? null,
    field: {
      overall: data.loadingExperience?.overall_category ?? null,
      lcpMs: fe?.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
      lcpCategory: fe?.LARGEST_CONTENTFUL_PAINT_MS?.category ?? null,
      inpMs: fe?.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
      inpCategory: fe?.INTERACTION_TO_NEXT_PAINT?.category ?? null,
      cls: fe?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ?? null,
      clsCategory: fe?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category ?? null,
    },
  };
}

// --- Scoring ----------------------------------------------------------------
type QueryResult = {
  q: string;
  intent: string;
  note?: string;
  position: number | null; // null = not in top 20
  aiOverviewCited: boolean;
  aiOverviewPresent: boolean;
  peopleAlsoAskMatched: number;
  topCompetitors: string[]; // top 3 domains that outrank us
};

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function scoreQuery(q: string, intent: string, note: string | undefined, r: SerperResponse): QueryResult {
  const organic = r.organic ?? [];
  const ourMatch = organic.find((o) => o.link && extractDomain(o.link) === TARGET_DOMAIN);
  const aiOv = r.aiOverview;
  const aiSources = aiOv?.sources ?? [];
  const aiCited = aiSources.some((s) => s.link && extractDomain(s.link) === TARGET_DOMAIN);

  const paa = r.peopleAlsoAsk ?? [];
  const paaMatched = paa.filter((p) =>
    (p.snippet ?? "").toLowerCase().includes(TARGET_DOMAIN),
  ).length;

  const topCompetitors = organic
    .filter((o) => o.link && extractDomain(o.link) !== TARGET_DOMAIN)
    .slice(0, 3)
    .map((o) => extractDomain(o.link!));

  return {
    q,
    intent,
    note,
    position: ourMatch?.position ?? null,
    aiOverviewCited: aiCited,
    aiOverviewPresent: !!aiOv,
    peopleAlsoAskMatched: paaMatched,
    topCompetitors,
  };
}

// --- Main -------------------------------------------------------------------
async function main() {
  const started = new Date();
  console.log(`\nSEO baseline started: ${started.toISOString()}`);
  console.log(`Target domain: ${TARGET_DOMAIN}`);
  console.log(`Running ${QUERIES.length} queries + 3 places lookups...\n`);

  const results: QueryResult[] = [];
  for (const { q, intent, note } of QUERIES) {
    process.stdout.write(`  ${q.padEnd(55)} `);
    const r = await serperSearch(q);
    if (r.error) {
      console.log(`ERROR: ${r.error}`);
      results.push({ q, intent, note, position: null, aiOverviewCited: false, aiOverviewPresent: false, peopleAlsoAskMatched: 0, topCompetitors: [] });
      continue;
    }
    const scored = scoreQuery(q, intent, note, r);
    const pos = scored.position ? `#${scored.position}` : "—";
    const ai = scored.aiOverviewCited ? "[AI✓]" : scored.aiOverviewPresent ? "[AI—]" : "    ";
    console.log(`${pos.padStart(4)} ${ai}`);
    results.push(scored);
    await new Promise((r) => setTimeout(r, 200));
  }

  // Places lookups — do we appear in local pack?
  console.log("\nLocal pack (Places):");
  const placesQueries = [
    "horeca consultant amersfoort",
    "restaurant consultant amersfoort",
    "catering amersfoort",
  ];
  const places: Record<string, unknown> = {};
  for (const q of placesQueries) {
    const r = await serperPlaces(q);
    places[q] = r;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = Array.isArray((r as any)?.places) ? (r as any).places.length : 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jezza = Array.isArray((r as any)?.places)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r as any).places.find((p: any) => (p.title ?? "").toLowerCase().includes("jezza"))
      : null;
    console.log(`  ${q.padEnd(55)} ${count} places, jezza: ${jezza ? "YES" : "no"}`);
  }

  // PageSpeed Insights — Core Web Vitals + Lighthouse scoring per key URL.
  // Optional: only runs if PAGESPEED_API_KEY is set. Mobile + desktop per URL.
  const pagespeed: PageSpeedResult[] = [];
  if (PAGESPEED) {
    console.log("\nPageSpeed Insights (mobile + desktop):");
    for (const path of PAGESPEED_URLS) {
      const fullUrl = `${TARGET_URL}${path}`;
      for (const strategy of ["mobile", "desktop"] as const) {
        process.stdout.write(`  ${strategy.padEnd(8)} ${path.padEnd(28)} `);
        const r = await pageSpeedRun(fullUrl, strategy);
        pagespeed.push(r);
        if (r.error) {
          console.log(`ERROR: ${r.error.slice(0, 60)}`);
        } else {
          const perf = r.performance !== null ? Math.round(r.performance * 100) : "—";
          const seo = r.seo !== null ? Math.round(r.seo * 100) : "—";
          const lcp = r.lcpMs ? `${Math.round(r.lcpMs)}ms` : "—";
          const cls = r.cls !== null ? r.cls.toFixed(3) : "—";
          console.log(`Perf ${String(perf).padStart(3)} · SEO ${String(seo).padStart(3)} · LCP ${lcp.padStart(7)} · CLS ${cls}`);
        }
        // Rate-limit: PSI free tier allows 25k/day but 240/minute
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  } else {
    console.log("\nPageSpeed: skipped (PAGESPEED_API_KEY not set in .env.local)");
  }

  // --- Aggregate ---
  const totalQueries = results.length;
  const ranked = results.filter((r) => r.position !== null);
  const topTen = results.filter((r) => r.position !== null && r.position <= 10);
  const topThree = results.filter((r) => r.position !== null && r.position <= 3);
  const aioCited = results.filter((r) => r.aiOverviewCited);
  const aioPresent = results.filter((r) => r.aiOverviewPresent);

  // PageSpeed averages across URLs (mobile + desktop split)
  const mobile = pagespeed.filter((p) => p.strategy === "mobile" && !p.error);
  const desktop = pagespeed.filter((p) => p.strategy === "desktop" && !p.error);
  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;
  const pct = (n: number | null) => (n === null ? null : Math.round(n * 100));

  const pageSpeedSummary = {
    urlsTested: PAGESPEED_URLS.length,
    runsTotal: pagespeed.length,
    runsOk: pagespeed.filter((p) => !p.error).length,
    mobile: {
      performance: pct(
        avg(mobile.map((p) => p.performance).filter((x): x is number => x !== null)),
      ),
      seo: pct(avg(mobile.map((p) => p.seo).filter((x): x is number => x !== null))),
      accessibility: pct(
        avg(mobile.map((p) => p.accessibility).filter((x): x is number => x !== null)),
      ),
      bestPractices: pct(
        avg(mobile.map((p) => p.bestPractices).filter((x): x is number => x !== null)),
      ),
      lcpMs: Math.round(
        avg(mobile.map((p) => p.lcpMs).filter((x): x is number => x !== null)) ?? 0,
      ),
      cls:
        avg(mobile.map((p) => p.cls).filter((x): x is number => x !== null)) ?? null,
      tbtMs: Math.round(
        avg(mobile.map((p) => p.tbtMs).filter((x): x is number => x !== null)) ?? 0,
      ),
    },
    desktop: {
      performance: pct(
        avg(
          desktop.map((p) => p.performance).filter((x): x is number => x !== null),
        ),
      ),
      seo: pct(avg(desktop.map((p) => p.seo).filter((x): x is number => x !== null))),
      accessibility: pct(
        avg(
          desktop.map((p) => p.accessibility).filter((x): x is number => x !== null),
        ),
      ),
      bestPractices: pct(
        avg(
          desktop.map((p) => p.bestPractices).filter((x): x is number => x !== null),
        ),
      ),
      lcpMs: Math.round(
        avg(desktop.map((p) => p.lcpMs).filter((x): x is number => x !== null)) ?? 0,
      ),
      cls:
        avg(desktop.map((p) => p.cls).filter((x): x is number => x !== null)) ?? null,
      tbtMs: Math.round(
        avg(desktop.map((p) => p.tbtMs).filter((x): x is number => x !== null)) ?? 0,
      ),
    },
  };

  const summary = {
    totalQueries,
    rankedCount: ranked.length,
    top10Count: topTen.length,
    top3Count: topThree.length,
    aioPresentCount: aioPresent.length,
    aioCitedCount: aioCited.length,
    rankedPct: Math.round((ranked.length / totalQueries) * 100),
    top10Pct: Math.round((topTen.length / totalQueries) * 100),
    aioCitedPct: aioPresent.length
      ? Math.round((aioCited.length / aioPresent.length) * 100)
      : 0,
    pagespeed: pageSpeedSummary,
  };

  const date = started.toISOString().slice(0, 10);
  const outPath = join(process.cwd(), "docs", `seo-baseline-${date}.json`);
  const payload = {
    runAt: started.toISOString(),
    domain: TARGET_DOMAIN,
    source: "serper.dev + pagespeed",
    summary,
    results,
    places,
    pagespeed,
  };
  writeFileSync(outPath, JSON.stringify(payload, null, 2));

  console.log("\n=== BASELINE SUMMARY ===");
  console.log(`Queries tested: ${totalQueries}`);
  console.log(`Ranked in top 20: ${ranked.length}/${totalQueries} (${summary.rankedPct}%)`);
  console.log(`Ranked in top 10: ${topTen.length}/${totalQueries} (${summary.top10Pct}%)`);
  console.log(`Ranked in top 3:  ${topThree.length}/${totalQueries}`);
  console.log(`AI Overview present: ${aioPresent.length}/${totalQueries}`);
  console.log(
    `AI Overview cited us: ${aioCited.length}/${aioPresent.length} (${summary.aioCitedPct}% of AIOs)`,
  );
  if (PAGESPEED && pagespeed.length > 0) {
    console.log("\n=== PAGESPEED SUMMARY (averages across key URLs) ===");
    const m = pageSpeedSummary.mobile;
    const d = pageSpeedSummary.desktop;
    console.log(
      `Mobile  — Perf ${m.performance ?? "—"} · SEO ${m.seo ?? "—"} · A11y ${m.accessibility ?? "—"} · BP ${m.bestPractices ?? "—"} · LCP ${m.lcpMs}ms · CLS ${m.cls?.toFixed(3) ?? "—"} · TBT ${m.tbtMs}ms`,
    );
    console.log(
      `Desktop — Perf ${d.performance ?? "—"} · SEO ${d.seo ?? "—"} · A11y ${d.accessibility ?? "—"} · BP ${d.bestPractices ?? "—"} · LCP ${d.lcpMs}ms · CLS ${d.cls?.toFixed(3) ?? "—"} · TBT ${d.tbtMs}ms`,
    );
  }
  console.log(`\nWrote ${outPath}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
