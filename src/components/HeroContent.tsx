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
      <div className="relative z-10 w-full p-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="text-left space-y-8">
            <motion.div className="space-y-6">
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
                <div className="text-4xl sm:text-5xl lg:text-7xl flex justify-start">
                  <div className="-ml-4">
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
                className="text-xl sm:text-2xl lg:text-3xl -ml-4"
              >
                <span className="font-semibold text-gray-800 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] dark:text-gray-200">I&apos;m a</span>{" "}
                <RotatingText
                  texts={["Fullstack Developer", "Web Developer", "Software Developer", "Fullstack AI Prompter"]}
                  mainClassName="inline-block bg-gradient-to-r from-cyan-300 to-blue-500 text-black font-bold px-4 py-2 rounded-lg shadow-lg [text-shadow:_0_1px_1px_rgb(0_0_0_/_20%)] dark:from-blue-500 dark:to-purple-500"
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
              className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl font-medium -ml-4"
            >
              a Full-stack (AI Promter) Developer based in Web and Software Development.
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
              className="pt-4 -ml-4"
            >
              <button
                onClick={handleScrollToAbout}
                className="bg-[#0f172a] hover:bg-blue-500 text-white dark:bg-[#0f172a] dark:hover:bg-blue-500 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                Let&apos;s get started →
              </button>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: baseDelay + 0.4,
              ease: "easeOut",
            }}
            className="flex justify-center lg:justify-end"
          >
            <CircularProfileImage imageSrc="/assets/images/profile.jpg" altText="Profile Picture" size={384} className="lg:size-96" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
