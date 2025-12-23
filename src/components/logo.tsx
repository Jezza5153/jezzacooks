import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-xl font-bold tracking-tight", className)}>
      <span className="font-headline text-foreground">JEZZA COOKS</span>
      <span className="text-primary">.</span>
    </Link>
  );
}
