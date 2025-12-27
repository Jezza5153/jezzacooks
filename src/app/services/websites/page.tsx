// src/app/services/websites/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import WebsitesHero from "@/components/websites/websites-hero";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Hospitality websites | Jezza Cooks",
  description:
    "Hospitality websites die converteren. Van clean en snel tot custom en cinematic. SEO, performance, bookings en copy die werkt.",
  openGraph: {
    title: "Hospitality websites | Jezza Cooks",
    description:
      "Hospitality websites die converteren. Van clean en snel tot custom en cinematic. SEO, performance, bookings en copy die werkt.",
    type: "website",
  },
};

const panel =
  "rounded-[34px] border border-border/35 bg-card/10 overflow-hidden";
const panelInner =
  "bg-gradient-to-b from-background/40 via-background/20 to-background/40";
const softGlow =
  "shadow-[0_0_90px_hsl(var(--primary)/0.12)]";

export default function WebsitesPage() {
  return (
    <div className="relative">
      <PageHeader title="Hospitality Websites" />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/10 to-transparent" />

      <main className="container mx-auto px-4 pb-20">
        <section className="mt-8">
          <WebsitesHero />
        </section>

        {/* MODULES */}
        <section className="mt-14">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Alles wat een restaurantwebsite nodig heeft
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Niet “een mooie site”. Een site die bookings, vertrouwen en omzet
              pakt.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: "Menu dat je zelf update", desc: "Snel aanpassen zonder gedoe. Duidelijk, leesbaar, mobiel sterk." },
              { title: "Bookings en contact flows", desc: "Reserveren, bellen, WhatsApp. Eén duidelijke route." },
              { title: "Local SEO", desc: "Gevonden worden op stad, keuken en intentie. Niet op hoop." },
              { title: "Performance", desc: "Snel laden. Geen zware rommel. Beter voor Google en gasten." },
              { title: "Copy die converteert", desc: "Heldere propositie, scherpe CTA’s, minder twijfel." },
              { title: "Foto richting", desc: "Wat te schieten, waar te plaatsen, wat het oplevert." },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-border/35 bg-background/30 p-6 backdrop-blur transition duration-300 hover:bg-background/40 hover:border-border/50 hover:shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
              >
                <div className="font-headline text-lg font-bold">{x.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {x.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="mt-14">
          <div className={cn(panel, panelInner, softGlow, "p-8 md:p-10")}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Van chaos naar een site die werkt
              </h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Zelfde aanpak als service: duidelijk, herhaalbaar, strak.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Structuur",
                  desc: "Wat is je aanbod, voor wie, en welke actie wil je dat gasten nemen?",
                },
                {
                  step: "02",
                  title: "Bouwen",
                  desc: "Design + copy + modules. Alles gericht op conversie en snelheid.",
                },
                {
                  step: "03",
                  title: "Launch + groei",
                  desc: "SEO basis, tracking, itereren op data. Geen set-and-forget.",
                },
              ].map((x) => (
                <div
                  key={x.step}
                  className="rounded-2xl border border-border/35 bg-background/25 p-6 backdrop-blur"
                >
                  <div className="text-xs font-semibold tracking-widest text-muted-foreground">
                    {x.step}
                  </div>
                  <div className="mt-2 font-headline text-xl font-bold">
                    {x.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {x.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Plan een call
              </Link>
              <Link
                href="/results"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold"
                )}
              >
                Bekijk voorbeelden
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14">
          <div className="rounded-3xl border border-border/35 bg-card/10 p-8 md:p-10 text-center">
            <h3 className="font-headline text-2xl md:text-3xl font-bold">
              Klaar voor een website die echt omzet brengt?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Jij levert kwaliteit op het bord. Ik zorg dat je website dezelfde
              indruk maakt.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
              >
                Plan een call
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "font-semibold"
                )}
              >
                Bekijk tarieven
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
