
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import PageHeader from "@/components/page-header";

export default function FAQPage() {
    const faqs = [
        {
            question: "What does 'no poeha' mean?",
            answer: "It's Dutch for 'no fuss' or 'no nonsense'. My approach is direct, practical, and focused on tangible results. We skip the jargon and get straight to what works for your business.",
        },
        {
            question: "I'm just starting out. Can you help?",
            answer: "Absolutely. I help new restaurants and hospitality concepts build a strong foundation from day one, covering everything from menu engineering to operational workflows and a booking-focused website.",
        },
        {
            question: "How are you different from a regular business consultant?",
            answer: "I'm a chef first. I've run the pass, managed inventory, and dealt with the day-to-day chaos of hospitality. My advice is grounded in real-world kitchen and front-of-house experience, not just spreadsheets.",
        }
    ]
    return (
        <div>
            <PageHeader title="Frequently Asked Questions" />
            <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
