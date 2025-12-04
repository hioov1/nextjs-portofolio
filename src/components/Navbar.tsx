"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NavItems } from "./ui/resizable-navbar";
import { FloatingDock } from "./ui/floating-dock";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { IconHome, IconUser, IconBriefcase, IconMail, IconSun, IconMoon } from "@tabler/icons-react";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme from localStorage or system preference
    const isDark = localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const { scrollY } = useScroll();

  // Update styling based on scroll - navbar will always be visible but with different background
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true); // Show background blur and shadow when scrolled
    } else {
      setIsScrolled(false); // Transparent background at top
    }
  });

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Projects", link: "/#projects" },
    { name: "Contact", link: "/#contact" },
  ];

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dockItems = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#home",
      onClick: handleHomeClick,
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#about",
      onClick: () => handleSectionClick("about"),
    },
    {
      title: "Projects",
      icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#projects",
      onClick: () => handleSectionClick("projects"),
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#contact",
      onClick: () => handleSectionClick("contact"),
    },
    {
      title: "Theme",
      icon: (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
          }}
          className="h-full w-full flex items-center justify-center cursor-pointer"
        >
          {darkMode ? <FiSun className="h-full w-full text-yellow-400" /> : <FiMoon className="h-full w-full text-blue-400" />}
        </div>
      ),
      href: "#",
      onClick: () => {},
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 3.1,
        ease: "easeOut",
      }}
      className={cn("fixed inset-x-0 top-0 z-[9998] w-full mt-2")}
    >
      {/* Desktop Navbar - Always Visible */}
      <motion.div
        animate={{
          backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
          width: isScrolled ? "40%" : "100%",
          y: isScrolled ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          minWidth: "800px",
          background: isScrolled ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset" : "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
        }}
        className="relative z-[9999] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex"
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/assets/images/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
          <span className="font-medium text-black dark:text-white">HIOODEV</span>
        </div>

        {/* Navigation Items */}
        <NavItems items={navItems} />

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </motion.div>

      {/* Mobile FloatingDock - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 3.5,
          ease: "easeOut",
        }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] lg:hidden"
      >
        <FloatingDock items={dockItems} mobileClassName="flex" desktopClassName="hidden" />
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
