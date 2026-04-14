// src/app/services/websites/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import WebsitesPageLayout from "@/components/websites/websites-page";
import JsonLd from "@/components/seo/json-ld";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildServicePage,
} from "@/lib/schema";
import { SITE } from "@/lib/site-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Check } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Restaurant websites vanaf €400 — Amersfoort | Jezza Cooks",
  description:
    "Restaurant website laten maken in Amersfoort vanaf €400 eenmalig plus optioneel €30/mnd onderhoud. Chef-led door Jeremy Arrascaeta (chef-kok De Tafelaar Amersfoort, 10+ jaar high-end keukens). Mobile-first, schema.org/GEO, reservations-integratie en directe boekingen. Utrecht, Zwolle, Hilversum, Apeldoorn en heel Nederland.",
  alternates: { canonical: "/services/websites" },
  openGraph: {
    title: "Restaurant websites vanaf €400 — Amersfoort | Jezza Cooks",
    description:
      "Chef-led restaurant websites vanaf €400 eenmalig + €30/mnd optioneel onderhoud. Mobile-first, reservations-integratie, schema.org en GEO-optimalisatie voor Google en AI zoekmachines.",
    url: "/services/websites",
    type: "website",
  },
  keywords: [
    "restaurant website laten maken",
    "restaurant website Amersfoort",
    "horeca website",
    "website voor restaurant",
    "hospitality website",
    "webdesign restaurant Amersfoort",
    "conversie optimalisatie horeca",
    "SEO restaurant website",
    "reserveringssysteem website",
    "chef website bouwen",
  ],
};

const websitesServiceSchema = buildServicePage({
  slug: "websites",
  name: "Restaurant websites",
  description:
    "Chef-led restaurant websites vanaf €400 eenmalig plus optioneel €30/mnd onderhoud. Mobile-first, snel, toegankelijk en gebouwd op een sterke SEO/GEO basis met schema.org markup. Focus op directe reserveringen, aanvragen en vertrouwen. Voor restaurants, cafés, catering en hospitality in Amersfoort, Utrecht, Zwolle, Hilversum, Apeldoorn en heel Nederland.",
  areaServed: ["Amersfoort", "Utrecht", "Zwolle", "Hilversum", "Apeldoorn", "Nederland"],
});

const websitesBreadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Diensten", item: "/services" },
  { name: "Restaurant websites", item: "/services/websites" },
]);

// --- FAQ content (130-167 words each, GEO passage-optimized) -----------------

const faqs = [
  {
    q: "Wat kost een restaurant website bij Jezza Cooks?",
    a: "Een complete restaurant website kost €400 eenmalig. Daar zit alles in: design, opbouw, content-structuur, mobile-first development, schema.org/JSON-LD, GEO-optimalisatie voor Google en AI zoekmachines, basis-SEO en oplevering op je eigen domein. Optioneel kun je daarna €30/mnd onderhoud afnemen — dat dekt hosting, security updates, backups, kleine contentwijzigingen (openingstijden, menu, foto's) en een maandelijkse performance-check. Je hoeft geen onderhoudscontract af te nemen als je dat zelf wilt doen; de site wordt opgeleverd als een werkend, gedocumenteerd geheel. Geen verborgen kosten, geen setup fees, geen dure templates waar je maandelijks voor betaalt. Ter vergelijking: één extra reservering van €65 gemiddeld per week verdient de website in 7 weken al terug. Voor complexere opdrachten (multi-locatie, custom CMS, e-commerce) maak ik een offerte op maat — altijd chef-led en altijd zonder bullshit.",
  },
  {
    q: "Wat zit er in de €400 website?",
    a: "In de €400 zit een volledig functionele restaurant website: homepage met duidelijk verhaal en CTA, menu-pagina, reserveringen- of contact-integratie, over ons / chef-story, locatie met Google Maps embed, openingstijden en NAP-data die matcht met je Google Business Profile. Technisch krijg je: mobile-first responsive design, Core Web Vitals passing (LCP, INP, CLS), schema.org JSON-LD (LocalBusiness, Restaurant, Menu, OpeningHoursSpecification), sitemap.xml, robots.txt, Open Graph meta tags voor social sharing, HTTPS via Let's Encrypt en analytics-integratie. Content-wise schrijf ik de kern-copy in het Nederlands — chef-led, zonder marketing-bullshit. Je levert de foto's aan (of ik schiet ze ter plekke tegen meerkosten). Oplevering duurt gemiddeld 2 tot 3 weken afhankelijk van hoe snel jij content kunt aanleveren. Na oplevering krijg je een korte video-handleiding voor simpele aanpassingen zoals menu-updates.",
  },
  {
    q: "Hoe lang duurt het om een restaurant website te bouwen?",
    a: "Een standaard restaurant website kost 2 tot 3 weken van kick-off tot live, aangenomen dat jij binnen die periode foto's, menu's en tekst-input kunt aanleveren. Week 1: intake call (1 uur, op locatie in Amersfoort of via video), structuurvoorstel, designrichting. Week 2: build, content invoer, reserveringsintegratie, schema.org markup, performance-tuning. Week 3: feedback-ronde, laatste aanpassingen, go-live en handover. Voor Pro of Custom pakketten (meer pagina's, eigen merkidentiteit, animaties) reken je 4 tot 6 weken. De grootste vertraging is altijd content-aanlevering van de klant kant — niet development. Als jij het onder controle hebt loopt het strak. Spoedwerk (live binnen 7 dagen) is mogelijk tegen 25% toeslag, maar alleen als je de content al klaar hebt. Ik neem maximaal 2 website-projecten tegelijk aan zodat de kwaliteit en timing niet wegzakken.",
  },
  {
    q: "Welke reserveringssystemen integreren jullie?",
    a: "Ik integreer de reserveringssystemen die in Nederland écht werken voor restaurants: Formitable (zeer geschikt voor onafhankelijke restaurants in NL), TheFork (La Fourchette, veel bereik maar hoge commissies), Resengo (Belgische speler, sterk rond Gent/Antwerpen maar ook in NL), OpenTable (internationaal, goed voor toerist-heavy locaties) en Tableo (nieuw, snel groeiend). Als je nog geen systeem hebt adviseer ik meestal Formitable voor pure NL-operaties — lagere commissies, betere ondersteuning, Nederlandse interface voor je team. Als fallback bouw ik een custom reservatieformulier dat direct naar je e-mail of WhatsApp gaat (gratis, handmatige verwerking). Voor walk-in heavy zaken zoals cafés en bars gebruik ik vaak alleen een WhatsApp Business link + telefoon-CTA in de sticky header. Welke optie het beste bij jouw zaak past bepalen we in de intake — hangt af van volume, teamgrootte en of je no-shows wilt reduceren.",
  },
  {
    q: "Krijg ik ook SEO en GEO in de website?",
    a: "Ja, een sterke SEO/GEO-basis zit standaard in elke €400 website — dit is juist wat Jezza Cooks onderscheidt van standaard templates. Je krijgt: volledige schema.org JSON-LD markup (LocalBusiness, Restaurant, Menu, OpeningHoursSpecification, Organization, Person), NAP-consistentie (Name, Address, Phone) die één-op-één matcht met je Google Business Profile, mobile-first performance (Core Web Vitals passing), canonical URLs, XML sitemap, robots.txt, Open Graph tags voor social media, hreflang indien meertalig en Nederlandse content die geoptimaliseerd is voor zowel Google als AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews). De copy wordt geschreven in GEO-formaat: H2-kopjes als vragen, 130-167 woorden per sectie voor optimale passage-extractie, citeerbare statistieken en concrete details. Voor een uitgebreide doorlopende SEO/GEO campagne met content-productie, review-strategie en linkbuilding kijk je naar mijn SEO/GEO dienst (€150/mnd of €1300/jaar).",
  },
  {
    q: "Werk je alleen in Amersfoort of ook in andere steden?",
    a: "Standplaats is Amersfoort — ik draai zelf elke week service bij shared-dining restaurant De Tafelaar aan de Kamp 8 in de binnenstad, dus ik ken de lokale horeca-markt van binnenuit. Werkgebied voor intakes op locatie: heel Amersfoort en wijken (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Liendert), Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk, Barneveld en Amersfoort-Zuid. Voor opdrachten buiten dat gebied (Zwolle, Apeldoorn, Amsterdam, Rotterdam, Eindhoven) werk ik remote met één fysieke kick-off bij jou op locatie. De website-build zelf is 100% remote — enige reistijd zit in de intake en oplevering. KvK-inschrijving is Amersfoort (KvK 99547619), factuurland Nederland. Voor internationale opdrachten (België, Duitsland grensstreek) vraag ik een offerte op maat aan.",
  },
];

const websitesFaqSchema = buildFaqPage(
  faqs.map((f) => ({ question: f.q, answer: f.a })),
);

// --- Pricing cards content ---------------------------------------------------

const PRICING_TIERS = [
  {
    name: "Website",
    price: "€400",
    cadence: "eenmalig",
    description:
      "Complete launch-ready restaurant website. Alles inbegrepen: design, build, schema.org, GEO, SEO-basis en oplevering.",
    features: [
      "Mobile-first responsive design",
      "Schema.org JSON-LD (LocalBusiness, Menu, Hours)",
      "Reserveringssysteem-integratie naar keuze",
      "Core Web Vitals passing",
      "SEO-basis + Open Graph meta",
      "Google Maps embed + NAP-data",
      "2–3 weken van kick-off tot live",
    ],
    highlight: false,
  },
  {
    name: "Onderhoud",
    price: "€30",
    cadence: "per maand",
    description:
      "Optioneel. Hosting, security, backups, kleine content-aanpassingen en maandelijkse performance-check.",
    features: [
      "Hosting + HTTPS (Let's Encrypt)",
      "Dagelijkse offsite backups",
      "Security updates",
      "Maandelijkse performance-scan",
      "Kleine content-wijzigingen (hours, menu)",
      "Uptime-monitoring 24/7",
      "Opzegbaar per maand",
    ],
    highlight: true,
  },
] as const;

export default function WebsitesPage() {
  return (
    <>
      <JsonLd data={websitesServiceSchema} id="schema-websites-service" />
      <JsonLd data={websitesBreadcrumbSchema} id="schema-websites-breadcrumb" />
      <JsonLd data={websitesFaqSchema} id="schema-websites-faq" />

      <WebsitesPageLayout />

      {/* --- Pricing band (server-rendered for crawlers + AI) --- */}
      <section className="border-t border-border/60 bg-background/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Transparante prijzen
            </div>
            <h2 className="mt-3 font-headline text-3xl font-bold md:text-5xl">
              Vanaf €400 eenmalig. Geen verborgen kosten.
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Eén prijs voor een complete restaurant website. Optioneel €30 per
              maand voor hosting, security en kleine content-aanpassingen — of
              je doet het zelf.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative rounded-3xl border p-7 md:p-8",
                  tier.highlight
                    ? "border-primary/45 bg-primary/5"
                    : "border-border/35 bg-background/20",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {tier.name}
                    </div>
                    <div className="mt-2 font-headline text-4xl font-bold md:text-5xl">
                      {tier.price}
                      <span className="ml-2 text-base font-normal text-muted-foreground">
                        {tier.cadence}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground md:text-base">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-border/45 bg-background/25">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border/35 bg-background/15 p-5 text-center text-sm text-muted-foreground md:text-base">
            <strong className="text-foreground">Rekenvoorbeeld:</strong> één
            extra reservering van gemiddeld €65 per week verdient de €400
            website in 7 weken terug. Daarna is elke boeking pure marge.
          </div>
        </div>
      </section>

      {/* --- FAQ section (server-rendered, matches FAQPage schema) --- */}
      <section className="border-t border-border/60 bg-card/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Veelgestelde vragen
            </div>
            <h2 className="mt-3 font-headline text-3xl font-bold md:text-5xl">
              Restaurant website laten maken — de vragen die iedereen stelt
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Geen bullshit, geen verkoop-taal. De eerlijke antwoorden op wat
              horeca-ondernemers mij echt vragen over prijs, doorlooptijd en
              wat er in de website zit.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`websites-faq-${idx}`}
                  className="rounded-2xl border border-border/35 bg-background/20 px-5"
                >
                  <AccordionTrigger className="text-left font-headline text-lg font-semibold md:text-xl">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border/35 bg-background/15 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Klaar om te starten?
                </div>
                <div className="mt-2 font-headline text-xl font-bold md:text-2xl">
                  Begin met een gratis quick scan van je huidige site.
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Binnen 48 uur krijg je een rapport met de 5 belangrijkste
                  verbeterpunten — geen verplichting, geen verkooppraatje.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 md:w-auto md:min-w-[260px]">
                <Link
                  href="/free-diagnosis?service=websites"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "font-semibold rounded-2xl w-full justify-center",
                  )}
                >
                  Start gratis quick scan
                </Link>
                <Link
                  href="/contact?service=websites"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "font-semibold rounded-2xl w-full justify-center",
                  )}
                >
                  Plan een intake
                </Link>
              </div>
            </div>
          </div>

          {/* Local NAP band — GEO signal + trust */}
          <div className="mx-auto mt-8 max-w-3xl grid gap-4 rounded-2xl border border-border/35 bg-background/10 p-5 text-sm text-muted-foreground md:grid-cols-3 md:p-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                Vestiging
              </div>
              <div className="mt-1">
                {SITE.address.streetAddress}
                <br />
                {SITE.address.postalCode} {SITE.address.addressLocality}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                KvK
              </div>
              <div className="mt-1">99547619</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                Contact
              </div>
              <div className="mt-1">
                {SITE.contact.email}
                <br />
                {SITE.contact.phoneDisplay}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
            Laatst bijgewerkt: 14 april 2026
          </div>
        </div>
      </section>
    </>
  );
}
