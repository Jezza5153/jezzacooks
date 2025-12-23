import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

const pillarImage = PlaceHolderImages.find(p => p.id === 'blog-pillar');

export default function PillarArticlePage() {
  return (
    <div>
      <header className="relative py-24 md:py-32 bg-card">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline">Ultimate Guide</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">
              What Is a Restaurant Consultant?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A chef's no-nonsense guide to what a restaurant consultant does, when to hire one, and how to get your money's worth.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Published: July 2024 · 8 min read</p>
          </div>
        </div>
      </header>
      
      <article className="container mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
          {pillarImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden not-prose mb-12">
              <Image
                src={pillarImage.imageUrl}
                alt={pillarImage.description}
                fill
                className="object-cover"
                data-ai-hint={pillarImage.imageHint}
              />
            </div>
          )}

          <p>
            You see the term everywhere: "restaurant consultant." It sounds official, expensive, and maybe a little vague. As a chef who has become one, I get it. You're busy running a service, managing staff, and trying to keep food costs from exploding. The last thing you need is a suit telling you how to run your business based on a textbook.
          </p>

          <p>
            But a good consultant isn't a suit. They're a specialist—a partner with a specific skillset to solve a specific problem. This guide will break down what we actually do, in plain English, so you can decide if it's the right move for your restaurant.
          </p>
          
          <h2 className="font-headline">Why Do Restaurant Consultants Even Exist?</h2>
          <p>
            Restaurants operate on razor-thin margins. A few percentage points on your food cost or a slight dip in weekly covers can be the difference between profit and loss. Consultants exist to find and fix the leaks in your ship. We exist because it's nearly impossible to be an expert in everything—cooking, finance, marketing, HR, and technology—while also running the day-to-day.
          </p>

          <h2 className="font-headline">The 5 Core Areas a Good Consultant Tackles</h2>
          <p>
            Most restaurant challenges fall into one of these five buckets. A consultant will typically specialize in one or two, but have working knowledge of all.
          </p>
          
          <h3 className="font-headline">1. Financial Health & Profitability</h3>
          <p>
            This is the big one. It's not just about looking at your P&L. It's about dissecting it.
          </p>
          <ul>
            <li><strong>Menu Engineering & Costing:</strong> Analyzing your sales mix (what sells vs. what doesn't) against the food cost and margin of each dish. We identify your stars, puzzles, plowhorses, and dogs, then re-engineer your menu to maximize profit.</li>
            <li><strong>Prime Cost Analysis:</strong> Your prime cost (Total Cost of Goods Sold + Total Labor Cost) should ideally be under 60%. We find where the money is going and create systems to control it.</li>
            <li><strong>Budgeting & Forecasting:</strong> Creating realistic financial targets and a roadmap to hit them.</li>
          </ul>

          <h3 className="font-headline">2. Operations & Efficiency</h3>
          <p>
            This is about making service smoother, less stressful, and more consistent.
          </p>
          <ul>
            <li><strong>Kitchen Workflow (Mise en Place):</strong> Designing station setups and prep schedules that prevent bottlenecks during service. The goal is speed and consistency.</li>
            <li><strong>Standard Operating Procedures (SOPs):</strong> Documenting everything from opening checklists to the recipe for your signature sauce. SOPs are the backbone of a scalable, consistent business.</li>
            <li><strong>Inventory Management:</strong> Implementing systems (from simple spreadsheets to dedicated software) to reduce waste, prevent theft, and ensure you never 86 a key item on a Saturday night.</li>
          </ul>

          <h3 className="font-headline">3. Menu & Concept Development</h3>
          <p>
            Your menu is your single most important marketing tool.
          </p>
          <ul>
            <li><strong>Concept Refinement:</strong> Ensuring your menu, decor, service style, and price point all tell the same cohesive story.</li>
            <li><strong>Supplier Sourcing & Negotiation:</strong> Finding the best quality ingredients for the best price.</li>
            <li><strong>Recipe Development & Testing:</strong> Creating new, profitable, and "brand-right" dishes that your team can execute consistently.</li>
          </ul>

          <h3 className="font-headline">4. Team & Training</h3>
          <p>
            Your staff delivers the guest experience. Investing in them is non-negotiable.
          </p>
          <ul>
            <li><strong>Hiring & Onboarding:</strong> Creating a process to attract and retain the right people.</li>
            <li><strong>Service & Hospitality Training:</strong> Moving beyond "order-taking" to create memorable guest experiences that drive repeat business.</li>
            <li><strong>Leadership Development:</strong> Coaching your managers to lead effectively, reducing your need to be in the business 24/7.</li>
          </ul>
          
          <h3 className="font-headline">5. Tech & Marketing</h3>
          <p>
            In today's market, your digital presence is as important as your physical one.
          </p>
          <ul>
            <li><strong>Point of Sale (POS) Optimization:</strong> Using your POS data to make smarter business decisions.</li>
            <li><strong>Online Booking & Ordering Funnels:</strong> Building a website and booking system that converts visitors into paying customers, maximizing direct bookings.</li>
            <li><strong>Local SEO & Google Business Profile:</strong> Ensuring you show up when hungry locals search for a place to eat.</li>
          </ul>

          <h2 className="font-headline">When Should You Hire a Consultant?</h2>
          <ul>
            <li><strong>You're opening a new restaurant:</strong> Get the systems right from day one.</li>
            <li><strong>You're profitable, but you feel stuck:</strong> You've hit a plateau and need a fresh perspective to get to the next level.</li>
            <li><strong>You're losing money:</strong> You know there's a problem but can't pinpoint where the money is going.</li>
            <li><strong>You're burnt out:</strong> You're working 80-hour weeks and the business still can't run without you.</li>
            <li><strong>You're expanding:</strong> You need to standardize your operations to open a second location successfully.</li>
          </ul>

          <h2 className="font-headline">How to Pick the Right One</h2>
          <p>Look for a "T-shaped" person: deep expertise in one core area (like kitchen operations or finance) but broad knowledge across all five. Most importantly, find someone who has <span className="text-primary font-semibold">actually done the job</span>. Ask for case studies. Talk to their past clients. Do you vibe with their "no poeha" approach?</p>

          <h2 className="font-headline">Pricing Models: What to Expect</h2>
          <p>Pricing varies wildly, but it usually falls into one of these structures:</p>
          <ul>
              <li><strong>Hourly/Day Rate:</strong> Best for short, specific problems. Expect rates to vary based on experience.</li>
              <li><strong>Project-Based:</strong> A flat fee for a defined scope, like developing a new menu or building a website. This is transparent and good for budgeting.</li>
              <li><strong>Retainer:</strong> A monthly fee for ongoing support, coaching, and accountability. This is for owners who want a long-term strategic partner.</li>
          </ul>
          
          <h2 className="font-headline">Conclusion: An Investment, Not an Expense</h2>
          <p>
            Hiring the right restaurant consultant isn't an admission of failure. It's a strategic decision to bring in specialized expertise to accelerate your growth. Think of it like a chef bringing in a specialist butcher or baker—you're leveraging an expert so you can focus on what you do best: creating incredible experiences for your guests.
          </p>
          <div className="not-prose mt-12 bg-card border border-border p-8 rounded-lg text-center">
            <h3 className="font-headline text-2xl font-bold">Ready to take control of your business?</h3>
            <p className="mt-2 text-muted-foreground">Book a free, no-obligation 15-minute call to discuss your specific challenges and see how I can help.</p>
            <Button asChild size="lg" className="mt-6 font-semibold">
              <Link href="/contact">Book Your Free Call</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
