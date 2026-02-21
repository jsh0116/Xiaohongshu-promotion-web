"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LeadForm } from "@features/lead-capture/LeadForm";
import { SurveyPopup } from "@features/survey-popup/SurveyPopup";
import { ScrollReveal } from "@shared/ui/ScrollReveal";

const FORM_CARD_DELAY_S = 0.12;

export function LeadFormSection() {
  const t = useTranslations("form");
  const [showSurvey, setShowSurvey] = useState(false);

  const handleSuccess = () => {
    setTimeout(() => setShowSurvey(true), 300);
  };

  return (
    <>
      <section
        id="lead-form"
        data-testid="lead-form-section"
        className="py-16 sm:py-20 bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-rose-950/20"
      >
        <div className="max-w-lg mx-auto px-4">
          {/* Reward badges */}
          <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-sm shadow-sm">
              <span>🏆</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                프리미엄 모집권
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-sm shadow-sm">
              <span>🏅</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                우수 리뷰어 뱃지
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={FORM_CARD_DELAY_S}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-100/50 dark:shadow-none"
          >
            <h2 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-white mb-2 text-center break-keep">
              {t("title")}
            </h2>
            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-6" />
            <LeadForm onSuccess={handleSuccess} />
          </ScrollReveal>
        </div>
      </section>

      <SurveyPopup open={showSurvey} onClose={() => setShowSurvey(false)} />
    </>
  );
}
