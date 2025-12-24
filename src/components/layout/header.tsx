// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";

export default function Header() {
  const pathname = usePathname();

  const triggerClass = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent rounded-full text-foreground/90 transition-colors",
    "hover:bg-white/5 hover:text-foreground",
    "data-[state=open]:bg-white/5 data-[state=open]:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-[hsla(var(--primary)/0.35)] focus-visible:ring-offset-0"
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const activeClass = "bg-white/5 text-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[radial-gradient(600px_200px_at_50%_0%,hsla(var(--primary)/0.10),transparent_60%)]" />

      <div className="container mx-auto px-4">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3">
          {/* Left */}
          <Link href="/" className="flex items-center gap-3">
            <Logo />
          </Link>

          {/* Center */}
          <div className="hidden md:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      triggerClass,
                      isActive("/about") && activeClass
                    )}
                  >
                    <Link href="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Results */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      triggerClass,
                      isActive("/results") && activeClass
                    )}
                  >
                    <Link href="/results">Results</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Services dropdown stays */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClass}>
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="w-[680px] p-3">
                      <div className="rounded-2xl border border-white/10 bg-[hsla(var(--popover)/0.65)] backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.60)] overflow-hidden">
                        <div className="grid gap-2 p-3 md:grid-cols-2">
                          <ListItem
                            href="/services/consulting"
                            title="Restaurant Consulting"
                          >
                            Fine-tune your operations for better margins.
                          </ListItem>
                          <ListItem
                            href="/services/catering"
                            title="Catering & Private Chef"
                          >
                            Unforgettable dining experiences, tailored to your event.
                          </ListItem>
                          <ListItem
                            href="/services/websites"
                            title="Hospitality Websites"
                          >
                            Convert visitors into bookings with a site built by a chef.
                          </ListItem>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Insights direct link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      triggerClass,
                      isActive("/insights") && activeClass
                    )}
                  >
                    <Link href="/insights">Insights</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      triggerClass,
                      isActive("/pricing") && activeClass
                    )}
                  >
                    <Link href="/pricing">Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      triggerClass,
                      isActive("/contact") && activeClass
                    )}
                  >
                    <Link href="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-2">
            <Link
              href="/free-diagnosis"
              className={cn(
                buttonVariants(),
                "hidden sm:inline-flex font-semibold rounded-full",
                "ring-1 ring-white/10",
                "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                "hover:shadow-[0_18px_60px_rgba(0,0,0,0.50)]"
              )}
            >
              Free Diagnosis
            </Link>

            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block rounded-2xl border border-transparent p-4 no-underline outline-none transition-colors",
            "hover:bg-white/5 hover:border-white/10",
            "focus-visible:ring-2 focus-visible:ring-[hsla(var(--primary)/0.35)]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold text-foreground/95">{title}</div>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
