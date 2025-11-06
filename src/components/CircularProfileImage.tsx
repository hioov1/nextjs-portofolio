"use client";

import React from "react";
import { motion } from "motion/react";

interface CircularProfileImageProps {
  imageSrc: string;
  altText?: string;
  size?: number;
  className?: string;
}

const CircularProfileImage: React.FC<CircularProfileImageProps> = ({ imageSrc, altText = "Profile Picture", size = 400, className = "" }) => {
  return (
    <motion.div className={`relative ${className}`} style={{ width: size, height: size }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} whileHover={{ scale: 1.05 }}>
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-green-500/30 p-1" style={{ width: size, height: size }}>
        {/* Inner Container */}
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
          <motion.img src={imageSrc} alt={altText} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500/20 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </motion.div>
  );
};

export default CircularProfileImage;
