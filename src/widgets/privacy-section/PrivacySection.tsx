"use client";

import { useTranslations } from "next-intl";

export function PrivacySection() {
  const t = useTranslations("privacyPolicy");
  const sections = t.raw("sections") as Array<{
    heading: string;
    content: string;
    items: string[];
  }>;

  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-2 break-keep">
            {t("title")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {/* Section Heading */}
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white break-keep">
                {section.heading}
              </h2>

              {/* Section Content */}
              {section.content && (
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed break-keep">
                  {section.content}
                </p>
              )}

              {/* Items List */}
              {section.items.length > 0 && (
                <ul className="space-y-3 ml-4">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed break-keep list-disc"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed break-keep">
            {t("lastUpdated").includes("2026") &&
            t("lastUpdated").includes("년") ? (
              // 한국어 버전
              <>
                이 개인정보처리방침은 사전 공지 없이 변경될 수 있습니다. 변경사항이 있을 경우 본 페이지를 통해 안내합니다.
              </>
            ) : (
              // 중국어 버전
              <>
                本个人信息处理方针可能会在不提前通知的情况下被修改。如有变更，我们将通过本页面进行通知。
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
