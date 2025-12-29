// src/app/free-diagnosis/page.tsx
import { Suspense } from "react";
import DiagnosisClientPage from "@/components/diagnosis-client-page";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/page-header";

function DiagnosisPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
    </div>
  );
}

export default function FreeDiagnosisPageWrapper() {
  return (
    <div>
       <PageHeader
          title="Gratis diagnose"
          subtitle="Kies één route, dan houden we het rustig."
       />
      <Suspense fallback={<DiagnosisPageSkeleton />}>
        <DiagnosisClientPage />
      </Suspense>
    </div>
  );
}