"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  dark = true,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 md:py-32 overflow-hidden ${
        dark ? "bg-background" : "bg-surface"
      } ${className}`}
    >
      {children}
    </motion.section>
  );
}
