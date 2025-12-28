import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFAB from "@/components/whatsapp-fab";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jezzacooks.com"),
  title: {
    default: "Jezza Cooks | Restaurant consulting, catering en horeca websites",
    template: "%s | Jezza Cooks",
  },
  description:
    "Chef-led support voor horeca. Minder chaos, meer structuur: menu engineering, food cost, prep en teamtraining. Ook websites voor restaurants als premium visitekaartje, met een sterke basis voor vindbaarheid.",
  openGraph: {
    type: "website",
    url: "https://jezzacooks.com",
    siteName: "Jezza Cooks",
    title: "Jezza Cooks | Level up the chaos",
    description:
      "Chef-led support voor horeca. Minder chaos, meer structuur: menu engineering, food cost, prep en teamtraining. Websites voor restaurants als premium visitekaartje, met een sterke basis voor vindbaarheid.",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jezza Cooks | Level up the chaos",
    description:
      "Chef-led support voor horeca. Minder chaos, meer structuur: menu engineering, food cost, prep en teamtraining. Websites voor restaurants als premium visitekaartje, met een sterke basis voor vindbaarheid.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable,
          fraunces.variable
        )}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <Toaster />
      </body>
    </html>
  );
}
