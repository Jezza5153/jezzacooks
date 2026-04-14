import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, Clock, Instagram } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList, buildContactPage } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact — horeca consultant in Amersfoort",
  description:
    "Neem contact op met Jezza Cooks voor restaurant consulting, catering of een restaurant website. Bereikbaar per mail, WhatsApp en Instagram. Amersfoort en omgeving — op locatie of online.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Jezza Cooks",
    description:
      "Neem contact op voor restaurant consulting, catering of een restaurant website in Amersfoort en omgeving.",
    type: "website",
    url: "/contact",
  },
};

function ContactFormSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-48 w-full rounded-3xl" />
      <Skeleton className="h-64 w-full rounded-3xl" />
      <Skeleton className="h-40 w-full rounded-3xl" />
    </div>
  );
}

// Opening-hours block as human-readable text. The machine-readable version
// lives in ContactPage schema via site-config.
const HOURS_DISPLAY = "Ma–Vr 09:00–18:00 (op afspraak)";

export default function ContactPage() {
  return (
    <div>
      <JsonLd data={buildContactPage()} id="schema-contact-page" />
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" },
        ])}
        id="schema-contact-breadcrumb"
      />

      <PageHeader
        title="Contact Jezza Cooks"
        subtitle="Plan een gratis diagnose of stel je vraag direct. Meestal reageer ik binnen één werkdag."
      />

      {/* NAP block — visible version of the data in ContactPage schema.
          AI engines cross-check visible text against structured data, so keep
          these identical to site-config. */}
      <section className="container mx-auto px-4 pt-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/40 p-6 md:p-8">
          <h2 className="font-headline text-2xl font-bold">
            Direct contact met Jezza Cooks
          </h2>
          <p className="mt-2 text-muted-foreground">
            Horeca consultancy, catering en restaurant websites in Amersfoort
            en omgeving. Op locatie of online, afhankelijk van wat het snelst
            resultaat geeft.
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  E-mail
                </dt>
                <dd>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="text-foreground hover:text-primary"
                  >
                    {SITE.contact.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  WhatsApp
                </dt>
                <dd>
                  <a
                    href={SITE.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    {SITE.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Werkgebied
                </dt>
                <dd className="text-foreground">
                  {SITE.address.addressLocality}, {SITE.address.addressRegion},{" "}
                  Nederland
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Bereikbaar
                </dt>
                <dd className="text-foreground">{HOURS_DISPLAY}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <Instagram className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Instagram
                </dt>
                <dd>
                  <a
                    href={SITE.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    {SITE.contact.instagramHandle}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <p className="mt-6 text-sm text-muted-foreground">
            Liever even appen? Stuur &quot;SCAN&quot; via WhatsApp of DM{" "}
            <Link
              href={SITE.contact.instagram}
              className="text-primary hover:underline"
            >
              {SITE.contact.instagramHandle}
            </Link>{" "}
            op Instagram en je krijgt drie snelle verbeterpunten.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl">
        <Suspense fallback={<ContactFormSkeleton />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
