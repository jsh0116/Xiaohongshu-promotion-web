"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchLocale("ko")}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === "ko"
            ? "text-rose-500 font-semibold"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        }`}
        data-testid="locale-ko"
      >
        {t("koName")}
      </button>
      <span className="text-zinc-300 dark:text-zinc-600">|</span>
      <button
        onClick={() => switchLocale("zh")}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === "zh"
            ? "text-rose-500 font-semibold"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        }`}
        data-testid="locale-zh"
      >
        {t("zhName")}
      </button>
    </div>
  );
}
