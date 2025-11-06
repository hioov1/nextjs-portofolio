"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ProjectExpandableCard() {
  const [active, setActive] = useState<(typeof projects)[number] | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

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
          <div className="fixed inset-0 grid place-items-center z-[100]">
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
            <motion.div layoutId={`card-${active.title}-${id}`} ref={ref} className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img width={200} height={200} src={active.image} alt={active.title} className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
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

                  <div className="flex gap-2">
                    {active.githubLink && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-sm rounded-full font-bold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                      >
                        GitHub
                      </motion.a>
                    )}
                    {active.liveLink && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        Live Demo
                      </motion.a>
                    )}
                  </div>
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
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {projects.map((project, index) => (
          <motion.div layoutId={`card-${project.title}-${id}`} key={project.title} onClick={() => setActive(project)} className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${project.title}-${id}`}>
                <img width={100} height={100} src={project.image} alt={project.title} className="h-60 w-full rounded-lg object-cover object-top" />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3 layoutId={`title-${project.title}-${id}`} className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={`description-${project.description}-${id}`} className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base">
                  {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
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

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack web application",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubLink: "https://github.com/yourusername/ecommerce-platform",
    liveLink: "https://your-ecommerce-demo.vercel.app",
    content: () => {
      return (
        <div className="space-y-4">
          <p>A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, and admin dashboard.</p>
          <div>
            <h4 className="font-semibold mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>User registration and authentication</li>
              <li>Product browsing and search functionality</li>
              <li>Shopping cart and wishlist</li>
              <li>Secure payment processing</li>
              <li>Order tracking and history</li>
              <li>Admin panel for inventory management</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Technologies Used:</h4>
            <p className="text-sm">
              Frontend: React.js, Tailwind CSS, Redux Toolkit
              <br />
              Backend: Node.js, Express.js, MongoDB
              <br />
              Payment: Stripe API
              <br />
              Deployment: Vercel, MongoDB Atlas
            </p>
          </div>
        </div>
      );
    },
  },
  {
    title: "Task Management App",
    description: "Productivity and collaboration tool",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    githubLink: "https://github.com/yourusername/task-management",
    liveLink: "https://your-task-app.vercel.app",
    content: () => {
      return (
        <div className="space-y-4">
          <p>A modern task management application designed for teams and individuals. Built with Next.js and TypeScript for type safety and optimal performance.</p>
          <div>
            <h4 className="font-semibold mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Create, edit, and organize tasks</li>
              <li>Team collaboration and task assignment</li>
              <li>Project boards with drag-and-drop</li>
              <li>Real-time notifications</li>
              <li>Progress tracking and analytics</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Technologies Used:</h4>
            <p className="text-sm">
              Frontend: Next.js, TypeScript, Tailwind CSS
              <br />
              Backend: Next.js API Routes, Prisma ORM
              <br />
              Database: PostgreSQL
              <br />
              Authentication: NextAuth.js
              <br />
              Deployment: Vercel
            </p>
          </div>
        </div>
      );
    },
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather tracking app",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
    technologies: ["React", "Chart.js", "OpenWeather API", "Geolocation"],
    githubLink: "https://github.com/yourusername/weather-dashboard",
    liveLink: "https://your-weather-app.vercel.app",
    content: () => {
      return (
        <div className="space-y-4">
          <p>A comprehensive weather dashboard that provides real-time weather data, forecasts, and interactive charts. Features location-based weather detection and detailed meteorological information.</p>
          <div>
            <h4 className="font-semibold mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Current weather conditions</li>
              <li>7-day weather forecast</li>
              <li>Interactive weather charts</li>
              <li>Location-based detection</li>
              <li>Search for any city worldwide</li>
              <li>Weather alerts and notifications</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Technologies Used:</h4>
            <p className="text-sm">
              Frontend: React.js, Chart.js, Tailwind CSS
              <br />
              API: OpenWeatherMap API
              <br />
              Features: Geolocation API, Local Storage
              <br />
              Deployment: Vercel
            </p>
          </div>
        </div>
      );
    },
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio with animations",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
    technologies: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    githubLink: "https://github.com/yourusername/portfolio-website",
    liveLink: "https://your-portfolio.vercel.app",
    content: () => {
      return (
        <div className="space-y-4">
          <p>A modern, animated portfolio website showcasing projects and skills. Built with Next.js and enhanced with smooth animations using Framer Motion and GSAP for an engaging user experience.</p>
          <div>
            <h4 className="font-semibold mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Responsive design for all devices</li>
              <li>Smooth scroll animations</li>
              <li>Interactive project showcases</li>
              <li>Contact form with email integration</li>
              <li>Dark/light theme toggle</li>
              <li>SEO optimized</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Technologies Used:</h4>
            <p className="text-sm">
              Frontend: Next.js, TypeScript, Tailwind CSS
              <br />
              Animations: Framer Motion, GSAP
              <br />
              Forms: React Hook Form, EmailJS
              <br />
              Deployment: Vercel
            </p>
          </div>
        </div>
      );
    },
  },
];
