import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Image from "next/image";
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

function BackgroundImageFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Background photo (blurred cover fill) */}
      <div className="absolute inset-0">
        <Image
          src="/pics/aboutme.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover blur-2xl scale-110 opacity-30"
        />
      </div>

      {/* Readability curtain (natural fade to content) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background/90" />

      {/* Subtle brand glow (warm, not loud) */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_6%,hsla(var(--primary)/0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_86%_92%,hsla(var(--secondary)/0.10),transparent_58%)]" />

      {/* Soft vignette to keep focus on content */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-black/35" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          fraunces.variable
        )}
      >
        <div className="relative isolate min-h-screen flex flex-col">
          <BackgroundImageFX />

          <Header />
          <main className="relative flex-grow">{children}</main>
          <Footer />

          <WhatsAppFAB />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
