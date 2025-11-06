"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/moving-border";
import { ResizableNavbar } from "@/components/ui/resizable-navbar";
import { Timeline } from "@/components/ui/timeline";
import { FlipCard } from "@/components/ui/flip-card";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail, IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";
import { LinkPreview } from "@/components/ui/link-priview";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandJavascript,
  IconBrandNodejs,
  IconDatabase,
  IconBrandGit,
  IconBrandAws,
  IconBrandFigma,
  IconApi,
  IconDatabaseEdit,
  IconCode,
} from "@tabler/icons-react";

const getIconComponent = (iconName: string) => {
  const iconComponents: { [key: string]: React.ReactNode } = {
    IconBrandReact: <IconBrandReact className="w-5 h-5 text-blue-500" />,
    IconBrandNextjs: <IconBrandNextjs className="w-5 h-5 text-black dark:text-white" />,
    IconBrandTypescript: <IconBrandTypescript className="w-5 h-5 text-blue-600" />,
    IconBrandTailwind: <IconBrandTailwind className="w-5 h-5 text-cyan-500" />,
    IconBrandJavascript: <IconBrandJavascript className="w-5 h-5 text-yellow-400" />,
    IconBrandNodejs: <IconBrandNodejs className="w-5 h-5 text-green-500" />,
    IconDatabase: <IconDatabase className="w-5 h-5 text-blue-600" />,
    IconBrandGit: <IconBrandGit className="w-5 h-5 text-orange-600" />,
    IconBrandAws: <IconBrandAws className="w-5 h-5 text-orange-500" />,
    IconBrandFigma: <IconBrandFigma className="w-5 h-5 text-purple-500" />,
    IconApi: <IconApi className="w-5 h-5 text-green-500" />,
    IconDatabaseEdit: <IconDatabaseEdit className="w-5 h-5 text-blue-500" />,
    IconCode: <IconCode className="w-5 h-5 text-gray-600 dark:text-gray-400" />,
  };

  return iconComponents[iconName] || <IconCode className="w-5 h-5 text-gray-500" />;
};

export default function AboutDetailPage() {
  const router = useRouter();

  const skills = {
    Frontend: [
      { name: "React", icon: "IconBrandReact" },
      { name: "Next.js", icon: "IconBrandNextjs" },
      { name: "Tailwind CSS", icon: "IconBrandTailwind" },
      { name: "TypeScript", icon: "IconBrandTypescript" },
      { name: "JavaScript", icon: "IconBrandJavascript" },
    ],
    Backend: [
      { name: "Node.js", icon: "IconBrandNodejs" },
      { name: "Express.js", icon: "IconBrandNodejs" },
      { name: "MongoDB", icon: "IconDatabase" },
      { name: "PostgreSQL", icon: "IconDatabase" },
    ],
    Tools: [
      { name: "Git", icon: "IconBrandGit" },
      { name: "AWS", icon: "IconBrandAws" },
      { name: "Figma", icon: "IconBrandFigma" },
      { name: "Postman", icon: "IconApi" },
    ],
    Other: [
      { name: "REST APIs", icon: "IconApi" },
      { name: "RESTful API", icon: "IconApi" },
      { name: "CRUD", icon: "IconDatabaseEdit" },
      { name: "Prisma", icon: "IconDatabase" },
    ],
  };

  const journey = [
    {
      year: "2024",
      title: "Junior Frontend Developer",
      company: "Freelancer",
      description: "Started my professional journey as a freelance frontend developer, focusing on creating responsive and interactive web interfaces using React and modern CSS frameworks.",
      color: "purple",
    },
    {
      year: "2025",
      title: "Fullstack Developer",
      company: "Freelancer",
      description: "Building full-stack web applications using modern technologies like Next.js, Node.js, and various databases. Creating end-to-end solutions from design to deployment.",
      color: "blue",
    },
    {
      year: "2026",
      title: "Fullstack AI Prompter",
      company: "Freelancer",
      description: "Building full-stack web applications using modern technologies like ChatGPT, Claude, Cursor and many more AI tools. Creating end-to-end solutions from design to deployment.",
      color: "blue",
    },
  ];

  const certifications = [
    {
      title: "Frontend Web Development",
      issuer: "Dicoding, Powered by DBS Foundation",
      year: "2025",
      description:
        "This bootcamp provided foundational web development training, covering website basics, fundamental and advanced HTML for structure, basic and advanced CSS for styling (including Flexbox for responsive layouts), and culminating in a practical project implementation.",
      link: "https://drive.google.com/file/d/1Ap2Uslvpx4cR5wkk1u7fol32yHy_YkHe/view",
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "Dicoding, Powered by Amazon Web Services",
      year: "2025",
      description:
        "This bootcamp provided comprehensive JavaScript training, covering fundamentals like runtime environments, syntax, functions, data structures, and control flow, before advancing to modules, OOP, functional programming, asynchronous processes, and code quality best practices.",
      link: "https://drive.google.com/file/d/1ZcFJCRfXUP2WdZvpZo3Vy4YhKpuO14yd/view",
    },
    {
      title: "Backend Development with Node.js",
      issuer: "Dicoding, Powered by Amazon Web Services",
      year: "2025",
      description:
        "This back-end bootcamp covers client-server architecture and RESTful APIs, Node.js fundamentals, building and deploying web services using Node.js and AWS EC2, testing with Postman, and culminates in building a final CRUD Bookshelf API project.",
      link: "https://drive.google.com/file/d/11Y9_DqHQQjf7tZ2i9WbpEF9u5kLVufMG/view",
    },
    {
      title: "Python Programming",
      issuer: "Dicoding, Powered by DBS Foundation and Google Developers",
      year: "2025",
      description:
        "This bootcamp covers Python fundamentals including data interaction, expressions, and control flow progresses through data structures like arrays and matrices, teaches code organization via subprograms and optional OOP, and concludes with code quality (style guides, unit testing) and an overview of popular libraries.",
      link: "https://drive.google.com/file/d/1aGL0aWfMJmbALlCP5-KsfoDsoYIjdGKd/view",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/hioov1",
      icon: <IconBrandGithub className="w-5 h-5" />,
      previewImage: "/assets/images/socials/github.png",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/wahyudin-01b559210",
      icon: <IconBrandLinkedin className="w-5 h-5" />,
      previewImage: "/assets/images/socials/linkedin.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/hioov.1",
      icon: <IconBrandInstagram className="w-5 h-5" />,
      previewImage: "/assets/images/socials/instagram.png",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/Whydn06/?locale=id_ID",
      icon: <IconBrandFacebook className="w-5 h-5" />,
      previewImage: "/assets/images/socials/facebook.png",
    },
    {
      name: "Email",
      url: "mailto:hioov1mail@gmail.com",
      icon: <IconMail className="w-5 h-5" />,
      previewImage: "/assets/images/socials/email.png",
    },
  ];

  // (Removed unused getColorClasses helper - colors are defined inline where needed)

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Fixed position container for background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Spotlight className="left-0 top-0 opacity-80 dark:opacity-60" fill="#67E8F9" />
        <Spotlight className="right-0 top-1/2 translate-y-[-50%] rotate-180 opacity-80 dark:opacity-60" fill="#67E8F9" />
      </div>

      <div className="relative z-20 h-full overflow-y-auto no-scrollbar">
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <button onClick={() => router.back()} className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors duration-200 cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to About
              </button>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">About Me</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Dive deeper into my background, skills, and professional journey</p>
            </motion.div>

            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-800/50"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    I’m a freelance Fullstack Developer passionate about building modern digital solutions from crafting intuitive user interfaces to developing robust backend systems. I enjoy turning ideas into efficient, functional, and
                    meaningful technology.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">I continuously adapt to the fast-paced evolution of the tech world, embracing AI to boost productivity and enhance the quality of my work.</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">I’m always ready to collaborate and open to new opportunities, especially projects that challenge my skills and create real impact.</p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect with me</h2>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {socialLinks.map((link, index) => (
                      <LinkPreview key={index} url={link.url} width={300} height={200} isStatic={true} imageSrc={link.previewImage}>
                        <Button
                          as="div"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newWindow = window.open(link.url, "_blank");
                            if (newWindow) newWindow.opener = null;
                          }}
                          className="h-12 w-full !bg-[#0c1322] text-white border-0 hover:!bg-[#151e2c] transition-colors cursor-pointer"
                          containerClassName="w-full h-12"
                          borderClassName="bg-[radial-gradient(#3e4c66_40%,transparent_60%)] opacity-90"
                          duration={4000}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            {link.icon}
                            <span className="text-sm font-medium">{link.name}</span>
                          </div>
                        </Button>
                      </LinkPreview>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-800/50"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Skills and Techstack</h1>
              <h2 className="text-lg font-light text-gray-900 dark:text-white mb-8">Here are my skills and the technologies I&apos;ve worked with:</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                  <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 + categoryIndex * 0.1 }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
                    <div className="grid gap-3">
                      {skillList.map((skill: { name: string; icon: string }, index: number) => (
                        <Button
                          key={index}
                          className="!p-0 h-14 w-full !bg-gray-50 dark:!bg-[#0c1322] hover:!bg-gray-100 dark:hover:!bg-[#151e2c] border-0"
                          containerClassName="w-full h-14"
                          borderClassName="bg-[radial-gradient(#3e4c66_40%,transparent_60%)] opacity-70"
                          duration={4000}
                        >
                          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 * index }} className="flex items-center gap-3 px-4 w-full">
                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">{getIconComponent(skill.icon)}</div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                          </motion.div>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-800/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bootcamp Certifications</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, idx) => (
                  <FlipCard
                    key={idx}
                    frontContent={
                      <div className="bg-gray-50 dark:bg-[#0c1322] rounded-lg p-6 shadow-sm h-full flex flex-col justify-between cursor-pointer transition-transform hover:scale-[1.02]">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            {cert.issuer} • {cert.year}
                          </p>
                        </div>
                        <div className="mt-4 space-y-3">
                          {cert.link && (
                            <Button
                              as="a"
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full h-10 !px-3 !bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:!bg-gray-100 dark:hover:!bg-[#0b1220] text-sm"
                              onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            >
                              View Certificate
                            </Button>
                          )}
                          <p className="text-sm text-blue-500 dark:text-blue-400 text-center italic">Click to see details</p>
                        </div>
                      </div>
                    }
                    backContent={
                      <div className="bg-gray-50 dark:bg-[#0c1322] rounded-lg p-6 shadow-sm h-full flex flex-col justify-between cursor-pointer">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{cert.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            </motion.div>

            {/* Journey Section (now using Timeline) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Journey</h2>
              <Timeline
                data={journey.map((item) => ({
                  title: item.year,
                  content: (
                    <div className="bg-gray-50 dark:bg-[#0c1322] rounded-lg p-6 mb-8">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{item.company}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ),
                }))}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
