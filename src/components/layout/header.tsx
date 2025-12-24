// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";

type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/results" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        {/* Center: Clean nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA + Mobile */}
        <div className="flex items-center gap-2">
          <Link
            href="/free-diagnosis"
            className={cn(
              buttonVariants(),
              "hidden sm:inline-flex font-semibold"
            )}
          >
            Book a call
          </Link>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
