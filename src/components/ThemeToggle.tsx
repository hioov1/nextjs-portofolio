"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or system preference
    const isDark = localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update DOM and localStorage
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 hover:from-primary-blue/20 hover:to-primary-purple/20 dark:from-primary-blue/20 dark:to-primary-purple/20 dark:hover:from-primary-blue/30 dark:hover:to-primary-purple/30 border border-border-light dark:border-border-dark transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div initial={false} animate={{ rotate: darkMode ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="relative w-6 h-6">
        <motion.div initial={false} animate={{ opacity: darkMode ? 0 : 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 text-yellow-400">
          <FiSun className="w-full h-full" />
        </motion.div>
        <motion.div initial={false} animate={{ opacity: darkMode ? 1 : 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 text-blue-400">
          <FiMoon className="w-full h-full" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
