import { getTranslations, getLocale } from "next-intl/server";
import { PrivacySection } from "@widgets/privacy-section/PrivacySection";
import { SITE_URL } from "@shared/constants";

export async function generateMetadata() {
  const t = await getTranslations("privacyPolicy");
  const locale = await getLocale();

  const title = t("title");
  const description =
    locale === "ko"
      ? "샤오홍슈 체험단의 개인정보처리방침을 확인하세요."
      : "小红书体验团的个人信息处理方针。";

  return {
    title,
    description,
    canonical: `${SITE_URL}/${locale}/privacy`,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/privacy`,
      locale: locale === "ko" ? "ko_KR" : "zh_CN",
      type: "website",
    },
  };
}

export default function PrivacyPage() {
  return <PrivacySection />;
}
