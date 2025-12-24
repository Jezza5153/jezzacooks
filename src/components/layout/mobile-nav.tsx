"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

type LinkItem = { href: string; label: string };
type Group = { title: string; links: LinkItem[] };

const primaryCta: LinkItem = { href: "/free-diagnosis", label: "Book a free diagnosis" };

const primaryLinks: LinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const groups: Group[] = [
  {
    title: "Services",
    links: [
      { href: "/services/consulting", label: "Consulting" },
      { href: "/services/catering", label: "Catering" },
      { href: "/services/websites", label: "Websites" },
    ],
  },
  {
    title: "Insights",
    links: [
      { href: "/insights/restaurant-consultant-ultimate-guide", label: "Hiring a consultant" },
      { href: "/insights/prime-cost-explained", label: "Prime cost explained" },
      { href: "/insights/calm-service-system", label: "Calm service system" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  const Item = ({ href, label }: LinkItem) => {
    const active =
      pathname === href || (href !== "/" && pathname?.startsWith(href));

    return (
      <Link
        href={href}
        onClick={close}
        className={cn(
          "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors",
          active ? "bg-card text-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground"
        )}
      >
        <span>{label}</span>
        <ArrowRight className={cn("h-4 w-4 opacity-60", active && "opacity-100")} />
      </Link>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-[420px] bg-background p-4">
        <SheetHeader className="flex flex-row items-center justify-between">
          <Logo />
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </SheetHeader>

        <div className="mt-6 flex h-[calc(100vh-120px)] flex-col">
          {/* Primary CTA */}
          <Link
            href={primaryCta.href}
            onClick={close}
            className={cn(buttonVariants(), "w-full justify-center font-semibold")}
          >
            {primaryCta.label}
          </Link>

          {/* Main links */}
          <div className="mt-6 space-y-1">
            {primaryLinks.map((l) => (
              <Item key={l.href} {...l} />
            ))}
          </div>

          {/* Groups */}
          <div className="mt-8 space-y-6 border-t border-border pt-6">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {g.title}
                </div>
                <div className="mt-2 space-y-1">
                  {g.links.map((l) => (
                    <Item key={l.href} {...l} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer microcopy */}
          <div className="mt-auto pt-6 text-xs text-muted-foreground">
            No poeha — just results.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
