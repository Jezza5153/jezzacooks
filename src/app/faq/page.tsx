// src/app/faq/page.tsx
import PageHeader from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wat bedoel je met ‘no-nonsense’?",
    answer:
      "Kort: geen poeha, geen consultancy-taal. We focussen op wat werkt in de praktijk en wat meetbaar resultaat geeft: marge, rust en consistenter service.",
  },
  {
    question: "Ik start net met een zaak. Kun je helpen?",
    answer:
      "Ja. Sterker nog: dan is impact vaak het grootst. We bouwen vanaf dag 1 je menu, costing, SOP’s, workflow en (als je wil) een website die direct reserveringen pakt.",
  },
  {
    question: "Hoe ben jij anders dan een standaard consultant?",
    answer:
      "Ik ben chef eerst. 20 jaar op de vloer, Michelin ervaring, managementrollen. Ik ken de chaos van service, en ik bouw systemen die je team echt gebruikt — niet alleen mooi op papier.",
  },
  {
    question: "Wat levert het op (ROI)?",
    answer:
      "Dat verschilt per zaak, maar de grootste winst zit bijna altijd in prime cost (food + labor), menu-engineering, minder waste, betere upsell en meer rust in operatie. In de call schat ik de quick wins voor jouw situatie.",
  },
  {
    question: "Werk je alleen in Nederland?",
    answer:
      "Consulting kan ook remote. On-site (of catering) kan op afspraak met reisplanning.",
  },
  {
    question: "Hoe weet ik welke dienst past?",
    answer:
      "Boek die gratis 15-min diagnose. Jij legt je situatie neer, ik stel de juiste vragen, en je krijgt een eerlijk advies wat de beste volgende stap is (ook als dat betekent: nog niets).",
  },
  {
    question: "Wat is een ‘Quick Scan’ precies?",
    answer:
      "90 minuten deep dive op één thema (menu, P&L, chaos, systemen, website funnel). Je gaat weg met 3 harde prioriteiten + eerste acties. En ik blijf 1 maand bereikbaar via WhatsApp voor korte vragen.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        title="FAQ"
        subtitle="Snel antwoord. Staat je vraag er niet tussen? Stuur een bericht."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="text-left font-headline text-xl hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
