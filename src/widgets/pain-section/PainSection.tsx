import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@shared/ui/ScrollReveal";

const CARD_STAGGER_DELAY_S = 0.12;

export async function PainSection() {
  const t = await getTranslations("pain");

  return (
    <section
      data-testid="pain-section"
      className="py-16 sm:py-20 bg-zinc-50 dark:bg-zinc-900/50"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Business card */}
          <ScrollReveal className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-xl">
                🏢
              </div>
              <h2 className="font-bold text-lg text-zinc-900 dark:text-white">
                {t("bizTitle")}
              </h2>
            </div>

            {/* Pain point */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                {t("beforeLabel")}
              </span>
              <div className="mt-2 p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  😤 {t("bizText")}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                {t("afterLabel")}
              </span>
              <div className="mt-2 p-4 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-xl">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  ✅ {t("bizSol")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Influencer card */}
          <ScrollReveal
            delay={CARD_STAGGER_DELAY_S}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center text-xl">
                ✨
              </div>
              <h2 className="font-bold text-lg text-zinc-900 dark:text-white">
                {t("infTitle")}
              </h2>
            </div>

            {/* Pain point */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                {t("beforeLabel")}
              </span>
              <div className="mt-2 p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  😓 {t("infText")}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                {t("afterLabel")}
              </span>
              <div className="mt-2 p-4 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-xl">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  ✅ {t("infSol")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
