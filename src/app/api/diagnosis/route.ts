// app/api/diagnosis/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function escapeHtml(s: any) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: any) {
  return `
    <tr>
      <td style="padding:8px;border:1px solid #eee;width:220px;"><b>${escapeHtml(label)}</b></td>
      <td style="padding:8px;border:1px solid #eee;">${escapeHtml(value || "-")}</td>
    </tr>
  `;
}

export async function POST(req: Request) {
  const body = await req.json();

  // minimum required
  if (!body?.name || !body?.businessName || !body?.city || !body?.email) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    FROM_EMAIL,
  } = process.env;

  const TO_EMAIL = process.env.TO_EMAIL || "info@jezzacooks.com";

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return new NextResponse(
      "Email not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally FROM_EMAIL, TO_EMAIL).",
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = `Free Diagnosis — ${body.businessName} (${body.city})`;

  const signals = Array.isArray(body.signals) ? body.signals.join(", ") : "-";

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height: 1.5;">
      <h2 style="margin:0 0 8px;">Free Diagnosis (Multiple choice)</h2>
      <p style="margin:0 0 16px; color:#555;">Reply to: <b>${escapeHtml(body.email)}</b></p>

      <h3 style="margin:18px 0 8px;">Basics</h3>
      <table style="width:100%; border-collapse:collapse; margin: 10px 0;">
        ${row("Name", body.name)}
        ${row("Business", body.businessName)}
        ${row("City", body.city)}
        ${row("Email", body.email)}
        ${row("Website", body.website)}
        ${row("Instagram", body.instagram)}
      </table>

      <h3 style="margin:18px 0 8px;">Diagnosis picks</h3>
      <table style="width:100%; border-collapse:collapse; margin: 10px 0;">
        ${row("Stage", body.stage)}
        ${row("Biggest pain", body.biggestPain)}
        ${row("Urgency", body.urgency)}
        ${row("Revenue", body.revenue)}
        ${row("Food cost", body.foodCost)}
        ${row("Labor cost", body.laborCost)}
        ${row("Prime cost approx", body.primeCostApprox ? `${body.primeCostApprox}%` : "-")}
        ${row("Online bookings", body.onlineBookings)}
        ${row("Systems", body.systems)}
        ${row("Signals (max 3)", signals)}
        ${row("Preferred next step", body.nextStep)}
      </table>

      <h3 style="margin:18px 0 8px;">Auto snapshot shown on site</h3>
      <div style="padding:12px; border:1px solid #eee; background:#fafafa; white-space:pre-wrap;">
${escapeHtml((body.snapshot?.steps || []).map((s: string) => `- ${s}`).join("\n") || "-")}
      </div>

      <p style="margin:16px 0 0; color:#777; font-size:12px;">
        Sent from jezzacooks.com pricing questionnaire.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL || SMTP_USER,
    to: TO_EMAIL,
    replyTo: body.email,
    subject,
    html,
  });

  return NextResponse.json({ ok: true });
}
