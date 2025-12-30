// src/components/catering-inquiry-form.tsx
"use client";

import * as React from "react";
import Link from "next/link";

type Props = {
  phone?: string;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function CateringInquiryForm({ phone, className }: Props) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      type: String(fd.get("type") || ""),
      date: String(fd.get("date") || ""),
      time: String(fd.get("time") || ""),
      location: String(fd.get("location") || ""),
      people: String(fd.get("people") || ""),
      dietary: String(fd.get("dietary") || ""),
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      notes: String(fd.get("notes") || ""),
      honeypot: String(fd.get("website") || ""), // anti-spam
      source: "services/catering",
    };

    try {
      const res = await fetch("/api/catering-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setMessage("Gelukt. We hebben je aanvraag binnen. Je krijgt snel reactie per mail.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "Er ging iets mis met versturen. Probeer opnieuw of gebruik de contactpagina."
      );
    }
  }

  return (
    <div className={className}>
      <div className="rounded-3xl border border-[#D8C6AE]/55 bg-[#F3EDE3] text-[#0B0F14] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="p-7 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8C6AE]/70 bg-white/60 px-3 py-1 text-xs font-semibold text-[#0B0F14]/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C65A2E]" aria-hidden="true" />
                Binnen 1 minuut
              </div>

              <h3 className="mt-3 font-headline text-2xl md:text-3xl font-bold">
                Offerte aanvragen
              </h3>

              <p className="mt-2 text-sm md:text-base text-[#0B0F14]/75 max-w-xl">
                Datum, locatie en aantal personen. Dan sturen we een voorstel dat klopt.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-[#D8C6AE]/70 bg-white/50 px-4 py-2 text-sm font-semibold text-[#0B0F14]/80 hover:bg-white/70"
              >
                Contact
              </Link>

              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#D8C6AE]/70 bg-white/50 px-4 py-2 text-sm font-semibold text-[#0B0F14]/80 hover:bg-white/70"
                >
                  Bel
                </a>
              ) : null}
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-12">
            {/* honeypot (hidden) */}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="md:col-span-4">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Type</label>
              <select
                name="type"
                required
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
                defaultValue="Kantoorlunch"
              >
                <option>Kantoorlunch</option>
                <option>Diner of event</option>
                <option>Allebei</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Datum</label>
              <input
                name="date"
                type="date"
                required
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-4">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Tijd (optioneel)</label>
              <input
                name="time"
                type="time"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-6">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Locatie (plaats)</label>
              <input
                name="location"
                type="text"
                required
                placeholder="Bijv. Amersfoort"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-6">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Aantal personen</label>
              <input
                name="people"
                type="number"
                min={1}
                required
                placeholder="Bijv. 25"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-12">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Dieetwensen (optioneel)</label>
              <input
                name="dietary"
                type="text"
                placeholder="Bijv. 3x vega, 1x glutenvrij, notenallergie"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-4">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Naam</label>
              <input
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-4">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Bedrijf (optioneel)</label>
              <input
                name="company"
                type="text"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-4">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Email</label>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-6">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Telefoon (optioneel)</label>
              <input
                name="phone"
                type="tel"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-6">
              <label className="text-sm font-semibold text-[#0B0F14]/80">Opmerking (optioneel)</label>
              <input
                name="notes"
                type="text"
                placeholder="Bijv. levering rond 12:00, 2 vergaderruimtes"
                className="mt-2 w-full rounded-2xl border border-[#D8C6AE]/70 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F5B841]/40"
              />
            </div>

            <div className="md:col-span-12 mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-2xl bg-[#F5B841] px-5 py-3 text-sm font-semibold text-[#0B0F14] shadow-[0_14px_40px_rgba(245,184,65,0.18)] hover:opacity-95 disabled:opacity-60"
              >
                {status === "submitting" ? "Versturen..." : "Verstuur aanvraag"}
              </button>

              <Link
                href="/contact"
                className="text-sm font-semibold text-[#0B0F14]/75 underline decoration-[#C65A2E] decoration-2 underline-offset-4 hover:opacity-90"
              >
                Liever via contact
              </Link>
            </div>

            {message ? (
              <div
                className={[
                  "md:col-span-12 rounded-2xl border px-4 py-3 text-sm",
                  status === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : status === "error"
                    ? "border-amber-200 bg-amber-50 text-amber-950"
                    : "border-[#D8C6AE]/60 bg-white/60 text-[#0B0F14]/80",
                ].join(" ")}
              >
                {message}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
