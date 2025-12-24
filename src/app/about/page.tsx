
// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const values = [
  {
    // tile title stays EN
    title: "Safe Hands, Clear Direction",
    // body in NL
    body: "Rust in de chaos. Ik breng overzicht, scherpe prioriteiten en een plan dat je team echt kan uitvoeren.",
  },
  {
    title: "First Principles Thinking",
    body: "Geen standaard advies. We ontleden het probleem, stellen de juiste vragen en bouwen opnieuw op wat werkt voor jouw zaak.",
  },
  {
    title: "Structure Creates Freedom",
    body: "Als prep, rollen en routines strak staan, gaat de kwaliteit omhoog en gaat de stress omlaag.",
  },
  {
    title: "Margins Without Killing the Food",
    body: "Porties, prijsstelling, menu-opbouw, inkoop. Praktische ingrepen die marge beschermen zonder je eten te slopen.",
  },
  {
    title: "Consistency Wins",
    body: "Gasten komen terug voor consistentie. We bouwen herhaalbare uitvoering: recepten, training, checks en ritme.",
  },
  {
    title: "Experience Sells",
    body: "Horeca is een belevingsbusiness. We maken serviceflow, menu-psychologie en marketing één verhaal dat gasten voelen.",
  },
];

const steps = [
  {
    n: "1",
    title: "Diagnose",
    body: "We vinden waar het echt misgaat: waar je geld weglekt, waar service vastloopt, welke keuzes op de kaart je pijn doen en waar de gastbeleving niet klopt.",
  },
  {
    n: "2",
    title: "Build Structure",
    body: "We zetten de basis strak: prepplanning, duidelijke afspraken, training, costing en een kaart die logisch draait. Systemen die je team kan volgen zonder dat jij overal bovenop zit.",
  },
  {
    n: "3",
    title: "Execute With the Team",
    body: "Ik ben hands-on. We voeren het samen in, trainen op de werkvloer, verdelen rollen en halen frictie uit echte service, niet uit theorie.",
  },
  {
    n: "4",
    title: "Measure & Improve",
    body: "We kiezen een paar kerncijfers en houden ze simpel: food cost, loonkosten, covers, tempo en reviews. Elke week scherper, elke maand beter.",
  },
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === "about-jezza");

  return (
    <div className="relative">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      {/* HERO */}
      <section className="relative border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Level up the chaos.
            </h1>

            <p className="mt-4 text-lg md:text-2xl text-muted-foreground">
              Make it organized chaos, built to perform.
            </p>

            <p className="mt-6 text-base md:text-xl text-muted-foreground leading-relaxed">
              Perfectie is geen moment. Het is elke dag de kleine dingen goed doen.
              <br />
              Rust komt niet door meer personeel of harder werken, maar door betere gewoontes.
              <br />
              Ik bouw liever mensen dan gerechten. Leren werkt langer dan schreeuwen.
              <br />
              Daarmee wordt chaos georganiseerd en wordt kwaliteit herhaalbaar, elke service opnieuw.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Plan een gratis 15-min call
              </Link>
              <Link
                href="/services/consulting"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Bekijk hoe ik werk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I STAND FOR */}
      <section className="relative border-b border-border bg-card/40">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">
              Waar ik voor sta
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Geen ego, geen fluff. Alleen praktische verbeteringen die je team kan uitvoeren en die je cijfers bewijzen.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-background/60 p-6 md:p-7"
              >
                <h3 className="font-headline text-xl md:text-2xl font-bold text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MY STORY */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                {aboutImage ? (
                  <div className="relative aspect-[4/3] md:aspect-[3/4]">
                    <Image
                      src={aboutImage.imageUrl}
                      alt={aboutImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={aboutImage.imageHint}
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] md:aspect-[3/4]" />
                )}
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Mijn verhaal
              </h2>

              <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Ik ben begonnen in de afwas. Daar leer je tempo, discipline en waarom structuur alles is. Van daaruit ben ik
                  doorgegroeid als commis en later naar leidinggevende rollen, met ervaring in vier keukens op Michelin-niveau en functies
                  in Europa en Australië.
                </p>
                <p>
                  Ik heb gewerkt in high-end viszaken, drukke pubs en catering. Wat ik het leukste vind is menu’s en concepten bouwen die
                  echt werken. Creatief en seizoensgericht, maar vooral logisch voor de keuken en winstgevend voor het bedrijf. Ik heb
                  teams aangestuurd van leerlingen tot souschefs, head chefs getraind, met leveranciers onderhandeld en eigenaren geholpen
                  om ideeën om te zetten in een stabiele, herhaalbare operatie.
                </p>
                <p>
                  De manier waarop ik werk is simpel. Ik breng rust in de chaos. Overzicht, scherpe prioriteiten en een plan dat je team
                  écht kan uitvoeren. Geen standaard advies, maar terug naar de kern. We halen het probleem uit elkaar, stellen de juiste
                  vragen en bouwen opnieuw op wat werkt voor jouw zaak.
                </p>
                <p>
                  Want structuur geeft vrijheid. Als prep, rollen en routines kloppen, stijgt de kwaliteit en daalt de stress. En marge
                  hoeft niet ten koste te gaan van het eten. Met slimme keuzes in porties, prijzen, inkoop en je kaart beschermen we je
                  winst, zonder je identiteit te slopen.
                </p>
                <p>
                  Uiteindelijk draait het om één ding: consistentie. Gasten komen terug omdat het elke keer klopt. Daarom bouwen we
                  herhaalbaarheid in je uitvoering met recepten, training, checks en ritme. En omdat horeca beleving is, trekken we één
                  lijn in service, kaart en communicatie, zodat gasten het voelen en onthouden.
                </p>
                <p>
                  Nu ik terug ben in Nederland help ik horecabedrijven met menuontwikkeling en praktische ondersteuning op de vloer en
                  achter de schermen. Of je nu iets nieuws start, je menu wil vernieuwen of meer grip wil op marge en workflow: ik breng
                  rust, structuur en resultaat.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/free-diagnosis"
                  className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
                >
                  Plan je gratis call
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
                >
                  Contact
                </Link>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Liever DM? Stuur “SCAN” op Instagram @chefjezz en ik stuur je 3 snelle wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">
              Hoe ik werk
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Een simpele loop die chaos omzet in overzicht en resultaat dat je kunt sturen.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary font-headline text-2xl font-bold">
                  {s.n}
                </div>
                <h3 className="mt-6 font-headline text-xl md:text-2xl font-bold">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Klaar om je operatie weer onder controle te krijgen?
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Plan een gratis 15-minuten call. Als ik kan helpen, vertel ik je precies wat ik als eerste zou fixen.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-diagnosis"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Plan je gratis call
              </Link>
              <Link
                href="/services/consulting"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Bekijk consulting
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Liever DM? Stuur “SCAN” op Instagram @chefjezz en ik stuur je 3 snelle wins.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
