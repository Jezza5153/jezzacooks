// src/app/opengraph-image.tsx
//
// Next.js automatically serves this as /opengraph-image at runtime, producing
// a proper 1200×630 image for Open Graph / Twitter / LinkedIn previews.
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
//
// This overrides the static metadata.openGraph.images fallback defined in
// layout.tsx for any page that doesn't declare its own og image.

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jezza Cooks — chef-led horeca consultancy in Amersfoort";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0F141B 0%, #161f2c 55%, #1b2a3f 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* radial glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(900px 520px at 15% 10%, rgba(255, 140, 0, 0.22), transparent 60%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #ff9b3d, #e85d04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 900,
              color: "#0F141B",
            }}
          >
            J
          </div>
          <span>JEZZA COOKS<span style={{ color: "#ff9b3d" }}>.</span></span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "auto",
            marginBottom: "40px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "920px",
              display: "flex",
            }}
          >
            Chef-led horeca consultancy in Amersfoort.
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "880px",
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Consulting · catering · restaurant websites · SEO &amp; GEO.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.65)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            zIndex: 1,
          }}
        >
          <span>Jeremy Arrascaeta</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>jezzacooks.com</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>KvK 99547619</span>
        </div>
      </div>
    ),
    size,
  );
}
