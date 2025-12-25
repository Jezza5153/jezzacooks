import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  // By adding a version query parameter, we can force the browser to reload the image
  // when it changes, bypassing stubborn caches.
  const cacheBuster = `?v=${new Date().getTime()}`;
  const logoSrc = `/pics/logo.png${cacheBuster}`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoSrc}
        alt="Jezza Cooks Logo"
        width={32}
        height={32}
        className="h-8 w-auto"
        priority
        unoptimized // We use unoptimized to ensure the cache buster isn't stripped by Next.js image optimization
      />
      <span className="text-xl font-bold tracking-tight">
        <span className="font-headline text-foreground">JEZZA COOKS</span>
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
