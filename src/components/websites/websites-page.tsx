"use client";

import * as React from "react";
import WebsitesHero from "@/components/websites/websites-hero";
import ResultsSlider from "@/components/websites/results-slider";
import BuildOptions from "@/components/websites/build-options";
import type { WebsitesMode } from "@/components/websites/websites-types";

export default function WebsitesPageClient() {
  const [mode, setMode] = React.useState<WebsitesMode>("pro");

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <WebsitesHero mode={mode} onModeChange={setMode} />
      <ResultsSlider mode={mode} />
      <BuildOptions mode={mode} onModeChange={setMode} />
    </div>
  );
}
