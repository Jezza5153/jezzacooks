// src/app/results/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resultaten | Jezza Cooks | Wat je kunt verwachten",
  description:
    "Wat je kunt verwachten van Jezza Cooks: meer grip op food cost en marge, rust in prep en service, en restaurant websites die je verhaal helder maken en aanvragen helpen binnenhalen.",
  openGraph: {
    title: "Resultaten | Jezza Cooks",
    description:
      "Meer grip op je cijfers, rust op de vloer en een website die duidelijk verkoopt. Dit is wat we bouwen met systemen die je team kan uitvoeren.",
    type: "website",
  },
};

type Outcome = {
  title: string;
  headline: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
};

const outcomes: Outcome[] = [
  {
    title: "Marge en food cost",
    headline: "Meer grip op je cijfers",
    body:
      "We maken je kostprijs per gerecht zichtbaar, brengen portionering terug naar afspraken, en pakken waste aan. Niet met dikke rapporten, maar met simpele routines die je volhoudt.",
    points: [
      "Receptuur en portionering strak trekken",
      "Menu keuzes die logisch draaien in prep",
      "Inkoop en voorraad met een vast ritme",
    ],
    href: "/services/consulting",
    cta: "Bekijk restaurant consulting",
  },
  {
    title: "Prep en service",
    headline: "Rust op de vloer",
    body:
      "Drukte blijft. Paniek hoeft niet. We bouwen een prepplan, heldere rollen, en een serviceflow die je team kan herhalen. Daardoor wordt kwaliteit consistenter en shifts voelen minder zwaar.",
    points: [
      "Prepplanning die past bij je covers",
      "Station ownership en duidelijke verantwoordelijkheden",
      "SOP’s en checklists die echt gebruikt worden",
    ],
    href: "/services/consulting",
    cta: "Zo bouwen we structuur",
  },
  {
    title: "Restaurant websites",
    headline: "Een website die duidelijk verkoopt",
    body:
      "Ik bouw websites voor restaurants zodat je presence klopt. Helder verhaal, goede foto’s, menu, openingstijden en contact. Reserveren kan via een systeem dat bij je zaak past.",
    points: [
      "Premium visitekaartje dat vertrouwen geeft",
      "Duidelijke CTA’s voor contact en aanvragen",
      "SEO basis zodat je beter gevonden wordt",
    ],
    href: "/services/websites",
    cta: "Bekijk restaurant websites",
  },
];

const deliverables = [
  {
    title: "Je krijgt iets wat je team kan uitvoeren",
    body:
      "Geen advies dat alleen werkt als jij ernaast staat. We maken afspraken die een medewerker ook snapt op een druk moment.",
  },
  {
    title: "Een korte, heldere prioriteitenlijst",
    body:
      "Wat eerst, wat later. We kiezen de paar dingen die direct effect hebben en bouwen vanaf daar.",
  },
  {
    title: "Een werkritme dat je volhoudt",
    body:
      "Kleine verbeteringen die je elke week herhaalt. Dat is hoe je echt vooruit gaat, zonder dat het na twee weken wegzakt.",
  },
];

const cardClass =
  "group relative overflow-hidden rounded-3xl border border-border/55 bg-card/30 p-7 " +
  "shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md ring-1 ring-white/5 " +
  "transition duration-300 hover:bg-card/40 hover:border-border/75 hover:shadow-[0_28px_90px_rgba(0,0,0,0.42)] " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

export default function ResultsPage() {
  return (
    <div>
      <PageHeader
        title="Wat je kunt verwachten"
        subtitle="Geen grote claims op basis van verzonnen cijfers. Wel een aanpak die je team kan uitvoeren en die je deze week al voelt."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {outcomes.map((o) => (
            <Link key={o.title} href={o.href} className={cardClass} aria-label={o.title}>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(900px_280px_at_20%_0%,hsla(var(--primary)/0.16),transparent_60%)]" />
              </div>

              <div className="relative">
                <p className="text-sm font-semibold text-muted-foreground">{o.title}</p>

                <h3 className="mt-3 font-headline text-2xl md:text-3xl font-bold text-foreground">
                  {o.headline}
                </h3>

                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {o.body}
                </p>

                <ul className="mt-5 space-y-2 text-muted-foreground">
                  {o.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 inline-flex items-center text-primary font-semibold">
                  {o.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust without fake proof */}
        <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-3">
          {deliverables.map((d) => (
            <div key={d.title} className="rounded-3xl border border-border/45 bg-background/40 p-7">
              <h3 className="font-headline text-xl md:text-2xl font-bold">{d.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>

        {/* Honest note */}
        <div className="mt-12 rounded-3xl border border-border/45 bg-background/35 p-7 md:p-8">
          <h3 className="font-headline text-2xl md:text-3xl font-bold">
            Waarom je hier geen klantnamen en percentages ziet
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
            Ik ben eerlijk: ik ga geen resultaten claimen die ik niet kan onderbouwen op deze pagina.
            Wat ik wél doe is je situatie scherp krijgen en je drie concrete stappen sturen die je direct kunt testen.
            Als het werkt, dan bouwen we door. Zo simpel is het.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/free-diagnosis"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Start de gratis diagnose
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
