"use client";

import React from "react";
import LogoLoop from "@/components/LogoLoop";
import { FaReact, FaNodeJs, FaDocker, FaAws, FaFigma, FaLaravel, FaJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql } from "react-icons/si";

export default function LogoSectionPage() {
  const logos = [
    {
      node: <FaReact className="text-blue-400 text-5xl hover:text-blue-300 transition-colors" />,
      title: "React",
      ariaLabel: "React",
    },
    {
      node: <SiNextdotjs className="text-white text-5xl hover:text-gray-300 transition-colors" />,
      title: "Next.js",
      ariaLabel: "Next.js",
    },
    {
      node: <SiTypescript className="text-blue-500 text-5xl hover:text-blue-400 transition-colors" />,
      title: "TypeScript",
      ariaLabel: "TypeScript",
    },
    {
      node: <SiTailwindcss className="text-cyan-400 text-5xl hover:text-cyan-300 transition-colors" />,
      title: "Tailwind CSS",
      ariaLabel: "Tailwind CSS",
    },
    {
      node: <FaNodeJs className="text-green-500 text-5xl hover:text-green-400 transition-colors" />,
      title: "Node.js",
      ariaLabel: "Node.js",
    },
    {
      node: <SiMongodb className="text-green-600 text-5xl hover:text-green-500 transition-colors" />,
      title: "MongoDB",
      ariaLabel: "MongoDB",
    },
    {
      node: <SiPostgresql className="text-blue-600 text-5xl hover:text-blue-500 transition-colors" />,
      title: "PostgreSQL",
      ariaLabel: "PostgreSQL",
    },
    {
      node: <FaDocker className="text-blue-400 text-5xl hover:text-blue-300 transition-colors" />,
      title: "Docker",
      ariaLabel: "Docker",
    },
    {
      node: <FaAws className="text-orange-400 text-5xl hover:text-orange-300 transition-colors" />,
      title: "AWS",
      ariaLabel: "AWS",
    },
    {
      node: <FaFigma className="text-purple-400 text-5xl hover:text-purple-300 transition-colors" />,
      title: "Figma",
      ariaLabel: "Figma",
    },
    {
      node: <FaLaravel className="text-red-500 text-5xl hover:text-red-400 transition-colors" />,
      title: "Laravel",
      ariaLabel: "Laravel",
    },
    {
      node: <FaJs className="text-yellow-400 text-5xl hover:text-yellow-300 transition-colors" />,
      title: "JavaScript",
      ariaLabel: "JavaScript",
    },
  ];

  return (
    <section id="logosection" className="py-20 bg-black-100 relative overflow-hidden">
      {/* Full Width Logo Loops - No container constraints */}
      <div className="w-full">
        {/* First row - Left direction */}
        <div className="relative mb-8">
          <LogoLoop logos={logos} speed={100} direction="left" logoHeight={80} gap={80} pauseOnHover={false} fadeOut={false} scaleOnHover={true} ariaLabel="Technologies and tools" className="py-8 w-full" width="100%" />
        </div>

        {/* Second row - Right direction */}
        <div className="relative mb-8">
          <LogoLoop
            logos={logos.slice().reverse()}
            speed={80}
            direction="right"
            logoHeight={70}
            gap={70}
            pauseOnHover={false}
            fadeOut={false}
            scaleOnHover={true}
            ariaLabel="Technologies and tools reverse"
            className="py-6 w-full"
            width="100%"
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
