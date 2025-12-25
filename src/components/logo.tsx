import { cn } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Logo({ className }: { className?: string }) {
  const logoImage = PlaceHolderImages.find((p) => p.id === "logo");

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {logoImage ? (
        <Image
          src={logoImage.imageUrl}
          alt={logoImage.description}
          width={32}
          height={32}
          className="h-8 w-auto"
          data-ai-hint={logoImage.imageHint}
        />
      ) : (
        <div className="h-8 w-8 bg-muted rounded-full" />
      )}
      <span className="text-xl font-bold tracking-tight">
        <span className="font-headline text-foreground">JEZZA COOKS</span>
        <span className="text-primary">.</span>
      </span>
    </div>
  );
}
