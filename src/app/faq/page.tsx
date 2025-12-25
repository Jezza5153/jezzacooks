import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeader from "@/components/page-header";

export default function FAQPage() {
  const faqs = [
    {
      question: "Wat betekent ‘no poeha’ in de horeca?",
      answer:
        "‘No poeha’ betekent: geen gedoe, geen praatjes, geen lucht. Ik werk direct en praktisch. We vinden waar je restaurant geld of energie verliest, bouwen structuur en trainen je team zodat het ook écht werkt op de vloer. Minder theorie, meer routines en systemen die keuken en bediening kunnen volgen.",
    },
    {
      question: "Wat betekent ‘organized chaos’ in een restaurantkeuken?",
      answer:
        "Horeca blijft druk, dat hoort erbij. ‘Organized chaos’ betekent: de rush blijft, maar de paniek verdwijnt. Met duidelijke prepplanning, heldere rollen, simpele werkafspraken en training wordt kwaliteit herhaalbaar. De service loopt strak, shift na shift.",
    },
    {
      question: "Voor wie is restaurant consulting bedoeld?",
      answer:
        "Voor restaurants, cafés, pubs en cateringteams die goed eten maken, maar te veel chaos ervaren of te weinig grip hebben op marge. Als je steeds brandjes blust, het team wisselt, of de cijfers niet kloppen, dan help ik je naar meer controle, rust en resultaat.",
    },
    {
      question: "Waarmee kan een restaurant consultant je concreet helpen?",
      answer:
        "Met menukaart optimalisatie (menu engineering), food cost beheersing, prepstructuur, werkprocedures, teamtraining, serviceflow en pricing. Het doel is simpel: betere marges, minder stress en een niveau dat elke service opnieuw klopt.",
    },
    {
      question: "Wat is menu engineering (menukaart optimaliseren)?",
      answer:
        "Menu engineering is je menukaart zo opbouwen dat het verkoopt én financieel klopt. We kijken naar wat gasten kiezen, wat het oplevert per gerecht, hoe prijzen werken, welke porties kloppen en hoe je kaart leest. Resultaat: een betere verkoopmix en meer brutowinst zonder je concept of identiteit te slopen.",
    },
    {
      question: "Kun je food cost verlagen zonder kwaliteitsverlies?",
      answer:
        "Ja. De grootste winst zit meestal niet in ‘goedkoper inkopen’, maar in dagelijkse lekkage: portiecontrole, recepturen op gram, mise-en-place discipline, verspilling en slimme inkoopafspraken. Kleine verbeteringen die je elke dag herhaalt leveren het grootste effect op, zonder dat je kwaliteit hoeft in te leveren.",
    },
    {
      question: "Wat maakt jou anders dan een standaard horeca business consultant?",
      answer:
        "Ik ben chef én operator. Ik heb service gedraaid, bestellingen gedaan, teams getraind en echte horeca-druk meegemaakt. Daardoor is mijn advies uitvoerbaar op de vloer: praktisch, helder en direct toepasbaar. Niet alleen mooie plannen, maar systemen die je team ook echt gebruikt.",
    },
    {
      question: "Werk je op locatie of online voor restaurant consulting?",
      answer:
        "Allebei. Op locatie gaat het vaak het snelst, omdat je dan de echte frictie ziet in prep en service: rolverdeling, timing, communicatie en stationopbouw. Online werkt heel goed voor menu engineering, costing, prijsstrategie, planning en het uitwerken van werkprocedures.",
    },
    {
      question: "Hoe snel zie je resultaat van restaurant consulting?",
      answer:
        "Quick wins zie je vaak binnen één tot twee weken als we de grootste lekken aanpakken, zoals food cost, prep, inkoop en menukeuzes. Daarna bouwen we routines en training zodat het blijft plakken en niet na een maand terugzakt naar oud gedrag.",
    },
    {
      question: "Hoe ziet een traject restaurant consulting er meestal uit?",
      answer:
        "We starten met een diagnose, bouwen structuur (prepplan, werkprocedures, costing en menustructuur), implementeren dit samen met het team en sturen bij op een paar kerncijfers. Het is hands-on: in echte prep en service, niet alleen op papier.",
    },
    {
      question: "Welke KPI’s zijn belangrijk voor restaurants?",
      answer:
        "We houden het simpel: food cost percentage, loonkosten percentage, prime cost, omzet per service, covers, tempo en doorlooptijd, verspilling en reviews. Met een paar goede KPI’s kun je sturen zonder dat je verdrinkt in administratie.",
    },
    {
      question: "Help je ook bij een nieuwe zaak of restaurant opening?",
      answer:
        "Ja. Juist dan wil je een sterke basis: menustructuur, costing, inkooproutines, prepplanning, training en serviceflow. Goed beginnen voorkomt maanden chaos en margeproblemen, en zorgt dat je team sneller op niveau komt.",
    },
    {
      question: "Maak je ook websites voor restaurants en horeca?",
      answer:
        "Ja. Ik bouw websites voor restaurants met focus op directe boekingen: een heldere propositie, een stevige SEO-basis en een verhaal dat converteert. Het doel is minder platformkosten en meer reserveringen en aanvragen via je eigen kanaal.",
    },
    {
      question: "Wat heb je nodig om te starten met restaurant consulting?",
      answer:
        "Als je het hebt: je menukaart met prijzen, inkoopgegevens of leveranciers, en je basis cijfers zoals food cost, loonkosten en covers. Heb je dat niet? Geen probleem. Dan starten we met een snelle diagnose en bouwen we vanaf daar de structuur op.",
    },
  ];

  return (
    <div>
      <PageHeader title="Veelgestelde vragen" />
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
