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
        question: "Wat betekent ‘no poeha’?",
        answer:
          "No poeha = geen gedoe en geen lucht. Ik werk direct en praktisch: we vinden waar het lekt, bouwen structuur en trainen het team zodat het in de praktijk werkt. Minder theorie, meer systemen die je keuken en service écht kan volgen.",
      },
      {
        question: "Wat bedoel je met ‘organized chaos’?",
        answer:
          "Horeca blijft druk, dat hoort erbij. Organized chaos betekent: de rush blijft, maar de paniek verdwijnt. Met duidelijke prepplanning, heldere rollen, simpele SOP’s en training wordt kwaliteit herhaalbaar — shift na shift.",
      },
      {
        question: "Voor wie is jouw restaurant consulting bedoeld?",
        answer:
          "Voor restaurants, pubs, cafés en cateringteams die goed eten maken, maar te veel chaos ervaren of te weinig grip hebben op marge. Als je operationeel brandjes blust en cijfers niet kloppen, dan is dit precies waar ik op help.",
      },
      {
        question: "Waar help je concreet mee?",
        answer:
          "Menu engineering, food cost control, prepstructuur, SOP’s, training, serviceflow en pricing. Het doel is simpel: betere marges, minder stress en een niveau dat elke service opnieuw klopt.",
      },
      {
        question: "Wat is menu engineering (menukaart optimaliseren)?",
        answer:
          "Menu engineering is je menukaart zo bouwen dat het verkoopt én financieel klopt. We kijken naar populariteit, contribution margin, pricing, portioning en hoe gasten kiezen. Resultaat: betere verkoopmix en meer brutowinst zonder je identiteit te slopen.",
      },
      {
        question: "Kun je food cost verlagen zonder kwaliteit te verlagen?",
        answer:
          "Ja. De winst zit meestal niet in ‘goedkoper inkopen’, maar in dagelijkse lekkage: portion control, recepturen, mise-en-place discipline, waste punten en slimme inkoopafspraken. Kleine verbeteringen die je elke dag herhaalt geven het grootste effect.",
      },
      {
        question: "Wat maakt jou anders dan een standaard business consultant?",
        answer:
          "Ik ben chef én operator. Ik heb op de lijn gestaan, service gedraaid, bestellingen gedaan, teams getraind en echte horeca-druk meegemaakt. Daarom is mijn advies uitvoerbaar op de vloer, niet alleen in spreadsheets.",
      },
      {
        question: "Werk je op locatie of online?",
        answer:
          "Allebei. Op locatie gaat het vaak het snelst, omdat je dan de echte frictie ziet in prep en service: rolverdeling, timing, communicatie en station setup. Online werkt top voor menu engineering, costing, pricing en SOP’s.",
      },
      {
        question: "Hoe snel zie ik resultaat?",
        answer:
          "Quick wins zie je vaak binnen 1–2 weken als we de grootste lekken aanpakken (food cost, prep, inkoop, kaartkeuzes). Daarna bouwen we systemen en training zodat het blijft plakken, niet terugzakt.",
      },
      {
        question: "Hoe ziet een traject er meestal uit?",
        answer:
          "We starten met diagnose, bouwen structuur (prepplan, SOP’s, costing, menu-structuur), implementeren samen met het team en sturen bij op een paar kerncijfers. Het is hands-on: in echte service, niet in theorie.",
      },
      {
        question: "Welke cijfers volgen we (KPI’s)?",
        answer:
          "Simpel houden: food cost %, labor %, prime cost, covers, tempo/doorlooptijd, waste punten en reviews. Als je de juiste paar KPI’s scherp hebt, kun je sturen zonder dat je in administratie verdrinkt.",
      },
      {
        question: "Help je ook bij nieuwe zaken (openingen)?",
        answer:
          "Ja. Juist dan wil je een sterke basis: menu-structuur, costing, inkooproutines, prepplanning, training en serviceflow. Goed beginnen voorkomt maanden chaos en margeproblemen.",
      },
      {
        question: "Maak je ook websites voor horeca?",
        answer:
          "Ja. Websites voor restaurants met focus op directe boekingen: heldere propositie, SEO basis op orde en een verhaal dat converteert. Het doel is minder platformkosten en meer aanvragen/reserveringen via je eigen kanaal.",
      },
      {
        question: "Wat heb je van mij nodig om te starten?",
        answer:
          "Als je het hebt: menukaart, prijzen, leveranciers/inkoop, en je basis cijfers (food cost/labor/covers). Heb je dat niet? Geen probleem. Dan beginnen we met een snelle diagnose en bouwen we vanaf daar structuur op.",
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
  