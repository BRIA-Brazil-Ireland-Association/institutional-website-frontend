"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function SectionReveal({ children, className, id }: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      id={id}
      initial={shouldReduceMotion ? false : "hidden"}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={revealVariants}
      viewport={{ amount: 0.24, once: true }}
      whileInView="visible"
    >
      {children}
    </motion.section>
  );
}
