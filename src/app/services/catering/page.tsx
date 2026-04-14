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
  title: "Catering Amersfoort — Kantoorlunch, diners & events door Tafelaar",
  description:
    "Chef-led catering in Amersfoort vanuit restaurant De Tafelaar (Kamp 8, binnenstad). Jezza Cooks × Tafelaar Catering: kantoorlunch (broodjes, wraps, bowls, lunchpakketten vanaf €7,50), diners voor verjaardagen en babyshowers, events voor 10 tot 150+ personen. Nuchter, strak verpakt en makkelijk uit te delen.",
  alternates: { canonical: "/services/catering" },
  openGraph: {
    title: "Catering Amersfoort — Tafelaar × Jezza Cooks",
    description:
      "Kantoorlunch, diners en events vanuit restaurant De Tafelaar aan de Kamp in het centrum van Amersfoort. Van 10 tot 150+ personen. Chef-led door Jeremy Arrascaeta.",
    type: "website",
    url: "/services/catering",
  },
};

const cateringServiceSchema = buildServicePage({
  slug: "catering",
  name: "Catering Amersfoort — Tafelaar × Jezza Cooks",
  description:
    "Chef-led catering in Amersfoort en omgeving vanuit restaurant De Tafelaar aan de Kamp (binnenstad Amersfoort). Kantoorlunch, borrel, diners voor verjaardagen, babyshowers en events. Door Jeremy Arrascaeta (chef-kok De Tafelaar Amersfoort).",
  areaServed: ["Amersfoort", "Utrecht", "Hilversum", "Apeldoorn", "Zwolle"],
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
    q: "Wat kost catering bij Tafelaar × Jezza Cooks?",
    a: "Kantoorlunch begint bij €7,50 per persoon voor broodjes en wraps, en €10,50 per persoon voor bowls. Lunchpakketten (sandwich + salad + bite + dessert) zijn €13,50 vegetarisch, €14,50 classic en €18,50 premium. Alle prijzen exclusief BTW (9% op foodservice). Voor diners en events maken we een offerte op maat — meestal tussen €28 en €55 per persoon afhankelijk van menu, gangen en of we op locatie serveren of strak verpakt leveren. Levering binnen Amersfoort centrum is gratis vanaf 15 personen; daarbuiten rekenen we €15 tot €35 afhankelijk van afstand. Annulering tot 14 dagen vóór het event is kosteloos; tussen 14 en 7 dagen rekenen we 50% en binnen 7 dagen 100% van het offertebedrag. Facturering: 25% aanbetaling, 75% na oplevering.",
  },
  {
    q: "Kunnen jullie rekening houden met dieetwensen, allergenen en vegetarische opties?",
    a: "Ja, volledig. Elke menukaart staat met duidelijke allergenen vermeld (gluten, lactose, eieren, vis, soja, noten, sesam) zodat je team direct ziet wat ze kunnen pakken. Vegetarische opties zijn geen afterthought — Bieten en Geitenkaas Bowl, Inari Power Bowl, Veggie Meatball Wrap zijn kern-items. Voor veganistisch, glutenvrij, halal of specifieke intoleranties (lactose, ei, soja) maken we individuele varianten die we persoonlijk labelen per gast. Als je een deelnemerslijst hebt met namen en dieetwensen, verwerken we dat rechtstreeks in de verpakking zodat niemand hoeft te zoeken. Bij Build Your Own Lunch krijgen grote groepen met veel dieetwensen een overzicht per persoon, wat stress op de dag voorkomt. HACCP conform. Alle keukenhandelingen vinden plaats in de keuken van restaurant De Tafelaar aan de Kamp 8 in het centrum van Amersfoort.",
  },
  {
    q: "Hoe wordt catering in Amersfoort geleverd — op locatie of strak verpakt?",
    a: "Beide — jij kiest wat bij je event past. Voor kantoorlunch leveren we standaard strak verpakt in individuele boxen of per categorie (broodjes, bowls, wraps) zodat je team direct kan pakken. Levering binnen Amersfoort is meestal 30 minuten voor de gewenste lunchtijd; buiten Amersfoort plannen we dat vooraf met je in. Voor diners en events brengen we alle apparatuur, serviesgoed, bestek en presentatiematerialen mee en serveren we op locatie — inclusief afbouw. Voor grotere events bieden we ook chef-led cooking op locatie aan: Jeremy staat zelf achter de pass. Exacte timing, parkeerinstructies en contactpersoon stemmen we een dag vooraf nog één keer af via WhatsApp of mail, zodat er geen verrassingen zijn op de dag zelf.",
  },
  {
    q: "Welke wijken en steden leveren jullie catering?",
    a: "Bezorggebied is heel Amersfoort en alle wijken (Binnenstad, Kamp, Soesterkwartier, Leusderkwartier, Vathorst, Valleipoort, Kattenbroek, Randenbroek, Hoogland, Liendert, Schothorst, Zielhorst), plus Soest, Leusden, Baarn, Bunschoten, Nijkerk en Barneveld. Voor Utrecht, Hilversum, Apeldoorn en Zwolle leveren we op afspraak met een aangepaste levertijd en minimumafname vanaf 20 personen. Binnen Amersfoort centrum (postcodes 3811, 3812, 3813) en de meeste woonwijken is de bezorging gratis vanaf 15 personen; voor randwijken zoals Vathorst, Hoogland en Hooglanderveen rekenen we €15 bezorgkosten, en voor buurgemeentes €20 tot €35 afhankelijk van afstand. Keukenbasis is restaurant De Tafelaar aan de Kamp 8, 3811 AR Amersfoort — dus vanaf de Koppelpoort rijden we in minder dan 10 minuten naar de meeste kantoorlocaties in de stad.",
  },
  {
    q: "Doen jullie ook diners, verjaardagen en private chef events?",
    a: "Ja. Naast kantoorlunch doen we diners voor verjaardagen, babyshowers, jubilea, bruiloften en private chef-events waar je geen stress wil over eten. We komen op locatie (bij jou thuis, op kantoor, of in een zaaltje), brengen alles mee en zorgen dat het klopt — van menu-ontwerp en inkoop tot service en opruimen. Het aanbod varieert van een 3-gangen family-style diner voor 8 tot 20 personen, via een buffet- of receptieformule voor 20 tot 60, tot volledig private chef events met Jeremy zelf aan het fornuis. De samenwerking met restaurant De Tafelaar (Kamp 8, Amersfoort) geeft ons toegang tot een volwaardige restaurantkeuken, wat betekent dat we ook lastige technieken (dry-age, sous-vide, finishing op open vuur) kunnen leveren op locatie. Vertel ons datum, aantal en idee — dan maken we een voorstel dat klopt.",
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
              {/* Logo bigger */}
              <div className="relative h-24 w-[384px] md:h-28 md:w-[504px]">
                <Image
                  src="/pics/tafelaar-x-jezza-logo.png"
                  alt="Tafelaar Catering"
                  fill
                  sizes="(max-width: 768px) 384px, 504px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold">
                <span className={ui.copperDot} aria-hidden="true" />
                Tafelaar Catering
              </div>
            </div>

            <h1 className="mt-5 font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Catering Amersfoort — vanuit De Tafelaar, Kamp 8
            </h1>

            <p
              className={`mt-4 text-base md:text-xl leading-relaxed ${ui.mutedOnNight} mx-auto max-w-3xl`}
            >
              Kantoorlunch, diners en events vanuit restaurant <strong>De Tafelaar</strong> aan
              de <strong>Kamp 8 in het centrum van Amersfoort</strong>. Chef-led door Jeremy
              Arrascaeta (chef-kok De Tafelaar, 10+ jaar high-end keukens in Europa en Australië).
              Broodjes, bowls, wraps en lunchpakketten vanaf €7,50. Strak verpakt, makkelijk uit
              te delen, van 10 tot 150+ personen.
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
                  Lunch die werkt op kantoor
                </h2>

                <p className={`mt-3 leading-relaxed ${ui.mutedOnPaper}`}>
                  Geen gedoe, wel kwaliteit. Onze kantoorlunch is ontworpen om netjes te eten,
                  makkelijk te verdelen en consistent te leveren. Perfect voor vergaderlunches,
                  teamdagen en events.
                </p>

                <p className={`mt-4 leading-relaxed ${ui.mutedOnPaper}`}>
                  Na het bouwen van menu en keukenstructuur bij <strong>De Tafelaar Amersfoort</strong>
                  {" "}(shared-dining restaurant aan de Kamp 8, binnenstad) besloten we de krachten
                  te bundelen in catering. Jan Molmans brengt de nuchtere geen-poeha stijl. Jeremy
                  Arrascaeta (Jezza Cooks) brengt de chef-kok routine en de structuur — 10+ jaar
                  in high-end keukens in Europa en Australië, inclusief dry-aging lead bij Angler
                  Stirling in de Adelaide Hills. Samen leveren we iets dat simpel voelt, maar wel
                  strak staat. Gefeatured in AD.nl, De Gelderlander en indebuurt.nl Amersfoort.
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
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className={ui.container + " " + "pb-14 md:pb-24"}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Assortiment</h2>
            <p className={`mt-3 ${ui.mutedOnNight} md:text-lg`}>
              Vaste prijzen, duidelijke keuzes. Openklappen per categorie.
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

          {/* FAQ */}
          <div className="mx-auto mt-14 max-w-4xl">
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">Vragen</h2>
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
              Laatst bijgewerkt: 14 april 2026 · Catering vanuit restaurant De Tafelaar, Kamp 8,
              3811 AR Amersfoort · {SITE.name} KvK {SITE.kvk} · {SITE.contact.phoneDisplay} ·{" "}
              {SITE.contact.email}
            </p>
          </div>
        </div>
      </section>

      <StickyCtaBar phone={PHONE || undefined} />
    </div>
  );
}
