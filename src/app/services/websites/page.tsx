// src/app/services/websites/page.tsx
import WebsitesPageLayout from "@/components/websites/websites-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horeca Websites die Converteren | Jezza Cooks",
  description:
    "Laat een website voor je restaurant bouwen door een chef. Focus op directe boekingen, een helder verhaal en een design dat je merk versterkt. Gebouwd met een sterke SEO-basis.",
};

export default function WebsitesPage() {
  return <WebsitesPageLayout />;
}
