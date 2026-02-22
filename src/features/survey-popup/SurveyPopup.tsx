"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@shared/ui/Button";

interface SurveyPopupProps {
  open: boolean;
  onClose: () => void;
}

export function SurveyPopup({ open, onClose }: SurveyPopupProps) {
  const t = useTranslations("survey");
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const options = [
    { key: "opt1", label: t("opt1") },
    { key: "opt2", label: t("opt2") },
    { key: "opt3", label: t("opt3") },
    { key: "opt4", label: t("opt4") },
  ];

  const handleSubmit = () => {
    if (!selected) return;

    // localStorage에 선택한 옵션 저장
    localStorage.setItem("surveyResponse", selected);

    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 z-50"
            data-testid="survey-popup"
          >
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✨</div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {t("thanks")}
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-4">
                  {t("title")}
                </h3>
                <div className="space-y-2 mb-5">
                  {options.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelected(key)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        selected === key
                          ? "border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                      data-testid={`survey-${key}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={onClose}
                    className="flex-1"
                    data-testid="survey-skip"
                  >
                    {t("skip")}
                  </Button>
                  <Button
                    size="md"
                    onClick={handleSubmit}
                    disabled={!selected}
                    className="flex-1"
                    data-testid="survey-submit"
                  >
                    {t("submit")}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
