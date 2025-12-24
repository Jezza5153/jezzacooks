// src/app/api/diagnosis/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type DiagnosisPayload = {
  name: string;
  businessName: string;
  city: string;
  email: string;
  website?: string;
  instagram?: string;

  stage?: string;
  biggestPain?: string;
  urgency?: string;
  revenue?: string;
  foodCost?: string;
  laborCost?: string;
  onlineBookings?: string;
  systems?: string;
  nextStep?: string;

  primeCostApprox?: number | string;
  signals?: string[];

  snapshot?: { steps?: string[]; tag?: string };
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function safeText(v: unknown, max = 500) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function escapeHtml(v: unknown) {
  return safeText(v, 5000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: unknown) {
  const val = safeText(value, 2000) || "-";
  return `
    <tr>
      <td style="padding:10px;border:1px solid #1f2937;width:220px;background:#0b1220;color:#e5e7eb;"><b>${escapeHtml(
        label
      )}</b></td>
      <td style="padding:10px;border:1px solid #1f2937;background:#0f172a;color:#e5e7eb;">${escapeHtml(
        val
      )}</td>
    </tr>
  `;
}

// light in-memory rate limit (per server instance)
const hits = new Map<string, { count: number; ts: number }>();
function isRateLimited(ip: string, limit = 12, windowMs = 60_000) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  h.count += 1;
  hits.set(ip, h);
  return h.count > limit;
}

function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    let body: DiagnosisPayload;
    try {
      body = (await req.json()) as DiagnosisPayload;
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    // required (sanitized)
    const name = safeText(body?.name, 120);
    const businessName = safeText(body?.businessName, 160);
    const city = safeText(body?.city, 120);
    const email = safeText(body?.email, 180).toLowerCase();

    if (!name || !businessName || !city || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    /**
     * ENV you want to support:
     * TO_EMAIL=info@jezzacooks.com
     * FROM_EMAIL=info@jezzacooks.com
     * SMTP_HOST=smtp.gmail.com
     * SMTP_PORT=587
     * SMTP_USER=info@jezzacooks.com
     * SMTP_PASS=<GOOGLE APP PASSWORD>
     */
    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    const TO_EMAIL = process.env.TO_EMAIL || "info@jezzacooks.com";
    const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || "info@jezzacooks.com";

    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email not configured. Set SMTP_USER and SMTP_PASS (Google App Password).",
        },
        { status: 500 }
      );
    }

    // Gmail: 587 = STARTTLS (secure must be false)
    // Gmail: 465 = SMTPS (secure true)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      // Force STARTTLS on 587
      ...(SMTP_PORT === 587
        ? {
            requireTLS: true,
            tls: {
              servername: SMTP_HOST,
              rejectUnauthorized: true,
            },
          }
        : {}),
    });

    // Optional debug (uncomment briefly if you need)
    // await transporter.verify();

    const subject = `Free Diagnosis — ${businessName} (${city})`;

    const signals = Array.isArray(body.signals) ? body.signals.slice(0, 3) : [];
    const snapshotSteps = Array.isArray(body.snapshot?.steps)
      ? body.snapshot!.steps!.slice(0, 10)
      : [];

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5;background:#0b1220;padding:20px;color:#e5e7eb;">
        <div style="max-width:760px;margin:0 auto;border:1px solid #1f2937;border-radius:14px;overflow:hidden;">
          <div style="padding:18px 20px;background:#0f172a;border-bottom:1px solid #1f2937;">
            <h2 style="margin:0;font-size:18px;">Free Diagnosis (Multiple choice)</h2>
            <p style="margin:6px 0 0;color:#9ca3af;">Reply to: <b style="color:#e5e7eb;">${escapeHtml(
              email
            )}</b></p>
          </div>

          <div style="padding:18px 20px;">
            <h3 style="margin:0 0 10px;font-size:16px;">Basics</h3>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Name", name)}
              ${row("Business", businessName)}
              ${row("City", city)}
              ${row("Email", email)}
              ${row("Website", body.website)}
              ${row("Instagram", body.instagram)}
            </table>

            <h3 style="margin:18px 0 10px;font-size:16px;">Diagnosis picks</h3>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Stage", body.stage)}
              ${row("Biggest pain", body.biggestPain)}
              ${row("Urgency", body.urgency)}
              ${row("Revenue", body.revenue)}
              ${row("Food cost", body.foodCost)}
              ${row("Labor cost", body.laborCost)}
              ${row(
                "Prime cost approx",
                body.primeCostApprox !== undefined &&
                  body.primeCostApprox !== null &&
                  String(body.primeCostApprox).trim() !== ""
                  ? `${body.primeCostApprox}%`
                  : "-"
              )}
              ${row("Online bookings", body.onlineBookings)}
              ${row("Systems", body.systems)}
              ${row("Signals (max 3)", signals.length ? signals.join(", ") : "-")}
              ${row("Preferred next step", body.nextStep)}
            </table>

            <h3 style="margin:18px 0 10px;font-size:16px;">Auto snapshot shown on site</h3>
            <div style="padding:12px;border:1px solid #1f2937;background:#0f172a;border-radius:12px;white-space:pre-wrap;color:#e5e7eb;">
${escapeHtml(snapshotSteps.length ? snapshotSteps.map((s) => `- ${s}`).join("\n") : "-")}
            </div>

            <p style="margin:16px 0 0;color:#6b7280;font-size:12px;">
              Sent from jezzacooks.com — Free Diagnosis.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL, // info@jezzacooks.com
      to: TO_EMAIL, // info@jezzacooks.com
      replyTo: email, // reply straight to the lead
      subject,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/diagnosis] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
