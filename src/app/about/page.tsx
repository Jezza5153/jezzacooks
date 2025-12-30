// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata: Metadata = {
  title: "Over mij | Jezza Cooks | Horeca consultant in Amersfoort",
  description:
    "Jeremy Arrascaeta (Amersfoort). Horeca consultancy voor restaurants en teams: menukaart keuzes, food cost controle, prepstructuur, serviceflow, teamtraining en werkafspraken die je volhoudt in de drukte. Praktisch, zonder poeha. Ook restaurant websites die reserveringen en aanvragen opleveren.",
  openGraph: {
    title: "Over mij | Jezza Cooks",
    description:
      "Horeca consultant in Amersfoort. Structuur op papier en rust op de vloer met food cost, prepstructuur, serviceflow en teamtraining. Ook restaurant websites die je verhaal helder maken en aanzetten tot actie.",
    type: "website",
  },
};

const values = [
  {
    title: "Safe Hands, Clear Direction",
    body: "Rust in de chaos. Overzicht, scherpe keuzes en een plan dat je team kan uitvoeren zonder extra gedoe.",
  },
  {
    title: "First Principles Thinking",
    body: "Geen standaard advies. We halen het probleem uit elkaar en bouwen een simpel systeem dat in jouw zaak werkt.",
  },
  {
    title: "Structure Creates Freedom",
    body: "Als prep, rollen en routines kloppen, stijgt de kwaliteit en daalt de stress. Dan wordt service weer leuk.",
  },
  {
    title: "Margins Without Killing the Food",
    body: "Meer marge zit vaak in portionering, recepturen, inkoop en kaartkeuzes. Niet in bezuinigen op smaak.",
  },
  {
    title: "Consistency Wins",
    body: "Gasten komen terug omdat het klopt. We bouwen herhaalbaarheid met training, checks en een vaste werkwijze.",
  },
  {
    title: "Experience Sells",
    body: "Eten, service en communicatie moeten één lijn zijn. Dan voelen gasten het en gaan ze je aanraden.",
  },
];

const steps = [
  {
    n: "1",
    title: "Diagnose",
    body: "We vinden de lekken: food cost, loondruk, prepfrictie, menukaart keuzes en serviceflow. Kort en eerlijk.",
  },
  {
    n: "2",
    title: "Structuur bouwen",
    body: "Prepplanning, rolverdeling, werkafspraken en checklists. Niet dik, wel bruikbaar tijdens echte drukte.",
  },
  {
    n: "3",
    title: "Invoeren met het team",
    body: "Hands on. We trainen op de vloer, in echte prep en echte service. Zo blijft het hangen.",
  },
  {
    n: "4",
    title: "Sturen op ritme",
    body: "Een paar kerncijfers en een weekritme. Kleine verbeteringen, elke week. Zo ga je echt vooruit.",
  },
];

const experience = [
  {
    period: "2024 - 2025",
    role: "Sous Chef (Australië)",
    bullets: [
      "Bestelritme en minimum en maximum voorraad opgezet voor overzicht en rust",
      "Menukaart scherper gemaakt op verkoop, marge en prepdruk",
      "Prepplanning en dagstructuur gebouwd die het team kan volgen",
      "Aansturing tijdens service: tempo, consistentie en controle op de pas",
    ],
  },
  {
    period: "2023 - 2024",
    role: "Sous Chef (catering en volume)",
    bullets: [
      "Productieplanning en draaiboeken gemaakt voor events met volume",
      "Mise en place structuur aangebracht zodat kwaliteit gelijk blijft",
      "Inzet en roosters afgestemd op piekmomenten en werkdruk",
      "Uitvoering bewaakt op timing, portionering en afwerking",
    ],
  },
  {
    period: "2020 - 2022",
    role: "General Manager (high-end visrestaurant)",
    bullets: [
      "Omzet met 60% gegroeid in 2 jaar door betere gastflow en herhaalbezoek",
      "Team aangestuurd op standaard: afspraken, training en een feedback ritme",
      "Gestuurd op cijfers: omzet, marge, waste en planning zonder administratie-ellende",
      "Concepten en samenwerkingen opgezet die echt gasten brachten",
    ],
  },
  {
    period: "2010 - 2019",
    role: "Keukenrollen Europa (NL, BE, FR)",
    bullets: [
      "Basis gebouwd: tempo, discipline, mise en place en verantwoordelijkheid per station",
      "Partie gedraaid en collega's ingewerkt zodat service stabiel blijft",
      "Recepturen en portionering strak gezet voor constante kwaliteit",
      "Kwaliteit geborgd met simpele checks die je volhoudt in de drukte",
    ],
  },
];

function AboutHeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/pics/aboutme.png"
        alt=""
        fill
        sizes="100vw"
        priority={false}
        className={cn(
          "object-cover",
          "scale-105",
          "opacity-90",
          "brightness-[0.78] contrast-[1.08] saturate-[1.05]"
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/15 to-background/55" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_360px_at_50%_24%,rgba(0,0,0,0.35),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_6%,hsla(var(--primary)/0.10),transparent_60%)]" />
    </div>
  );
}

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === "about-jezza");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Jeremy Arrascaeta",
        jobTitle: "Horeca consultant",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amersfoort",
          addressCountry: "NL",
        },
        knowsAbout: [
          "horeca consultancy",
          "restaurant consulting",
          "menu engineering",
          "food cost controle",
          "prepstructuur",
          "serviceflow",
          "teamtraining",
          "werkafspraken",
          "checklists",
          "restaurant websites",
          "website voor restaurant",
        ],
        sameAs: ["https://instagram.com/chefjezz"],
      },
      {
        "@type": "ProfessionalService",
        name: "Jezza Cooks",
        areaServed: { "@type": "AdministrativeArea", name: "Amersfoort en omgeving" },
        serviceType: ["Horeca consultancy", "Restaurant consulting", "Restaurant websites"],
        description:
          "Horeca consultancy en restaurant websites. Structuur op papier en rust op de vloer met menukaart keuzes, food cost controle, prepstructuur, serviceflow en teamtraining.",
      },
    ],
  };

  const storyImageSrc = aboutImage?.imageUrl || "/pics/aboutme.png";
  const storyImageAlt = aboutImage?.description || "Jeremy Arrascaeta";

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <AboutHeroBackground />

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight drop-shadow-[0_22px_70px_rgba(0,0,0,0.65)]">
              Level up the chaos.
            </h1>

            <p className="mt-4 text-lg md:text-2xl text-foreground/90 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
              Don&apos;t chase perfection. Chase improvement.
            </p>

            <p className="mt-6 text-base md:text-xl text-foreground/80 leading-relaxed drop-shadow-[0_12px_34px_rgba(0,0,0,0.50)]">
              Ik help restaurants en horecateams om chaos om te zetten in structuur op papier, zodat je rust krijgt op de vloer.
              Praktisch, uitvoerbaar en zonder poeha.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/free-diagnosis" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                Start de gratis diagnose
              </Link>
              <Link
                href="#waar-ik-meestal-mee-help"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}
              >
                Bekijk waar ik mee help
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-foreground/70 drop-shadow-[0_10px_26px_rgba(0,0,0,0.45)]">
              <span>20+ jaar horeca</span>
              <span className="opacity-70" aria-hidden="true">
                •
              </span>
              <span>Nederland, België, Frankrijk, Australië</span>
              <span className="opacity-70" aria-hidden="true">
                •
              </span>
              <span>Chef + operatie + team</span>
            </div>

            <div
              id="waar-ik-meestal-mee-help"
              className={cn(
                "mt-10 mx-auto max-w-3xl rounded-2xl border border-white/10",
                "bg-black/25 backdrop-blur-md",
                "shadow-[0_22px_90px_rgba(0,0,0,0.45)]",
                "p-6 text-left"
              )}
            >
              <h2 className="font-headline text-xl md:text-2xl font-bold">Waar ik meestal mee help</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-foreground/75">
                <li>Menukaart keuzes en menu engineering</li>
                <li>Food cost controle en portionering</li>
                <li>Prepstructuur en mise en place ritme</li>
                <li>Werkafspraken en checklists die werken</li>
                <li>Serviceflow en rolverdeling</li>
                <li>Teamtraining die blijft hangen</li>
                <li>Restaurant websites als premium visitekaartje</li>
                <li>Duidelijke actieknoppen voor contact en reserveren</li>
              </ul>
              <p className="mt-4 text-sm text-foreground/65">
                Werkgebied: Amersfoort en omgeving. Op locatie of online, afhankelijk van wat het snelst resultaat geeft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative border-b border-border bg-card/40">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Waar ik voor sta</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Niet harder werken. Slimmer werken. Met een team dat het kan herhalen.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-background/60 p-6 md:p-7">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-primary">{v.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY (aangepast) */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            {/* Image (premium, rustig, 1 laag) */}
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/40 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={storyImageSrc}
                    alt={storyImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    data-ai-hint={aboutImage?.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_10%,hsla(var(--primary)/0.10),transparent_60%)]" />

                  {/* In het kort */}
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
                    <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                      In het kort
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-foreground/85">
                      <div>
                        <div className="font-headline text-lg font-bold text-primary">20+</div>
                        <div className="text-foreground/70">jaar horeca</div>
                      </div>
                      <div>
                        <div className="font-headline text-lg font-bold text-primary">5</div>
                        <div className="text-foreground/70">landen</div>
                      </div>
                      <div>
                        <div className="font-headline text-lg font-bold text-primary">1</div>
                        <div className="text-foreground/70">focus: uitvoering</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text (strakker, minder CV) */}
            <div className="order-1 md:order-2">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Mijn verhaal</h2>

              <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Ik ben Jeremy. Ik heb ruim 20 jaar horeca gedaan aan de harde kant van de praktijk: prep, service, ritme en
                  verantwoordelijkheid. Ik hou van kwaliteit, maar nog meer van systemen die je ook volhoudt als het druk is.
                </p>

                <p>
                  Ik heb gewerkt in high-end keukens en later ook operationele verantwoordelijkheid gedragen. Daar leer je één
                  ding snel: het verschil zit niet in extra moeite, maar in duidelijke afspraken en herhaling.
                </p>

                <p>
                  Nu help ik restaurants en teams in Amersfoort en omgeving om chaos te vertalen naar een dagstructuur die werkt.
                  Minder ruis, meer uitvoering. En dat merk je direct op de vloer.
                </p>

                <div className="rounded-2xl border border-border bg-background/50 p-5">
                  <div className="text-sm font-semibold text-foreground">Waar je mij voor inzet</div>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>Food cost, portionering en kaartkeuzes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>Prepstructuur, rolverdeling en serviceflow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>Teamtraining die blijft hangen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>Websites die aanvragen helpen binnenhalen</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/free-diagnosis" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                  Start met de gratis diagnose
                </Link>
                <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}>
                  Contact
                </Link>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Liever DM? Stuur "SCAN" op Instagram @chefjezz en ik stuur je 3 snelle verbeterpunten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="relative border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Ervaring in het kort</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Geen borstklopperij. Wel context, zodat je weet waar mijn aanpak vandaan komt.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-6">
            {experience.map((e) => (
              <div key={`${e.period}-${e.role}`} className="rounded-2xl border border-border bg-background/60 p-6 md:p-7">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-headline text-xl md:text-2xl font-bold">{e.role}</h3>
                  <div className="text-sm text-muted-foreground">{e.period}</div>
                </div>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-muted-foreground">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-background/50 p-6 md:p-7">
            <h3 className="font-headline text-xl md:text-2xl font-bold">Talen</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">Nederlands, Engels en Frans.</p>
          </div>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Hoe ik werk</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Van chaos naar controle, stap voor stap. Geen magie, wel ritme.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary font-headline text-2xl font-bold">
                  {s.n}
                </div>
                <h3 className="mt-6 font-headline text-xl md:text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/services/consulting" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-semibold")}>
              Bekijk restaurant consulting
            </Link>
            <Link href="/services/websites" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-semibold")}>
              Bekijk restaurant websites
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Klaar voor rust op de vloer en betere cijfers?</h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Start met de gratis diagnose. Je krijgt drie concrete stappen die je deze week al kunt uitvoeren.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/free-diagnosis" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                Start de gratis diagnose
              </Link>
              <Link href="/pricing" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold")}>
                Bekijk opties
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">Geen poeha. Wel structuur en uitvoering.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
