"use client";

import { useTheme } from "@shared/ui/ThemeProvider";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("common");

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("lightMode") : t("darkMode")}
      className="rounded-lg p-2 text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      data-testid="theme-toggle"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
