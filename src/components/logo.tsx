import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* You can replace this with your own logo */}
      <Image src="/pics/logo.svg" alt="Jezza Cooks Logo" width={32} height={32} className="h-8 w-auto" />
      <span className="text-xl font-bold tracking-tight">
        <span className="font-headline text-foreground">JEZZA COOKS</span>
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
