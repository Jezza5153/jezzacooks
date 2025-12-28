import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  submittedAtIso: string;

  reasonNow: string;
  outcome90: string;
  successMetric: string;

  revenueFocus: string[];
  avgSpendBand?: string;
  primaryAction: string;
  leaks: string[];
  biggestDoubt?: string;

  businessType?: string;
  location?: string;
  websiteUrl?: string;
  timeline: string;
  assetsReady?: string;
  budgetBand?: string;

  name: string;
  email: string;
  phone?: string;

  consent: boolean;
  honey?: string;
};

function needEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  const safe = value?.trim() ? escapeHtml(value.trim()) : "<em>Niet aangeleverd</em>";
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #2a2a2a;color:#c9c9c9;white-space:nowrap;"><strong>${escapeHtml(
        label
      )}</strong></td>
      <td style="padding:10px 12px;border:1px solid #2a2a2a;color:#f1f1f1;">${safe}</td>
    </tr>
  `;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Honeypot spam: doe alsof het gelukt is
    if (body.honey && body.honey.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!body.consent) {
      return NextResponse.json({ ok: false, error: "Toestemming ontbreekt." }, { status: 400 });
    }

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json({ ok: false, error: "Naam en e-mail zijn verplicht." }, { status: 400 });
    }

    if (!body.reasonNow || !body.outcome90 || !body.successMetric?.trim()) {
      return NextResponse.json({ ok: false, error: "Stap 1 is niet compleet." }, { status: 400 });
    }

    if (!body.revenueFocus?.length || !body.primaryAction || !body.leaks?.length || !body.timeline) {
      return NextResponse.json({ ok: false, error: "Stap 2 is niet compleet." }, { status: 400 });
    }

    const to = needEnv("TO_EMAIL");
    const from = needEnv("FROM_EMAIL");

    const host = needEnv("SMTP_HOST");
    const port = Number(needEnv("SMTP_PORT"));
    const user = needEnv("SMTP_USER");
    const pass = needEnv("SMTP_PASS").replaceAll(" ", ""); // Gmail app password vaak met spaties gekopieerd

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // 587 = STARTTLS
      auth: { user, pass },
      requireTLS: true,
    });

    const submittedAt = body.submittedAtIso ? new Date(body.submittedAtIso) : new Date();
    const submittedAtText = isNaN(submittedAt.getTime()) ? new Date().toISOString() : submittedAt.toISOString();

    const subjectParts = [
      "Quick Scan aanvraag",
      body.location?.trim() ? body.location.trim() : "",
      body.websiteUrl?.trim() ? "met site" : "",
    ].filter(Boolean);

    const subject = subjectParts.join(" | ");

    const revenueText = (body.revenueFocus || []).join(", ") || "Niet aangeleverd";
    const leaksText = (body.leaks || []).join(", ") || "Niet aangeleverd";

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.4;">
        <h2 style="margin:0 0 10px;color:#f6f6f6;">Quick Scan aanvraag</h2>
        <p style="margin:0 0 14px;color:#c9c9c9;">
          Inzending: <strong style="color:#f6f6f6;">${escapeHtml(submittedAtText)}</strong>
        </p>

        <h3 style="margin:18px 0 8px;color:#f6f6f6;">Contact</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:860px;background:#0f0f0f;border:1px solid #2a2a2a;">
          ${row("Naam", body.name)}
          ${row("E-mail", body.email)}
          ${row("Telefoon", body.phone || "")}
        </table>

        <h3 style="margin:18px 0 8px;color:#f6f6f6;">First principles input</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:860px;background:#0f0f0f;border:1px solid #2a2a2a;">
          ${row("Waarom nu", body.reasonNow)}
          ${row("90 dagen uitkomst", body.outcome90)}
          ${row("Succes metric", body.successMetric)}
          ${row("Waar verdienen ze aan", revenueText)}
          ${row("Gem. besteding", body.avgSpendBand || "")}
          ${row("Primaire actie (CTA)", body.primaryAction)}
          ${row("Waar lekt het", leaksText)}
          ${row("Grootste twijfel", body.biggestDoubt || "")}
        </table>

        <h3 style="margin:18px 0 8px;color:#f6f6f6;">Context</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:860px;background:#0f0f0f;border:1px solid #2a2a2a;">
          ${row("Type zaak", body.businessType || "")}
          ${row("Regio", body.location || "")}
          ${row("Website URL", body.websiteUrl || "")}
          ${row("Live timing", body.timeline)}
          ${row("Assets", body.assetsReady || "")}
          ${row("Budget band", body.budgetBand || "")}
        </table>

        <h3 style="margin:18px 0 8px;color:#f6f6f6;">Kopieerblok voor Diagnose-GPT</h3>
        <pre style="white-space:pre-wrap;background:#0b0b0b;border:1px solid #2a2a2a;padding:12px;border-radius:12px;color:#e9e9e9;max-width:860px;">
SUBMITTED_AT: ${submittedAtText}
NAME: ${body.name}
EMAIL: ${body.email}
PHONE: ${body.phone || "Niet aangeleverd"}
BUSINESS_TYPE: ${body.businessType || "Niet aangeleverd"}
LOCATION: ${body.location || "Niet aangeleverd"}
WEBSITE_URL: ${body.websiteUrl || "Niet aangeleverd"}

WHY_NOW: ${body.reasonNow}
OUTCOME_90: ${body.outcome90}
SUCCESS_METRIC: ${body.successMetric}

REVENUE_FOCUS: ${revenueText}
AVG_SPEND: ${body.avgSpendBand || "Niet aangeleverd"}
PRIMARY_ACTION: ${body.primaryAction}
LEAKS: ${leaksText}
BIGGEST_DOUBT: ${body.biggestDoubt || "Niet aangeleverd"}

TIMELINE: ${body.timeline}
ASSETS_READY: ${body.assetsReady || "Niet aangeleverd"}
BUDGET_BAND: ${body.budgetBand || "Niet aangeleverd"}
        </pre>
      </div>
    `;

    const text = [
      `Quick Scan aanvraag`,
      `Inzending: ${submittedAtText}`,
      ``,
      `CONTACT`,
      `Naam: ${body.name}`,
      `E-mail: ${body.email}`,
      `Telefoon: ${body.phone || "Niet aangeleverd"}`,
      ``,
      `FIRST PRINCIPLES`,
      `Waarom nu: ${body.reasonNow}`,
      `90 dagen uitkomst: ${body.outcome90}`,
      `Succes metric: ${body.successMetric}`,
      `Revenue focus: ${revenueText}`,
      `Gem. besteding: ${body.avgSpendBand || "Niet aangeleverd"}`,
      `Primaire actie: ${body.primaryAction}`,
      `Leaks: ${leaksText}`,
      `Grootste twijfel: ${body.biggestDoubt || "Niet aangeleverd"}`,
      ``,
      `CONTEXT`,
      `Type zaak: ${body.businessType || "Niet aangeleverd"}`,
      `Regio: ${body.location || "Niet aangeleverd"}`,
      `Website: ${body.websiteUrl || "Niet aangeleverd"}`,
      `Timing: ${body.timeline}`,
      `Assets: ${body.assetsReady || "Niet aangeleverd"}`,
      `Budget: ${body.budgetBand || "Niet aangeleverd"}`,
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      replyTo: body.email, // zodat jij direct op de klant kan replyen
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
