"use client";

import { cn } from "@/libs/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

export function Circle({
  size = "120px",
  borderSize = "25px",
  color = "black",
  className = "",
  immediate = false,
}: {
  size?: string;
  color?: string;
  borderSize?: string;
  className?: string;
  immediate?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "z-10 size-(--size) min-h-(--size) max-w-(--size) min-w-(--size) rounded-full",
        className,
      )}
      style={
        {
          "--size": size,
          borderWidth: borderSize,
          borderColor: color,
        } as CSSProperties
      }
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.3 }}
      {...(immediate
        ? { animate: { opacity: 1, scale: 1 } }
        : {
            whileInView: { opacity: 1, scale: 1 },
            viewport: { amount: 0.2, once: true },
          })}
      transition={{ type: "spring", stiffness: 120, damping: 13, mass: 1 }}
    />
  );
}
