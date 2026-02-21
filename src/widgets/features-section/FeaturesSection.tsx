import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@shared/ui/ScrollReveal";

const CARD_STAGGER_DELAY_S = 0.12;

// ─── Mockup data types ────────────────────────────────────────────────────────

type CampaignItem = {
  emoji: string;
  name: string;
  tag: string;
  daysLeft: string;
};

type CampaignMockupData = {
  tabs: [string, string, string];
  uploadLabel: string;
  items: ReadonlyArray<CampaignItem>;
};

type ChatMessage = { side: "sent" | "received"; text: string };

type TranslationMockupData = {
  fromFlag: string;
  toFlag: string;
  messages: ReadonlyArray<ChatMessage>;
};

type StatItem = { icon: string; value: string; label: string };

type AnalyticsMockupData = {
  stats: ReadonlyArray<StatItem>;
  influencer: {
    name: string;
    followers: string;
    rate: string;
    rateLabel: string;
  };
};

// ─── Fixed translation chat data (KR↔CN feature demo, locale-agnostic) ──────

const TRANSLATION_CHAT: TranslationMockupData = {
  fromFlag: "🇰🇷",
  toFlag: "🇨🇳",
  messages: [
    { side: "sent", text: "안녕하세요, 예약하고 싶어요" },
    { side: "received", text: "你好，我想预约" },
    { side: "received", text: "下周二三点可以预约吗" },
    { side: "sent", text: "성함 부탁드려요" },
  ],
};

// ─── Presentational mockup components ────────────────────────────────────────

function CampaignMockup({ data }: { data: CampaignMockupData }) {
  const [tab1, tab2, tab3] = data.tabs;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mt-4 border border-zinc-200 dark:border-zinc-700">
      <div className="flex gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">
        <span className="text-rose-500 font-semibold">{tab1}</span>
        <span>{tab2}</span>
        <span>{tab3}</span>
        <span className="ml-auto bg-rose-500 text-white rounded px-2 py-0.5 text-[10px]">
          {data.uploadLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 rounded-lg p-2.5 border border-zinc-100 dark:border-zinc-700"
          >
            <div className="text-xl mb-1">{item.emoji}</div>
            <div className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              {item.name}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
              {item.tag}
            </div>
            <div className="text-[10px] text-rose-500 mt-1 font-medium">
              {item.daysLeft}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranslationMockup({ data }: { data: TranslationMockupData }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mt-4 border border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">
        <span className="text-lg">{data.fromFlag}</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-xs font-bold text-blue-500">AI</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
        <span className="text-lg">{data.toFlag}</span>
      </div>
      <div className="space-y-2">
        {data.messages.map((msg, i) =>
          msg.side === "sent" ? (
            <div key={i} className="flex justify-end">
              <div className="bg-blue-100 dark:bg-blue-900/50 rounded-2xl rounded-tr-sm px-3 py-1.5 text-[11px] text-blue-800 dark:text-blue-300 max-w-[80%]">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex">
              <div className="bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-2xl rounded-tl-sm px-3 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 max-w-[80%]">
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function AnalyticsMockup({ data }: { data: AnalyticsMockupData }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 mt-4 border border-zinc-200 dark:border-zinc-700">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {data.stats.map((stat, i) => (
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
            {data.influencer.name}
          </div>
          <div className="text-[10px] text-zinc-500">
            {data.influencer.followers}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-green-600 dark:text-green-400">
            {data.influencer.rate}
          </div>
          <div className="text-[10px] text-zinc-400">
            {data.influencer.rateLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export async function FeaturesSection() {
  const t = await getTranslations("features");

  const campaignData: CampaignMockupData = {
    tabs: t.raw("mockupCampaignTabs") as [string, string, string],
    uploadLabel: t("mockupCampaignUpload"),
    items: t.raw("mockupCampaignItems") as CampaignItem[],
  };

  const analyticsData: AnalyticsMockupData = {
    stats: t.raw("mockupAnalyticsStats") as StatItem[],
    influencer: t.raw("mockupAnalyticsInfluencer") as AnalyticsMockupData["influencer"],
  };

  const features = [
    {
      icon: "🎯",
      title: t("feat1Title"),
      text: t("feat1Text"),
      mockup: <CampaignMockup data={campaignData} />,
    },
    {
      icon: "💬",
      title: t("feat2Title"),
      text: t("feat2Text"),
      mockup: <TranslationMockup data={TRANSLATION_CHAT} />,
    },
    {
      icon: "📊",
      title: t("feat3Title"),
      text: t("feat3Text"),
      mockup: <AnalyticsMockup data={analyticsData} />,
    },
  ];

  return (
    <section
      data-testid="features-section"
      className="py-16 sm:py-20 bg-white dark:bg-zinc-950"
    >
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-rose-500 uppercase tracking-widest mb-3">
            {t("title")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            {t("subtitle")}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, text, mockup }, index) => (
            <ScrollReveal
              key={title}
              delay={index * CARD_STAGGER_DELAY_S}
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
