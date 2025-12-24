// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function safeText(v: unknown, max = 2000) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function escapeHtml(v: unknown) {
  return safeText(v, 8000)
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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const service = safeText(body?.service, 50);
    const name = safeText(body?.name, 120);
    const email = safeText(body?.email, 180).toLowerCase();
    const city = safeText(body?.city, 120);
    const message = safeText(body?.message, 8000);

    // minimal required
    if (!service || !name || !email || !city || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      FROM_EMAIL,
      TO_EMAIL,
    } = process.env;

    const to = TO_EMAIL || "info@jezzacooks.com";

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally FROM_EMAIL, TO_EMAIL).",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `Contact — ${service} — ${name} (${city})`;

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;line-height:1.5;background:#0b1220;padding:20px;color:#e5e7eb;">
        <div style="max-width:760px;margin:0 auto;border:1px solid #1f2937;border-radius:14px;overflow:hidden;">
          <div style="padding:18px 20px;background:#0f172a;border-bottom:1px solid #1f2937;">
            <h2 style="margin:0;font-size:18px;">New contact form</h2>
            <p style="margin:6px 0 0;color:#9ca3af;">Reply to: <b style="color:#e5e7eb;">${escapeHtml(
              email
            )}</b></p>
          </div>

          <div style="padding:18px 20px;">
            <h3 style="margin:0 0 10px;font-size:16px;">Basics</h3>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Service", service)}
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("City / Region", city)}
              ${row("Phone", body?.phone)}
            </table>

            <h3 style="margin:18px 0 10px;font-size:16px;">Project details</h3>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Website", body?.website)}
              ${row("Goal", body?.goal)}
              ${row("Event date", body?.date)}
              ${row("Guests", body?.guests)}
              ${row("Budget", body?.budget)}
              ${row("Package", body?.package)}
            </table>

            <h3 style="margin:18px 0 10px;font-size:16px;">Message</h3>
            <div style="padding:12px;border:1px solid #1f2937;background:#0f172a;border-radius:12px;white-space:pre-wrap;">
${escapeHtml(message)}
            </div>

            <p style="margin:16px 0 0;color:#6b7280;font-size:12px;">Sent from jezzacooks.com</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
