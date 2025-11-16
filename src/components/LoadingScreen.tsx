"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoaderFour } from "./ui/loader";

interface LoadingScreenProps {
  children: React.ReactNode;
  duration?: number;
}

// Pre-defined positions to avoid hydration mismatch
const particlePositions = [
  { left: 10, top: 20, delay: 0 },
  { left: 80, top: 15, delay: 0.2 },
  { left: 25, top: 70, delay: 0.4 },
  { left: 90, top: 60, delay: 0.6 },
  { left: 5, top: 85, delay: 0.8 },
  { left: 70, top: 30, delay: 1.0 },
  { left: 45, top: 10, delay: 1.2 },
  { left: 15, top: 50, delay: 1.4 },
  { left: 85, top: 80, delay: 1.6 },
  { left: 60, top: 90, delay: 1.8 },
  { left: 30, top: 40, delay: 0.3 },
  { left: 95, top: 25, delay: 0.5 },
  { left: 20, top: 75, delay: 0.7 },
  { left: 75, top: 5, delay: 0.9 },
  { left: 50, top: 65, delay: 1.1 },
  { left: 35, top: 35, delay: 1.3 },
  { left: 65, top: 55, delay: 1.5 },
  { left: 40, top: 80, delay: 1.7 },
  { left: 85, top: 45, delay: 1.9 },
  { left: 55, top: 25, delay: 0.1 },
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ children, duration = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            {/* Background with subtle animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
              {/* Animated background particles */}
              {isMounted && (
                <div className="absolute inset-0">
                  {particlePositions.map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
                      style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Loading content */}
            <div className="relative z-10 flex flex-col items-center space-y-8">
              {/* Logo or Brand */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">HIOODEV</h1>
                <p className="text-gray-400 text-lg">Full Stack Developer</p>
              </motion.div>

              {/* Animated Loader */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <LoaderFour text="Loading..." />
              </motion.div>

              {/* Progress indicator */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: duration / 1000,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Loading text */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="text-gray-500 text-sm">
                Preparing your experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingScreen;
