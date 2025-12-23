import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    title: "Restaurant Consulting",
    subtitle: "For owners who want to improve profitability and efficiency.",
    description: "From menu engineering and food cost control to operational streamlining and team training, I provide practical strategies to build a more resilient and profitable restaurant.",
    link: "/services/consulting",
    image: PlaceHolderImages.find(p => p.id === 'service-consulting'),
  },
  {
    title: "Catering & Private Chef",
    subtitle: "For memorable events and unique dining experiences.",
    description: "Whether it's an intimate dinner party, a corporate event, or a brand launch, I design and execute bespoke culinary experiences that leave a lasting impression on your guests.",
    link: "/services/catering",
    image: PlaceHolderImages.find(p => p.id === 'service-catering'),
  },
  {
    title: "Hospitality Websites",
    subtitle: "For businesses that need to turn visitors into bookings.",
    description: "I build fast, beautiful, and conversion-focused websites specifically for hospitality. A site built by a chef understands menu psychology, service flow, and how to get direct bookings.",
    link: "/services/websites",
    image: PlaceHolderImages.find(p => p.id === 'service-websites'),
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="A unified approach to hospitality growth. I combine operational expertise, culinary creativity, and digital strategy to help your business thrive."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="space-y-16">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="relative h-64 md:h-full min-h-[300px]">
                {service.image && (
                  <Image
                    src={service.image.imageUrl}
                    alt={service.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={service.image.imageHint}
                  />
                )}
              </div>
              <div className="p-8 md:p-12">
                <h2 className="font-headline text-3xl font-bold">{service.title}</h2>
                <h3 className="text-primary font-semibold mt-1">{service.subtitle}</h3>
                <p className="text-muted-foreground mt-4">{service.description}</p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
