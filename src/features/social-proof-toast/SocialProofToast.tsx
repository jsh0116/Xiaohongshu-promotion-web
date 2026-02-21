"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TOAST_MS } from "@shared/constants";

export function SocialProofToast() {
  const t = useTranslations("toast");
  const toasts = [t("t1"), t("t2"), t("t3")];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial show after 5 seconds
    const initial = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(initial);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % toasts.length);
        setVisible(true);
      }, 500);
    }, TOAST_MS);

    return () => clearInterval(cycle);
  }, [visible, toasts.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-4 z-30 flex items-center gap-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 shadow-lg max-w-xs"
          data-testid="social-proof-toast"
        >
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center text-sm flex-shrink-0">
            🎯
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-tight">
            {toasts[index]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
