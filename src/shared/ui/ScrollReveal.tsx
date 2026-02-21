"use client";

import { motion } from "framer-motion";

const ANIMATION_DURATION_S = 0.6;
const ANIMATION_Y_OFFSET = 32;
const VIEWPORT_AMOUNT = 0.1;

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function ScrollReveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: ANIMATION_Y_OFFSET }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DURATION_S, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: VIEWPORT_AMOUNT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
