import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Static sitemap covering every live route. When new pages are added, add
// them here — Next will pick up changes at build time and the lastmod date
// will roll forward automatically.
//
// Why a hand-rolled list instead of scanning the filesystem: Next's app dir
// has dynamic routes, layout files and API handlers mixed in, so a filesystem
// scan would need non-trivial filtering. A short explicit list is both
// clearer and gives us fine-grained control over priority and changeFrequency.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/consulting", changeFrequency: "monthly", priority: 0.95 },
    { path: "/services/catering", changeFrequency: "monthly", priority: 0.95 },
    // Service-line catering landings — Tier 5H attackable-query targets.
    // /kantoorlunch-amersfoort rides the tafelaaramersfoort.nl #1 ranking
    // for the head term via partner-restaurant cross-link.
    { path: "/services/catering/kantoorlunch-amersfoort", changeFrequency: "monthly", priority: 0.95 },
    // Neighborhood / bedrijventerrein catering landing pages — no competitor
    // in the SERP has these yet, so they're a greenfield long-tail play.
    { path: "/catering-amersfoort/de-hoef", changeFrequency: "monthly", priority: 0.85 },
    { path: "/catering-amersfoort/vathorst", changeFrequency: "monthly", priority: 0.85 },
    { path: "/catering-amersfoort/de-wieken", changeFrequency: "monthly", priority: 0.85 },
    { path: "/catering-amersfoort/de-brand", changeFrequency: "monthly", priority: 0.85 },
    { path: "/catering-amersfoort/centrum", changeFrequency: "monthly", priority: 0.85 },
    // Pillar article — AI citation magnet for "wat kost catering amersfoort".
    { path: "/catering-amersfoort/prijzen", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/websites", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/seo-geo", changeFrequency: "monthly", priority: 0.95 },
    { path: "/menu-engineering", changeFrequency: "monthly", priority: 0.9 },
    { path: "/food-cost-controle", changeFrequency: "monthly", priority: 0.95 },
    { path: "/portfolio", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/results", changeFrequency: "monthly", priority: 0.7 },
    { path: "/free-diagnosis", changeFrequency: "monthly", priority: 0.85 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
