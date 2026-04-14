import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Robots policy. Currently open to everything — this is a small marketing site
// and we want crawlers, AI agents and preview bots to index everything except
// API routes and Next's internal paths.
//
// If you ever need to block a specific AI crawler (GPTBot, ClaudeBot,
// PerplexityBot, etc.) you can add targeted rules here. Note that blocking
// AI crawlers also blocks citation visibility in those answer engines, which
// is the opposite of what we want for GEO.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
