// app/insights/website-booking-tool/page.tsx
import Image from "next/image";
import { Link } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((p) => p.id === "blog-booking-site");

export default function WebsiteBookingToolPage() {
  return (
    <div>
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Bookings</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              Your Website Should Be a Booking Tool (Not a Brochure)
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A chef-led take on what actually converts: clarity, speed, trust, and a menu page
              that makes people book. No fancy effects needed.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Conversion</Badge>
              <Badge variant="secondary">Menu UX</Badge>
              <Badge variant="secondary">Speed</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Updated: 2025 · ~6 min read</p>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
          {heroImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden not-prose mb-10 border border-border bg-card">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            </div>
          )}

          <div className="not-prose mb-10 rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground mb-2">One job</p>
            <p className="text-base">
              Your website has one job: <b>get the booking (or inquiry)</b>. Everything else is
              decoration.
            </p>
          </div>

          <h2 className="font-headline">The 4 conversion levers</h2>
          <ol>
            <li><strong>Clarity:</strong> who you are, what you offer, who it’s for.</li>
            <li><strong>Speed:</strong> slow sites kill bookings (especially on mobile).</li>
            <li><strong>Trust:</strong> reviews, photos, location, contact, FAQ.</li>
            <li><strong>CTA:</strong> book now / call / WhatsApp—visible everywhere.</li>
          </ol>

          <h2 className="font-headline">The menu page is the deal-closer</h2>
          <p>
            People don’t just want “a menu”. They want confidence: price point, style, and
            what the experience feels like. Keep it clean, readable, and mobile-friendly.
          </p>
          <ul>
            <li>Make prices easy to scan</li>
            <li>Highlight signatures</li>
            <li>Don’t hide booking behind 3 clicks</li>
          </ul>

          <h2 className="font-headline">Direct bookings save real money</h2>
          <p>
            Every direct booking is commission you don’t pay. A good site pays for itself when it
            is built like a funnel, not a brochure.
          </p>

          <h2 className="font-headline">Minimum viable booking funnel</h2>
          <ul>
            <li>Hero: clear positioning + CTA</li>
            <li>Social proof: reviews / press / photos</li>
            <li>Menu/offer: what you do and for who</li>
            <li>FAQ: remove doubt</li>
            <li>Contact: easy, fast</li>
          </ul>

          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">
              Want a hospitality-only booking site?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Book a free 15-minute call—or DM “SITE” on Instagram @chefjezz.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/contact">Book a Free Call</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/services/websites">See Website Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
