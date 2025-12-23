import PageHeader from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Let’s get you unstuck."
        subtitle="Tell me what’s going on—margins, chaos, systems, bookings. I’ll reply within 1 business day with next steps (and if it’s not a fit, I’ll tell you straight)."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Context + expectations */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Fast start</Badge>
                <Badge variant="outline">Amersfoort</Badge>
                <Badge variant="outline">NL / EN / FR</Badge>
              </div>

              <h2 className="mt-4 font-headline text-2xl font-bold">
                What happens after you submit
              </h2>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    I’ll review your info and reply within <b>1 business day</b>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    You’ll get <b>3 quick wins</b> I’d fix first (even before we work together).
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    If it’s a fit, we book a <b>free 15-minute call</b> and set a clear plan.
                  </span>
                </li>
              </ul>

              <div className="mt-6 rounded-md bg-background/40 border border-border p-4">
                <p className="text-sm text-muted-foreground">
                  Prefer DM?
                </p>
                <p className="mt-1 text-sm">
                  Message <b>“SCAN”</b> on Instagram and I’ll send you a quick audit checklist.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>@chefjezz</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-headline text-xl font-semibold">Best for</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Businesses with good food but messy operations, unclear priorities,
                and cashflow pressure. We build structure that protects margins
                and improves guest experience.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Typical reply time: within 24 hours (business days).</span>
              </div>
            </div>
          </aside>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg border border-border">
              <div className="mb-6">
                <h2 className="font-headline text-2xl font-bold">Quick Intake</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The more context you give, the faster I can help. If you have a menu link or a website,
                  include it in the form.
                </p>
              </div>

              <ContactForm />
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              By submitting this form you agree to be contacted about your request. No spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
