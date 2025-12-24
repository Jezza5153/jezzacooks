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

const primaryCta: LinkItem = { href: "/free-diagnosis", label: "Free 15-min diagnosis" };

const mainLinks: LinkItem[] = [
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
]

const groups: Group[] = [
  {
    title: "Company",
    links: [
        { href: "/about", label: "About" },
        { href: "/results", label: "Results" },
        { href: "/faq", label: "FAQ" },
    ],
  },
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
        { href: "/insights", label: "All Insights" },
        { href: "/insights/prime-cost-explained", label: "Prime Cost Explained" },
        { href: "/insights/menu-engineering-chef-version", label: "Menu Engineering (Chef Version)" },
        { href: "/insights/calm-service-system", label: "Calm Service System" },
        { href: "/insights/website-booking-tool", label: "Website Booking Tool" },
        { href: "/insights/weekly-owner-rhythm", label: "Weekly Owner Rhythm" },
    ],
  },
  {
    title: "Legal",
    links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
    ],
  }
];

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

      <SheetContent side="right" className="w-full max-w-[420px] bg-background p-4">
        <SheetHeader className="flex flex-row items-center justify-between">
            <Link href="/" onClick={close}>
                <Logo />
            </Link>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </SheetHeader>

        <div className="mt-6 flex h-[calc(100vh-120px)] flex-col">
          <Link
            href={primaryCta.href}
            onClick={close}
            className={cn(buttonVariants(), "w-full justify-center font-semibold")}
          >
            {primaryCta.label}
          </Link>

          <div className="mt-6 flex-grow overflow-y-auto">
            <div className="space-y-1 mb-4">
                {mainLinks.map((link) => (
                     <Link
                     key={link.href}
                     href={link.href}
                     onClick={close}
                     className={cn(
                       "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                       pathname?.startsWith(link.href) ? "bg-card text-foreground" : "text-muted-foreground hover:bg-card"
                     )}
                   >
                     {link.label}
                   </Link>
                ))}
            </div>

            <Accordion type="multiple" className="w-full">
              {groups.map((g) => (
                <AccordionItem value={g.title} key={g.title}>
                  <AccordionTrigger className="text-base font-medium hover:no-underline">
                    {g.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pl-4">
                      {g.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={close}
                          className={cn(
                            "block rounded-md p-2 text-sm",
                            pathname?.startsWith(l.href) ? "bg-card text-foreground" : "text-muted-foreground hover:bg-card"
                          )}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-auto pt-6 text-xs text-muted-foreground">
            No poeha — just results.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
