import type { NextConfig } from "next";

// Security headers applied to every response.
//
// These are the modern baseline (2026) for a small business site that doesn't
// need a strict CSP. We don't set `Content-Security-Policy` here because:
//   - Next.js inline scripts and styles require "unsafe-inline" which weakens
//     CSP anyway, and
//   - We're not running user-generated content or third-party embeds that
//     justify the maintenance cost of a strict CSP policy.
// If/when we add payment forms or auth, tighten this.
//
// Headers affect:
//   - Mozilla Observatory score (used by some audit tools)
//   - securityheaders.com (used by some GEO/SEO audits)
//   - Browser behavior for mixed content, framing, referrer leakage, etc.
const securityHeaders = [
  {
    // Always use HTTPS for this domain + subdomains for the next year.
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    // Refuse to be framed by other sites — prevents clickjacking.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Disable MIME sniffing so browsers don't guess content types.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Don't leak full URLs as referrer to third-party domains. Origin only.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Deny access to browser features we don't use. Explicit opt-out of
    // sensitive APIs is a Mozilla Observatory + securityheaders.com bonus.
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=()",
  },
  {
    // Opt-out of FLoC / Topics API explicitly (still respected by some audits
    // even after Google deprecated FLoC).
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Prefer AVIF (better compression than webp) then fall back to webp.
    // Next.js will transcode source JPEG/PNG through the sharp pipeline
    // and serve whichever format the client advertises in Accept.
    formats: ["image/avif", "image/webp"],
    // Match the viewport widths we care about. The default includes 3840
    // which is wasted bandwidth for the device sizes we serve.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized variants on the CDN for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Apply security headers to every route served by Next.js. Static hosts
  // (Vercel, Netlify) respect these in production automatically.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
