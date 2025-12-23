// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts

import { Inter, Fraunces } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFAB from "@/components/whatsapp-fab";
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JEZZA COOKS - Chef-led growth for hospitality.",
  description:
    "Consulting, catering, and hospitality websites that convert — no poeha, just results.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", inter.variable, fraunces.variable)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col"
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
