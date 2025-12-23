"use client";

import { Link } from "next-intl";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useEffect, useState } from "react";
import LocaleSwitcher from "../locale-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-card/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname.endsWith(link.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <LocaleSwitcher />
            <Button asChild className="font-semibold">
              <Link href="/contact">{t('bookCall')}</Link>
            </Button>
          </div>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
