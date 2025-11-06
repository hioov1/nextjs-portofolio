import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-transparent bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.2) 55%, rgba(255,255,255,0.8) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
        color: "rgba(255,255,255,0.8)",
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
