"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface TechTileProps {
  name: string;
  children: ReactNode;
}

export function TechTile({ name, children }: TechTileProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="flex flex-col items-center gap-3 rounded-lg border bg-code px-3 py-5 text-center transition-colors hover:border-highlight/60"
    >
      {children}
      <span className="font-medium text-sm">{name}</span>
    </motion.li>
  );
}
