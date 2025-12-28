"use client";

import * as React from "react";
import WebsitesHero from "./websites-hero";
import ResultsSlider from "./results-slider";
import BuildOptions from "./build-options";
import QuickScanForm from "./quick-scan-form";
import type { WebsitesMode } from "./websites-types";

export default function WebsitesPageClient() {
  const [mode, setMode] = React.useState<WebsitesMode>("pro");

  return (
    <main>
      <section className="pt-10 md:pt-16">
        <div className="container mx-auto px-4">
          <WebsitesHero mode={mode} onModeChange={setMode} />
        </div>
      </section>

      <div className="container mx-auto px-4">
        <ResultsSlider mode={mode} />
      </div>

      <BuildOptions mode={mode} onModeChange={setMode} />

      <QuickScanForm />
    </main>
  );
}