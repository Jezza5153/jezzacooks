
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";

export default function PricingPage() {
    const t = useTranslations('HomePage');

    const pricingTiers = [
        {
          title: t('quickScanTitle'),
          price: t('quickScanPrice'),
          description: t('quickScanDescription'),
          features: [t('quickScanFeature1'), t('quickScanFeature2'), t('quickScanFeature3')],
          cta: t('quickScanCta'),
          href: "/contact?service=consulting&package=scan"
        },
        {
          title: t('dayRateTitle'),
          price: t('dayRatePrice'),
          description: t('dayRateDescription'),
          features: [t('dayRateFeature1'), t('dayRateFeature2'), t('dayRateFeature3'), t('dayRateFeature4')],
           cta: t('dayRateCta'),
           href: "/contact?service=consulting&package=day"
        },
        {
          title: t('retainerTitle'),
          price: t('retainerPrice'),
          description: t('retainerDescription'),
          features: [t('retainerFeature1'), t('retainerFeature2'), t('retainerFeature3'), t('retainerFeature4')],
          cta: t('retainerCta'),
          href: "/contact?service=consulting&package=retainer"
        },
      ];

    return (
        <div>
            <PageHeader
                title={t('pricingTitle')}
                subtitle={t('pricingSubtitle')}
            />
            <section id="pricing" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier) => (
                        <Card key={tier.title} className="flex flex-col">
                            <CardHeader>
                            <CardTitle className="font-headline text-2xl">{tier.title}</CardTitle>
                            <p className="text-4xl font-bold pt-4">{tier.price}</p>
                            <p className="text-muted-foreground">{tier.description}</p>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                            <ul className="space-y-3 flex-grow">
                                {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                                ))}
                            </ul>
                            <Link href={tier.href} className={cn(buttonVariants({ variant: tier.price === 'Custom' ? 'default' : 'outline' }), "w-full mt-6 font-semibold")}>
                                {tier.cta}
                            </Link>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
