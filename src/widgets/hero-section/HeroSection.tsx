"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@features/counter/AnimatedCounter";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-rose-950/20 py-20 sm:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-200/30 dark:bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-6 break-keep"
        >
          {t("mainLine1")}
          <br />
          {t("mainLine2")}
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed break-keep"
        >
          {t("subLine1")}
          <br className="hidden sm:block" /> {t("subLine2")}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Link
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg shadow-rose-500/30 transition-all hover:shadow-rose-500/40 hover:-translate-y-0.5"
          >
            {t("cta")}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Social counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {["🧑‍💼", "👩‍💻", "🧑‍🎨"].map((emoji, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
          <span className="text-sm">
            <span className="font-bold text-zinc-900 dark:text-white">
              <AnimatedCounter />
            </span>{" "}
            {t("counterLabel")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
