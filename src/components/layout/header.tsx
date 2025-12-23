
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";

const companyLinks: { title: string; href: string; description: string }[] = [
  {
    title: "About",
    href: "/about",
    description: "Learn more about our story, mission, and values.",
  },
  {
    title: "Results",
    href: "/results",
    description: "See the measurable impact we've had on our clients.",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Find answers to frequently asked questions.",
  },
];

const serviceLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Restaurant Consulting",
    href: "/services/consulting",
    description: "Fine-tune operations for better margins and smoother service.",
  },
  {
    title: "Catering & Private Chef",
    href: "/services/catering",
    description: "Unforgettable dining experiences, tailored to your event.",
  },
  {
    title: "Hospitality Websites",
    href: "/services/websites",
    description: "Convert visitors into bookings with a site built by a chef.",
  },
];

const insightLinks: { title: string; href: string; description: string }[] = [
    {
      title: "All Insights",
      href: "/insights",
      description: "Browse all our articles and guides.",
    },
    {
        title: "The Ultimate Guide to Hiring a Restaurant Consultant",
        href: "/insights/restaurant-consultant-ultimate-guide",
        description: "Everything you need to know to ensure you get the best ROI."
    },
    {
      title: "Prime Cost Explained",
      href: "/insights/prime-cost-explained",
      description: "A practical guide to understanding and controlling prime cost.",
    },
    {
        title: "The Calm Service System",
        href: "/insights/calm-service-system",
        description: "Build a service system that runs itself."
    },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Company Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {companyLinks.map((component) => (
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

              {/* Services Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-1">
                    {serviceLinks.map((component) => (
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

              {/* Insights Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Insights</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                    {insightLinks.map((component) => (
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

              {/* Pricing Link */}
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/pricing" && "bg-accent"
                    )}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

               {/* Contact Link */}
               <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/contact" && "bg-accent"
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/free-diagnosis"
            className={cn(buttonVariants(), "hidden sm:inline-flex font-semibold")}
          >
            Free 15-min diagnosis
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
