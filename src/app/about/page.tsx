"use client";

import React, { useEffect } from "react";
import { CometCard } from "@/components/ui/comet-card";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Spotlight } from "@/components/ui/spotlight";
export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1); // Remove the # from the hash
      const section = document.getElementById(sectionId);
      if (section) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Spotlight className="right-0 top-1/2 translate-y-[-50%] rotate-180 opacity-80 dark:opacity-60" fill="#67E8F9" />
      </div>
      <div className="flex-1">
        <section id="about" className="min-h-screen">
          <div className="relative min-h-screen overflow-hidden">
            <MacbookScroll src="/assets/images/33.png" title={<span>About Me</span>} showGradient={false} />
          </div>
          <div className="bg-white dark:bg-black">
            <div className="relative z-20 px-6 py-20">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content - Brief Description */}
                  <div className="space-y-6">
                    <ScrollReveal containerClassName="mb-6" textClassName="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white" baseOpacity={0.2} baseRotation={2}>
                      Who Am I?
                    </ScrollReveal>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                      <ScrollReveal containerClassName="mb-4" textClassName="text-base md:text-lg leading-relaxed" baseOpacity={0.3} baseRotation={1}>
                        I’m Hioo, a Full-Stack Developer specializing in web and software development.
                      </ScrollReveal>
                      <ScrollReveal containerClassName="mb-4" textClassName="text-base md:text-lg leading-relaxed" baseOpacity={0.3} baseRotation={1}>
                        I thrive on creating applications that blend performance, stability, and a seamless user experience. My focus is on crafting technology that feels natural tools that work intuitively and empower people to do more.
                      </ScrollReveal>
                    </div>

                    <div className="mb-4 flex justify-start">
                      <button
                        onClick={() => router.push("/about/detail")}
                        className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-hover-blue hover:to-hover-purple text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-blue/20 active:scale-95 flex items-center space-x-2"
                        style={{ minWidth: "220px", display: "inline-block" }}
                      >
                        <span className="relative z-10 cursor-pointer">More About Me →</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Profil dengan animasi CometCard */}
                  <div className="flex justify-center items-start h-full mt-8 lg:mt-0">
                    <CometCard className="w-full max-w-md">
                      <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl p-8 overflow-hidden border border-gray-200 dark:border-gray-800/50 shadow-lg">
                        {/* Background Glow Effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
                        {/* Profile Content */}
                        <div className="relative z-10 flex flex-col items-center">
                          {/* Profile Image */}
                          <div className="w-48 h-48 rounded-full overflow-hidden mb-6 ring-2 ring-blue-500/20 ring-offset-4 dark:ring-offset-[#0f172a] relative">
                            <Image src="/assets/images/profile.jpg" alt="Profile" fill className="object-cover" />
                          </div>

                          {/* Name and Title */}
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Devhioo</h2>
                          <p className="text-blue-600 dark:text-blue-400 mb-8">Full Stack Developer</p>

                          {/* Contact Section */}
                          <div className="w-full flex items-center justify-between space-x-4 bg-gray-100 dark:bg-[#0c1322] rounded-2xl p-4">
                            {/* Username */}
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                <Image src="/assets/images/profile.jpg" alt="Profile" fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-gray-900 dark:text-white/80">@hioov.1</p>
                                <p className="text-green-600 dark:text-green-500 text-sm">Online</p>
                              </div>
                            </div>

                            {/* Contact Button */}
                            <button
                              onClick={() => router.push("/about/detail")}
                              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-hover-blue hover:to-hover-purple text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-blue/20 active:scale-95 flex items-center space-x-2"
                            >
                              <span className="relative z-10 cursor-pointer">CV Resume</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CometCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
