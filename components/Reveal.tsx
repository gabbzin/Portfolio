"use client";

import { motion, useReducedMotion } from "framer-motion";
import type * as React from "react";
import { fadeUp } from "@/lib/motion";

interface RevealProps extends React.ComponentProps<"div"> {
  delay?: number;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
