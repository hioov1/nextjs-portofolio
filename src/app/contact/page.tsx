"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, Facebook, Github } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

const ContactAndFooter: React.FC = () => {
  const [isContactInView, setIsContactInView] = useState<boolean>(false);
  const [isFooterInView, setIsFooterInView] = useState<boolean>(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [formStatus, setFormStatus] = useState<"" | "success" | "error">("");

  // Custom intersection observer for contact section
  useEffect(() => {
    const observerContact = new IntersectionObserver(
      ([entry]) => {
        setIsContactInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observerContact.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observerContact.unobserve(contactRef.current);
      }
    };
  }, []);

  // Custom intersection observer for footer section
  useEffect(() => {
    const observerFooter = new IntersectionObserver(
      ([entry]) => {
        setIsFooterInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observerFooter.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observerFooter.unobserve(footerRef.current);
      }
    };
  }, []);

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      url: "https://www.instagram.com/hioov.1",
    },
    {
      icon: <Github size={20} />,
      color: "bg-blue-400",
      url: "https://github.com/hioov1",
    },
    {
      icon: <Linkedin size={20} />,
      color: "bg-blue-600",
      url: "https://www.linkedin.com/in/wahyudin-01b559210",
    },
    {
      icon: <Facebook size={20} />,
      color: "bg-blue-800",
      url: "https://www.facebook.com/Whydn06",
    },
  ];

  // Animation variants
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

  const formFieldVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: ["easeOut"],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.6,
        ease: ["easeOut"],
      },
    },
  };

  const floatingObjectVariant = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, -5, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Contact Section */}
      <Spotlight />
      <div id="contact" ref={contactRef} className="relative min-h-screen overflow-hidden pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-0 pt-16 sm:pt-20 lg:pt-24 bg-white dark:bg-black">
        {/* Decorative circle on bottom right */}
        <motion.div className="absolute bottom-0 right-0 w-96 h-96 hidden md:block" animate={isContactInView ? "animate" : "initial"} variants={floatingObjectVariant}>
          <div className="relative w-full h-full">
            <motion.div
              className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tr from-blue-500/50 to-cyan-300 rounded-full blur-md"
              initial={{ opacity: 0 }}
              animate={isContactInView ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute right-0 bottom-0 w-64 h-64 rounded-full clip-donut border-8 border-cyan-400"
              initial={{ opacity: 0, rotate: -30 }}
              animate={isContactInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -30 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            <motion.div
              className="absolute right-24 bottom-16 w-12 h-12 bg-pink-500 rotate-45 rounded-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={isContactInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="absolute right-10 bottom-32 w-8 h-8 bg-cyan-300 clip-triangle"
              initial={{ opacity: 0, scale: 0 }}
              animate={isContactInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
        </motion.div>

        {/* Contact card */}
        <motion.div variants={containerVariants} initial="hidden" animate={isContactInView ? "visible" : "hidden"} className="container mx-auto max-w-5xl">
          <motion.div
            className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)] flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 transition-all duration-300 hover:bg-gradient-to-br "
            initial={{ opacity: 0, y: 40 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left side - Contact Info */}
            <div className="md:w-2/5">
              <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-4 sm:mb-6">
                Get in touch
              </motion.h2>

              <motion.p variants={itemVariants} className="text-black dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed font-sans text-sm sm:text-base">
                I'm available to work. However, if you have another request or question, don't hesitate to contact me.{" "}
              </motion.p>

              <div className="space-y-4 sm:space-y-6">
                <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4">
                  <motion.div variants={iconVariants} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <Mail size={16} className="text-gray-300 sm:w-[18px] sm:h-[18px]" />
                  </motion.div>
                  <a href="mailto:hioov1mail@gmail.com" className="text-black dark:text-gray-300 hover:underline hover:text-blue-600 font-sans text-sm sm:text-base" target="_blank">
                    <span>hioov1mail@gmail.com</span>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="md:w-3/5">
              <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-black dark:text-white">
                Send me a message
              </motion.h2>

              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const data = new FormData(form);

                  try {
                    const response = await fetch("https://formspree.io/f/xwpoovqg", {
                      method: "POST",
                      body: data,
                      headers: {
                        Accept: "application/json",
                      },
                    });

                    if (response.ok) {
                      setFormStatus("success");
                      form.reset(); // kosongkan form
                    } else {
                      setFormStatus("error");
                    }
                  } catch (err) {
                    setFormStatus("error");
                  }
                }}
              >
                <motion.div variants={formFieldVariants}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full py-2 px-3 sm:py-3 sm:px-4 bg-blue-400/30 rounded-lg text-white placeholder:text-black dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm sm:text-base"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full py-2 px-3 sm:py-3 sm:px-4 bg-blue-400/30 rounded-lg text-white placeholder:text-black dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-sm sm:text-base"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants}>
                  <textarea
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    className="w-full py-2 px-3 sm:py-3 sm:px-4 bg-blue-400/30 rounded-lg text-white placeholder:text-black dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-sans text-sm sm:text-base"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants}>
                  <button
                    type="submit"
                    className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 bg-blue-400/40 backdrop-blur-md  rounded-lg text-black dark:text-white font-medium text-sm sm:text-base shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)] hover:bg-blue-400 transition-all duration-300 cursor-pointer"
                  >
                    Send message
                  </button>
                </motion.div>
                {formStatus === "success" && <p className="text-green-400">Your message has been sent successfully!</p>}
                {formStatus === "error" && <p className="text-red-400">Oops! Something went wrong. Please try again.</p>}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Section */}
      <div ref={footerRef} className="bg-gray-100 dark:bg-blue-600/10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="container mx-auto max-w-6xl">
          {/* Navigation Links */}
          <motion.div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Follow me on Social Media</h2>
            <div className="w-32 sm:w-48 md:w-56 h-1 bg-blue-500 mx-auto mb-4 sm:mb-6"></div>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12" initial={{ opacity: 0 }} animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {socialLinks.map((item, index) => (
              <motion.a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white ${item.color} hover:scale-110 transition-transform`}>
                {item.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Footer Divider */}
          <motion.div className="h-px bg-gray-700 mb-4 sm:mb-6" initial={{ scaleX: 0 }} animate={isFooterInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.8, delay: 0.4 }} />

          {/* Terms & Privacy */}
          <motion.div className="flex justify-center text-xs sm:text-sm text-gray-400 font-sans px-4" initial={{ opacity: 0 }} animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <div className="space-x-2">
              <p>
                © Copyright 2025,{" "}
                <a href="https://github.com/hioov1" className="text-blue-500 hover:underline" target="_blank">
                  <span>HiooDev.</span>
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactAndFooter;
