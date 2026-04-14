// src/app/privacy/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Jezza Cooks (KvK 99547619, Amersfoort). Hoe wij omgaan met persoonsgegevens: wat we verzamelen via contactformulieren, bewaartermijnen, cookies, uw AVG-rechten en hoe u een klacht kunt indienen bij de Autoriteit Persoonsgegevens.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacyverklaring | Jezza Cooks",
    description:
      "AVG/GDPR conforme privacyverklaring van Jezza Cooks — horeca consultancy, catering en restaurant websites in Amersfoort.",
    type: "article",
    url: "/privacy",
  },
};

const sections: { title: string; body: (string | string[])[] }[] = [
  {
    title: "1. Wie is verantwoordelijk voor uw gegevens?",
    body: [
      `Jezza Cooks is verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven in deze privacyverklaring. Jezza Cooks is een eenmanszaak ingeschreven bij de Kamer van Koophandel onder nummer ${SITE.kvk}, gevestigd aan de Nijkerkerstraat 3, 3821 CD Amersfoort. Oprichter en eindverantwoordelijke voor gegevensverwerking is Jeremy Arrascaeta (Chef Jezz).`,
      `Vragen of verzoeken over uw persoonsgegevens kunt u richten aan ${SITE.contact.email} of telefonisch ${SITE.contact.phoneDisplay}. Wij reageren binnen 14 dagen.`,
    ],
  },
  {
    title: "2. Welke persoonsgegevens verzamelen wij?",
    body: [
      "Jezza Cooks verzamelt alleen persoonsgegevens die u zélf actief aanlevert via een van de contactformulieren op deze website of via direct contact per e-mail, telefoon, WhatsApp of Instagram. Wij gebruiken geen tracking-cookies, geen third-party analytics en geen advertentienetwerken. De site heeft geen Google Analytics, geen Facebook pixel en geen vergelijkbare tracking.",
      "Concreet verzamelen wij via onze formulieren (contact, gratis quick scan, diagnosis, catering-aanvraag) de volgende gegevens:",
      [
        "Naam (voor- en achternaam)",
        "E-mailadres",
        "Telefoonnummer (optioneel bij sommige formulieren)",
        "Bedrijfsnaam (optioneel)",
        "Inhoud van uw bericht of aanvraag",
        "Eventuele bijlagen die u zelf meestuurt",
      ],
      "Wij verzamelen géén betaalgegevens via de website — facturering gaat buitenom via bankoverschrijving na ondertekende opdrachtbevestiging.",
    ],
  },
  {
    title: "3. Met welk doel en op welke grondslag?",
    body: [
      "Wij verwerken uw persoonsgegevens uitsluitend voor de volgende doeleinden:",
      [
        "Het beantwoorden van uw vraag of offerteaanvraag (grondslag: uitvoering van de overeenkomst of precontractuele maatregelen op uw verzoek, artikel 6 lid 1 sub b AVG).",
        "Het uitvoeren van een opdracht die u bij ons plaatst (grondslag: uitvoering overeenkomst, artikel 6 lid 1 sub b AVG).",
        "Het voldoen aan wettelijke verplichtingen, zoals de fiscale bewaarplicht voor facturen (grondslag: wettelijke verplichting, artikel 6 lid 1 sub c AVG).",
        "Het voeren van een klantadministratie voor lopende en afgeronde opdrachten (grondslag: gerechtvaardigd belang, artikel 6 lid 1 sub f AVG).",
      ],
      "Wij gebruiken uw gegevens niet voor geautomatiseerde besluitvorming of profiling. Wij versturen geen nieuwsbrieven of marketing-mails tenzij u daar uitdrukkelijk om hebt gevraagd.",
    ],
  },
  {
    title: "4. Hoe lang bewaren wij uw gegevens?",
    body: [
      "Wij bewaren persoonsgegevens niet langer dan strikt noodzakelijk voor het doel waarvoor ze zijn verzameld:",
      [
        "Offerte-aanvragen die niet leiden tot een opdracht: maximaal 12 maanden, daarna verwijderd.",
        "Klantgegevens van uitgevoerde opdrachten: maximaal 7 jaar in verband met de fiscale bewaarplicht (artikel 52 Algemene wet inzake rijksbelastingen).",
        "Facturen en boekhoudkundige stukken: 7 jaar conform fiscale wetgeving.",
        "E-mailcorrespondentie: maximaal 2 jaar na laatste contact, tenzij er een lopende opdracht is.",
      ],
      "Na afloop van de bewaartermijn worden de gegevens definitief verwijderd uit onze systemen.",
    ],
  },
  {
    title: "5. Met wie delen wij uw gegevens?",
    body: [
      "Jezza Cooks deelt uw persoonsgegevens alleen met derden waar dat noodzakelijk is voor de uitvoering van onze dienstverlening of om te voldoen aan een wettelijke verplichting. Wij verkopen nooit gegevens aan derden en gebruiken ze niet voor marketingdoeleinden buiten onze eigen dienstverlening.",
      "Concreet kan er sprake zijn van verwerking door de volgende categorieën van verwerkers:",
      [
        "Hostingpartij voor deze website (de site draait op een Europese cloud-omgeving, gegevens blijven binnen de EU).",
        "SMTP/e-mailprovider voor het verzenden van formulier-inzendingen naar onze inbox (nodemailer via een SMTP-server).",
        "Boekhouder of boekhoudsoftware voor de financiële administratie.",
        "Eventuele onder-aannemers bij grote catering- of consulting-opdrachten — alleen de minimaal benodigde gegevens en altijd onder geheimhouding.",
      ],
      "Met al deze partijen hebben wij passende afspraken gemaakt (verwerkersovereenkomsten waar van toepassing) om de bescherming van uw gegevens te waarborgen. Er vindt geen doorgifte plaats naar landen buiten de Europese Economische Ruimte (EER).",
    ],
  },
  {
    title: "6. Cookies en vergelijkbare technieken",
    body: [
      "Deze website gebruikt géén tracking-cookies, géén advertentie-cookies en géén analytics-cookies. Er is geen cookie-banner omdat er niets te accepteren valt — wij plaatsen simpelweg geen cookies die uw toestemming vereisen.",
      "De enige cookies die eventueel geplaatst kunnen worden zijn strikt functionele cookies die noodzakelijk zijn voor de werking van de website (bijvoorbeeld een sessie-cookie voor het onthouden van formulier-staat tijdens uw bezoek). Deze cookies zijn onder de ePrivacy-richtlijn vrijgesteld van toestemming omdat ze uitsluitend dienen voor de gevraagde communicatie.",
      "Wij gebruiken geen Google Analytics, Facebook Pixel, Hotjar, LinkedIn Insight Tag of vergelijkbare tracking-technologie. Als daar in de toekomst verandering in komt, wordt deze privacyverklaring aangepast en krijgt u — waar vereist — eerst een toestemmingsverzoek.",
    ],
  },
  {
    title: "7. Uw rechten onder de AVG",
    body: [
      "Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten met betrekking tot uw persoonsgegevens:",
      [
        "Recht op inzage — u mag opvragen welke gegevens wij van u hebben.",
        "Recht op rectificatie — onjuiste gegevens laten corrigeren.",
        "Recht op verwijdering (\"recht om vergeten te worden\") — in de gevallen waarin dat wettelijk kan.",
        "Recht op beperking van de verwerking — tijdelijk stilzetten van verwerking.",
        "Recht op dataportabiliteit — uw gegevens in een gangbaar formaat ontvangen.",
        "Recht van bezwaar — tegen verwerking op basis van gerechtvaardigd belang.",
        "Recht om een eerder gegeven toestemming in te trekken.",
      ],
      `U kunt deze rechten uitoefenen door een e-mail te sturen naar ${SITE.contact.email}. Om zeker te weten dat het verzoek van u afkomstig is kunnen wij u vragen om een kopie van uw identiteitsbewijs (met BSN en pasfoto afgeschermd). Wij reageren binnen 4 weken op uw verzoek.`,
    ],
  },
  {
    title: "8. Beveiliging van uw gegevens",
    body: [
      "Jezza Cooks neemt passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen verlies, onbedoelde wijziging, ongeoorloofde openbaarmaking of toegang. Concreet betekent dat:",
      [
        "Alle communicatie tussen uw browser en onze website gaat via HTTPS (TLS 1.3).",
        "Onze e-mail gaat via een provider met SPF, DKIM en DMARC geconfigureerd.",
        "Gegevensopslag is beperkt tot wat strikt nodig is — we bewaren geen gegevens \"voor later\".",
        "Toegang tot systemen is beperkt tot Jeremy Arrascaeta persoonlijk; er is geen team dat mee-leest.",
        "Wachtwoorden en tokens worden beheerd via een wachtwoordmanager met 2FA.",
      ],
      "Mocht er ondanks deze maatregelen toch een datalek ontstaan dat een risico vormt voor uw rechten en vrijheden, dan melden wij dat binnen 72 uur bij de Autoriteit Persoonsgegevens en — waar nodig — aan u persoonlijk.",
    ],
  },
  {
    title: "9. Minderjarigen",
    body: [
      "Onze dienstverlening richt zich op ondernemers en bedrijven — onze website is niet bedoeld voor kinderen onder de 16 jaar en wij verzamelen bewust geen gegevens van minderjarigen. Als u vermoedt dat wij toch gegevens van een minderjarige hebben verzameld, neem dan contact op zodat wij die gegevens kunnen verwijderen.",
    ],
  },
  {
    title: "10. Klacht indienen",
    body: [
      "Als u het niet eens bent met hoe wij uw gegevens verwerken, willen wij dat graag eerst zelf oplossen. Neem contact op via bovenstaande gegevens en wij zoeken samen naar een passende oplossing.",
      "Mocht dat niet naar tevredenheid lukken, dan heeft u altijd het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens, de Nederlandse toezichthouder op de privacywetgeving: Postbus 93374, 2509 AJ Den Haag, www.autoriteitpersoonsgegevens.nl.",
    ],
  },
  {
    title: "11. Wijzigingen in deze privacyverklaring",
    body: [
      "Deze privacyverklaring kan worden aangepast als onze werkwijze of de wetgeving verandert. De meest recente versie staat altijd op deze pagina, met de datum waarop hij voor het laatst is bijgewerkt. Substantiële wijzigingen kondigen wij aan via onze homepage of — als u al klant bent — per e-mail.",
      "Deze privacyverklaring is voor het laatst bijgewerkt op 14 april 2026.",
    ],
  },
];

export default function PrivacyPage() {
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", item: "/" },
    { name: "Privacyverklaring", item: "/privacy" },
  ]);

  return (
    <div>
      <JsonLd data={breadcrumb} id="schema-privacy-breadcrumb" />
      <PageHeader
        title="Privacyverklaring"
        subtitle="Hoe Jezza Cooks omgaat met uw persoonsgegevens — AVG-conform, zonder tracking of advertising. Laatst bijgewerkt 14 april 2026."
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-muted-foreground">
              Wij nemen uw privacy serieus. Deze verklaring legt kort en in
              begrijpelijk Nederlands uit welke gegevens wij verwerken, waarom
              dat mag, hoe lang we ze bewaren en welke rechten u heeft. Geen
              juridisch jargon, geen cookie-tsunami — deze website gebruikt
              géén tracking en géén advertising. Heeft u vragen? Stuur een
              e-mail naar{" "}
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
                  <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                    {s.body.map((entry, i) => {
                      if (Array.isArray(entry)) {
                        return (
                          <ul
                            key={i}
                            className="ml-5 list-disc space-y-2 text-muted-foreground"
                          >
                            {entry.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i}>{entry}</p>;
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-border bg-card/40 p-6">
              <div className="text-sm font-semibold text-foreground">
                Verwerkingsverantwoordelijke
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
                  <dt className="font-semibold text-foreground/80">
                    E-mail (privacy)
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="text-primary underline underline-offset-4"
                    >
                      {SITE.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80">Telefoon</dt>
                  <dd>{SITE.contact.phoneDisplay}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground/80">
                    Toezichthouder
                  </dt>
                  <dd>
                    <a
                      href="https://www.autoriteitpersoonsgegevens.nl"
                      className="text-primary underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Autoriteit Persoonsgegevens
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
