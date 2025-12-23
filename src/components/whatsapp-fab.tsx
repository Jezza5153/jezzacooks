"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/config";
import { useIsMobile } from "@/hooks/use-mobile";

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

export default function WhatsAppFAB() {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <Button asChild size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg md:hidden z-40 bg-green-500 hover:bg-green-600 text-white">
      <Link href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        <span className="sr-only">Chat on WhatsApp</span>
      </Link>
    </Button>
  );
}
