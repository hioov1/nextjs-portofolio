"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ExpandableCardDemoStandard from "@/components/expandable-card-demo-standard";
import { CardStack } from "@/components/ui/card-stack";

export default function ProjectsPage() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: ["easeOut"],
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <section id="projects" ref={sectionRef} className="min-h-screen">
          <div className="py-20 px-4 md:px-16 relative z-10 w-full bg-white dark:bg-slate-950">
            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="container mx-auto">
              {/* Header Section */}
              <motion.div className="text-center mb-16">
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6">
                  My Recent Projects
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-white-100 max-w-3xl mx-auto leading-relaxed">
                  Here are some of the projects I&apos;ve been working on. Each one represents a unique challenge and learning experience in my development journey.
                </motion.p>
              </motion.div>

              {/* Projects and Reviews Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 justify-center items-center">
                {/* Left Side - Projects List */}
                <motion.div variants={itemVariants} className="flex flex-col">
                  <motion.h3 variants={itemVariants} className="text-2xl font-bold text-black dark:text-white mb-8">
                    Featured Projects
                  </motion.h3>
                  <motion.div variants={itemVariants} className="space-y-4 relative">
                    <ExpandableCardDemoStandard />
                  </motion.div>
                </motion.div>

                {/* Right Side - Client Reviews */}
                <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-end">
                  <motion.h3 variants={itemVariants} className="text-2xl font-bold text-black dark:text-white mb-8 self-start lg:self-end">
                    Client Reviews
                  </motion.h3>
                  <motion.div variants={itemVariants} className="w-full">
                    <CardStack
                      items={[
                        {
                          id: 1,
                          name: "Rizwar Munfaridz",
                          designation: "Sigma Corner Owner",
                          content:
                            "We are thrilled with Hioo's performance. Our new billiard and F&B cashier app is loaded with everything we asked for, and the whole system is so responsive and easy to use it's been a seamless fit for our business. Ready for the next one!",
                        },
                        {
                          id: 2,
                          name: "Sarah Smith",
                          designation: "Product Manager",
                          content: "Exceptional problem-solving skills and great communication throughout the project. Would definitely work with them again!",
                        },
                        {
                          id: 3,
                          name: "Michael Brown",
                          designation: "Startup Founder",
                          content: "Delivered high-quality work ahead of schedule. Their technical knowledge and creativity helped bring our vision to life.",
                        },
                        {
                          id: 4,
                          name: "Emily Johnson",
                          designation: "Marketing Director",
                          content: "A talented developer who understands both technical requirements and business needs. Great collaboration experience!",
                        },
                      ]}
                      offset={15}
                      scaleFactor={0.08}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.p variants={itemVariants} className="text-base md:text-lg text-white-100 mb-8">
                  Want to see more of my work? Check out my GitHub profile for additional projects and contributions.
                </motion.p>

                <motion.a
                  variants={itemVariants}
                  href="https://github.com/hioov1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple to-blue-500 text-white font-semibold rounded-lg hover:from-purple/80 hover:to-blue-500/80 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View GitHub Profile
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
