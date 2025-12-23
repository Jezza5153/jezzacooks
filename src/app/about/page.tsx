// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check } from "lucide-react";

const aboutImage = PlaceHolderImages.find((p) => p.id === "about-jezza");

const principles = [
  {
    title: "No Fluff",
    description:
      "Praktisch, direct en gericht op resultaat. Geen rapporten voor in de la.",
  },
  {
    title: "Marge = Rust",
    description:
      "Goede hospitality begint bij gezonde cijfers. We bouwen systemen voor grip op winst.",
  },
  {
    title: "Consistentie Wint",
    description:
      "Strakke uitvoering en duidelijke afspraken maken elke service beter (en rustiger).",
  },
  {
    title: "Beleving Boven Alles",
    description:
      "Hospitality is een experience business. Elke keuze moet de gast beter laten voelen.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="Ik ben een chef die systemen bouwt."
        subtitle="20 jaar keukenervaring + management + Michelin. Ik help horecaondernemers chaos omzetten in structuur en marge."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              Mijn verhaal
            </h2>

            <div className="prose prose-invert prose-lg text-foreground max-w-none mt-6 space-y-4">
              <p className="text-muted-foreground">
                Ik ben niet begonnen achter een bureau. Ik ben begonnen op de
                lijn. Druk, hitte, tickets, team, timing. En ik heb gezien wat
                er echt gebeurt als je zaak “goed draait” maar er tóch geen geld
                overblijft.
              </p>

              <p className="text-muted-foreground">
                Het verschil tussen “goed eten” en “goed draaien” zit bijna
                altijd in{" "}
                <span className="text-foreground font-semibold">systemen</span>:
                foodcost, personeelsflow, prep, SOP’s, menu-engineering,
                marketing en vooral de gastreis.
              </p>

              <p className="text-muted-foreground">
                Daarom doe ik dit werk. Niet om mooi te praten, maar om samen
                met jou de zaak rustiger, strakker en winstgevender te maken —
                met een chef-mentaliteit en first principles denken.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Principles */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Waar ik voor sta
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((p) => (
              <div key={p.title} className="text-center p-6">
                <h3 className="font-headline text-xl font-semibold text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Hoe ik werk
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Simpel. Snel. Meetbaar. Plan → Do → Check → Improve.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              {
                n: "1",
                title: "Plan",
                desc: "We prikken door de ruis heen en bepalen 3 prioriteiten.",
              },
              {
                n: "2",
                title: "Do",
                desc: "Ik help je uitvoeren: menu, systemen, training, flow.",
              },
              {
                n: "3",
                title: "Check",
                desc: "We meten KPI’s: prime cost, marge, omzet, rust.",
              },
              {
                n: "4",
                title: "Improve",
                desc: "We fine-tunen tot het werkt — en blijft werken.",
              },
            ].map((step) => (
              <div key={step.n} className="p-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary text-primary mx-auto">
                  <p className="font-headline text-2xl font-bold">{step.n}</p>
                </div>
                <h3 className="mt-4 font-headline text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1 text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Zullen we je zaak strak trekken?
          </h2>
          <p className="mt-2 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Boek een gratis 15-min diagnose call. Geen sales-praat, wél duidelijkheid.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold"
          >
            <Link href="/contact">Plan je gratis call</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
