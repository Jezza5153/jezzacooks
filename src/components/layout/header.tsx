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
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
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
          <Link href="/" className="flex items-center gap-3" aria-label="Ga naar home">
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
                    className={cn(triggerClass, isActive("/about") && activeClass)}
                  >
                    <Link href="/about">Over ons</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Results */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(triggerClass, isActive("/results") && activeClass)}
                  >
                    <Link href="/results">Resultaten</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Services dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerClass}>
                    Diensten
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="w-[680px] p-3">
                      <div className="rounded-2xl border border-white/10 bg-[hsla(var(--popover)/0.65)] backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.60)] overflow-hidden">
                        <div className="grid gap-2 p-3 md:grid-cols-2">
                          <ListItem href="/services/consulting" title="Horeca consulting">
                            Minder chaos, betere marge, heldere keuzes.
                          </ListItem>

                          <ListItem href="/services/catering" title="Catering & private chef">
                            Een avond die klopt. Van planning tot bord.
                          </ListItem>

                          <ListItem href="/services/websites" title="Hospitality websites">
                            Rustige sites die bezoekers naar boeken of aanvragen sturen.
                          </ListItem>

                          <ListItem href="/free-diagnosis" title="Gratis diagnose">
                            Snel helder waar het lekt en wat het kost om het te fixen.
                          </ListItem>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(triggerClass, isActive("/pricing") && activeClass)}
                  >
                    <Link href="/pricing">Prijzen</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(triggerClass, isActive("/contact") && activeClass)}
                  >
                    <Link href="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    buttonVariants(),
                    "inline-flex font-semibold rounded-full",
                    "ring-1 ring-white/10",
                    "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                    "hover:shadow-[0_18px_60px_rgba(0,0,0,0.50)]"
                  )}
                  aria-label="Open gratis diagnose keuze"
                >
                  Gratis diagnose
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl p-0 overflow-hidden border border-white/10 bg-[hsla(var(--popover)/0.75)] backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.60)]">
                <div className="p-6 md:p-7">
                  <DialogTitle className="font-headline text-2xl font-bold text-foreground">
                    Waar wil je hulp mee?
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-sm text-muted-foreground">
                    Kies één route. Dan krijg je een snelle diagnose en een richting voor kosten. Geen druk.
                  </DialogDescription>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <DiagnosisCard
                      title="Website quick scan"
                      desc="3 verbeterpunten en een prijsindicatie op basis van jouw doel."
                      href="/free-diagnosis?type=website"
                    />
                    <DiagnosisCard
                      title="Consulting diagnose"
                      desc="Waar lekt je omzet in operatie, aanbod of team en wat fixen we eerst."
                      href="/free-diagnosis?type=consulting"
                    />
                    <DiagnosisCard
                      title="Catering aanvraag"
                      desc="Snel de juiste vragen, zodat je direct een goed voorstel kan krijgen."
                      href="/free-diagnosis?type=catering"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                      Tip: als je al een website hebt, plak de link. Dan wordt je scan scherper.
                    </p>

                    <DialogClose asChild>
                      <button
                        type="button"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "rounded-full font-semibold"
                        )}
                      >
                        Sluiten
                      </button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DiagnosisCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <DialogClose asChild>
      <Link
        href={href}
        className={cn(
          "block rounded-3xl border border-white/10 bg-white/5 p-5 text-left",
          "hover:bg-white/7 hover:border-white/15 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsla(var(--primary)/0.35)]"
        )}
      >
        <div className="font-headline text-lg font-bold text-foreground/95">
          {title}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {desc}
        </p>
        <div className="mt-4 text-xs font-semibold tracking-widest uppercase text-primary">
          Start
        </div>
      </Link>
    </DialogClose>
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
