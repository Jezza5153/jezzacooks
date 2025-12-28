import type { Metadata } from "next";
import WebsitesPageClient from "@/components/websites/websites-page";

export const metadata: Metadata = {
  title: "Hospitality Websites | Jezza Cooks",
  description:
    "Hospitality websites gebouwd als service. Snel, duidelijk en consistent. Kies Simple, Pro of Custom en zie live hoe jouw site wordt opgebouwd.",
};

export default function WebsitesPage() {
  return <WebsitesPageClient />;
}
