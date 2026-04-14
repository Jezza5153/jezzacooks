import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFAB from "@/components/whatsapp-fab";
import JsonLd from "@/components/seo/json-ld";
import { buildGlobalGraph } from "@/lib/schema";
import { SITE, SITE_URL } from "@/lib/site-config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jezza Cooks | Horeca consultancy, catering en restaurant websites",
    template: "%s | Jezza Cooks",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder.name, url: `${SITE_URL}/about` }],
  creator: SITE.founder.name,
  publisher: SITE.name,
  category: "Hospitality consulting",
  keywords: [
    "horeca consultant",
    "restaurant consulting",
    "menu engineering",
    "food cost controle",
    "prepstructuur",
    "restaurant consultant Amersfoort",
    "horeca consultancy Nederland",
    "restaurant website laten maken",
    "catering Amersfoort",
    "chef consultant",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "nl-NL": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    title: "Jezza Cooks | Level up the chaos",
    description: SITE.description,
    locale: "nl_NL",
    alternateLocale: ["en_US"],
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Jezza Cooks — chef-led horeca consultancy in Amersfoort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jezza Cooks | Level up the chaos",
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Add your Search Console verification code here once you've verified the
  // property. Leaving empty is fine — Google will just skip it.
  // verification: { google: "" },
};

export const viewport: Viewport = {
  themeColor: "#0F141B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-NL" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable,
          fraunces.variable
        )}
      >
        {/* Global @graph: Organization, LocalBusiness, WebSite, Person.
            Page-level schema references these by @id. */}
        <JsonLd data={buildGlobalGraph()} id="schema-global" />

        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <Toaster />
      </body>
    </html>
  );
}
