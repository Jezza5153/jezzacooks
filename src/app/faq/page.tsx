import PageHeader from "@/components/page-header";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Who do you help best?",
    answer:
      "Restaurants and hospitality businesses with good food but messy execution: thin cashflow, unclear priorities, inconsistent service, weak systems, or a menu that isn’t helping margins. If you feel like you’re constantly firefighting, you’re my type of project.",
  },
  {
    question: "Who is NOT a good fit?",
    answer:
      "If you want a quick motivational talk, a generic ‘business plan template’, or someone to agree with everything you say—skip me. I’m hands-on, direct, and I’ll challenge assumptions. Also: if the team refuses to change, results will stall.",
  },
  {
    question: "What problems do you usually fix first?",
    answer:
      "Almost always one of these: (1) menu structure + pricing, (2) food cost leaks (purchasing/portioning/waste), (3) prep & roles (who does what, when), (4) service flow (pace + consistency), (5) simple KPI rhythm so you can see issues early.",
  },
  {
    question: "Do you help new restaurant concepts too?",
    answer:
      "Yes. New concepts are where you avoid expensive mistakes. We lock your positioning, menu logic, costing, kitchen flow, and a simple booking-ready online presence—so you launch with structure instead of chaos.",
  },
  {
    question: "How are you different from a typical business consultant?",
    answer:
      "I’m a chef first. I’ve lived the pressure of service, led teams, and built systems inside real kitchens. My advice is practical, measurable, and built for hospitality reality—not corporate theory.",
  },
  {
    question: "How are you different from a web agency?",
    answer:
      "I only do websites for hospitality—and I treat them as a booking tool, not a design project. Menu psychology, CTA placement, speed, and clarity matter more than fancy effects. If the site doesn’t convert, it’s not finished.",
  },
  {
    question: "What is a ‘Quick Scan’ and what do I get?",
    answer:
      "A focused 90-minute session on ONE area (menu, operations, costing, or bookings). You leave with: (1) a clear diagnosis, (2) the top 3 priorities, and (3) a simple action plan you can execute immediately.",
  },
  {
    question: "How do you work—what’s the process?",
    answer:
      "Diagnose → build structure → execute with the team → measure & improve. We keep it simple: a few key numbers, clear ownership, and repeatable systems that hold up during busy service.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "Basic context is enough: your menu (photo/link), rough weekly sales/covers, average spend, biggest pain (margins/chaos/bookings), and a few pictures of your operation if possible. If you have P&L or supplier invoices—great, but not required for the first step.",
  },
  {
    question: "Do you work on-site in Amersfoort and beyond?",
    answer:
      "Yes. Amersfoort and the surrounding region are easy. Remote can work for strategy/menu/costing, but on-site is best for flow, training, and fixing operational friction fast.",
  },
  {
    question: "How do you price your work?",
    answer:
      "I offer a Quick Scan, day-rate/on-site blocks, project pricing, and monthly support (retainer). We choose the simplest model based on your situation and speed needed. After the first call, you’ll get a clear scope and deliverables—no vague hours.",
  },
  {
    question: "What kind of results should I expect (ROI)?",
    answer:
      "It depends on where the leaks are. Typical wins come from tighter purchasing/portioning, smarter menu pricing, smoother prep and service flow, and clearer weekly numbers—so you stop guessing. I won’t promise magic, but we will set measurable targets and track them.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "I guarantee clarity and a real plan. Results depend on execution and team buy-in. If something isn’t working, we adjust—fast. The goal is sustainable improvement, not a one-week spike.",
  },
  {
    question: "Can you help with marketing too?",
    answer:
      "Yes—especially the parts that connect to revenue: positioning, offers, menu messaging, content structure, and a simple booking funnel. Hospitality is an experience business—marketing has to match what guests feel.",
  },
  {
    question: "How do we start?",
    answer:
      "Book a free 15-minute call. Tell me the situation. I’ll tell you straight if I can help, and what I would fix first.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        title="FAQ"
        subtitle="Clear answers. No fluff. If you don’t see your question here, just reach out."
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

          {/* CTA */}
          <div className="mt-14 rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold">
              Want a quick diagnosis?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call. If I can help, I’ll tell you exactly what I’d fix first.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Book a Free Call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/services/consulting">See Consulting</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Prefer DM? Message “SCAN” on Instagram @chefjezz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
