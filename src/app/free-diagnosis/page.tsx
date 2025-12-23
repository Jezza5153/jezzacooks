// app/free-diagnosis/page.tsx
import { Link } from "next-intl";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FreeDiagnosisForm from "@/components/free-diagnosis-form";

export default function FreeDiagnosisPage() {
  return (
    <div>
      <PageHeader
        title="Free Diagnosis"
        subtitle="Not sure where to start? Let's find out. I'll reply within 1 business day."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* FREE DIAGNOSIS HOOK */}
        <section className="max-w-5xl mx-auto rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Free</Badge>
                <Badge variant="secondary">15-min Diagnosis</Badge>
                <Badge variant="outline">No hard sell</Badge>
              </div>

              <h2 className="mt-4 font-headline text-2xl md:text-3xl font-bold">
                Free diagnosis call (so you feel safe before spending a euro)
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tell me what’s happening (margins, chaos, systems, bookings). I’ll ask a few
                sharp questions, give you 1–2 quick wins, and recommend the simplest next step:
                do nothing, Quick Scan, or on-site.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/contact?service=diagnosis">Book the Free Call</Link>
                </Button>
                <p className="sm:hidden text-center text-xs text-muted-foreground py-2">or fill the form below</p>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                The form helps me prep—so you get better answers in less time.
              </p>
            </div>

            <div className="flex-1">
              <div id="free-diagnosis-form" />
              <FreeDiagnosisForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
