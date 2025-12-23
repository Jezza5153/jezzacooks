// app/api/diagnosis/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name: string;
  businessName: string;
  city: string;
  email: string;
  phone?: string;
  website?: string;
  instagram?: string;
  stage?: string;
  biggestPain?: string;
  revenueRange?: string;
  menuLink?: string;
  message: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  const body = (await req.json()) as Payload;

  if (!body?.name || !body?.businessName || !body?.city || !body?.email || !body?.message) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    TO_EMAIL,
    FROM_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
    return new NextResponse(
      "Email server not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL.",
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for 587/others
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject = `Free Diagnosis Request — ${body.businessName} (${body.city})`;

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height: 1.5;">
      <h2 style="margin:0 0 8px;">Free Diagnosis Request</h2>
      <p style="margin:0 0 16px; color:#555;">Reply to: <b>${escapeHtml(body.email)}</b></p>

      <table style="width:100%; border-collapse:collapse; margin: 12px 0;">
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Name</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.name)}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Business</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.businessName)}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>City</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.city)}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Phone</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.phone || "-")}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Stage</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.stage || "-")}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Biggest pain</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.biggestPain || "-")}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Revenue range</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.revenueRange || "-")}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Website</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.website || "-")}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Instagram</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.instagram || "-")}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><b>Menu link</b></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(body.menuLink || "-")}</td></tr>
      </table>

      <h3 style="margin:18px 0 8px;">Message</h3>
      <div style="padding:12px; border:1px solid #eee; background:#fafafa; white-space:pre-wrap;">${escapeHtml(body.message)}</div>

      <p style="margin:16px 0 0; color:#777; font-size:12px;">Sent from /pricing free diagnosis form.</p>
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
