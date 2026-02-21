import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "@features/theme-toggle/ThemeToggle";
import { LocaleSwitcher } from "@features/locale-switcher/LocaleSwitcher";

export async function Header() {
  const t = await getTranslations("common");
  const tHeader = await getTranslations("header");

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      {/* Early-bird banner */}
      <div className="bg-rose-500 text-white text-center text-xs py-1.5 font-medium tracking-wide">
        {tHeader("earlyBird")}
      </div>

      {/* Main nav */}
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          {/* Xiaohongshu-style logo mark */}
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">小</span>
          </div>
          <span className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">
            {t("siteName")}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
