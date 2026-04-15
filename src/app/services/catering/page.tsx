// src/app/services/catering/page.tsx
import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  ArrowRight,
  Package,
  Users,
  Leaf,
  Clock,
} from "lucide-react";
import CateringInquiryForm from "@/components/catering-inquiry-form";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbList, buildFaqPage, buildServicePage } from "@/lib/schema";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Catering Amersfoort — Tafelaar × Jezza Cooks | Kantoorlunch, diners, grote events door een restaurantteam",
  description:
    "Chef-led catering in Amersfoort door Tafelaar × Jezza Cooks Catering: een samenwerking tussen Jeremy Arrascaeta (chef-kok, 10+ jaar high-end keukens, finalist Euro-Toques Young Chef 2018, dry-aging lead Angler Stirling) en Jan Molmans (eigenaar De Tafelaar, Kamp 8). Niet een solo chef, maar een volwaardig restaurantteam (10 medewerkers) met restaurant-grade HACCP en backup-chef op stand-by. Kantoorlunch vanaf €7,50 p.p., diners, bruiloften, zakelijke events voor 10 tot 150+ personen. Vanuit de keuken van shared-dining restaurant De Tafelaar (Trustoo 9.8/10, TOP PRO 2026, KHN-lid).",
  alternates: { canonical: "/services/catering" },
  openGraph: {
    title: "Catering Amersfoort — Tafelaar × Jezza Cooks Catering",
    description:
      "Chef-led catering Amersfoort door een volwaardig restaurantteam van 10, niet één solo chef. Restaurant De Tafelaar (Trustoo 9.8/96 reviews, TOP PRO 2026, KHN-lid) + Jezza Cooks (Euro-Toques finalist, ex-Angler Stirling). Kantoorlunch, diners, bruiloften, zakelijke events tot 150+ personen. Backup-chef, restaurant-HACCP.",
    type: "website",
    url: "/services/catering",
  },
  keywords: [
    "catering amersfoort",
    "kantoorlunch amersfoort",
    "bedrijfscatering amersfoort",
    "zakelijke catering amersfoort",
    "bedrijfsfeest catering amersfoort",
    "groot event catering amersfoort",
    "grote events catering amersfoort",
    "event catering 150 personen",
    "high-end catering amersfoort",
    "restaurant catering amersfoort",
    "professionele catering amersfoort",
    "diner catering amersfoort",
    "private chef amersfoort",
    "bruiloftscatering amersfoort",
    "babyshower catering amersfoort",
    "verjaardag diner amersfoort",
    "chef op locatie amersfoort",
    "catering met service staff amersfoort",
    "catering kamp amersfoort",
    "catering binnenstad amersfoort",
    "catering vathorst",
    "catering soest",
    "catering leusden",
    "Tafelaar Jezza Cooks catering",
    "chef kok catering amersfoort",
    "shared dining catering",
    "KHN lid catering amersfoort",
    "HACCP catering amersfoort",
  ],
};

const cateringServiceSchema = buildServicePage({
  slug: "catering",
  name: "Tafelaar × Jezza Cooks Catering Amersfoort",
  description:
    "Chef-led catering in Amersfoort en omgeving als samenwerking tussen Jezza Cooks (Jeremy Arrascaeta) en shared-dining restaurant De Tafelaar (Jan Molmans, Kamp 8 Amersfoort). Kantoorlunch, borrel, diners voor verjaardagen, babyshowers, bruiloften, private chef events en zakelijke catering, vanuit de volwaardige restaurantkeuken van De Tafelaar. Jeremy Arrascaeta is 10+ jaar chef in high-end keukens in Europa en Australië (Bougainville Amsterdam, Angler Stirling, Hanson Bay), finalist Euro-Toques Young Chef Award 2018, en is zelf chef-kok in de De Tafelaar keuken. Gefeatured in AD.nl Amersfoort, De Gelderlander en indebuurt.nl.",
  areaServed: [
    "Amersfoort",
    "Binnenstad Amersfoort",
    "Kamp Amersfoort",
    "Soesterkwartier",
    "Leusderkwartier",
    "Vathorst",
    "Valleipoort",
    "Hoogland",
    "Hooglanderveen",
    "Utrecht",
    "Hilversum",
    "Soest",
    "Leusden",
    "Baarn",
    "Bunschoten",
    "Nijkerk",
    "Barneveld",
  ],
});

const cateringBreadcrumbSchema = buildBreadcrumbList([
  { name: "Home", item: "/" },
  { name: "Diensten", item: "/services" },
  { name: "Catering", item: "/services/catering" },
]);

type MenuItem = {
  name: string;
  description: string;
  price?: string;
  veg?: boolean;
  allergens: string;
};

type MenuSection = {
  id: string;
  title: string;
  priceLabel: string;
  items: MenuItem[];
  note?: string;
  highlight?: boolean;
};

const ui = {
  // lighter “Night” so it feels less heavy (rest stays exactly the same)
  page: "relative bg-[#0F141B] text-[#F3EDE3] pb-28",
  container: "container mx-auto px-4",
  sectionY: "py-12 md:py-20",

  // same glow logic, plus a soft linen wash to lift the background a touch
  bgFX:
    "pointer-events-none absolute inset-0 -z-10 " +
    "bg-[radial-gradient(900px_460px_at_20%_10%,rgba(245,184,65,0.10),transparent_60%)] " +
    "before:absolute before:inset-0 before:content-[''] " +
    "before:bg-[linear-gradient(180deg,rgba(243,237,227,0.045),transparent_28%,transparent_72%,rgba(243,237,227,0.025))] " +
    "after:absolute after:inset-0 after:content-[''] " +
    "after:bg-[radial-gradient(900px_520px_at_85%_85%,rgba(216,198,174,0.10),transparent_62%)]",

  paper:
    "rounded-3xl border border-[#D8C6AE]/50 bg-[#F3EDE3] text-[#0B0F14] " +
    "shadow-[0_24px_80px_rgba(0,0,0,0.35)]",
  paperSoft:
    "rounded-3xl border border-[#D8C6AE]/45 bg-[#F3EDE3]/95 text-[#0B0F14] " +
    "shadow-[0_22px_70px_rgba(0,0,0,0.32)]",
  paperInset:
    "rounded-2xl border border-[#D8C6AE]/55 bg-[#D8C6AE]/25 text-[#0B0F14]",

  pill:
    "inline-flex items-center gap-2 rounded-full border border-[#D8C6AE]/70 " +
    "bg-[#F3EDE3] px-3 py-1 text-xs font-semibold text-[#0B0F14]/70",
  copperDot: "inline-block h-1.5 w-1.5 rounded-full bg-[#C65A2E]",

  mutedOnPaper: "text-[#0B0F14]/75",
  mutedOnNight: "text-[#F3EDE3]/75",

  ctaPrimary:
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold " +
    "bg-[#F5B841] text-[#0B0F14] " +
    "shadow-[0_14px_40px_rgba(245,184,65,0.18)] " +
    "transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B841]/50",
  ctaSecondary:
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold " +
    "border border-[#D8C6AE]/70 text-[#F3EDE3] " +
    "bg-transparent transition hover:bg-white/5 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B841]/35",

  microLink:
    "underline decoration-[#C65A2E] decoration-2 underline-offset-4 hover:opacity-90",
};

const quickBullets = [
  {
    icon: Users,
    title: "Bedrijven en teams",
    text: "Van vergaderlunch tot teamdag. Wij maken het makkelijk.",
  },
  {
    icon: Package,
    title: "Transportproof",
    text: "Strak verpakt, overzichtelijk geleverd, direct klaar om neer te zetten.",
  },
  {
    icon: Leaf,
    title: "Goede vegetarische keuzes",
    text: "Niet iets erbij, maar opties die echt kloppen.",
  },
  {
    icon: Clock,
    title: "Klaar om te serveren",
    text: "Geen gedoe op kantoor. Uitpakken en klaar.",
  },
];

const menu: MenuSection[] = [
  {
    id: "broodjes",
    title: "Kantoorlunch broodjes",
    priceLabel: "€ 7,50",
    items: [
      {
        name: "Vitello Tonnato Sandwich",
        description: "Biologisch kalfsvlees · tonijnmayonaise · kappertjes · rucola",
        allergens: "gluten · vis · eieren",
      },
      {
        name: "Carpaccio Truffel",
        description: "Rundercarpaccio · truffelmayonaise · Parmezaan · rucola",
        allergens: "gluten · lactose · eieren",
      },
      {
        name: "Gerookte Zalm en Dille",
        description: "Gerookte zalm · citroen · dille · komkommer",
        allergens: "gluten · vis",
      },
      {
        name: "Inari Bao-Style Sandwich",
        description: "Inari · sriracha-mayonaise · knapperige groente",
        veg: true,
        allergens: "gluten · soja · eieren",
      },
    ],
  },
  {
    id: "bowls",
    title: "Kantoorlunch bowls",
    priceLabel: "€ 10,50",
    items: [
      {
        name: "Carpaccio Salad Bowl",
        description: "Carpaccio · Parmezaan · truffelmayonaise · tomaat · rucola",
        allergens: "lactose · eieren",
      },
      {
        name: "Zalm en Komkommer Bowl",
        description: "Gerookte zalm · citroen · dille · komkommer · groene salade",
        allergens: "vis",
      },
      {
        name: "Bieten en Geitenkaas Bowl",
        description: "Bietencarpaccio · geitenkaas · walnoot · honing",
        veg: true,
        allergens: "lactose · noten",
      },
      {
        name: "Inari Power Bowl",
        description: "Inari · sesam · frisse groenten · sriracha mayonaise",
        veg: true,
        allergens: "soja · sesam · eieren",
      },
    ],
  },
  {
    id: "wraps",
    title: "Kantoorlunch wraps",
    priceLabel: "€ 7,50",
    items: [
      {
        name: "Pulled Pork Wrap",
        description: "Pulled pork · sriracha-mayonaise · frisse koolsla",
        allergens: "gluten · eieren · soja",
      },
      {
        name: "Veggie Meatball Wrap",
        description: "Vegetarische balletjes · tomatensaus · rucola",
        veg: true,
        allergens: "gluten · soja",
      },
      {
        name: "Zalm Wrap",
        description: "Gerookte zalm · dille · citroen · komkommer",
        allergens: "gluten · vis",
      },
    ],
  },
  {
    id: "lunchpakketten",
    title: "Lunchpakketten",
    priceLabel: "Meest gekozen",
    highlight: true,
    items: [
      {
        name: "Lunch Box – Classic",
        description:
          "Vitello tonnato sandwich · kleine carpaccio salade · gevuld eitje · zoete bite",
        price: "€ 14,50",
        allergens: "gluten · vis · eieren · lactose",
      },
      {
        name: "Lunch Box – Vegetarisch",
        description:
          "Inari bao-style sandwich · bieden en geitenkaas bowl · peppadew met roomkaas · zoete bite",
        price: "€ 13,50",
        veg: true,
        allergens: "gluten · soja · eieren · lactose · noten",
      },
      {
        name: "Lunch Box – Premium",
        description: "Wrap (keuze) · salad bowl · charcuterie of kaas · dessert",
        price: "€ 18,50",
        allergens: "gluten · lactose · eieren · noten · vis · soja",
      },
    ],
    note:
      "Tip: als je veel dieetwensen hebt, is Build your own lunch vaak het makkelijkst om het goed te laten landen bij iedereen.",
  },
];

const faqs = [
  {
    q: "Voor hoeveel personen kan ik catering bestellen in Amersfoort?",
    a: "Tafelaar × Jezza Cooks Catering levert voor 10 tot 150+ personen in Amersfoort en omgeving. Voor kleinere groepen (10-30 personen) leveren we binnen 48 uur na bevestiging; voor middelgrote groepen (30-80 personen) vragen we 5 werkdagen om in te kopen, te prepareren en te verpakken; voor grotere groepen (80-150+) werken we met een langere aanlooptijd en vaste menu-keuzes om kwaliteit en timing te garanderen. Voor events groter dan 150 personen stellen we altijd een persoonlijke offerte op — meestal met meerdere leveringsmomenten of een chef op locatie. Vertel ons het aantal, de datum, het tijdstip en de locatie in je aanvraag, dan komen we binnen 24 uur terug met een voorstel. Minimum order voor kantoorlunch: 10 personen binnen Amersfoort en 15 personen buiten.",
  },
  {
    q: "Wat kost Tafelaar × Jezza Cooks Catering?",
    a: "Kantoorlunch begint bij €7,50 per persoon voor broodjes en wraps, en €10,50 per persoon voor bowls. Lunchpakketten (sandwich + salad + bite + dessert) zijn €13,50 vegetarisch, €14,50 classic en €18,50 premium. Alle prijzen exclusief BTW (9% op foodservice). Voor diners en events maken we een offerte op maat — meestal tussen €28 en €55 per persoon afhankelijk van menu, gangen en of we op locatie serveren of strak verpakt leveren. Levering binnen Amersfoort centrum is gratis vanaf 15 personen; daarbuiten rekenen we €15 tot €35 afhankelijk van afstand. Annulering tot 14 dagen vóór het event is kosteloos; tussen 14 en 7 dagen rekenen we 50% en binnen 7 dagen 100% van het offertebedrag. Facturering: 25% aanbetaling, 75% na oplevering.",
  },
  {
    q: "Wie zit er achter Tafelaar × Jezza Cooks Catering?",
    a: "De catering is een samenwerking tussen Jan Molmans en Jeremy Arrascaeta. Jan is eigenaar van shared-dining restaurant De Tafelaar aan de Kamp 8 in de binnenstad van Amersfoort — het restaurant is gefeatured in AD.nl, De Gelderlander en indebuurt.nl Amersfoort en draait sinds eind 2025. Jeremy (Chef Jezz, Jezza Cooks) is chef-kok in die keuken, heeft 10+ jaar gedraaid in high-end keukens in Europa en Australië (finalist Euro-Toques Young Chef 2018 bij Restaurant Bougainville Amsterdam, dry-aging lead bij Angler Stirling in de Adelaide Hills, head chef op Kangaroo Island tijdens de 2019/2020 bushfires) en heeft bij De Tafelaar ook het menu en de keukenstructuur gebouwd. Na een half jaar draaien hebben Jan en Jeremy besloten de krachten te bundelen in een aparte cateringtak onder de Tafelaar × Jezza Cooks vlag — Jan brengt de nuchtere Amersfoortse stijl en de restaurantkeuken aan de Kamp, Jeremy brengt de high-end chef-routine en de discipline. Gefactureerd via Jezza Cooks (KvK 99547619, Nijkerkerstraat 3, 3821 CD Amersfoort).",
  },
  {
    q: "Kunnen jullie rekening houden met dieetwensen, allergenen en vegetarische opties?",
    a: "Ja, volledig. Elke menukaart staat met duidelijke allergenen vermeld (gluten, lactose, eieren, vis, soja, noten, sesam) zodat je team direct ziet wat ze kunnen pakken. Vegetarische opties zijn geen afterthought — Bieten en Geitenkaas Bowl, Inari Power Bowl, Veggie Meatball Wrap zijn kern-items. Voor veganistisch, glutenvrij, halal of specifieke intoleranties (lactose, ei, soja) maken we individuele varianten die we persoonlijk labelen per gast. Als je een deelnemerslijst hebt met namen en dieetwensen, verwerken we dat rechtstreeks in de verpakking zodat niemand hoeft te zoeken. Bij Build Your Own Lunch krijgen grote groepen met veel dieetwensen een overzicht per persoon, wat stress op de dag voorkomt. HACCP conform. Alle keukenhandelingen vinden plaats in de volwaardige restaurantkeuken van De Tafelaar aan de Kamp 8 in het centrum van Amersfoort — dezelfde professionele keuken waar Jeremy elke week service draait.",
  },
  {
    q: "Hoe wordt catering in Amersfoort geleverd — op locatie of strak verpakt?",
    a: "Beide — jij kiest wat bij je event past. Voor kantoorlunch leveren we standaard strak verpakt in individuele boxen of per categorie (broodjes, bowls, wraps) zodat je team direct kan pakken. Levering binnen Amersfoort is meestal 30 minuten voor de gewenste lunchtijd; buiten Amersfoort plannen we dat vooraf met je in. Voor diners en events brengen we alle apparatuur, serviesgoed, bestek en presentatiematerialen mee en serveren we op locatie — inclusief afbouw. Voor grotere events bieden we ook chef-led cooking op locatie aan: Jeremy staat zelf achter de pass. Exacte timing, parkeerinstructies en contactpersoon stemmen we een dag vooraf nog één keer af via WhatsApp of mail, zodat er geen verrassingen zijn op de dag zelf.",
  },
  {
    q: "Welke wijken en steden leveren jullie catering?",
    a: "Bezorggebied is heel Amersfoort en alle wijken (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Liendert, Schothorst, Zielhorst), plus Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Voor Utrecht, Hilversum, Apeldoorn en Zwolle leveren we op afspraak met een aangepaste levertijd en minimumafname vanaf 20 personen. Binnen Amersfoort centrum (postcodes 3811, 3812, 3813) en de meeste woonwijken is de bezorging gratis vanaf 15 personen; voor randwijken zoals Vathorst, Hoogland en Hooglanderveen rekenen we €15 bezorgkosten, en voor buurgemeentes €20 tot €35 afhankelijk van afstand. Keukenbasis is restaurant De Tafelaar aan de Kamp 8, 3811 AR Amersfoort — dus vanaf de Koppelpoort rijden we in minder dan 10 minuten naar de meeste kantoorlocaties in de stad. Facturatie en administratie loopt via Jezza Cooks (Nijkerkerstraat 3, 3821 CD Amersfoort, KvK 99547619).",
  },
  {
    q: "Doen jullie ook diners, verjaardagen en private chef events?",
    a: "Ja. Naast kantoorlunch doen we diners voor verjaardagen, babyshowers, jubilea, bruiloften en private chef-events waar je geen stress wil over eten. We komen op locatie (bij jou thuis, op kantoor, of in een zaaltje), brengen alles mee en zorgen dat het klopt — van menu-ontwerp en inkoop tot service en opruimen. Het aanbod varieert van een 3-gangen family-style diner voor 8 tot 20 personen, via een buffet- of receptieformule voor 20 tot 60, tot volledig private chef events met Jeremy zelf aan het fornuis. Omdat we werken vanuit een volwaardige restaurantkeuken (De Tafelaar, Kamp 8 Amersfoort — het restaurant van partner Jan Molmans) kunnen we ook lastige technieken aan: dry-age, sous-vide en finishing op open vuur zijn gewoon onderdeel van het aanbod. Vertel ons datum, aantal en idee — dan maken we een voorstel dat klopt.",
  },
  {
    q: "Welke ervaring heeft de chef achter de catering?",
    a: "De chef is Jeremy Arrascaeta (Chef Jezz), 10+ jaar actief in high-end keukens in Europa en Australië. Finalist Euro-Toques Young Chef Award 2018 namens Restaurant Bougainville Amsterdam. Daarna dry-aging lead bij Angler Restaurant Stirling in de Adelaide Hills (2020-2022) — gecoverd in InDaily, Australian Good Food Guide, Broadsheet Adelaide en Aquna voor het fish dry-age programma (cured sashimi, fish sausages, barramundi crackling, carp bacon). Daarvoor head chef op Kangaroo Island bij Hanson Bay Sanctuary en Flinders Chase Café tijdens de 2019/2020 bushfires. Sinds 2025 terug in Nederland als chef-kok bij shared-dining restaurant De Tafelaar Amersfoort (Kamp 8), waar hij het menu en de keukenstructuur heeft opgezet. Dat betekent: je catering wordt niet uitbesteed aan een anonieme prep-keuken — de chef met 10+ jaar high-end ervaring staat zelf achter het fornuis en haalt de inkoop persoonlijk. Gefeatured in AD.nl Amersfoort, De Gelderlander en indebuurt.nl.",
  },
  {
    q: "Kan ik Jeremy inhuren als private chef bij mij thuis in Amersfoort?",
    a: "Ja, private chef thuis in Amersfoort en omgeving is onderdeel van het aanbod. Jeremy komt naar jouw keuken (of een geleende locatie) en kookt een 5- of 7-gangen tasting menu voor 6 tot 14 gasten. Vanaf €55 per persoon exclusief inkoop (inkoop wordt apart afgerekend op kostprijs, zonder opslag). Inclusief: menu-ontwerp op basis van dieetwensen en seizoen, inkoop bij lokale leveranciers in Amersfoort, transport van apparatuur, service aan tafel en afbouw. Dry-age, sous-vide en open vuur finishing zijn standaard technieken — geen upgrade. Werkgebied voor private chef diners: heel Amersfoort en alle wijken, plus Utrecht, Hilversum, Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Voor opdrachten verder weg (Amsterdam, Rotterdam, Zwolle, Apeldoorn) rekenen we een reistoeslag en minimum van 10 gasten. Aanvragen minimaal 14 dagen vooraf. Betalingsvoorwaarden: 25% aanbetaling bij bevestiging, 75% na afloop van het diner.",
  },
  {
    q: "Waar kan ik eerder werk van de chef zien of lezen?",
    a: "Vier Australische publicaties hebben het Angler Stirling dry-age programma van Jeremy uitgebreid gecoverd en zijn allemaal nog live te lezen. InDaily SA deed een feature over het fish-and-chip concept (\"Stirling's new fish and chip restaurant is catching on\", augustus 2020). Australian Good Food Guide interviewde chef Sam Prance-Smith waarin Jeremy als dry-aging lead wordt genoemd (\"Oh my cod: this chef really knows seafood\"). Broadsheet Adelaide plaatste een Angler Stirling gerecht op hun \"Favourite Adelaide Dishes 2021\" lijst. Aquna (murray cod leverancier) publiceerde een proefervaring specifiek over Jeremy's cured sashimi. In Nederland zijn AD.nl Amersfoort, De Gelderlander en indebuurt.nl aan de slag gegaan met de nieuwe chef-rol bij De Tafelaar aan de Kamp in 2025-2026, plus een interview in de Gooische Business podcast op Spotify. Alle 8 bronnen zijn inline gelinkt op de over-pagina (/about) en vind je ook in het portfolio met klikbare links.",
  },
  {
    q: "Hoe verhoudt Tafelaar × Jezza Cooks Catering zich tot andere Amersfoortse caterings?",
    a: "De Amersfoortse catering markt bestaat grofweg uit drie types aanbieders: (1) sandwich-services en bakkerijen die een lunch-catering tak hebben aangebouwd, (2) traditionele event caterers die vooral bruiloften en bedrijfsfeesten doen, en (3) restaurants die soms 'op afspraak' catering accepteren. Wij zijn een vierde categorie: een chef-led joint venture die vanuit een volwaardige restaurantkeuken werkt met dezelfde kwaliteit en discipline als het shared-dining restaurant zelf. De meest relevante vergelijking: andere caterers werken vanuit een flex-keuken of kant-en-klaar fabriek waar de chef niet per se in staat. Bij ons is Jeremy Arrascaeta de chef die elke week service draait in dezelfde keuken — geen afstand tussen wie het bedenkt en wie het kookt. Dat betekent ook een kortere lijn (één-op-één met de chef, geen verkoopafdeling), hogere techniek-baseline (dry-age, sous-vide, open vuur zijn gewoon onderdeel) en lagere variatie in het bord (dezelfde mise en place als het restaurant). Voor simpele broodjes voor 10 personen maakt dat weinig verschil — daar zijn we prima in prijs. Voor een diner waar iemand echt moet koken maakt het het hele verschil.",
  },
  {
    q: "Hoeveel mensen lopen er voor een event van 80 tot 150 personen?",
    a: "Voor grote events leunen we op het volledige team van De Tafelaar Amersfoort — 10 vaste medewerkers plus een oproepnetwerk in de Amersfoortse horeca. Concrete team-opbouw per event-grootte: 50 personen = Jeremy (chef) + 2 keuken/service medewerkers. 80 personen = Jeremy + 3 medewerkers. 100 personen = Jeremy + 4 medewerkers. 120-150 personen = Jeremy, Jan Molmans (mede-eigenaar en senior-chef) en 4-5 keuken- en service-medewerkers. Voor events boven 150 personen plannen we altijd een gezamenlijke brief-meeting 10 dagen vooraf en maken we een named staff-lijst zodat jouw event manager weet wie er komt. Alle keukenstaf is Leermeester-gecertificeerd en KHN-geregistreerd via De Tafelaar's KHN-lidmaatschap. Service-staf is het vaste team dat 5 diensten per week in het restaurant draait — niet inhuurkrachten van een uitzendbureau. Dat is precies het verschil tussen een founder-led bedrijf met een restaurantteam achter zich en een solo-freelance chef.",
  },
  {
    q: "Wat gebeurt er als de chef ziek is op de dag van het event?",
    a: "Backup-chef op stand-by. Dat is ingebouwd in elke event-afspraak boven 30 personen — als Jeremy onverhoopt uitvalt op de dag zelf (ziek, persoonlijke crisis, reis geannuleerd) stapt Jan Molmans of een andere senior-chef uit het De Tafelaar team in. Dit is het operationele voordeel van een restaurant-verankerde catering versus een solo-freelancer: er is altijd een tweede lijn binnen 5 minuten loopafstand aan de Kamp 8. Voor events boven 100 personen maken we de backup-afspraak expliciet op naam in het contract — je weet vooraf wie de backup is en hoe die gecontacteerd wordt. Voor kleinere events (< 30 personen) is de backup-route het normale De Tafelaar chef-rooster; dat is minder formeel maar in de praktijk nog nooit gefaald omdat het restaurant 7 dagen per week open is en er altijd 2-3 chefs beschikbaar zijn. We hebben nooit een event moeten annuleren wegens chef-ziekte — en de rede is precies dit: geen single point of failure.",
  },
  {
    q: "Wie runt de service op locatie bij een event — een echte chef of uitzendkrachten?",
    a: "Op locatie wordt de service altijd geleid door een vaste medewerker van De Tafelaar of door Jeremy zelf — nooit door anonieme uitzendkrachten of cateringfreelancers die je pas op de dag zelf ontmoet. Voor events tot 60 personen staat Jeremy zelf achter de pass en is hij tegelijk het aanspreekpunt voor jou als opdrachtgever. Voor events van 60 tot 150 personen loopt Jeremy de keuken en neemt Jan Molmans of een senior medewerker de vloer. Voor events boven 150 personen krijg je een vast event-leider aangewezen (Jeremy of Jan) die het hele evenement aan stuurt — die persoon is jouw one-point-of-contact van aanvraag tot afbouw. In alle gevallen is minimaal één persoon op locatie KHN-geregistreerd en Leermeester-gecertificeerd. Je krijgt 3 werkdagen voor je event een named team-lijst met functies en contactnummers zodat je weet wie wat doet.",
  },
  {
    q: "Wat is de exacte setup- en afbouwtijd voor 50, 100 en 150 personen?",
    a: "Richtlijnen per event-grootte (deze worden altijd per event geconcretiseerd op basis van je locatie, toegankelijkheid en gewenste service-start). <strong>50 personen:</strong> setup 60-90 minuten voor service-start, afbouw 45 minuten na laatste hap. <strong>100 personen:</strong> setup 90-120 minuten, afbouw 60 minuten. <strong>150 personen:</strong> setup 150 minuten minimum, afbouw 75-90 minuten, plus 30 minuten team-briefing vooraf. Voor een bruiloft of high-stakes zakelijk diner rekenen we altijd 30 minuten buffer bovenop deze tijden — nooit krap plannen. We komen altijd minimaal 20 minuten voor de setup-start aan op locatie om de ruimte te checken (stroom, water, vloerruimte, afvoer, toegang) en eventuele problemen te melden voor de gast-aankomst. Als het gaat om een bedrijfspand of hotel waar wij niet eerder zijn geweest, plannen we een site-visit vooraf — standaard inbegrepen voor events vanaf 80 personen, optioneel daaronder.",
  },
  {
    q: "Hoe gaan jullie om met late headcount-wijzigingen?",
    a: "Tot 72 uur voor het event kunnen we het aantal naar boven of beneden bijstellen met maximaal 15% zonder extra kosten. Van 72 tot 24 uur voor het event is een verhoging van maximaal 10% mogelijk mits de ingrediënten in de standaard-inkoop zitten (bij premium items zoals zeevruchten of specialty vlees niet altijd, dat hangt af van de voorraad bij onze leveranciers in Amersfoort). Verlagingen binnen 24 uur worden in rekening gebracht tegen 50% van de afgesproken prijs voor de geannuleerde plekken — redelijk omdat wij al ingekocht en geprepareerd hebben. Binnen 12 uur is verhoging of verlaging niet meer mogelijk behalve in echte noodgevallen; daar communiceren we live. Voor grote events (100+) maken we standaard 5% extra borden (op ons kosten) als buffer tegen last-minute extra gasten — 'walk-in buffer' heet dat in de horeca. Voor kleinere events (< 50) rekenen we met 2 buffer-borden. Dat betekent: als er op de dag zelf een paar extra mensen aanschuiven, kunnen we dat meestal opvangen zonder drama.",
  },
  {
    q: "Wat gebeurt er als een gast op het laatste moment een allergie of dieetwens meldt?",
    a: "Allergenen worden per gast op naam gelabeld — niet per batch. Standaard werkwijze: je levert minimaal 48 uur voor het event een deelnemerslijst met dieetwensen en allergieën aan (formulier of e-mail volstaat). Wij prepareren dan named portions waarbij het eten van de allergie-gast expliciet gescheiden wordt bereid met eigen snijplanken, eigen pan en eigen bestek — HACCP-protocol precies zoals in het shared-dining restaurant. Op locatie krijgt elke allergie-gast een persoonlijk gelabeld bord zodat er geen verwarring kan ontstaan bij de uitgave. Last-minute meldingen (< 24 uur voor het event) kunnen we opvangen voor de 7 meest voorkomende allergieën (gluten, lactose, eieren, vis, noten, soja, sesam) omdat we daar standaard mise en place voor draaien. Voor zeldzame allergieën (sulfiet, tarwe, kiwi, specifieke kruiden) hebben we liever 48 uur zodat we de inkoop kunnen aanpassen. Halal en koosjer zijn mogelijk met 5 werkdagen aanlooptijd omdat de inkoop van vlees dan via een gespecialiseerde leverancier loopt. Vegetarisch, veganistisch en glutenvrij zijn standaard op het menu en nooit een extra belasting voor de keuken.",
  },
];

const cateringFaqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

function BulletRow({
  title,
  text,
  Icon,
}: {
  title: string;
  text: string;
  Icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className={ui.paperInset + " p-5"}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl border border-[#D8C6AE]/70 bg-[#F3EDE3]">
          <Icon className="h-5 w-5 text-[#0B0F14]/70" />
        </div>
        <div>
          <div className="font-headline text-lg font-bold">{title}</div>
          <p className={`mt-1 text-sm leading-relaxed ${ui.mutedOnPaper}`}>{text}</p>
        </div>
      </div>
    </div>
  );
}

function MenuChips() {
  const chips = [
    { href: "#broodjes", label: "Broodjes" },
    { href: "#bowls", label: "Bowls" },
    { href: "#wraps", label: "Wraps" },
    { href: "#lunchpakketten", label: "Lunchpakketten" },
  ];

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      {chips.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B841]/35"
        >
          <span className={ui.copperDot} aria-hidden="true" />
          <span className="ml-2">{c.label}</span>
        </Link>
      ))}
    </div>
  );
}

function MenuAccordion({ sections }: { sections: MenuSection[] }) {
  return (
    <div className={ui.paper + " overflow-hidden"}>
      <Accordion type="multiple" className="divide-y divide-[#D8C6AE]/45">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            id={section.id}
            className="border-none scroll-mt-24"
          >
            <AccordionTrigger className="px-6 md:px-8 py-5 hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4 text-left">
                <div>
                  <div className="font-headline text-xl md:text-2xl font-bold text-[#0B0F14]">
                    {section.title}
                  </div>
                  {section.note ? (
                    <div className="mt-1 text-sm text-[#0B0F14]/65">{section.note}</div>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {section.highlight ? (
                    <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#F5B841]/45 bg-[#F5B841]/15 px-3 py-1 text-xs font-semibold text-[#0B0F14]/80">
                      <span className={ui.copperDot} aria-hidden="true" />
                      Meest gekozen
                    </span>
                  ) : null}

                  <span className="inline-flex items-center rounded-full border border-[#D8C6AE]/70 bg-[#D8C6AE]/25 px-3 py-1 text-xs font-semibold text-[#0B0F14]/75">
                    {section.priceLabel}
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-6 md:px-8 pb-7">
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className={ui.paperInset + " p-5 transition hover:bg-[#D8C6AE]/30"}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="font-headline text-lg font-bold">{item.name}</div>
                          {item.veg ? (
                            <span className="inline-flex items-center rounded-full border border-[#D8C6AE]/70 bg-[#F3EDE3] px-2.5 py-0.5 text-xs font-semibold text-[#0B0F14]/70">
                              Vegetarisch
                            </span>
                          ) : null}
                        </div>

                        <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnPaper}`}>
                          {item.description}
                        </p>
                      </div>

                      {item.price ? (
                        <div className="shrink-0 font-headline text-lg font-bold text-[#0B0F14]">
                          {item.price}
                        </div>
                      ) : null}
                    </div>

                    <div className={`mt-3 text-xs ${ui.mutedOnPaper}`}>
                      Allergenen: {item.allergens}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function StickyCtaBar({ phone }: { phone?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-md px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/80">Korte aanvraag, snel voorstel.</div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link href="#aanvraag" className={ui.ctaPrimary}>
                Offerte aanvragen <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link href="/contact" className={ui.ctaSecondary}>
                Contact
              </Link>

              {phone ? (
                <a href={`tel:${phone}`} className={ui.ctaSecondary}>
                  Bel
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CateringPage() {
  // Optioneel: vul dit in als je telefoon wil tonen. Leeg laten als je het niet wil tonen.
  const PHONE = ""; // bijv. +31612345678

  return (
    <div className={ui.page}>
      <JsonLd data={cateringServiceSchema} id="schema-catering-service" />
      <JsonLd data={cateringFaqSchema} id="schema-catering-faq" />
      <JsonLd data={cateringBreadcrumbSchema} id="schema-catering-breadcrumb" />

      <div aria-hidden="true" className={ui.bgFX} />

      {/* HERO */}
      <section className={ui.container + " " + ui.sectionY}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="mx-auto flex flex-col items-center">
              {/* Co-brand logo: this is a real joint venture between Jezza
                  Cooks and De Tafelaar (Jan Molmans), not ownership of the
                  restaurant. The co-brand is legitimate for the catering
                  tak only. */}
              <div className="relative h-24 w-[384px] md:h-28 md:w-[504px]">
                <Image
                  src="/pics/tafelaar-x-jezza-logo.png"
                  alt="Tafelaar × Jezza Cooks Catering — een samenwerking"
                  fill
                  sizes="(max-width: 768px) 384px, 504px"
                  className="object-contain"
                  priority
                  fetchPriority="high"
                />
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold">
                <span className={ui.copperDot} aria-hidden="true" />
                Tafelaar × Jezza Cooks Catering — samenwerking
              </div>
            </div>

            <h1 className="mt-5 font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Catering Amersfoort — Tafelaar × Jezza Cooks
            </h1>

            <p
              className={`mt-4 text-base md:text-xl leading-relaxed ${ui.mutedOnNight} mx-auto max-w-3xl`}
            >
              Een samenwerking tussen <strong>Jeremy Arrascaeta (Jezza Cooks)</strong> en{" "}
              <strong>Jan Molmans</strong>, eigenaar van shared-dining restaurant{" "}
              <strong>De Tafelaar</strong> aan de <strong>Kamp 8 in de binnenstad van
              Amersfoort</strong>. Kantoorlunch, diners en events vanuit de volwaardige
              restaurantkeuken. Broodjes, bowls, wraps en lunchpakketten vanaf €7,50. Strak
              verpakt, makkelijk uit te delen, van 10 tot 150+ personen.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="#aanvraag" className={ui.ctaPrimary}>
                Offerte aanvragen <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link href="#menu" className={ui.ctaSecondary}>
                Bekijk het menu
              </Link>
            </div>

            <MenuChips />
          </div>

          {/* Story + bullets */}
          <div className={ui.paperSoft + " mt-10 p-7 md:p-10"}>
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                <div className={ui.pill}>
                  Samenwerken in stijl <span className={ui.copperDot} aria-hidden="true" />
                  nuchter en strak geregeld
                </div>

                <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
                  Hoe werkt een kantoorlunch van Tafelaar × Jezza Cooks?
                </h2>

                <p className={`mt-3 leading-relaxed ${ui.mutedOnPaper}`}>
                  Geen gedoe, wel kwaliteit. Onze kantoorlunch is ontworpen om netjes te eten,
                  makkelijk te verdelen en consistent te leveren. Perfect voor vergaderlunches,
                  teamdagen en events.
                </p>

                <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper}`}>
                  <strong>Tafelaar × Jezza Cooks Catering</strong> is een echte samenwerking.{" "}
                  <strong>Jan Molmans</strong> is eigenaar van shared-dining restaurant{" "}
                  <strong>De Tafelaar</strong> aan de Kamp 8 in de binnenstad van Amersfoort.
                  Jeremy Arrascaeta (Chef Jezz, Jezza Cooks) is chef-kok in die keuken en heeft
                  daar het menu en de keukenstructuur gebouwd. Parallel aan zijn chef-job
                  draait hij Jezza Cooks horeca consultancy. Na een half jaar samen draaien
                  besloten Jan en Jeremy hun krachten te bundelen in een aparte cateringtak: Jan
                  brengt de nuchtere Amersfoortse stijl en de restaurantkeuken; Jeremy brengt
                  10+ jaar high-end chef-routine (finalist Euro-Toques Young Chef 2018 namens
                  Bougainville Amsterdam, dry-aging lead bij Angler Stirling in de Adelaide
                  Hills) en de catering-discipline. Gefactureerd via Jezza Cooks (KvK 99547619).
                  De Tafelaar als restaurant is gefeatured in AD.nl, De Gelderlander en
                  indebuurt.nl Amersfoort.
                </p>

                <p className={`mt-4 text-xs ${ui.mutedOnPaper}`}>
                  Tip: stuur datum, locatie, aantal personen en dieetwensen. Dan kunnen we snel
                  schakelen.
                </p>
              </div>

              <div className="grid gap-4">
                {quickBullets.map((b) => (
                  <BulletRow key={b.title} title={b.title} text={b.text} Icon={b.icon} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick form anchor */}
          <div id="aanvraag" className="mt-10 scroll-mt-24">
            <CateringInquiryForm phone={PHONE || undefined} />
          </div>

          {/* Trust trio */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Strak en betrouwbaar",
                body: "Vaste samenstellingen, duidelijke allergenen en consistente kwaliteit. Ideaal voor teams.",
              },
              {
                title: "Makkelijk uit te delen",
                body: "Individueel of per box geleverd. Klaar om neer te zetten en direct te serveren.",
              },
              {
                title: "Voor elk moment",
                body: "Van vergaderlunch tot teamdag. We denken mee met aantallen, timing en opzet.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="font-headline text-xl md:text-2xl font-bold text-white">
                  {x.title}
                </div>
                <p className={`mt-3 leading-relaxed ${ui.mutedOnNight}`}>{x.body}</p>
              </div>
            ))}
          </div>

          {/* VERIFIED THIRD-PARTY REVIEWS — De Tafelaar Trustoo profile */}
          <div className="mx-auto mt-14 max-w-5xl rounded-3xl border border-primary/40 bg-primary/10 p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
              <div className="flex flex-col items-center rounded-2xl border border-primary/40 bg-background/20 px-6 py-4 text-center">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Trustoo verified
                </div>
                <div className="mt-2 font-headline text-4xl font-bold text-primary">
                  9.8<span className="text-xl text-white/60">/10</span>
                </div>
                <div className="mt-1 text-xs text-white/70">op 96 reviews</div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-headline text-lg font-bold md:text-xl">
                  Echte third-party reviews via De Tafelaar Amersfoort
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnNight} md:text-base`}>
                  De catering werkt vanuit de keuken van shared-dining
                  restaurant <strong>De Tafelaar</strong> aan de Kamp 8 —
                  het restaurant van partner Jan Molmans, waar Jeremy zelf
                  chef-kok is. Dat restaurant heeft{" "}
                  <a
                    href="https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                  >
                    <strong>9.8 van 10 op 96 reviews bij Trustoo</strong>
                  </a>
                  , is TOP PRO 2026, Leermeester-gecertificeerd en lid van
                  Koninklijke Horeca Nederland. De catering-tak werkt met
                  dezelfde chef, dezelfde keuken en dezelfde kwaliteitsbar.
                </p>
              </div>
            </div>
          </div>

          {/* CREDIBILITY STRIP — press + stats */}
          <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-primary/25 bg-primary/5 p-6 md:p-8">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Gefeatured in
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold">
                <a
                  href="https://www.ad.nl/amersfoort/uittip-restaurant-de-tafelaar-organiseert-eerste-gastchef-avond~a88c021a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/60 decoration-2 underline-offset-4"
                >
                  AD.nl Amersfoort
                </a>
                <span className="text-white/30">·</span>
                <a
                  href="https://www.gelderlander.nl/amersfoort/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~a5c0f1d0/265507710/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/60 decoration-2 underline-offset-4"
                >
                  De Gelderlander
                </a>
                <span className="text-white/30">·</span>
                <a
                  href="https://indebuurt.nl/amersfoort/nieuws/nieuw-in/jan-opent-nu-echt-restaurant-de-tafelaar-in-amersfoort~343981/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/60 decoration-2 underline-offset-4"
                >
                  indebuurt.nl
                </a>
                <span className="text-white/30">·</span>
                <a
                  href="https://www.indailysa.com.au/news/archive/2020/08/19/stirlings-new-fish-and-chip-restaurant-is-catching-on"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/60 decoration-2 underline-offset-4"
                >
                  InDaily SA
                </a>
                <span className="text-white/30">·</span>
                <a
                  href="https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/60 decoration-2 underline-offset-4"
                >
                  Australian Good Food Guide
                </a>
                <span className="text-white/30">·</span>
                <a
                  href="https://www.broadsheet.com.au/adelaide/food-and-drink/article/broadsheets-favourite-adelaide-dishes-2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline decoration-primary/60 decoration-2 underline-offset-4"
                >
                  Broadsheet Adelaide
                </a>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="font-headline text-2xl font-bold text-primary md:text-3xl">10+</div>
                <div className="mt-1 text-xs text-white/70">Jaar high-end keukens</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="font-headline text-2xl font-bold text-primary md:text-3xl">4</div>
                <div className="mt-1 text-xs text-white/70">Landen gewerkt</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="font-headline text-2xl font-bold text-primary md:text-3xl">2018</div>
                <div className="mt-1 text-xs text-white/70">Finalist Euro-Toques Young Chef</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="font-headline text-2xl font-bold text-primary md:text-3xl">Angler</div>
                <div className="mt-1 text-xs text-white/70">Dry-aging lead Stirling, SA</div>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center md:col-span-1">
                <div className="font-headline text-2xl font-bold text-primary md:text-3xl">2025</div>
                <div className="mt-1 text-xs text-white/70">Chef-kok De Tafelaar Amersfoort</div>
              </div>
            </div>
          </div>

          {/* CHEF BIO SECTION — passage-extractable 140-word block for
              "chef catering amersfoort" / "private chef amersfoort" queries */}
          <div className={ui.paperSoft + " mt-10 p-7 md:p-10"}>
            <div className="max-w-3xl">
              <div className={ui.pill}>
                De chef <span className={ui.copperDot} aria-hidden="true" />
                wie staat er in de keuken
              </div>
              <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
                Wie is de chef achter Tafelaar × Jezza Cooks Catering?
              </h2>
              <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper}`}>
                De chef in de keuken is <strong>Jeremy Arrascaeta</strong>{" "}
                (Chef Jezz) — chef-kok bij shared-dining restaurant{" "}
                <strong>De Tafelaar</strong> aan de Kamp 8 in de binnenstad
                van Amersfoort, 10+ jaar gedraaid in high-end keukens in
                Europa en Australië. Finalist Euro-Toques Young Chef Award
                2018 namens Restaurant Bougainville Amsterdam. Daarna
                dry-aging lead bij{" "}
                <a
                  href="https://www.indailysa.com.au/news/archive/2020/08/19/stirlings-new-fish-and-chip-restaurant-is-catching-on"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                >
                  Angler Restaurant Stirling
                </a>{" "}
                in de Adelaide Hills, Zuid-Australië — waar hij bekend werd
                om het fish dry-age programma met cured sashimi, fish
                sausages, barramundi crackling en carp bacon (gecoverd in{" "}
                <a
                  href="https://www.agfg.com.au/article/oh-my-cod-this-chef-really-knows-seafood-we-talk-to-sam-prancesmith-from-angler-stirling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                >
                  Australian Good Food Guide
                </a>
                ,{" "}
                <a
                  href="https://www.broadsheet.com.au/adelaide/food-and-drink/article/broadsheets-favourite-adelaide-dishes-2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                >
                  Broadsheet Adelaide
                </a>{" "}
                en{" "}
                <a
                  href="https://aquna.com/what-does-aquna-murray-cod-actually-taste-like/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                >
                  Aquna
                </a>
                ). Daarvoor head chef op Kangaroo Island bij Hanson Bay
                Sanctuary en Flinders Chase Café tijdens de 2019/2020
                bushfires. Sinds 2025 terug in Nederland als chef-kok bij
                De Tafelaar. Dat chef-kok-DNA zit in elke box die we
                uitleveren: restaurant-techniek, restaurant-sanitatie,
                restaurant-discipline — alleen dan verpakt voor jouw
                kantoor of event.
              </p>
            </div>
          </div>

          {/* DIFFERENTIATION SECTION — targets "waarom [x] catering" +
              passage extraction for "beste catering amersfoort" */}
          <div className={ui.paperSoft + " mt-8 p-7 md:p-10"}>
            <div className="max-w-3xl">
              <div className={ui.pill}>
                Anders dan andere <span className={ui.copperDot} aria-hidden="true" />
                wat maakt ons catering anders
              </div>
              <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
                Waarom Tafelaar × Jezza Cooks Catering in plaats van een
                generieke Amersfoortse caterer?
              </h2>
              <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper}`}>
                De meeste Amersfoortse catering bedrijven werken vanuit een
                flex-keuken, een sandwich-fabriek of een bakkerij die er een
                catering tak bij heeft. Wij werken vanuit een{" "}
                <strong>volwaardige restaurantkeuken</strong> aan de Kamp 8
                in de binnenstad — de keuken van shared-dining restaurant De
                Tafelaar, waar Jeremy als chef-kok elke week service draait.
                Dat betekent drie concrete voordelen voor jou.{" "}
                <strong>Eén:</strong> technieken die andere caterers niet
                kunnen leveren — dry-age, sous-vide, finishing op open vuur,
                cured sashimi op niveau — horen hier gewoon bij het aanbod.{" "}
                <strong>Twee:</strong> sanitatie en allergenen-discipline
                vertalen 1-op-1 uit een restaurant waar elke dienst
                geïnspecteerd wordt, naar een catering box die je
                veilig kunt uitdelen zonder stress.{" "}
                <strong>Drie:</strong> door de lokale inkoop-relaties van De
                Tafelaar (Van de Koolwijk voor groente, Nico Beekhuizen voor
                vlees, Vishandel Sperling voor vis) eten jouw gasten
                dezelfde grondstoffen die het restaurant zelf serveert —
                niet een trap lager. En omdat Jeremy zelf in de keuken staat,
                heb je een één-op-één lijn met de chef, niet met een
                verkoopafdeling.
              </p>
            </div>
          </div>

          {/* EVENT USE CASES — 5 passage blocks targeting specific intent
              queries + local landmarks for Amersfoort geo signals */}
          <div className={ui.paperSoft + " mt-8 p-7 md:p-10"}>
            <div className="max-w-4xl">
              <div className={ui.pill}>
                Voor welke events <span className={ui.copperDot} aria-hidden="true" />
                van kantoorlunch tot bruiloft
              </div>
              <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
                Voor welke events doen we catering in Amersfoort?
              </h2>
              <p className={`mt-3 leading-relaxed ${ui.mutedOnPaper}`}>
                Vijf hoofdcategorieën, elk met een eigen aanpak. Vertel ons
                wat voor event je organiseert — we plannen vanaf daar terug.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className={ui.paperInset + " p-5"}>
                  <h3 className="font-headline text-lg font-bold">
                    Kantoorlunch Amersfoort (zakelijk)
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnPaper} md:text-base`}>
                    Broodjes, wraps, bowls en lunchpakketten vanaf €7,50 p.p.,
                    voor 10 tot 150+ personen. Levering vanaf onze keuken aan
                    de Kamp, binnen 10 minuten bij de meeste kantoren in
                    Amersfoort centrum, Soesterkwartier, Leusderkwartier en
                    Valleipoort. Strak verpakt, makkelijk uit te delen,
                    allergenen duidelijk gelabeld.
                  </p>
                </div>
                <div className={ui.paperInset + " p-5"}>
                  <h3 className="font-headline text-lg font-bold">
                    Verjaardagsdiner of jubileum
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnPaper} md:text-base`}>
                    Family-style diner voor 8 tot 20 personen vanaf €28 p.p.,
                    op locatie geserveerd (thuis, kantoor, of locatie naar
                    keuze in Amersfoort en omgeving). Inclusief opbouw,
                    service en opruim. Menu op maat afgestemd op dieetwensen
                    en thema.
                  </p>
                </div>
                <div className={ui.paperInset + " p-5"}>
                  <h3 className="font-headline text-lg font-bold">
                    Babyshower / baby-welkom
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnPaper} md:text-base`}>
                    Lunchpakket of finger food voor 10 tot 30 gasten,
                    geleverd strak verpakt of uitgestald op tafel. Vaak
                    vegetarisch-zwaar met veel kleur. Levering binnen heel
                    Amersfoort (Binnenstad, Kamp, Soesterkwartier, Vathorst,
                    Hoogland, Valleipoort) vanaf €13,50 p.p.
                  </p>
                </div>
                <div className={ui.paperInset + " p-5"}>
                  <h3 className="font-headline text-lg font-bold">
                    Bruiloftscatering (intieme bruiloft)
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnPaper} md:text-base`}>
                    Voor intieme bruiloften tot 60 gasten in Amersfoort en
                    omgeving — 3-gangen family-style of buffet met chef op
                    locatie. Vanaf €45 p.p. inclusief serviesgoed en
                    presentatiematerialen. Voor grotere bruiloften stellen
                    we een offerte op maat met meerdere service momenten.
                  </p>
                </div>
                <div className={ui.paperInset + " p-5 md:col-span-2"}>
                  <h3 className="font-headline text-lg font-bold">
                    Private chef event — Jeremy thuis aan het fornuis
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${ui.mutedOnPaper} md:text-base`}>
                    Voor het écht speciale diner: Jeremy Arrascaeta komt naar
                    jouw keuken (of geleende locatie) en kookt een 5- of
                    7-gangen tasting menu voor 6 tot 14 gasten. Vanaf €55
                    p.p. exclusief inkoop. Inclusief menu-ontwerp, inkoop
                    bij lokale leveranciers in Amersfoort, service en
                    afbouw. Dry-age, sous-vide en finishing op open vuur
                    zijn gewoon onderdeel van het aanbod — niet een upgrade.
                    Voor jouw thuis in Amersfoort, Utrecht, Hilversum, Soest,
                    Leusden, Baarn of elders in de regio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BIG EVENTS + OPERATIONAL SECTION — addresses the classic
              procurement question: "what if the chef gets sick the
              morning of our 150-person event?" The answer is that we
              are a joint venture with a 10-person restaurant team, not
              a solo operator. */}
          <div className={ui.paperSoft + " mt-8 p-7 md:p-10"}>
            <div className="max-w-3xl">
              <div className={ui.pill}>
                Grote events &amp; procurement-grade <span className={ui.copperDot} aria-hidden="true" />
                niet een solo chef
              </div>
              <h2 className="mt-4 font-headline text-3xl md:text-4xl font-bold">
                Kunnen jullie ook grote en high-risk events aan?
              </h2>
              <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper}`}>
                Ja — en dat is precies waarom Tafelaar × Jezza Cooks Catering
                een samenwerking is en geen solo-aanbod. Voor events tot
                150+ personen, bedrijfsfeesten, bruiloften of high-risk
                zakelijke diners leunen we op het <strong>volledige team
                van De Tafelaar</strong>: 10 medewerkers, een draaiende
                restaurantkeuken die 5 diensten per week runt, en
                Leermeester-gecertificeerde keukenstaf. Dat lost meteen de
                drie klassieke zorgen op bij het boeken van catering bij
                een founder-led bedrijf:
              </p>
              <ul className="mt-5 space-y-3 text-foreground/85 md:text-lg">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/10 text-xs font-bold text-primary">
                    1
                  </span>
                  <span>
                    <strong>Staffing diepte</strong> — voor een event van 50
                    personen draaien standaard Jeremy + 2 mensen uit het De
                    Tafelaar team. Voor 100 personen: Jeremy + 3. Voor 150+:
                    Jeremy, Jan Molmans en minimaal 4 keuken- en
                    service-medewerkers. We kunnen flexibel opschalen omdat
                    het restaurant 10 vaste krachten heeft plus een
                    oproepnetwerk in Amersfoort.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/10 text-xs font-bold text-primary">
                    2
                  </span>
                  <span>
                    <strong>Backup-chef op stand-by</strong> — als Jeremy op
                    de dag zelf uitvalt (ziek, persoonlijke crisis, reis
                    geannuleerd) stapt Jan Molmans of een andere
                    restaurant-chef uit het De Tafelaar team in. Dat is het
                    voordeel van een restaurant-verankerde operatie versus
                    een solo-freelancer: er is altijd een tweede lijn. Geen
                    event zonder backup-chef afspraak vooraf.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/45 bg-primary/10 text-xs font-bold text-primary">
                    3
                  </span>
                  <span>
                    <strong>Restaurant-grade HACCP en allergenenbeleid</strong>{" "}
                    — niet een flex-catering sanitatie-standaard, maar de
                    dagelijkse discipline van een shared-dining restaurant
                    dat elke dienst geïnspecteerd wordt. Allergenen
                    worden per gast gelabeld, niet per batch. Koelketens
                    gemonitord met logboeken, niet op gevoel.
                  </span>
                </li>
              </ul>
              <div className="mt-6 grid gap-3 text-sm md:grid-cols-2 md:text-base">
                <div className={ui.paperInset + " p-4"}>
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#C65A2E]">
                    Externe validatie
                  </div>
                  <p className={`mt-2 ${ui.mutedOnPaper}`}>
                    De Tafelaar Amersfoort B.V. heeft{" "}
                    <a
                      href="https://trustoo.nl/utrecht/amersfoort/catering/tafelaar-amersfoort-bv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary decoration-2 underline-offset-4 hover:opacity-80"
                    >
                      <strong>9.8/10 op 96 reviews bij Trustoo</strong>
                    </a>
                    , <strong>TOP PRO 2026</strong> badge,{" "}
                    <strong>Leermeester-certificering</strong> en is lid van{" "}
                    <strong>Koninklijke Horeca Nederland (KHN)</strong>. Dat
                    zijn geen zelf-gepubliceerde claims — ze zijn
                    allemaal op trustoo.nl te verifiëren.
                  </p>
                </div>
                <div className={ui.paperInset + " p-4"}>
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#C65A2E]">
                    Response tijd
                  </div>
                  <p className={`mt-2 ${ui.mutedOnPaper}`}>
                    Gemiddelde reactietijd op nieuwe aanvragen:{" "}
                    <strong>onder 1 uur</strong> (Trustoo verified). Voor
                    grote events krijg je binnen 24 uur na je aanvraag een
                    concreet voorstel met menu-opties, team-opbouw,
                    setup-tijdlijn, bezorgmomenten, allergieprocedure en
                    backup-plan.
                  </p>
                </div>
              </div>

              <p className={`mt-5 text-sm ${ui.mutedOnPaper} md:text-base`}>
                <strong>Exacte details per event-grootte</strong> (50 / 100 /
                150+ personen, setup-tijden, service-staff, backup-afspraken,
                allergenenprocedure, late headcount-wijzigingen) staan in de
                operationele FAQ onderaan deze pagina — antwoord per vraag,
                niet één vaag blok. Precies de details die procurement en
                event managers nodig hebben voor ze tekenen.
              </p>

              <div className="mt-6">
                <Link
                  href="#faq"
                  className={ui.ctaPrimary + " font-semibold"}
                >
                  Ga naar operationele FAQ <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className={ui.container + " " + "pb-14 md:pb-24"}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">
              Wat zit er in het catering assortiment?
            </h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              Vaste prijzen, duidelijke keuzes. Broodjes vanaf €7,50, bowls
              vanaf €10,50, lunchpakketten vanaf €13,50. Openklappen per
              categorie hieronder voor exacte menukeuzes en allergenen.
            </p>
          </div>

          <div className="mt-8">
            <MenuAccordion sections={menu} />
          </div>

          {/* Build your own */}
          <div className={ui.paper + " mt-12 p-7 md:p-10"}>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-headline text-2xl md:text-3xl font-bold">
                  Build your own lunch (bedrijven)
                </h3>
                <p className={`mt-3 leading-relaxed ${ui.mutedOnPaper}`}>
                  Maak het makkelijk voor je team. Kies per persoon 1 basis en 1 extra erbij. Wij
                  leveren het overzichtelijk en klaar om neer te zetten.
                </p>

                <ul className={`mt-5 space-y-3 ${ui.mutedOnPaper}`}>
                  {[
                    "Per persoon: 1 basis (broodje, wrap of bowl) plus 1 extra (borrel, kaas of charcuterie) plus 1 zoete bite",
                    "Handig bij veel dieetwensen",
                    "Goed schaalbaar voor 10 tot 150+ personen",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-[#F5B841] shrink-0" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full md:max-w-sm rounded-3xl border border-[#D8C6AE]/60 bg-[#D8C6AE]/20 p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#0B0F14]/65">
                  Richtprijzen
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-semibold text-[#0B0F14]/85">Basis broodje of wrap</div>
                    <div className="font-headline text-xl font-bold text-[#0B0F14]/95">
                      € 7,50
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-semibold text-[#0B0F14]/85">Basis bowl</div>
                    <div className="font-headline text-xl font-bold text-[#0B0F14]/95">
                      € 10,50
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#0B0F14]/70">
                  Levering en planning stemmen we af op locatie en timing.
                </p>

                <Link href="#aanvraag" className={ui.ctaPrimary + " mt-5 w-full"}>
                  Offerte aanvragen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Events */}
          <div className={ui.paper + " mt-12 p-7 md:p-10"}>
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                <h3 className="font-headline text-2xl md:text-3xl font-bold">
                  Ook voor diners en events
                </h3>
                <p className={`mt-3 leading-relaxed ${ui.mutedOnPaper}`}>
                  Verjaardag, babyshower of een avond waar je geen stress wil over eten. Wij nemen
                  het over, brengen alles mee en zorgen dat het klopt.
                </p>

                <ul className={`mt-5 space-y-3 ${ui.mutedOnPaper}`}>
                  {[
                    "Diner op locatie met duidelijke timing",
                    "Menu dat past bij je gezelschap en moment",
                    "Nuchter, geen poeha. Wel kwaliteit die je proeft",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-[#F5B841] shrink-0" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="#aanvraag" className={ui.ctaPrimary}>
                    Bespreek je event <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <Link href="/contact" className={ui.ctaSecondary}>
                    Contact
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-[#D8C6AE]/60 bg-[#D8C6AE]/18 p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#0B0F14]/65">
                  Zo pakken we het aan
                </div>

                <div className="mt-4 space-y-4">
                  {[
                    {
                      n: "1",
                      t: "Jij stuurt datum, locatie en aantallen",
                      d: "Kort bericht is genoeg om te starten.",
                    },
                    { n: "2", t: "Wij maken een voorstel", d: "Duidelijk overzicht met keuzes en planning." },
                    {
                      n: "3",
                      t: "Levering of op locatie",
                      d: "Strak geregeld, zodat jouw dag rustig blijft.",
                    },
                  ].map((s) => (
                    <div key={s.n} className="rounded-2xl border border-[#D8C6AE]/65 bg-[#F3EDE3] p-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#D8C6AE]/70 bg-[#F3EDE3] font-headline font-bold text-[#0B0F14]">
                          {s.n}
                        </div>
                        <div>
                          <div className="font-semibold text-[#0B0F14]/88">{s.t}</div>
                          <div className={`mt-1 text-sm ${ui.mutedOnPaper}`}>{s.d}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="#aanvraag" className={ui.ctaPrimary + " mt-6 w-full"}>
                  Start met een aanvraag <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <p className={`mt-3 text-xs ${ui.mutedOnPaper}`}>
                  Liever eerst kort afstemmen? Ga naar{" "}
                  <Link href="/contact" className={ui.microLink}>
                    contact
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* RICHTPRIJZEN table (server-rendered, GEO-extractable) */}
          <div className="mx-auto mt-14 max-w-4xl">
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">
              Wat kost catering in Amersfoort? Richtprijzen per type
            </h2>
            <p className={`mt-3 text-center ${ui.mutedOnNight} md:text-lg`}>
              Vaste tarieven voor Amersfoort en omgeving. Levering binnen
              Amersfoort centrum gratis vanaf 15 personen. Alle prijzen
              exclusief 9% BTW op foodservice.
            </p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-white/10 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Type catering</th>
                    <th className="px-4 py-3 font-semibold">Minimum</th>
                    <th className="px-4 py-3 font-semibold">Aanlooptijd</th>
                    <th className="px-4 py-3 text-right font-semibold">Prijs p.p.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-4 font-medium">Kantoorlunch — broodjes / wraps</td>
                    <td className="px-4 py-4 text-white/80">10 pers.</td>
                    <td className="px-4 py-4 text-white/80">48 uur</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">vanaf €7,50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Kantoorlunch — bowls</td>
                    <td className="px-4 py-4 text-white/80">10 pers.</td>
                    <td className="px-4 py-4 text-white/80">48 uur</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">vanaf €10,50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Lunchpakket vegetarisch</td>
                    <td className="px-4 py-4 text-white/80">10 pers.</td>
                    <td className="px-4 py-4 text-white/80">48 uur</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">€13,50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Lunchpakket classic</td>
                    <td className="px-4 py-4 text-white/80">10 pers.</td>
                    <td className="px-4 py-4 text-white/80">48 uur</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">€14,50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Lunchpakket premium</td>
                    <td className="px-4 py-4 text-white/80">10 pers.</td>
                    <td className="px-4 py-4 text-white/80">48 uur</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">€18,50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Diner / event — family style</td>
                    <td className="px-4 py-4 text-white/80">8 pers.</td>
                    <td className="px-4 py-4 text-white/80">5 werkdagen</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">€28 – €45</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Diner / event — chef op locatie</td>
                    <td className="px-4 py-4 text-white/80">20 pers.</td>
                    <td className="px-4 py-4 text-white/80">10 werkdagen</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">€45 – €55</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium">Groot event (80 – 150+ pers.)</td>
                    <td className="px-4 py-4 text-white/80">80 pers.</td>
                    <td className="px-4 py-4 text-white/80">3-4 weken</td>
                    <td className="px-4 py-4 text-right font-semibold text-primary">offerte op maat</td>
                  </tr>
                </tbody>
              </table>
              <div className={`px-4 py-4 text-xs ${ui.mutedOnNight} md:text-sm`}>
                Levering gratis binnen Amersfoort centrum vanaf 15 personen.
                Randwijken Amersfoort (Vathorst, Hoogland, Hooglanderveen):
                €15 bezorgkosten. Buurgemeentes (Soest, Leusden, Baarn,
                Bunschoten, Nijkerk, Barneveld): €20 – €35 afhankelijk van
                afstand. Facturering 25% aanbetaling, 75% na oplevering.
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-14 max-w-4xl">
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">
              Veelgestelde vragen over Tafelaar × Jezza Cooks Catering
            </h2>
            <p className={`mt-2 text-center ${ui.mutedOnNight}`}>
              Korte antwoorden, zodat je snel kunt plannen.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
              <Accordion type="single" collapsible>
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`} className="border-white/10">
                    <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline text-white">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className={`${ui.mutedOnNight} text-base leading-relaxed`}>
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className={`mt-10 text-center text-xs ${ui.mutedOnNight}`}>
              Laatst bijgewerkt: 15 april 2026 · Tafelaar × Jezza Cooks Catering · Samenwerking
              tussen Jan Molmans (De Tafelaar, Kamp 8 Amersfoort) en Jeremy Arrascaeta ({SITE.name}{" "}
              KvK {SITE.kvk}) · {SITE.contact.phoneDisplay} · {SITE.contact.email}
            </p>
          </div>
        </div>
      </section>

      <StickyCtaBar phone={PHONE || undefined} />
    </div>
  );
}
