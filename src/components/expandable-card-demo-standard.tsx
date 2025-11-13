"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>{active && typeof active === "object" && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 h-full w-full z-10" />}</AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 z-40">
            <motion.div layoutId={`card-${active.title}-${id}`} ref={ref} className="w-full max-w-[600px] mx-auto bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl">
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative">
                <img width={200} height={200} src={active.src} alt={active.title} className="w-full h-60 sm:h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.05,
                    },
                  }}
                  className="absolute top-4 right-4 flex items-center justify-center bg-white/90 dark:bg-neutral-800/50 rounded-full h-8 w-8 z-50 backdrop-blur-sm cursor-pointer"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
              </motion.div>

              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start p-4 gap-3 sm:gap-0">
                  <div className="flex-1">
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-neutral-700 dark:text-neutral-200 text-sm sm:text-base">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a 
                    layoutId={`button-${active.title}-${id}`} 
                    href={active.ctaLink} 
                    target="_blank" 
                    className="relative overflow-hidden px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm rounded-full font-bold text-green-600 dark:text-green-400 whitespace-nowrap transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.12) 100%)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset";
                      e.currentTarget.style.backdropFilter = "blur(16px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
                      e.currentTarget.style.backdropFilter = "blur(12px)";
                    }}
                  >
                    <span className="relative z-10">{active.ctaText}</span>
                  </motion.a>
                </div>
                <div className="pt-2 sm:pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs sm:text-sm lg:text-base h-32 sm:h-40 md:h-fit pb-6 sm:pb-10 flex flex-col items-start gap-3 sm:gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer mb-3 sm:mb-4"
          >
            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row items-center sm:items-start w-full sm:w-auto">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img width={100} height={100} src={card.src} alt={card.title} className="h-24 w-24 sm:h-32 sm:w-32 md:h-14 md:w-14 rounded-lg object-cover object-top flex-shrink-0" />
              </motion.div>
              <div className="text-center sm:text-left flex-1">
                <motion.h3 layoutId={`title-${card.title}-${id}`} className="font-medium text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
                  {card.title}
                </motion.h3>
                <motion.p layoutId={`description-${card.description}-${id}`} className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="relative overflow-hidden px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full font-bold text-green-600 dark:text-green-400 mt-3 sm:mt-4 md:mt-0 whitespace-nowrap cursor-pointer transition-all duration-300 transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.12) 100%)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset";
                e.currentTarget.style.backdropFilter = "blur(16px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
                e.currentTarget.style.backdropFilter = "blur(12px)";
              }}
            >
              <span className="relative z-10">{card.ctaText}</span>
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "Billiard & F&B Cashier App",
    description: "Desktop cashier app to handle billiard and f&b sales",
    src: "/assets/images/projects/cashier.jpg",
    ctaText: "View Project",
    ctaLink: "https://github.com/hioov1/Kasir-Billiard-Fnb-dokumentasi",
    content: () => {
      return (
        <div className="space-y-4">
          <p>Desktop POS system specializing in integrated billing for recreational services (billiards) and streamlined Food & Beverage operations.</p>
          <div>
            <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">ReactJS</span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 rounded-full text-sm">TailwindCSS</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm">NodeJS</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">ElectronJS</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">SQLite</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">Prisma</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Company Profile Website",
    description: "Business & Corporate Site",
    src: "/assets/images/projects/companyprofile.jpg",
    ctaText: "View Project",
    ctaLink: "https://github.com/hioov1/company-profile-website",
    content: () => {
      return (
        <div className="space-y-4">
          <p>Responsive Company Profile Website using NextJS, currently focuses on the frontend aspects of the project.</p>
          <div>
            <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm">NextJs</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">TailwindCSS</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-sm">Framer Motion</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Salary App Management System",
    description: "Multi-User Salary Management System",
    src: "/assets/images/projects/salaryapp.jpg",
    ctaText: "View Project",
    ctaLink: "https://github.com/hioov1/SalaryApp-doc",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            The Employee Management Salary App is a full-stack CRUD web application built with the MERN stack (MongoDB, Express.js, React, Node.js) to efficiently manage employee data, salaries, and attendance, featuring distinct Admin and
            Employee user roles.
          </p>
          <div>
            <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyan-100 text-shadow-yellow-200 dark:bg-cyan-900/30 dark:text-yellow-300 rounded-full text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 rounded-full text-sm">MongoDB</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">ExpressJS</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">ReactJS</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm">NodeJS</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Responsive Portfolio Website",
    description: "Responsive Personal Portfolio Website ",
    src: "/assets/images/projects/portofolio.jpg",
    ctaText: "View Project",
    ctaLink: "https://github.com/hioov1/hioov1-portfolio",
    content: () => {
      return (
        <div className="space-y-4">
          <p>Responsive Personal Portfolio Website (Desktop & Mobile Ready) using React, Tailwind, Framer-Motion and some React libraries.</p>
          <div>
            <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-black text-white dark:bg-white/10 dark:text-white rounded-full text-sm">ReactJS</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">TailwindCSS</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm">Framer Motion</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">JavaScript</span>
            </div>
          </div>
        </div>
      );
    },
  },
];
