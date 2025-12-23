import PageHeader from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What does 'no poeha' mean?",
        answer: "It's a Dutch expression for 'no fuss' or 'no nonsense'. My approach is direct, practical, and focused on tangible results. We skip the corporate jargon and get straight to what works for your business."
    },
    {
        question: "I'm just starting out a new restaurant. Can you help?",
        answer: "Absolutely. Some of my most rewarding projects involve helping new concepts build a strong foundation from day one. We can work on everything from your initial menu and costing, to operational workflows, and a website that gets you bookings before you even open."
    },
    {
        question: "How are you different from a regular business consultant or a web agency?",
        answer: "I'm a chef first. I've run the pass, managed inventory, and dealt with the day-to-day chaos of hospitality. My advice and solutions are grounded in real-world kitchen and front-of-house experience. I don't just build you a website; I build a hospitality tool that understands menu psychology and service flow."
    },
    {
        question: "What's the ROI on your services?",
        answer: "While it varies per project, clients typically see returns through increased profit margins, higher average checks, more direct bookings (saving on commission fees), and significant time savings for owners and managers. During our initial call, we can outline potential ROI for your specific situation."
    },
    {
        question: "Do you work with businesses outside of the Netherlands?",
        answer: "Yes, I work with clients globally. For consulting, we can do a lot remotely through video calls and data analysis. For on-site projects or catering, travel arrangements can be discussed."
    },
    {
        question: "How do I know which service is right for me?",
        answer: "The best way is to book a free 15-minute call. We'll quickly diagnose your primary challenge and I'll give you an honest recommendation on which service—if any—is the right fit. There's no hard sell."
    },
     {
        question: "What's included in a 'Quick Scan'?",
        answer: "The Quick Scan is a 90-minute intensive session where we deep-dive into one specific area of your business (e.g., your menu, your P&L, your website's booking funnel). You'll walk away with a clear diagnosis and 3 actionable priorities to work on immediately."
    }
];

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Answers to common questions. If you don't find what you're looking for, feel free to reach out."
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
