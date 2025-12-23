// components/free-diagnosis-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type FormState = {
  name: string;
  businessName: string;
  city: string;
  email: string;
  phone: string;
  website: string;
  instagram: string;
  stage: "starting" | "open" | "struggling" | "scaling";
  biggestPain: "margins" | "chaos" | "bookings" | "team" | "menu" | "other";
  revenueRange: "unknown" | "<10k" | "10-25k" | "25-50k" | "50-100k" | "100k+";
  menuLink: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  businessName: "",
  city: "",
  email: "",
  phone: "",
  website: "",
  instagram: "",
  stage: "open",
  biggestPain: "margins",
  revenueRange: "unknown",
  menuLink: "",
  message: "",
};

export default function FreeDiagnosisForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send");
      }

      setStatus("sent");
      setForm(initialState);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong.");
    }
  }

  return (
    <div className="rounded-lg border border-border bg-background/40 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Free Diagnosis Form</p>
          <h3 className="font-headline text-xl font-bold">Send me the context</h3>
        </div>
        <Badge variant="outline">~2 min</Badge>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Your name *</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.name}
              onChange={onChange("name")}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Business name *</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.businessName}
              onChange={onChange("businessName")}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">City / Region *</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.city}
              onChange={onChange("city")}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.email}
              onChange={onChange("email")}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone (optional)</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.phone}
              onChange={onChange("phone")}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Stage *</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.stage}
              onChange={onChange("stage")}
            >
              <option value="starting">Starting soon</option>
              <option value="open">Open & running</option>
              <option value="struggling">Struggling (cashflow/chaos)</option>
              <option value="scaling">Scaling (2nd location / growth)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Biggest pain *</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.biggestPain}
              onChange={onChange("biggestPain")}
            >
              <option value="margins">Margins / food cost</option>
              <option value="chaos">Chaos / operations</option>
              <option value="bookings">Bookings / marketing</option>
              <option value="team">Team / training</option>
              <option value="menu">Menu clarity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Revenue range (optional)</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.revenueRange}
              onChange={onChange("revenueRange")}
            >
              <option value="unknown">Prefer not to say</option>
              <option value="<10k">&lt; €10k / month</option>
              <option value="10-25k">€10k–€25k / month</option>
              <option value="25-50k">€25k–€50k / month</option>
              <option value="50-100k">€50k–€100k / month</option>
              <option value="100k+">€100k+ / month</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Website (optional)</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.website}
              onChange={onChange("website")}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Instagram (optional)</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.instagram}
              onChange={onChange("instagram")}
              placeholder="@handle"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Menu link / photo link (optional)</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              value={form.menuLink}
              onChange={onChange("menuLink")}
              placeholder="Google Drive / website menu link"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">What’s happening? *</label>
            <textarea
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm min-h-[110px]"
              value={form.message}
              onChange={onChange("message")}
              required
              placeholder="Example: 'Busy but no cashflow. Food cost drifting. Team inconsistent. Need a simple system + menu reset.'"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              I’ll reply within 1 business day with next steps + a link to book the free call.
            </p>
          </div>
        </div>

        {status === "error" && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {status === "sent" ? (
          <div className="rounded-md border border-border bg-card p-4">
            <p className="font-semibold">Sent ✅</p>
            <p className="text-sm text-muted-foreground mt-1">
              Got it. I’ll email you back within 1 business day.
            </p>
          </div>
        ) : (
          <Button type="submit" className="w-full font-semibold" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send diagnosis"}
          </Button>
        )}
      </form>
    </div>
  );
}
