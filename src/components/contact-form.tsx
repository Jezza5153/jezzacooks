// src/components/contact-form.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Service = "consulting" | "catering" | "websites" | "";

const field =
  "w-full rounded-2xl border border-border bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground " +
  "focus:outline-none focus:ring-2 focus:ring-ring/40 focus:bg-card/60 transition";

const label = "text-sm font-medium text-foreground/90";
const hint = "text-xs text-muted-foreground";

export function ContactForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const serviceParam = (searchParams.get("service") || "") as Service;
  const packageParam = searchParams.get("package") || "";

  const [loading, setLoading] = useState(false);

  const [service, setService] = useState<Service>(serviceParam);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // Catering
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");

  // Consulting / Websites
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState("");

  const [message, setMessage] = useState(
    packageParam ? `Hi, I’m interested in the ${packageParam} package.` : ""
  );
  const [consent, setConsent] = useState(false);

  const showCatering = service === "catering";
  const showProject = service === "consulting" || service === "websites";

  const serviceLabel = useMemo(() => {
    if (service === "consulting") return "Restaurant Consulting";
    if (service === "catering") return "Catering / Private Chef";
    if (service === "websites") return "Hospitality Websites";
    return "";
  }, [service]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    // basic validation (server still validates too)
    if (!service || !name.trim() || !email.trim() || !city.trim() || !message.trim()) {
      toast({
        title: "Missing info",
        description: "Please fill in service, name, email, city and a short message.",
        variant: "destructive",
      });
      return;
    }
    if (!consent) {
      toast({
        title: "One more thing",
        description: "Please agree to the privacy policy so I can contact you back.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        service: serviceLabel || service,
        package: packageParam || "",
        name,
        email,
        phone,
        city,
        date,
        guests,
        budget,
        website,
        goal,
        message,
        consent,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Request failed");
      }

      toast({ title: "Sent ✅", description: "Got it — I’ll reply by email." });

      // reset
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setDate("");
      setGuests("");
      setBudget("");
      setWebsite("");
      setGoal("");
      setMessage("");
      setConsent(false);
    } catch (err: any) {
      toast({
        title: "Couldn’t send",
        description: err?.message || "Try again in a minute.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Top block */}
      <div className="rounded-3xl border border-border bg-card/30 p-6 md:p-8">
        <div className="space-y-2">
          <p className="font-headline text-xl md:text-2xl">Tell me what you’re working on</p>
          <p className={hint}>
            Short + real is perfect. I’ll reply personally — no spam, no hard sell.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className={label}>Service *</div>
            <select
              className={field}
              value={service}
              onChange={(e) => setService(e.target.value as Service)}
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              <option value="consulting">Restaurant Consulting</option>
              <option value="catering">Catering / Private Chef</option>
              <option value="websites">Hospitality Websites</option>
            </select>
            <p className={hint}>Pick the closest match.</p>
          </div>

          <div className="space-y-2">
            <div className={label}>City / Region *</div>
            <input className={field} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Amsterdam" required />
          </div>

          <div className="space-y-2">
            <div className={label}>Full name *</div>
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <div className={label}>Email *</div>
            <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className={label}>Phone (optional)</div>
            <input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+31 6 12345678" />
          </div>
        </div>
      </div>

      {/* Conditional blocks */}
      {showCatering && (
        <div className="rounded-3xl border border-border bg-card/30 p-6 md:p-8">
          <p className="font-headline text-lg md:text-xl">Catering details</p>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className={label}>Event date (optional)</div>
              <input className={field} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className={label}>Guests (optional)</div>
              <input className={field} inputMode="numeric" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. 25" />
            </div>
            <div className="space-y-2">
              <div className={label}>Budget p.p. (optional)</div>
              <input className={field} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. €75–€120" />
            </div>
          </div>
        </div>
      )}

      {showProject && (
        <div className="rounded-3xl border border-border bg-card/30 p-6 md:p-8">
          <p className="font-headline text-lg md:text-xl">Project details</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className={label}>Current website (optional)</div>
              <input className={field} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://myrestaurant.com" />
            </div>
            <div className="space-y-2">
              <div className={label}>Biggest goal (optional)</div>
              <input className={field} value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="More direct bookings" />
            </div>
          </div>
        </div>
      )}

      {/* Message + consent */}
      <div className="rounded-3xl border border-border bg-card/30 p-6 md:p-8">
        <div className="space-y-2">
          <p className="font-headline text-lg md:text-xl">Your message *</p>
          <p className={hint}>
            A few lines is enough. If you’re stuck, tell me what “feels broken” right now.
          </p>
        </div>

        <textarea
          className={cn(field, "min-h-[170px] resize-y")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me a bit about your situation…"
          required
        />

        <label className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-background/20 p-4">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
          />
          <div>
            <div className={cn(label, "text-sm")}>I agree to the privacy policy.</div>
            <div className={hint}>Your info is used only to reply to your inquiry.</div>
          </div>
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className={hint}>Typical reply: same day (or next morning).</p>
          <Button type="submit" size="lg" disabled={loading} className="font-semibold">
            {loading ? "Sending…" : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  );
}
