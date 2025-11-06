"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

interface FullPageScrollProps {
  initialSection?: string;
  children: ReactNode;
}

export default function FullPageScroll({ initialSection = "home", children }: FullPageScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Find the section element and scroll to it
    const section = document.getElementById(initialSection);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialSection]);

  return <main className="min-h-screen overflow-y-auto snap-y snap-mandatory">{children}</main>;
}
