
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const topLevelLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/free-diagnosis", label: "Free Diagnosis" },
];

const navGroups = [
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
      { href: "/insights/restaurant-consultant-ultimate-guide", label: "Ultimate Guide to Hiring a Consultant" },
      { href: "/insights/prime-cost-explained", label: "Prime Cost Explained" },
      { href: "/insights/calm-service-system", label: "Calm Service System" },
    ],
  },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    if (pathname !== href) {
        setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-background p-4">
        <SheetHeader className="flex flex-row justify-between items-center mb-8">
          <Logo />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto">
            <Accordion type="multiple" className="w-full">
              {navGroups.map((group) => (
                <AccordionItem value={group.title} key={group.title}>
                  <AccordionTrigger className="text-xl font-headline font-semibold text-foreground hover:no-underline">
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 pl-4 pt-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "text-lg text-muted-foreground transition-colors hover:text-primary",
                            pathname === link.href && "text-primary font-semibold"
                          )}
                          onClick={() => handleLinkClick(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="flex flex-col gap-6 pt-6 border-t mt-6">
                {topLevelLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-xl font-headline font-semibold text-foreground transition-colors hover:text-primary",
                        pathname === link.href && "text-primary"
                    )}
                    onClick={() => handleLinkClick(link.href)}
                    >
                    {link.label}
                    </Link>
                ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
