"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { createPortal } from "react-dom";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
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

  const modalContent = active && typeof active === "object" && (
    <>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 h-full w-full z-[10000]" onClick={() => setActive(null)} />
      </AnimatePresence>
      <AnimatePresence>
        <div className="fixed inset-0 grid place-items-center z-[10001] pointer-events-none">
          <div className="pointer-events-auto">
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
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div layoutId={`card-${active.title}-${id}`} ref={ref} className="w-full max-w-[400px] h-full md:h-fit md:max-h-[80%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img width={200} height={200} src={active.src} alt={active.title} className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-medium text-neutral-700 dark:text-neutral-200 text-base">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-neutral-600 dark:text-neutral-400 text-base">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} href={active.ctaLink} target="_blank" className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );

  return (
    <>
      {mounted && modalContent && createPortal(modalContent, document.body)}
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4 relative z-10">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors duration-200 relative z-10"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img width={100} height={100} src={card.src} alt={card.title} className="h-60 w-full rounded-lg object-cover object-top" />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3 layoutId={`title-${card.title}-${id}`} className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                  {card.title}
                </motion.h3>
                <motion.p layoutId={`description-${card.description}-${id}`} className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base">
                  {card.description}
                </motion.p>
              </div>
            </div>
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
            <h4 className="font-semibold mb-2">Tech Stack:</h4>
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
            <h4 className="font-semibold mb-2">Tech Stack:</h4>
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
            <h4 className="font-semibold mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm">JavaScript</span>
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
    description: "Responsive Personal Portfolio Website",
    src: "/assets/images/projects/portofolio.jpg",
    ctaText: "View Project",
    ctaLink: "https://github.com/hioov1/hioov1-portfolio",
    content: () => {
      return (
        <div className="space-y-4">
          <p>Responsive Personal Portfolio Website (Desktop & Mobile Ready) using React, Tailwind, Framer-Motion and some React libraries.</p>
          <div>
            <h4 className="font-semibold mb-2">Tech Stack:</h4>
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
