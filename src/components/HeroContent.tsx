"use client";

import React from "react";
import { motion } from "framer-motion";
import RotatingText from "./RotatingText";
import CircularProfileImage from "./CircularProfileImage";
import TrueFocus from "./TrueFocus";
import { Spotlight } from "./ui/spotlight-new";

interface HeroContentProps {
  baseDelay?: number;
}

const HeroContent: React.FC<HeroContentProps> = ({ baseDelay = 1.3 }) => {
  const handleScrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen flex items-start px-4 sm:px-6 lg:px-8 pt-20">
      {/* Animasi background Spotlight */}
      <Spotlight />
      {/* Konten utama Hero */}
      <div className="relative z-10 w-full px-4 py-8 sm:px-8 sm:py-12 md:px-16 md:py-20 lg:px-32 lg:py-32">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Mobile: Profile Image First */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: baseDelay + 0.4,
              ease: "easeOut",
            }}
            className="flex justify-center lg:hidden order-1"
          >
            <CircularProfileImage imageSrc="/assets/images/profile.jpg" altText="Profile Picture" size={256} className="sm:size-80 md:size-96" />
          </motion.div>

          <div className="text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            <motion.div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: baseDelay,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl flex justify-start">
                  <div className="-ml-2 sm:-ml-4">
                    <TrueFocus sentence="Hi I'm Hioo" manualMode={true} blurAmount={2} borderColor="#3B82F6" glowColor="rgba(59, 130, 246, 0.6)" animationDuration={0.5} pauseBetweenAnimations={1} />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: baseDelay + 0.1,
                  ease: "easeOut",
                }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl -ml-2 sm:-ml-4"
              >
                <span className="font-semibold text-gray-800 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] dark:text-gray-200">I&apos;m a</span>{" "}
                <RotatingText
                  texts={["Fullstack Developer", "Web Developer", "Fullstack AI Prompter", "Tech Enthusiast"]}
                  mainClassName="inline-block bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg [text-shadow:_0_1px_1px_rgb(0_0_0_/_20%)] dark:from-blue-500 dark:to-purple-500"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: baseDelay + 0.2,
                ease: "easeOut",
              }}
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl font-medium -ml-2 sm:-ml-4"
            >
              a Full-stack (AI Promter) Developer based in Web Development.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: baseDelay + 0.3,
                ease: "easeOut",
              }}
              className="pt-2 sm:pt-4 -ml-2 sm:-ml-4"
            >
              <button
                onClick={handleScrollToAbout}
                className="relative overflow-hidden text-cyan-600 dark:text-blue-400 font-semibold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
                <span className="relative z-10">Let&apos;s get started →</span>
              </button>
            </motion.div>
          </div>

          {/* Desktop: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: baseDelay + 0.4,
              ease: "easeOut",
            }}
            className="hidden lg:flex justify-center lg:justify-end order-3 lg:order-2"
          >
            <CircularProfileImage imageSrc="/assets/images/profile.jpg" altText="Profile Picture" size={384} className="lg:size-96" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
