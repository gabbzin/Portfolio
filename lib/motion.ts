import type { Transition, Variants } from "framer-motion";

export const easing = [0.22, 1, 0.36, 1] as const;

export const transition: Transition = { duration: 0.5, ease: easing };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
