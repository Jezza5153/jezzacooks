import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/pics/logo.png"
        alt="Jezza Cooks Logo"
        width={32}
        height={32}
        className="h-8 w-auto"
        priority
      />
      <span className="text-xl font-bold tracking-tight">
        <span className="font-headline text-foreground">JEZZA COOKS</span>
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
