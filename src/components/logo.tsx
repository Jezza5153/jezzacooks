import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  // Using a direct, static path to the logo to prevent hydration errors.
  const logoSrc = "/pics/logo.png";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoSrc}
        alt="Jezza Cooks Logo"
        width={32}
        height={32}
        className="h-8 w-auto"
        priority
        unoptimized // Using unoptimized to prevent Next.js from altering the src path, which can help with stubborn caching.
      />
      <span className="text-xl font-bold tracking-tight">
        <span className="font-headline text-foreground">JEZZA COOKS</span>
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
