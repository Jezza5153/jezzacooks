// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Over Jeremy Arrascaeta — chef en horeca consultant in Amersfoort",
  description:
    "Jeremy Arrascaeta (Chef Jezz): chef met 10+ jaar ervaring in Europa en Australië. Chef-kok bij De Tafelaar Amersfoort (Kamp 8) — genoemd in AD.nl, De Gelderlander en indebuurt.nl. Finalist Euro-Toques Young Chef Award 2018 bij Restaurant Bougainville Amsterdam. Dry-aging lead bij Angler Stirling in de Adelaide Hills, Zuid-Australië. Nu ook horeca consultant via Jezza Cooks — menu engineering, food cost, prepstructuur, serviceflow en teamtraining.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Over Jeremy Arrascaeta | Jezza Cooks",
    description:
      "Chef-kok bij De Tafelaar Amersfoort en founder van Jezza Cooks horeca consultancy. 10+ jaar in keukens in Europa en Australië. Finalist Euro-Toques Young Chef Award. Ex-Angler Stirling dry-aging lead.",
    type: "profile",
    url: "/about",
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
    period: "2025 – heden",
    role: "Chef-kok · Restaurant De Tafelaar Amersfoort (Kamp 8)",
    bullets: [
      "Chef-kok van shared-dining restaurant De Tafelaar aan de Kamp in het centrum van Amersfoort",
      "Gefeatured in AD.nl (Algemeen Dagblad), De Gelderlander en indebuurt.nl Amersfoort — alle drie noemen Jeremy expliciet als chef-kok",
      "Geïnterviewd in de Gooische Business podcast (februari 2026) samen met mede-oprichter Jan Molmans",
      "Eerste gastchef-avond georganiseerd — publicatie in AD.nl regionale editie Amersfoort",
    ],
  },
  {
    period: "2026 – heden",
    role: "Oprichter & horeca consultant · Jezza Cooks (KvK 99547619, Amersfoort)",
    bullets: [
      "Vier dienstlijnen onder één chef-led dak: consulting, catering, restaurant websites, SEO/GEO",
      "Vijf live client builds: Tafelaar Amersfoort, Chef & Serve, Swimcoaching, BoekEerlijk, OffertesVoorJou",
      "Menukaart keuzes, food cost controle en prepstructuur voor restaurants in Amersfoort en omgeving",
      "Restaurant websites voor €400 eenmalig, schema.org ready en GEO-klaar",
    ],
  },
  {
    period: "2020 – 2022",
    role: "Dry-aging lead & sous chef · Angler Restaurant, Stirling (Adelaide Hills, AU)",
    bullets: [
      "Dry-age programma opgezet voor hele vis: cured sashimi, fish sausages, barramundi crackling, carp bacon",
      "Chef Sam Prance-Smith samen leiding over de pass en sourcing van lokale vissen van Kangaroo Island",
      "Gefeatured in InDaily (2020) en Australian Good Food Guide (2020) over het fish dry-age programma",
      "62-minuten video podcast interview (All The Gear But No Idea, ep 31, 2020) over seafood sustainability",
    ],
  },
  {
    period: "2019 – 2020",
    role: "Head chef · Hanson Bay Sanctuary & Flinders Chase Café, Kangaroo Island (AU)",
    bullets: [
      "Keuken opgezet en team gebouwd op twee locaties op Kangaroo Island",
      "Toerisme-volume keuken draaiende gehouden tijdens en na de 2019/2020 bushfires",
      "Lokale seafood sourcing en menu engineering voor wisselende bezoekersvolumes",
      "Doorgegroeid naar Angler Stirling na sluiting van locaties door de bushfires",
    ],
  },
  {
    period: "2018",
    role: "Chef de partie · Restaurant Bougainville, Amsterdam",
    bullets: [
      "Finalist Euro-Toques Young Chef Award 2018 — jongste onder 25 jaar in de eindronde",
      "Gefeatured in Misset Horeca en De RestaurantKrant over de Young Chef Award finale",
      "High-end fine dining in het centrum van Amsterdam",
      "Basis gelegd voor dry-aging en vis preparaties die later in Australië doorontwikkeld werden",
    ],
  },
  {
    period: "2004 – 2018",
    role: "Keukenrollen Europa · NL, België, Frankrijk",
    bullets: [
      "Basis gebouwd: tempo, discipline, mise en place en verantwoordelijkheid per station",
      "Partie gedraaid in meerdere landen en keukenstijlen (Franse brigade, Nederlandse bistro, Belgische fine dining)",
      "Recepturen en portionering strak gezet voor constante kwaliteit onder drukte",
      "Drietalige werkvloer-ervaring: Nederlands, Engels, Frans",
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
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Over Jeremy", item: "/about" },
  ]);

  const storyImageSrc = aboutImage?.imageUrl || "/pics/aboutme.png";
  const storyImageAlt = aboutImage?.description || "Jeremy Arrascaeta";

  return (
    <div className="relative">
      {/* Schema: breadcrumb only. Person + Organization + LocalBusiness
          entities live in the global @graph (src/lib/schema.ts) — they're
          referenced by @id from every page, no duplication needed here. */}
      <JsonLd data={breadcrumb} id="schema-about-breadcrumb" />

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/pics/aboutme.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            priority={false}
          />

          {/* heel lichte curtain zodat tekst leesbaar blijft, maar foto zichtbaar */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/15 to-background/55" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight drop-shadow-[0_22px_70px_rgba(0,0,0,0.65)]">
              Over Jeremy Arrascaeta — horeca consultant in Amersfoort
            </h1>

            <p className="mt-4 text-lg md:text-2xl text-foreground/90 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
              Chef Jezz. 10+ jaar in de keuken. Europa en Australië. Eén missie: structuur die je volhoudt in de drukte.
            </p>

            <p className="mt-6 text-base md:text-xl text-foreground/80 leading-relaxed drop-shadow-[0_12px_34px_rgba(0,0,0,0.50)]">
              Ik ben Jeremy Arrascaeta (Amersfoort, NL). Chef met carrière in Europa en Australië.
              Chef-kok bij shared-dining restaurant De Tafelaar aan de Kamp in het centrum van
              Amersfoort — gefeatured in{" "}
              <a
                href="https://www.ad.nl/amersfoort/uittip-restaurant-de-tafelaar-organiseert-eerste-gastchef-avond~a88c021a/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                AD.nl
              </a>
              ,{" "}
              <a
                href="https://www.gelderlander.nl/amersfoort/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~a5c0f1d0/265507710/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                De Gelderlander
              </a>{" "}
              en{" "}
              <a
                href="https://indebuurt.nl/amersfoort/nieuws/nieuw-in/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~343981/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                indebuurt.nl
              </a>
              . Finalist Euro-Toques Young Chef Award 2018 bij Restaurant Bougainville Amsterdam.
              Daarna dry-aging lead bij{" "}
              <a
                href="https://www.indailysa.com.au/news/archive/2020/08/19/stirlings-new-fish-and-chip-restaurant-is-catching-on"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                Angler Stirling
              </a>{" "}
              in de Adelaide Hills (Zuid-Australië), waar ik bekend werd om het fish dry-age
              programma met cured sashimi, fish sausages, barramundi crackling en carp bacon —
              gecoverd in{" "}
              <a
                href="https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                Australian Good Food Guide
              </a>
              ,{" "}
              <a
                href="https://www.broadsheet.com.au/adelaide/food-and-drink/article/broadsheets-favourite-adelaide-dishes-2021"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                Broadsheet Adelaide
              </a>{" "}
              en{" "}
              <a
                href="https://aquna.com/what-does-aquna-murray-cod-actually-taste-like/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/80 decoration-2 underline-offset-4 hover:text-primary"
              >
                Aquna
              </a>
              . Nu help ik restaurants en horecateams in Amersfoort en omgeving om chaos om te
              zetten in structuur op papier — zodat je rust krijgt op de vloer.
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
              <span>10+ jaar horeca</span>
              <span className="opacity-70" aria-hidden="true">
                •
              </span>
              <span>Europa &amp; Australië</span>
              <span className="opacity-70" aria-hidden="true">
                •
              </span>
              <span>Chef-kok De Tafelaar</span>
              <span className="opacity-70" aria-hidden="true">
                •
              </span>
              <span>KvK 99547619</span>
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
                    fetchPriority="high"
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
                        <div className="font-headline text-lg font-bold text-primary">10+</div>
                        <div className="text-foreground/70">jaar in high-end keukens</div>
                      </div>
                      <div>
                        <div className="font-headline text-lg font-bold text-primary">9</div>
                        <div className="text-foreground/70">press mentions NL + AU</div>
                      </div>
                      <div>
                        <div className="font-headline text-lg font-bold text-primary">5</div>
                        <div className="text-foreground/70">live clients</div>
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
                  Ik ben Jeremy. Ruim 10 jaar in high-end keukens en management — in Europa en Australië. Ik hou van kwaliteit,
                  maar nog meer van systemen die je ook volhoudt als het druk is.
                </p>

                <p>
                  Ik ben chef-kok bij restaurant De Tafelaar aan de Kamp in het centrum van Amersfoort (shared dining), en
                  oprichter van Jezza Cooks horeca consultancy. Daarvoor dry-aging lead bij Angler Stirling in de Adelaide
                  Hills, head chef op Kangaroo Island, en chef de partie bij Restaurant Bougainville Amsterdam — finalist
                  Euro-Toques Young Chef Award 2018. Dat mix van high-end, tourism volume en dry-age programma heeft me één
                  ding geleerd: het verschil zit niet in extra moeite, maar in duidelijke afspraken en herhaling.
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
