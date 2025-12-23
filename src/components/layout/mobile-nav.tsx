"use client";

import { useState } from "react";
import Link from "next-intl/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import LocaleSwitcher from "../locale-switcher";
import { useTranslations } from "next-intl";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');

  const navLinks = [
    { href: "/", label: t('home') },
    { href: "/services", label: t('services') },
    { href: "/pricing", label: t('pricing') },
    { href: "/results", label: t('results') },
    { href: "/insights", label: t('insights') },
    { href: "/about", label: t('about') },
    { href: "/free-diagnosis", label: t('freeDiagnosis') },
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
            <div className="flex flex-col gap-4 items-center">
              <LocaleSwitcher />
              <Button asChild size="lg" className="w-full font-semibold" onClick={() => setIsOpen(false)}>
                  <Link href="/contact">{t('bookCall')}</Link>
              </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
