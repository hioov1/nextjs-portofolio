"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpotlightEffectProps {
  mode?: "light" | "dark";
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({ mode = "dark" }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const baseColor = mode === "light" ? "200, 240, 255" : "6, 182, 212";
  const gradients = {
    light: [
      `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(${baseColor}, 0.1), transparent 40%)`,
      `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(${baseColor}, 0.05), transparent 40%)`,
      `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(${baseColor}, 0.025), transparent 40%)`,
    ],
    dark: [
      `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(${baseColor}, 0.15), transparent 40%)`,
      `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(${baseColor}, 0.1), transparent 40%)`,
      `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(${baseColor}, 0.05), transparent 40%)`,
    ],
  };

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: gradients[mode].join(","),
        }}
      />
      {mode === "dark" && <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/50 via-cyan-900/25 to-transparent" style={{ mixBlendMode: "plus-lighter" }} />}
    </motion.div>
  );
};
