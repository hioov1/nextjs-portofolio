"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

export const FlipCard = ({ frontContent, backContent }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[300px] perspective-1000" onClick={() => setIsFlipped(!isFlipped)} style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full h-full transform-style-3d transition-transform duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          {frontContent}
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden transform rotate-y-180" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};
