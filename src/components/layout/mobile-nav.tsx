
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: 'Home' },
    { href: "/services", label: 'Services' },
    { href: "/pricing", label: 'Pricing' },
    { href: "/results", label: 'Results' },
    { href: "/insights", label: 'Insights' },
    { href: "/about", label: 'About' },
    { href: "/free-diagnosis", label: 'Free Diagnosis' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-background">
        <SheetHeader className="flex flex-row justify-between items-center">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
            </Button>
        </SheetHeader>
        <div className="flex flex-col h-full py-8">
            <nav className="flex flex-col items-center justify-center flex-grow gap-6">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-headline font-semibold text-foreground transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
                >
                {link.label}
                </Link>
            ))}
            </nav>
            <div className="flex flex-col gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "w-full font-semibold")} onClick={() => setIsOpen(false)}>
                Book a call
            </Link>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
