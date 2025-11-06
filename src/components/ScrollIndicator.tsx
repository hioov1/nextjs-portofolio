"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  delay?: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ delay = 1.8 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-gray-400 text-sm">Scroll down</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
