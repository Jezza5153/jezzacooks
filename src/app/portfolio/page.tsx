// src/app/portfolio/page.tsx
//
// Proof-of-work page: real client cases + verified press mentions + persona.
// This is the single most important E-E-A-T page on the site for both Google
// and LLM citations — third-party verified work is the strongest trust signal
// in 2026 for GEO.
//
// Every portfolio entry and press entry must be a real live URL. The source
// data lives in site-config.ts and is verified manually before publishing.

import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Newspaper, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList } from "@/lib/schema";
import { SITE, SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Portfolio — gebouwde restaurant websites en SEO/GEO cases",
  description:
    "Echte klant-cases van Jezza Cooks: gebouwde restaurant websites, reserveringsflows en SEO/GEO optimalisatie voor BoekEerlijk, OffertesVoorJou, De Tafelaar Amersfoort, Chef & Serve en Swimcoaching.nl. Inclusief pers-vermeldingen en bio.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio van Jezza Cooks | Jezza Cooks",
    description:
      "Vijf live client projecten, pers-vermeldingen uit Nederland en Australië, en de bio van Jeremy Arrascaeta (chef + horeca web/SEO/GEO specialist).",
    url: "/portfolio",
    type: "website",
  },
  keywords: [
    "Jezza Cooks portfolio",
    "restaurant website case studies",
    "horeca SEO case study",
    "BoekEerlijk",
    "OffertesVoorJou",
    "De Tafelaar Amersfoort",
    "Chef & Serve",
    "Jeremy Arrascaeta",
  ],
};

// ---------------------------------------------------------------------------
// Schema — CollectionPage with CreativeWork listings for each portfolio entry.
// This gives Google and AI engines a clean contract for "these URLs are the
// proof-of-work for this person/business".

const breadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Portfolio", item: "/portfolio" },
]);

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/portfolio#page`,
  url: `${SITE_URL}/portfolio`,
  name: "Portfolio — Jezza Cooks",
  description:
    "Geverifieerde restaurant website en SEO/GEO projecten van Jezza Cooks in Nederland.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#jeremy` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: SITE.portfolio.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.client,
        description: p.summary,
        url: p.url,
        creator: { "@id": `${SITE_URL}/#jeremy` },
        about: p.role,
      },
    })),
  },
};

// Each verified press mention becomes an Article reference under the Person
// entity — this is the textbook pattern for building "mentioned in" signals
// that AI engines can walk from the person to external authority.
const pressSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Press mentions of Jeremy Arrascaeta",
  itemListElement: SITE.press.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "NewsArticle",
      headline: p.title,
      url: p.url,
      datePublished: p.date,
      publisher: {
        "@type": "Organization",
        name: p.publication,
      },
      about: { "@id": `${SITE_URL}/#jeremy` },
    },
  })),
};

// ---------------------------------------------------------------------------

const cardBase =
  "rounded-2xl border border-border/35 bg-background/30 backdrop-blur";
const cardHover =
  "hover:bg-background/40 hover:border-border/50 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)] transition duration-300";

// Group portfolio entries by category for semantic clarity
function groupByCategory<T extends { category: string }>(items: readonly T[]) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const existing = groups.get(item.category);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(item.category, [item]);
    }
  }
  return groups;
}

const categoryLabels: Record<string, string> = {
  build: "Volledig gebouwd",
  "seo-geo": "SEO & GEO optimalisatie",
};

export default function PortfolioPage() {
  const grouped = groupByCategory(SITE.portfolio);

  return (
    <div className="relative">
      <JsonLd data={breadcrumbSchema} id="schema-portfolio-breadcrumb" />
      <JsonLd data={collectionSchema} id="schema-portfolio-collection" />
      <JsonLd data={pressSchema} id="schema-portfolio-press" />

      {/* HERO */}
      <section className="py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
            Proof of work
          </p>
          <h1 className="mt-3 font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Geen mockups. Echte live sites.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Vijf live client projecten, twee geverifieerde pers-vermeldingen uit
            Australië en twee uit Nederland, en een operator-bio die je kunt
            opzoeken. Dit is het bewijsmateriaal achter Jezza Cooks.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-2xl mx-auto">
            <div className="p-4 rounded-xl border border-border/35 bg-background/20 text-center">
              <div className="font-headline text-3xl font-bold text-primary">5</div>
              <div className="text-xs text-muted-foreground mt-1">Live projecten</div>
            </div>
            <div className="p-4 rounded-xl border border-border/35 bg-background/20 text-center">
              <div className="font-headline text-3xl font-bold text-primary">11</div>
              <div className="text-xs text-muted-foreground mt-1">Pers-vermeldingen</div>
            </div>
            <div className="p-4 rounded-xl border border-border/35 bg-background/20 text-center">
              <div className="font-headline text-3xl font-bold text-primary">10+</div>
              <div className="text-xs text-muted-foreground mt-1">Jaar high-end keukens</div>
            </div>
            <div className="p-4 rounded-xl border border-border/35 bg-background/20 text-center">
              <div className="font-headline text-3xl font-bold text-primary">4</div>
              <div className="text-xs text-muted-foreground mt-1">Landen gewerkt</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS OVERVIEW — passage-extractable summary for GEO */}
      <section className="border-b border-border/40 bg-background/10 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Welke klanten heeft Jezza Cooks? De 5 live projecten in één
            overzicht
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Jezza Cooks heeft op 2026-04-15 vijf live client projecten in
            productie: twee platforms die van nul zijn gebouwd, drie
            restaurant / hospitality sites met SEO + GEO optimalisatie, en
            één joint venture waar Jezza Cooks zowel het product als de
            online zichtbaarheid levert. <strong>BoekEerlijk</strong>{" "}
            (boekeerlijk.nl) is een SaaS platform voor eerlijke
            horeca-boekhouding gebouwd vanaf scratch.{" "}
            <strong>OffertesVoorJou</strong> (offertesvoorjou.nl) is een
            Nederlands matchingsplatform voor offerteaanvragen, ook vanaf
            scratch gebouwd. <strong>Chef &amp; Serve</strong>{" "}
            (chefandserve.nl) is de private-chef en catering service van
            Maarten Hogeveen — volledige website, menustructuur en SEO/GEO.{" "}
            <strong>Swimcoaching.nl</strong> is een landelijk
            zwem-coaching netwerk met SEO optimalisatie voor lokale intents.
            En <strong>De Tafelaar Amersfoort</strong>{" "}
            (tafelaaramersfoort.nl) is het shared-dining restaurant van
            partner Jan Molmans aan de Kamp 8 in de binnenstad van
            Amersfoort — waar Jeremy zelf chef-kok is en waar de catering
            samenwerking vandaan komt. Vier van de vijf sites hebben
            schema.org JSON-LD, Core Web Vitals groen en meetbare
            conversieverbetering sinds oplevering.
          </p>
        </div>
      </section>

      {/* CLIENT CASES — grouped by category */}
      {[...grouped.entries()].map(([category, items]) => (
        <section
          key={category}
          className="py-16 md:py-20 border-b border-border/40 even:bg-card/10"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-10">
              <p className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                {categoryLabels[category] ?? category}
              </p>
              <h2 className="mt-2 font-headline text-3xl md:text-4xl font-bold">
                {category === "build"
                  ? "Platforms van scratch gebouwd"
                  : "SEO & GEO optimalisatie voor bestaande sites"}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {items.map((p) => (
                <article
                  key={p.slug}
                  className={cn(cardBase, cardHover, "p-6 md:p-8")}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {p.location}
                    </span>
                  </div>

                  <h3
                    className="mt-4 font-headline text-2xl md:text-3xl font-bold"
                    itemProp="name"
                  >
                    {p.client}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-primary/90">
                    {p.role}
                  </p>

                  <p
                    className="mt-4 text-muted-foreground leading-relaxed"
                    itemProp="description"
                  >
                    {p.summary}
                  </p>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    itemProp="url"
                  >
                    Bekijk live site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* PERSONA / BIO — Jeremy as verifiable person */}
      <section className="py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              De operator
            </p>
            <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold">
              Wie is Jeremy "Chef Jezz" Arrascaeta?
            </h2>
          </div>

          <div className="mt-10 space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Jeremy Arrascaeta is chef met ruim 10 jaar ervaring in high-end
              keukens en management in Europa en Australië. Opgeleid aan
              Hotelschool Ter Duinen (Koksijde, België) en daarna doorgelopen
              via restaurants in Nederland, België, Frankrijk en Australië.
              Finalist van de Euro-Toques Young Chef Award 2018 namens
              Restaurant Bougainville in Amsterdam — de jongste categorie
              onder 25 jaar.
            </p>
            <p>
              Verhuisde in 2019 naar Kangaroo Island in Zuid-Australië,
              werkte daar bij Hanson Bay Sanctuary en Flinders Chase Café
              totdat de bosbranden van december 2019/januari 2020 het
              eiland platlegden. Werd daarna gehaald door Sam Prance-Smith
              als dry-aging lead bij Angler Restaurant Stirling in de
              Adelaide Hills, waar hij sashimi, vis-worsten, barramundi
              crackling, carp bacon en een carp burger ontwikkelde —
              uitgebreid gecoverd door InDaily, Australian Good Food Guide,
              Broadsheet Adelaide en Aquna (alle vier hieronder gelinkt).
            </p>
            <p>
              Sinds 2025 terug in Nederland als chef-kok bij shared-dining
              restaurant De Tafelaar aan de Kamp in het centrum van
              Amersfoort (eigenaar Jan Molmans) — gefeatured in AD.nl, De
              Gelderlander, indebuurt.nl en de Gooische Business podcast.
              Parallel aan die chef-job draait Jeremy Jezza Cooks: chef-led
              restaurant consultancy, restaurant websites (€400 per site) en
              SEO + GEO optimalisatie (€1.300/jaar of €150/mnd). Met Jan
              Molmans runt hij daarnaast Tafelaar × Jezza Cooks Catering —
              een aparte cateringtak voor kantoorlunch, diners en events
              vanuit de restaurantkeuken aan de Kamp 8. Dat maakt hem een
              van de weinige operators in Nederland die tegelijk de keuken,
              de vloer en de zoekmachines begrijpt.
            </p>
          </div>

          {/* Real verified quote from AGFG */}
          <figure className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-10">
            <Quote className="h-10 w-10 text-primary/60" />
            <blockquote className="mt-4 font-headline text-xl md:text-2xl leading-relaxed text-foreground italic">
              "I love organised chaos — and that's the same for my dry-age
              recipes as well. They're organised, but they change
              constantly."
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              — Jeremy Arrascaeta, geciteerd in{" "}
              <a
                href="https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Australian Good Food Guide, 2020
              </a>
              . Dit is ook de oorsprong van de tagline "Level up the chaos"
              die je terug ziet op jezzacooks.com.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* PRESS MENTIONS */}
      <section className="py-16 md:py-24 bg-card/10 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <p className="font-headline text-primary text-sm font-bold tracking-widest uppercase">
              As seen in
            </p>
            <h2 className="mt-3 font-headline text-3xl md:text-4xl font-bold">
              Pers-vermeldingen
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Alle vier de vermeldingen zijn openbaar en verifieerbaar. Klik
              door naar de originele artikelen.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SITE.press.map((p) => (
              <Card key={p.url} className={cn(cardBase, cardHover)}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground font-semibold">
                        <Newspaper className="h-3.5 w-3.5" />
                        <span>{p.publication}</span>
                      </div>
                      <CardTitle className="font-headline text-xl mt-2">
                        {p.title}
                      </CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {p.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {p.excerpt}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
                  >
                    Lees het originele artikel
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto italic">
            Let op: de "Jeremy Arrascaeta" die in voetbal-resultaten verschijnt
            is Giorgian de Arrascaeta van Flamengo — een andere persoon. Alle
            vermeldingen hierboven gaan over de chef.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Wil je op deze lijst komen?
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Restaurant, catering of hospitality merk in Amersfoort, Utrecht of
            Nederland? Vraag een gratis diagnose aan. Ik vertel binnen 48 uur
            of er een match is.
          </p>
          <Link
            href="/free-diagnosis"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "mt-8 bg-foreground text-background hover:bg-foreground/80 font-bold"
            )}
          >
            Start gratis diagnose <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
