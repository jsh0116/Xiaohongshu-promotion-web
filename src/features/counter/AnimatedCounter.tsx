"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { COUNTER_START } from "@shared/constants";

export function AnimatedCounter() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, COUNTER_START, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.round(value).toLocaleString();
        }
      },
    });
    return () => controls.stop();
  }, []);

  return <span ref={ref}>0</span>;
}
