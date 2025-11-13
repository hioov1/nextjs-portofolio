"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NavItems, MobileNavToggle, MobileNavMenu, NavbarButton } from "./ui/resizable-navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

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

      {/* Mobile Navbar - Always Visible */}
      <motion.div
        animate={{
          backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
          width: isScrolled ? "90%" : "100%",
          paddingRight: isScrolled ? "16px" : "16px",
          paddingLeft: isScrolled ? "16px" : "16px",
          borderRadius: isScrolled ? "4px" : "2rem",
          y: isScrolled ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          background: isScrolled ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset" : "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
        }}
        className="relative z-[9999] mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between px-0 py-2 lg:hidden"
      >
        <div className="flex w-full flex-row items-center justify-between">
          {/* Mobile Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <img src="/assets/images/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg" />
            <span className="font-medium text-black dark:text-white text-sm sm:text-base">HIOODEV</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer flex-shrink-0">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a key={idx} href={item.link} className="block px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
