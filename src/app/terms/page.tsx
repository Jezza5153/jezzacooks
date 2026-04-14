// src/app/terms/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Voorwaarden en algemene bepalingen",
  description:
    "Algemene voorwaarden van Jezza Cooks (KvK 99547619, Amersfoort). Offertes, betaling, levering, intellectueel eigendom, aansprakelijkheid en toepasselijk recht voor consulting, catering, restaurant websites en SEO/GEO.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Voorwaarden | Jezza Cooks",
    description:
      "Algemene voorwaarden voor horeca consulting, catering, restaurant websites en SEO/GEO optimalisatie. Amersfoort, Nederland.",
    type: "article",
    url: "/terms",
  },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. Wie we zijn",
    body: [
      `Deze voorwaarden zijn van toepassing op alle offertes, opdrachten en diensten van Jezza Cooks, eenmanszaak gevestigd aan de Nijkerkerstraat 3, 3821 CD Amersfoort, ingeschreven bij de Kamer van Koophandel onder nummer ${SITE.kvk}. Oprichter en eindverantwoordelijke: Jeremy Arrascaeta ("Chef Jezz").`,
      `Contact: ${SITE.contact.email} · ${SITE.contact.phoneDisplay}. Diensten worden aangeboden in vier lijnen: restaurant consulting, catering en private chef, restaurant websites en SEO/GEO optimalisatie.`,
    ],
  },
  {
    title: "2. Offertes en totstandkoming overeenkomst",
    body: [
      "Alle offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders aangegeven. Een overeenkomst komt tot stand na schriftelijke bevestiging (e-mail of getekende opdrachtbevestiging). Mondelinge afspraken worden zo snel mogelijk schriftelijk bevestigd.",
      "Prijzen in offertes zijn exclusief 21% BTW tenzij uitdrukkelijk anders vermeld. Reiskosten buiten een straal van 25 km rond Amersfoort worden apart gespecificeerd.",
    ],
  },
  {
    title: "3. Consulting — scope en uitvoering",
    body: [
      "Consulting opdrachten worden afgerekend per dagdeel (4 uur) of per traject. Een dagdeel is exclusief reistijd, tenzij die binnen het werkgebied Amersfoort valt. Rapportages en SOP's worden digitaal geleverd als PDF of Notion/Google Doc.",
      "De opdrachtgever zorgt voor toegang tot de werkvloer, kassa- en voorraadcijfers waar relevant, en een contactpersoon die beslissingen kan nemen. Zonder die toegang is een zinvol traject niet mogelijk.",
    ],
  },
  {
    title: "4. Catering — bestellingen, wijzigingen en annulering",
    body: [
      "Cateringopdrachten worden definitief na aanbetaling van 25% en een bevestigd gastenaantal. Het definitieve gastenaantal moet uiterlijk 5 werkdagen vóór het event worden doorgegeven. Daarna is bijboeken alleen mogelijk tegen meerprijs.",
      "Annulering: tot 14 dagen vóór het event kosteloos, tussen 14 en 7 dagen 50% van het offertebedrag, binnen 7 dagen 100%. Bij force majeure (ziekte chef, overmacht leverancier) bieden we in redelijkheid een alternatief of volledige restitutie aan.",
    ],
  },
  {
    title: "5. Restaurant websites — €400 eenmalig",
    body: [
      "De standaard website tier is €400 eenmalig inclusief setup, Next.js build, schema.org markup, responsive design en basis SEO. Optioneel onderhoud is €30 per maand (opzegbaar per maand) en omvat content wijzigingen, klein redactie werk en updates.",
      "Afgesproken opleveringen worden gedaan binnen 2 tot 4 weken na bevestiging en aanlevering van content. De opdrachtgever levert teksten, logo en beeld aan. Domein en hosting lopen op naam van de opdrachtgever — geen lock-in.",
    ],
  },
  {
    title: "6. SEO en GEO — maand- en jaartarieven",
    body: [
      "SEO en GEO optimalisatie wordt geboden op jaarbasis (€1.300 excl. BTW per jaar) of maandelijks (€150 per maand). Het jaarcontract is scherper geprijsd en bevat alle maandelijkse deliverables.",
      "Deliverables worden maandelijks opgeleverd: technical audit check, passage extraction optimalisatie, lokale Amersfoort signalen, schema updates en een 1-pagina rapportage. Rankings en citaties zijn geen garantie — zoekmachine-algoritmes zijn van derden, niet van ons.",
    ],
  },
  {
    title: "7. Betaling",
    body: [
      "Facturen hebben een betalingstermijn van 14 dagen. Bij overschrijding wordt de wettelijke handelsrente in rekening gebracht plus €40 aan incassokosten conform artikel 6:96 BW.",
      "Consulting en catering worden standaard gefactureerd na oplevering. Websites worden voor 50% vooraf en 50% bij oplevering gefactureerd. Maandelijkse contracten (onderhoud, SEO/GEO) worden per maand vooraf gefactureerd.",
    ],
  },
  {
    title: "8. Intellectueel eigendom",
    body: [
      "Alle rapportages, SOP's, draaiboeken, menu-analyses en broncode blijven eigendom van Jezza Cooks tot volledige betaling. Na betaling verkrijgt de opdrachtgever een niet-exclusief, eeuwigdurend gebruiksrecht voor eigen bedrijfsvoering.",
      "Websites worden opgeleverd onder een vrije licentie — de opdrachtgever mag de code hosten en wijzigen waar nodig. Jezza Cooks behoudt het recht om het werk te noemen in een portfolio tenzij vooraf schriftelijk anders afgesproken.",
    ],
  },
  {
    title: "9. Aansprakelijkheid",
    body: [
      "Jezza Cooks is alleen aansprakelijk voor directe schade die een gevolg is van toerekenbare tekortkoming, gemaximeerd op het factuurbedrag van de betreffende opdracht. Indirecte schade, gevolgschade, winstderving, reputatieschade of verlies van data zijn uitgesloten voor zover de wet dat toestaat.",
      "Voor cateringopdrachten wordt HACCP conform gewerkt. Voor websites en SEO wordt gewerkt volgens best practices — rankings en AI citaties zijn nooit gegarandeerd omdat die afhangen van zoekmachine algoritmes van derden.",
    ],
  },
  {
    title: "10. Toepasselijk recht en geschillen",
    body: [
      "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden eerst in overleg opgelost. Komt dat overleg niet tot een oplossing, dan worden geschillen voorgelegd aan de rechtbank Midden-Nederland, locatie Utrecht.",
      `Deze voorwaarden zijn voor het laatst bijgewerkt op 14 april 2026. Vragen of opmerkingen? Stuur een e-mail naar ${SITE.contact.email}.`,
    ],
  },
];

export default function TermsPage() {
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Voorwaarden", item: "/terms" },
  ]);

  return (
    <div>
      <JsonLd data={breadcrumb} id="schema-terms-breadcrumb" />
      <PageHeader
        title="Voorwaarden"
        subtitle="Algemene voorwaarden Jezza Cooks — KvK 99547619, Amersfoort. Laatst bijgewerkt 14 april 2026."
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-muted-foreground">
              Deze voorwaarden gelden voor alle diensten van Jezza Cooks:
              restaurant consulting, catering en private chef, restaurant
              websites en SEO/GEO optimalisatie. Ze zijn bewust kort en in
              begrijpelijk Nederlands geschreven. Heb je vragen over een
              specifieke clausule? Stuur een e-mail naar{" "}
              <a
                href={`mailto:${SITE.contact.email}`}
                className="text-primary underline underline-offset-4"
              >
                {SITE.contact.email}
              </a>
              .
            </p>

            <div className="space-y-10">
              {sections.map((s) => (
                <div key={s.title}>
                  <h2 className="font-headline text-2xl font-bold text-foreground">
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-sm font-semibold text-foreground">
                Bedrijfsgegevens
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-foreground/80">Naam</dt>
                  <dd>Jezza Cooks (eenmanszaak)</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80">KvK</dt>
                  <dd>{SITE.kvk}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80">Adres</dt>
                  <dd>
                    {SITE.address.streetAddress}
                    <br />
                    {SITE.address.postalCode} {SITE.address.addressLocality}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80">E-mail</dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="text-primary underline underline-offset-4"
                    >
                      {SITE.contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
