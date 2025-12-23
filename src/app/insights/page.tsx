import type React from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const articles = [
  {
    slug: 'restaurant-consultant-ultimate-guide',
    title: 'The Ultimate Guide to Hiring a Restaurant Consultant',
    description:
      'Everything you need to know before, during, and after hiring a restaurant consultant to ensure you get the best ROI.',
    image: 'blog-pillar',
    category: 'Consulting 101',
    date: 'June 10, 2024',
    body: (
      <>
        <p>
          Hiring a restaurant consultant can feel like a big step. Will it be
          worth the investment? How do you know you're hiring the right person?
          This guide demystifies the process, giving you a clear roadmap from a
          chef's perspective.
        </p>
        <h3>1. When to Hire a Consultant</h3>
        <p>
          You don't hire a consultant when things are perfect. You hire one
          when you're stuck, overwhelmed, or ready to grow but unsure of the
          next step. Common triggers include:
        </p>
        <ul>
          <li>
            <strong>Stagnant or Declining Profits:</strong> Your revenue is
            okay, but your bank account isn't growing.
          </li>
          <li>
            <strong>Operational Chaos:</strong> Service is inconsistent, the
            kitchen is a mess, and you're constantly putting out of fires.
          </li>
          <li>
            <strong>Menu Fatigue:</strong> Your menu hasn't changed in years,
            and food costs are creeping up.
          </li>
          <li>
            <strong>Expansion Plans:</strong> You want to open a second
            location but need a bulletproof operational model first.
          </li>
        </ul>
        <h3>2. What a (Good) Consultant Actually Does</h3>
        <p>
          A good consultant doesn't just give you a report; they roll up their
          sleeves. I focus on three core areas:
        </p>
        <ul>
          <li>
            <strong>Profitability:</strong> Deep dive into your P&L, menu
            engineering, and supplier negotiations. We find the hidden dollars.
          </li>
          <li>
            <strong>Operations:</strong> Streamlining FOH and BOH workflows,
            implementing simple systems (SOPs), and improving communication.
          </li>
          <li>
            <strong>Brand & Marketing:</strong> Ensuring your concept, menu,
            and online presence all tell the same story and attract the right
            guests.
          </li>
        </ul>
        <p>
          The goal is to build systems that run themselves, so you can transition
          from working IN your business to working ON it.
        </p>
      </>
    ),
  },
  {
    slug: 'prime-cost-explained',
    title: 'Prime Cost Explained for Chefs',
    description:
      "A practical guide to understanding and controlling your restaurant's prime cost.",
    image: 'blog-prime-cost',
    category: 'Finance',
    date: 'June 11, 2024',
    body: (
      <>
        <p>
          Prime Cost is the most important number for any restaurant owner to
          know. It's the one number that tells you if your business is
          fundamentally healthy.
        </p>
        <p>
          <strong>Prime Cost = Total Cost of Goods Sold (CoGS) + Total Labor
          Cost</strong>
        </p>
        <p>
          Your CoGS includes all food and beverage costs. Your Total Labor Cost
          includes salaries, hourly wages, payroll taxes, and benefits.
        </p>
        <h3>What's a Good Prime Cost?</h3>
        <p>
          The industry benchmark for a healthy prime cost is{' '}
          <strong>60% or less</strong> of your total revenue.
        </p>
        <ul>
          <li>
            <strong>Under 60%:</strong> You're running a tight ship. Profitable.
          </li>
          <li>
            <strong>60-65%:</strong> The "caution zone." You're likely breaking
            even but have little room for error.
          </li>
          <li>
            <strong>Over 65%:</strong> The "danger zone." You are very likely
            losing money.
          </li>
        </ul>
        <h3>How to Control It</h3>
        <ol>
          <li>
            <strong>Accurate Recipe Costing:</strong> Know what every dish
            costs to make, down to the gram.
          </li>
          <li>
            <strong>Inventory Management:</strong> Implement a "first in, first
            out" (FIFO) system and track waste diligently.
          </li>
          <li>
            <strong>Smart Scheduling:</strong> Write schedules based on sales
            forecasts, not just feelings. Avoid overstaffing during slow
            periods.
          </li>
          <li>
            <strong>Menu Engineering:</strong> Analyze your sales data (Menu
            Mix report) to promote high-profit items and re-price or remove
            low-profit ones.
          </li>
        </ol>
        <p>
          Controlling prime cost isn't about being cheap; it's about being
          smart. It's the foundation of a sustainable, profitable restaurant.
        </p>
      </>
    ),
  },
  {
    slug: 'calm-service-system',
    title: 'The Calm Service System',
    description:
      'How to build a service system that runs itself, so you can focus on what matters.',
    image: 'blog-service-system',
    category: 'Operations',
    date: 'June 12, 2024',
    body: (
      <>
        <p>
          "Calm service" sounds like an oxymoron in the restaurant industry.
          But it's achievable when you replace chaos with a system. The goal is
          to make the 'right way' the 'easy way' for your team.
        </p>
        <h3>The 3 Pillars of Calm Service</h3>
        <p>
          A solid service system is built on three pillars that support each
          other.
        </p>
        <ol>
          <li>
            <strong>Clear Roles & Responsibilities (The "Who"):</strong> Every
            person on the floor knows exactly what their primary role and
            secondary responsibilities are. Who runs food? Who handles payment?
            Who resets tables? When this is ambiguous, things get missed.
            Create a simple chart.
          </li>
          <li>
            <strong>Sequential Steps of Service (The "What"):</strong> Map out
            the ideal guest journey from the moment they walk in to the moment
            they leave. This should be a checklist, not a novel. E.g., 1. Greet
            within 30 seconds. 2. Water on the table within 2 minutes. 3. Take
            drink order. Etc.
          </li>
          <li>
            <strong>Defined Communication Loops (The "How"):</strong> Chaos
            thrives in poor communication. Standardize call-backs in the
            kitchen ("Heard, chef!"), and define how FOH communicates with BOH
            about VIPs, allergies, or long ticket times.
          </li>
        </ol>
        <p>
          Implementing this system isn't about turning your staff into robots.
          It's about providing a framework that handles 90% of situations, so
          their talent and personality can shine in handling the other 10%.
          Structure creates freedom.
        </p>
      </>
    ),
  },
  {
    slug: 'website-booking-tool',
    title: 'Your Website is a Booking Tool',
    description:
      "How to turn your restaurant's website into a machine that generates direct bookings.",
    image: 'blog-booking-site',
    category: 'Marketing',
    date: 'June 13, 2024',
    body: (
      <>
        <p>
          Most restaurant websites are digital brochures. They're pretty, but
          they don't do any work. Your website should be your hardest-working
          employee, converting visitors into direct bookings 24/7.
        </p>
        <h3>The 5-Second Test</h3>
        <p>
          When a potential guest lands on your homepage, can they answer these
          three questions in 5 seconds?
        </p>
        <ol>
          <li>What kind of food do you serve?</li>
          <li>Where are you located?</li>
          <li>How do I book a table?</li>
        </ol>
        <p>
          If the answer to any of these isn't immediately obvious, you're
          losing bookings.
        </p>
        <h3>Anatomy of a High-Converting Restaurant Website</h3>
        <ul>
          <li>
            <strong>"Book Now" Button (Above the Fold):</strong> It must be
            visible without scrolling. Use a contrasting color. This is the
            single most important element.
          </li>
          <li>
            <strong>The Menu is Front and Center:</strong> Don't make people
            hunt for it. Link directly to your menu in the main navigation.
            Bonus points for a simple, mobile-friendly design (NOT a PDF).
          </li>
          <li>
            <strong>Address & Hours in the Footer/Header:</strong> Make this
            information easy to find on every page.
          </li>
          <li>
            <strong>High-Quality Photos:</strong> Invest in professional photos
            of your food and your space. People eat with their eyes first.
          </li>
          <li>
            <strong>Mobile-First Design:</strong> The vast majority of your
            visitors will be on their phone. Your site must be fast and easy to
            navigate on a small screen.
          </li>
        </ul>
        <p>
          Stop paying high commissions to third-party booking platforms. By
          optimizing your own website, you take back control of your guest
          relationships and your profit margins.
        </p>
      </>
    ),
  },
  {
    slug: 'weekly-owner-rhythm',
    title: "The Weekly Owner's Rhythm",
    description:
      'A simple weekly schedule to stay in control of your restaurant without losing your mind.',
    image: 'blog-weekly-rhythm',
    category: 'Productivity',
    date: 'June 14, 2024',
    body: (
      <>
        <p>
          As a restaurant owner, it's easy to get trapped in a cycle of
          reactivity, constantly putting out of fires. A weekly rhythm helps you
          shift from reactive to proactive, focusing on the tasks that actually
          drive growth.
        </p>
        <p>
          Block out time for these activities every week. Treat them as
          unbreakable appointments.
        </p>
        <h3>The Template</h3>
        <ul>
          <li>
            <strong>Monday (Admin & Review - 2 hours):</strong>
            <ul>
              <li>Review last week's sales, labor, and food cost reports.</li>
              <li>Pay key suppliers.</li>
              <li>Set goals for the upcoming week with your chef/manager.</li>
            </ul>
          </li>
          <li>
            <strong>Tuesday (Marketing & Growth - 1.5 hours):</strong>
            <ul>
              <li>Plan this week's social media posts.</li>
              <li>Respond to all online reviews (good and bad).</li>
              <li>
                Work on one small marketing initiative (e.g., plan a new event,
                write a newsletter).
              </li>
            </ul>
          </li>
          <li>
            <strong>Wednesday (Team & Operations - 1 hour):</strong>
            <ul>
              <li>
                Hold a brief, structured meeting with your key staff. Discuss
                the week's goals and any operational hurdles.
              </li>
              <li>Review the upcoming schedule before it's posted.</li>
            </ul>
          </li>
          <li>
            <strong>Thursday (On the Floor - 3 hours):</strong>
            <ul>
              <li>
                Work a portion of the shift. Be visible. Talk to guests, support
                your team. Don't be the boss; be part of the team. Observe.
                What's working? What's not?
              </li>
            </ul>
          </li>
          <li>
            <strong>Friday (Financial Check-in - 30 mins):</strong>
            <ul>
              <li>Quick check of daily sales vs. labor.</li>
              <li>Ensure all invoices are logged.</li>
            </ul>
          </li>
        </ul>
        <p>
          This is just a template. Adjust it to your restaurant's rhythm. The
          key is consistency. This structured approach reduces stress, empowers
          your team, and gives you back the headspace to be a leader, not just a
          firefighter.
        </p>
      </>
    ),
  },
];

type Article = (typeof articles)[0];

const ArticleContent = ({ article }: { article: Article }) => {
  const articleImage = PlaceHolderImages.find((p) => p.id === article.image);
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{article.title}</h2>
      {articleImage && (
        <div className="relative aspect-video rounded-lg overflow-hidden not-prose mb-10 border border-border bg-card">
          <Image
            src={articleImage.imageUrl}
            alt={articleImage.description}
            fill
            className="object-cover"
            data-ai-hint={articleImage.imageHint}
          />
        </div>
      )}

      <div className="mb-8">
        <Badge variant="outline">{article.category}</Badge>
        <p className="mt-2 text-sm text-muted-foreground">{article.date}</p>
      </div>

      {article.body}

      {/* CTA BOX */}
      <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
        <h3 className="font-headline text-2xl font-bold">
          Want a quick diagnosis?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Book a free 15-minute call. If I can help, I’ll tell you exactly
          what I’d fix first.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/contact">Book Your Free Call</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-semibold"
          >
            <Link href="/services/consulting">See Consulting</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Prefer DM? Message “SCAN” on Instagram @chefjezz.
        </p>
      </div>
    </article>
  );
};

export default function InsightsPage() {
  return (
    <div>
      <PageHeader
        title="Insights"
        subtitle="Actionable advice for hospitality professionals."
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Sticky Nav */}
        <div className="sticky top-16 bg-background/80 backdrop-blur-lg z-10 py-6 mb-12 border-b">
            <h2 className="font-headline text-2xl font-bold mb-4 text-center">
              All Articles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 justify-center">
              {articles.map((article) => (
                <a
                  key={article.slug}
                  href={`#${article.slug}`}
                  className="text-center p-2 rounded-lg transition-colors text-muted-foreground hover:bg-card hover:text-foreground text-sm font-medium"
                >
                  {article.title}
                </a>
              ))}
            </div>
        </div>

        {/* Article Blocks */}
        <main className="space-y-24 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <section
              id={article.slug}
              key={article.slug}
              className="scroll-mt-24"
            >
              <ArticleContent article={article} />
              {index < articles.length - 1 && (
                <hr className="my-16 border-t border-border" />
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
