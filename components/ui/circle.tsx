"use client";

import { cn } from "@/libs/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

export function Circle({
  size = "120px",
  borderSize = "25px",
  color = "black",
  className = "",
}: {
  size?: string;
  color?: string;
  borderSize?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "z-10 size-(--size) min-h-(--size) max-w-(--size) min-w-(--size)",
        className,
      )}
      style={{ "--size": size } as CSSProperties}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 13, mass: 1 }}
    >
      <motion.div
        className="size-full rounded-full"
        style={{ borderWidth: borderSize, borderColor: color }}
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, -16, 0], x: [0, 8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  );
}
