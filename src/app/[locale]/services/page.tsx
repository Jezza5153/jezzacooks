
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Link } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
    const t = useTranslations('HomePage');
    const services = [
        {
          title: t('consultingTitle'),
          description: t('consultingDescription'),
          link: "/services/consulting",
          image: PlaceHolderImages.find(p => p.id === 'service-consulting'),
        },
        {
          title: t('cateringTitle'),
          description: t('cateringDescription'),
          link: "/services/catering",
          image: PlaceHolderImages.find(p => p.id === 'service-catering'),
        },
        {
          title: t('websitesTitle'),
          description: t('websitesDescription'),
          link: "/services/websites",
          image: PlaceHolderImages.find(p => p.id === 'service-websites'),
        },
      ];

    return (
        <div>
            <PageHeader title={t('servicesTitle')} subtitle={t('servicesSubtitle')} />
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service) => (
                        <Card key={service.title} className="bg-background overflow-hidden group">
                            <div className="relative h-48">
                            {service.image && 
                            <Image
                                src={service.image.imageUrl}
                                alt={service.image.description}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={service.image.imageHint}
                            />
                            }
                            </div>
                            <CardHeader>
                            <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-muted-foreground mb-4">{service.description}</p>
                            <Link href={service.link} className={cn(buttonVariants({ variant: "link" }), "p-0 font-semibold text-primary")}>
                                {t('learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
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
