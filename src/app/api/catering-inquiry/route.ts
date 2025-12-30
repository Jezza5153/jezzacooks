// src/app/api/catering-inquiry/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

export const runtime = "nodejs";

const schema = z.object({
  type: z.string().min(2),
  date: z.string().min(4),
  time: z.string().optional(),
  location: z.string().min(2),
  people: z.string().min(1),
  dietary: z.string().optional(),
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  honeypot: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    // simple bot trap: if filled, pretend success
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const TO_EMAIL = process.env.TO_EMAIL;
    const FROM_EMAIL = process.env.FROM_EMAIL;

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS; // you must add this

    if (!TO_EMAIL || !FROM_EMAIL) throw new Error("Missing TO_EMAIL/FROM_EMAIL");
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      throw new Error("Missing SMTP env vars (need SMTP_PASS too)");
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `Catering aanvraag: ${data.type} (${data.date})`;

    const text = [
      "Nieuwe catering aanvraag",
      "",
      `Type: ${data.type}`,
      `Datum: ${data.date}`,
      data.time ? `Tijd: ${data.time}` : "Tijd: (niet ingevuld)",
      `Locatie: ${data.location}`,
      `Aantal personen: ${data.people}`,
      data.dietary ? `Dieetwensen: ${data.dietary}` : "Dieetwensen: (geen)",
      "",
      `Naam: ${data.name}`,
      data.company ? `Bedrijf: ${data.company}` : "Bedrijf: (geen)",
      `Email: ${data.email}`,
      data.phone ? `Telefoon: ${data.phone}` : "Telefoon: (geen)",
      data.notes ? `Opmerking: ${data.notes}` : "Opmerking: (geen)",
      "",
      data.source ? `Bron: ${data.source}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
