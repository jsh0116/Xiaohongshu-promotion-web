import { getTranslations } from "next-intl/server";

// Campaign list mockup (inspired by platform UI reference)
function CampaignMockup() {
  const campaigns = [
    { emoji: "🍖", name: "마감임박", tag: "정육식당", days: "2일 남음" },
    { emoji: "☕", name: "4일 남음", tag: "카페", days: "4일 남음" },
    { emoji: "💄", name: "2일 남음", tag: "뷰티", days: "2일 남음" },
    { emoji: "🌿", name: "콘텐츠", tag: "스킨케어", days: "7일 남음" },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mt-4 border border-zinc-200 dark:border-zinc-700">
      <div className="flex gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">
        <span className="text-rose-500 font-semibold">캠페인</span>
        <span>인플루언서</span>
        <span>분석</span>
        <span className="ml-auto bg-rose-500 text-white rounded px-2 py-0.5 text-[10px]">
          캠페인 올리기
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {campaigns.map((c, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-700"
          >
            <div className="text-xl mb-1">{c.emoji}</div>
            <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              {c.name}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
              {c.tag}
            </div>
            <div className="text-[10px] text-rose-500 mt-1 font-medium">
              {c.days}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bilingual chat mockup (inspired by translation chat reference)
function TranslationMockup() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mt-4 border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">
        <span className="text-lg">🇰🇷</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-xs font-bold text-blue-500">AI</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-lg">🇨🇳</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <div className="bg-blue-100 dark:bg-blue-900/50 rounded-2xl rounded-tr-sm px-3 py-1.5 text-[11px] text-blue-800 dark:text-blue-300 max-w-[80%]">
            안녕하세요, 예약하고 싶어요
          </div>
        </div>
        <div className="flex">
          <div className="bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-2xl rounded-tl-sm px-3 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 max-w-[80%]">
            你好，我想预约
          </div>
        </div>
        <div className="flex">
          <div className="bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-2xl rounded-tl-sm px-3 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 max-w-[80%]">
            下周二三点可以预约吗
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-100 dark:bg-blue-900/50 rounded-2xl rounded-tr-sm px-3 py-1.5 text-[11px] text-blue-800 dark:text-blue-300 max-w-[80%]">
            성함 부탁드려요
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics dashboard mockup (inspired by performance dashboard reference)
function AnalyticsMockup() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mt-4 border border-zinc-200 dark:border-zinc-700">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { icon: "📈", label: "총 도달", value: "1만" },
          { icon: "💰", label: "총 금액", value: "10만원" },
          { icon: "👤", label: "유입", value: "+12%" },
          { icon: "⭐", label: "평균 평점", value: "4.5" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 rounded-lg p-2 border border-zinc-100 dark:border-zinc-700 flex items-center gap-2"
          >
            <span className="text-base">{stat.icon}</span>
            <div>
              <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {stat.value}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Influencer profile strip */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-700 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-sm">
          👩
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
            지니
          </div>
          <div className="text-[10px] text-zinc-500">1.2만 팔로워</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-green-600 dark:text-green-400">
            8.5%
          </div>
          <div className="text-[10px] text-zinc-400">성과율</div>
        </div>
      </div>
    </div>
  );
}

export async function FeaturesSection() {
  const t = await getTranslations("features");

  const features = [
    {
      icon: "🎯",
      title: t("feat1Title"),
      text: t("feat1Text"),
      mockup: <CampaignMockup />,
    },
    {
      icon: "💬",
      title: t("feat2Title"),
      text: t("feat2Text"),
      mockup: <TranslationMockup />,
    },
    {
      icon: "📊",
      title: t("feat3Title"),
      text: t("feat3Text"),
      mockup: <AnalyticsMockup />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">
            {t("title")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            {t("subtitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, text, mockup }) => (
            <div
              key={title}
              className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800"
            >
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {icon}
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {text}
              </p>
              {mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
