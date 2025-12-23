import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const articles = [
  {
    title: "What Is a Restaurant Consultant? The Ultimate Guide",
    description: "A deep dive into what a restaurant consultant actually does, when you should hire one, and how to choose the right partner for your growth.",
    link: "/insights/restaurant-consultant-ultimate-guide",
    image: PlaceHolderImages.find(p => p.id === 'blog-pillar'),
    category: "Consulting",
    date: "July 2024"
  },
];

export default function InsightsPage() {
  return (
    <div>
      <PageHeader
        title="Insights from the Kitchen"
        subtitle="Practical advice and strategies for hospitality growth, written from a chef's perspective."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.title} className="flex flex-col overflow-hidden group">
              <Link href={article.link} className="block">
                <div className="relative h-56">
                  {article.image && (
                    <Image
                      src={article.image.imageUrl}
                      alt={article.image.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={article.image.imageHint}
                    />
                  )}
                </div>
              </Link>
              <CardHeader>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <Badge variant="outline">{article.category}</Badge>
                    <span>{article.date}</span>
                </div>
                <CardTitle className="font-headline text-xl pt-2">
                  <Link href={article.link} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{article.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={article.link} className="font-semibold text-primary flex items-center group">
                  Read article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
