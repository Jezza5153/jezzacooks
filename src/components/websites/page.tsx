import type { Metadata } from "next";
import WebsitesPageClient from "./websites-page";

export const metadata: Metadata = {
  title: "Horeca websites die reserveringen opleveren | Jezza Cooks",
  description:
    "Wij bouwen rustige, snelle horeca websites die aanvragen en reserveringen opleveren. Duidelijke flow, sterke CTA’s, social proof en SEO-klaar. Simple, Pro of Custom.",
  alternates: {
    canonical: "/websites",
  },
  openGraph: {
    title: "Horeca websites die reserveringen opleveren | Jezza Cooks",
    description:
      "Rustige, snelle websites voor hospitality. Duidelijke flow, vertrouwen en conversie. Bekijk het before/after verschil.",
    url: "/websites",
    type: "website",
  },
  keywords: [
    "horeca website",
    "restaurant website",
    "hospitality website",
    "webdesign horeca",
    "website laten maken restaurant",
    "conversie optimalisatie horeca",
    "SEO horeca",
    "Jezza Cooks",
  ],
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jezza Cooks",
    url: "https://jezzacooks.com/websites",
    description:
      "Jezza Cooks bouwt conversiegerichte horeca websites: rustig, snel, toegankelijk en SEO-klaar. Focus op reserveringen, aanvragen en vertrouwen.",
    areaServed: "NL",
    serviceType: ["Horeca website", "Restaurant website", "Hospitality webdesign"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Next/React: JSON-LD moet via dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebsitesPageClient />
    </>
  );
}
