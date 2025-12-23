import Image from "next/image";
import { Link } from "next-intl";
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
    description:
      "A chef-led, real-world breakdown of what consultants actually do, when you should hire one, and how to choose the right partner to fix chaos and protect margins.",
    link: "/insights/restaurant-consultant-ultimate-guide",
    image: PlaceHolderImages.find((p) => p.id === "blog-pillar"),
    category: "Consulting",
    readTime: "10 min",
    date: "2025",
  },
  {
    title: "Prime Cost Explained (Without the Spreadsheet Pain)",
    description:
      "What prime cost is, why it matters, and the simple weekly rhythm to stop guessing where your money goes.",
    link: "/insights/prime-cost-explained",
    image: PlaceHolderImages.find((p) => p.id === "blog-prime-cost"),
    category: "Margins",
    readTime: "7 min",
    date: "2025",
  },
  {
    title: "Menu Engineering: Stars, Puzzles, Plowhorses, Dogs (Chef Version)",
    description:
      "A practical way to rebuild your menu so it sells better and earns more—without killing the food.",
    link: "/insights/menu-engineering-chef-version",
    image: PlaceHolderImages.find((p) => p.id === "blog-menu-engineering"),
    category: "Menu",
    readTime: "9 min",
    date: "2025",
  },
  {
    title: "The Calm Service System: Prep, Roles, Pace",
    description:
      "How to remove bottlenecks and reduce stress: station flow, prep structure, and role clarity that holds up on busy nights.",
    link: "/insights/calm-service-system",
    image: PlaceHolderImages.find((p) => p.id === "blog-service-system"),
    category: "Systems",
    readTime: "8 min",
    date: "2025",
  },
  {
    title: "Your Website Should Be a Booking Tool (Not a Brochure)",
    description:
      "The few things that actually increase bookings: menu page UX, CTA clarity, speed, and local trust signals.",
    link: "/insights/website-booking-tool",
    image: PlaceHolderImages.find((p) => p.id === "blog-booking-site"),
    category: "Bookings",
    readTime: "6 min",
    date: "2025",
  },
  {
    title: "The Weekly Owner Rhythm: 30 Minutes That Saves Your Week",
    description:
      "A simple check-in routine to catch problems early: the handful of numbers and questions that keep you in control.",
    link: "/insights/weekly-owner-rhythm",
    image: PlaceHolderImages.find((p) => p.id === "blog-weekly-rhythm"),
    category: "Leadership",
    readTime: "5 min",
    date: "2025",
  },
];

export default function InsightsPage() {
  return (
    <div>
      <PageHeader
        title="Insights"
        subtitle="Chef-led, practical write-ups on margins, systems, menu strategy, and bookings. No fluff—stuff you can use this week."
      />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Intro strip */}
        <div className="max-w-5xl mx-auto mb-10 rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold">
                Learn the thinking behind the systems
              </h2>
              <p className="mt-2 text-muted-foreground">
                If you’re running good food with messy execution, start with the guide, then
                work through margins → systems → bookings.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">Margins</Badge>
              <Badge variant="secondary">Systems</Badge>
              <Badge variant="secondary">Menu</Badge>
              <Badge variant="secondary">Bookings</Badge>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.title}
              className="flex flex-col overflow-hidden group"
            >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                </div>
              </Link>

              <CardHeader>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <Badge variant="outline">{article.category}</Badge>
                  <span>
                    {article.readTime} · {article.date}
                  </span>
                </div>

                <CardTitle className="font-headline text-xl pt-2 leading-snug">
                  <Link
                    href={article.link}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription>{article.description}</CardDescription>
              </CardContent>

              <CardFooter>
                <Link
                  href={article.link}
                  className="font-semibold text-primary flex items-center group"
                >
                  Read article{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-14 rounded-lg border border-border bg-card p-8 text-center">
          <h3 className="font-headline text-2xl font-bold">
            Want a quick diagnosis on your business?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Book a free 15-minute call—or DM “SCAN” on Instagram and I’ll send you 3 quick wins.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
                <Link href="/contact">
                    Book a Free Call
                </Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href="/services/consulting">
                    See Consulting
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
