"use client";

import React, { useEffect, useRef, useState } from "react";
import { CometCard } from "@/components/ui/comet-card";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";

export default function AboutPage() {
  const router = useRouter();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardSectionRef = useRef<HTMLDivElement>(null);

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

    // Intersection Observer for card reveal animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const cardSection = cardSectionRef.current;
    if (cardSection) {
      observer.observe(cardSection);
    }

    return () => {
      if (cardSection) {
        observer.unobserve(cardSection);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Spotlight className="right-0 top-1/2 translate-y-[-50%] rotate-180 opacity-80 dark:opacity-60" fill="#67E8F9" />
      </div>
      <div className="flex-1">
        <section id="about" className="min-h-screen">
          <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center">
            <MacbookScroll src="/assets/images/33.png" title={<span>About Me</span>} showGradient={false} />
          </div>
          <div className="bg-gray-100 dark:bg-black">
            <div className="relative z-20 px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:py-20" ref={cardSectionRef}>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  {/* Mobile: CometCard First */}
                  <motion.div
                    className="flex justify-center items-start h-full lg:hidden order-1"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={isCardVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  >
                    <CometCard className="w-full max-w-md sm:max-w-lg">
                      <div className="relative bg-[#0f172a] rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border border-gray-200 dark:border-gray-800/50 shadow-lg">
                        {/* Background Glow Effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2bg-blue-500/5 rounded-full blur-3xl" />
                        {/* Profile Content */}
                        <div className="relative z-10 flex flex-col items-center">
                          {/* Profile Image */}
                          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 sm:mb-6 ring-2 ring-blue-500/20 ring-offset-2 sm:ring-offset-4 ring-offset-[#0f172a] relative">
                            <Image src="/assets/images/profile.jpg" alt="Profile" fill className="object-cover" />
                          </div>

                          {/* Name and Title */}
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Devhioo</h2>
                          <p className="text-blue-400 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">Full Stack Developer</p>

                          {/* Contact Section - Same as Desktop */}
                          <div className="w-full flex flex-row items-center justify-between space-x-4 bg-[#0c1322] rounded-2xl p-3 sm:p-4">
                            {/* Username */}
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative">
                                <Image src="/assets/images/profile.jpg" alt="Profile" fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-white/80 text-sm sm:text-base">@hioov.1</p>
                                <p className="text-green-500 text-xs sm:text-sm">Online</p>
                              </div>
                            </div>

                            {/* CV Resume Button */}
                            <button
                              onClick={() => router.push("/#contact")}
                              className="relative overflow-hidden text-blue-400 font-medium text-xs sm:text-sm rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 flex items-center space-x-2"
                              style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.12) 100%)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset";
                                e.currentTarget.style.backdropFilter = "blur(16px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
                                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
                                e.currentTarget.style.backdropFilter = "blur(12px)";
                              }}
                            >
                              <span className="relative z-10 cursor-pointer">Contact</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CometCard>
                  </motion.div>

                  {/* Content - Brief Description */}
                  <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                    <ScrollReveal containerClassName="mb-4 sm:mb-6" textClassName="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-white" baseOpacity={0.2} baseRotation={2}>
                      Who Am I?
                    </ScrollReveal>
                    <div className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-300">
                      <ScrollReveal containerClassName="mb-3 sm:mb-4" textClassName="text-sm sm:text-base md:text-lg leading-relaxed" baseOpacity={0.3} baseRotation={1}>
                        I’m Hioo, a Full-Stack Developer specializing in web and software development.
                      </ScrollReveal>
                      <ScrollReveal containerClassName="mb-3 sm:mb-4" textClassName="text-sm sm:text-base md:text-lg leading-relaxed" baseOpacity={0.3} baseRotation={1}>
                        I thrive on creating applications that blend performance, stability, and a seamless user experience. My focus is on crafting technology that feels natural tools that work intuitively and empower people to do more.
                      </ScrollReveal>
                    </div>

                    <div className="mb-4 flex justify-start">
                      <button
                        onClick={() => router.push("/about/detail")}
                        className="relative overflow-hidden text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 flex items-center space-x-2"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
                          minWidth: "180px",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.12) 100%)";
                          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset";
                          e.currentTarget.style.backdropFilter = "blur(16px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
                          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
                          e.currentTarget.style.backdropFilter = "blur(12px)";
                        }}
                      >
                        <span className="relative z-10 cursor-pointer">More About Me →</span>
                      </button>
                    </div>
                  </div>

                  {/* Desktop: CometCard */}
                  <motion.div
                    className="hidden lg:flex justify-center items-start h-full mt-6 sm:mt-8 lg:mt-0 order-3 lg:order-2"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={isCardVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  >
                    <CometCard className="w-full max-w-sm sm:max-w-md">
                      <div className="relative bg-[#0f172a] rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden border border-gray-800/50 shadow-lg">
                        {/* Background Glow Effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
                        {/* Profile Content */}
                        <div className="relative z-10 flex flex-col items-center">
                          {/* Profile Image */}
                          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 sm:mb-6 ring-2 ring-blue-500/20 ring-offset-2 sm:ring-offset-4 ring-offset-[#0f172a] relative">
                            <Image src="/assets/images/profile.jpg" alt="Profile" fill className="object-cover" />
                          </div>

                          {/* Name and Title */}
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Devhioo</h2>
                          <p className="text-blue-400 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">Full Stack Developer</p>

                          {/* Contact Section - Desktop */}
                          <div className="w-full flex flex-row items-center justify-between space-x-4 bg-[#0c1322] rounded-2xl p-3 sm:p-4">
                            {/* Username */}
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative">
                                <Image src="/assets/images/profile.jpg" alt="Profile" fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-white/80 text-sm sm:text-base">@hioov.1</p>
                                <p className="text-green-500 text-xs sm:text-sm">Online</p>
                              </div>
                            </div>

                            {/* Contact Button */}
                            <button
                              onClick={() => router.push("/#contact")}
                              className="relative overflow-hidden text-blue-400 font-medium text-xs sm:text-sm rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 flex items-center space-x-2"
                              style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.12) 100%)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset";
                                e.currentTarget.style.backdropFilter = "blur(16px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
                                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
                                e.currentTarget.style.backdropFilter = "blur(12px)";
                              }}
                            >
                              <span className="relative z-10 cursor-pointer">Contact</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CometCard>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
