// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";
import React from "react";

const insightsLinks = [
  {
    title: "Prime Cost Explained",
    href: "/insights/prime-cost-explained",
    description: "What it is, benchmarks that matter, and levers to pull.",
  },
  {
    title: "Menu Engineering (Chef Version)",
    href: "/insights/menu-engineering-chef-version",
    description: "A practical menu mix approach that chefs actually use.",
  },
  {
    title: "The Calm Service System",
    href: "/insights/calm-service-system",
    description: "Replace chaos with a simple system your team can follow.",
  },
  {
    title: "Your Website Is a Booking Tool",
    href: "/insights/website-booking-tool",
    description: "Turn your website into a direct booking machine.",
  },
  {
    title: "The Weekly Owner’s Rhythm",
    href: "/insights/weekly-owner-rhythm",
    description: "A routine to stay in control without burning out.",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 mr-4">
          <Logo />
        </Link>

        {/* Center: Clean nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                   <ListItem href="/about" title="About">Who I am, what I stand for, and how I work.</ListItem>
                   <ListItem href="/results" title="Results">Real-world examples of chaos to control.</ListItem>
                   <ListItem href="/faq" title="FAQ">Your most common questions answered.</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                   <ListItem href="/services/consulting" title="Restaurant Consulting">Fine-tune your operations for better margins.</ListItem>
                   <ListItem href="/services/catering" title="Catering & Private Chef">Unforgettable dining experiences, tailored to your event.</ListItem>
                   <ListItem href="/services/websites" title="Hospitality Websites">Convert visitors into bookings with a site built by a chef.</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Insights</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/insights"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          All Insights
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Practical guides for margins, systems, and growth.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {insightsLinks.slice(0,3).map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: CTA + Mobile */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link
            href="/free-diagnosis"
            className={cn(
              buttonVariants(),
              "hidden sm:inline-flex font-semibold"
            )}
          >
            Free Diagnosis
          </Link>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
