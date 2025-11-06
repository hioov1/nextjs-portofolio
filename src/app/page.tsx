"use client";

import React, { useEffect } from "react";
import HomeSection from "@/app/home/page";
import AboutSection from "@/app/about/page";
import ProjectsSection from "@/app/projects/page";
import ContactSection from "@/app/contact/page";
import LogoSection from "@/app/logosection/page";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="flex-1 min-h-screen snap-y snap-mandatory overflow-x-hidden">
      <HomeSection />
      <AboutSection />
      <LogoSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
