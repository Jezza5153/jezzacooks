// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  Flame,
  BadgeEuro,
  FileText,
  BarChart3,
  MessageCircle,
  Home,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const nav: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Pricing", href: "/pricing", icon: BadgeEuro },
  { label: "Results", href: "/results", icon: BarChart3 },
  { label: "Insights", href: "/insights", icon: FileText },
];

const dropdownNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="font-headline font-bold tracking-tight">
              JEZZA COOKS
            </p>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Chef-owned hospitality systems
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-card hover:text-foreground",
                  active
                    ? "bg-card text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </Link>
            );
          })}
          
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-card hover:text-foreground text-muted-foreground"
                )}>
              More
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropdownNav.map(item => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "hidden sm:inline-flex font-semibold"
            )}
          >
            Free 15-min diagnosis
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "sm:hidden"
            )}
          >
            Call
          </Link>
        </div>
      </div>
    </header>
  );
}
