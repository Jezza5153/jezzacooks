
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import PageHeader from "@/components/page-header";
import { useTranslations } from "next-intl";

export default function FAQPage() {
    const t = useTranslations('HomePage');
    const faqs = [
        {
            question: t('faq1Question'),
            answer: t('faq1Answer'),
        },
        {
            question: t('faq2Question'),
            answer: t('faq2Answer'),
        },
        {
            question: t('faq3Question'),
            answer: t('faq3Answer'),
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
