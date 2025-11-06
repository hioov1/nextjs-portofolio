"use client";

import React from "react";
import { SpotlightEffect } from "@/components/ui/SpotlightEffect";
import HeroContent from "@/components/HeroContent";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && document.documentElement.classList.contains("dark");

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-white dark:bg-black" />

      {/* Main Content */}
      <div className="relative z-10">
        <HeroContent baseDelay={0.5} />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator delay={1.2} />
    </div>
  );
}
