// src/components/layout/mobile-nav.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type LinkItem = { href: string; label: string };
type Group = { title: string; links: LinkItem[] };

const primaryCta: LinkItem = { href: "/free-diagnosis", label: "Gratis diagnose (15 min)" };

const quickLinks: LinkItem[] = [
  { href: "/results", label: "Resultaten" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Tarieven" },
];

const groups: Group[] = [
  {
    title: "Services",
    links: [
      { href: "/services/consulting", label: "Restaurant consulting" },
      { href: "/services/catering", label: "Catering & private chef" },
      { href: "/services/websites", label: "Horeca websites" },
    ],
  },
  {
    title: "Over",
    links: [
      { href: "/about", label: "Over mij" },
      { href: "/faq", label: "Veelgestelde vragen" },
    ],
  },
  {
    title: "Inzichten",
    links: [
      { href: "/insights", label: "Alle inzichten" },
      { href: "/insights/prime-cost-explained", label: "Prime cost uitgelegd" },
      { href: "/insights/menu-engineering-chef-version", label: "Menu engineering (chef versie)" },
    ],
  },
  {
    title: "Juridisch",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Voorwaarden" },
    ],
  },
];

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "w-full max-w-[420px] bg-background p-4",
          "pb-[calc(16px+env(safe-area-inset-bottom))]"
        )}
      >
        <SheetHeader className="flex flex-row items-center justify-between">
          <Link href="/" onClick={close} aria-label="Home">
            <Logo />
          </Link>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </SheetHeader>

        <div className="mt-6 flex min-h-[calc(100dvh-110px)] flex-col">
          {/* Primary CTA */}
          <Link
            href={primaryCta.href}
            onClick={close}
            className={cn(buttonVariants({ size: "lg" }), "w-full justify-center font-semibold")}
          >
            {primaryCta.label}
          </Link>

          {/* Quick links */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {quickLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "rounded-xl border border-border/60 bg-card/30 px-3 py-2 text-center text-sm font-medium transition-colors",
                    active
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-card/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Groups */}
          <div className="mt-6 flex-grow overflow-y-auto pr-1">
            <Accordion type="single" collapsible defaultValue="Services" className="w-full">
              {groups.map((g) => (
                <AccordionItem value={g.title} key={g.title}>
                  <AccordionTrigger className="text-base font-semibold hover:no-underline">
                    {g.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pl-2">
                      {g.links.map((l) => {
                        const active = isActivePath(pathname, l.href);
                        return (
                          <Link
                            key={l.href}
                            href={l.href}
                            onClick={close}
                            className={cn(
                              "block rounded-xl px-3 py-2 text-sm transition-colors",
                              active
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:bg-card/50"
                            )}
                          >
                            {l.label}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Footer brand line */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/30 p-4">
            <div className="text-sm font-semibold">Level up the chaos.</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Geen poeha. Wel structuur, ritme en resultaat.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
