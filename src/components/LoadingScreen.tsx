"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoaderFour } from "./ui/loader";

interface LoadingScreenProps {
  children: React.ReactNode;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ children, duration = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
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
