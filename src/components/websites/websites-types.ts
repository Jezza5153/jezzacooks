// src/components/websites/websites-types.ts
import type { LucideIcon } from "lucide-react";

export type BuildOption = {
  id: "starter" | "pro" | "custom";
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export type Result = {
  id: string;
  businessName: string;
  location: string;
  tagline: string;
  outcome: string;
  imageUrl: string;
  imageHint: string;
  testimonial: {
    quote: string;
    author: string;
  };
};

export type Feature = {
  Icon: LucideIcon;
  title: string;
  description: string;
};
