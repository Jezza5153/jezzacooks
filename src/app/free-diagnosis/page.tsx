
// src/app/free-diagnosis/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import DiagnosisClientPage from "@/components/diagnosis-client-page";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Gratis diagnose: website, consulting of catering",
  description:
    "Kies één route en krijg binnen 48 uur een concrete diagnose. Website quick scan, consulting diagnose of catering aanvraag. Chef-led, geen verplichting.",
  alternates: { canonical: "/free-diagnosis" },
  openGraph: {
    title: "Gratis diagnose | Jezza Cooks",
    description:
      "Drie routes, één gratis diagnose. Website, consulting of catering — kies wat je nodig hebt en krijg binnen 48 uur een concrete reactie.",
    type: "website",
    url: "/free-diagnosis",
  },
};

function DiagnosisPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-14 md:py-20">
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="h-10 w-56 rounded-xl" />
        <Skeleton className="h-5 w-[28rem] max-w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
    </div>
  );
}

function FreeDiagnosisShell() {
  return (
    <div>
      <PageHeader
        title="Gratis diagnose"
        subtitle="Kies één route, dan houden we het rustig."
      />
      <DiagnosisClientPage />
    </div>
  );
}

export default function FreeDiagnosisPageWrapper() {
  return (
    <Suspense fallback={<DiagnosisPageSkeleton />}>
      <FreeDiagnosisShell />
    </Suspense>
  );
}
