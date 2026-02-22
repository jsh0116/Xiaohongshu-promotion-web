import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();

  return (
    <footer className="bg-zinc-950 dark:bg-black text-zinc-400 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">小</span>
            </div>
            <span className="text-white font-semibold text-sm">
              {tCommon("siteName")}
            </span>
          </div>

          <p className="text-xs text-center sm:text-left">
            {t("description")}
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`/${locale}/privacy`}
              className="hover:text-white transition-colors"
            >
              {t("privacy")}
            </a>
          </div>
        </div>

        <div className="h-px bg-zinc-800 my-6" />

        <p className="text-center text-xs">{t("rights")}</p>
      </div>
    </footer>
  );
}
