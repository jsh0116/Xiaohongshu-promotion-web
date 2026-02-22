import { getTranslations, getLocale } from "next-intl/server";
import { PrivacySection } from "@widgets/privacy-section/PrivacySection";
import { SITE_URL } from "@shared/constants";

export async function generateMetadata() {
  const t = await getTranslations("privacyPolicy");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();

  const title = t("title");
  const description = t("metaDescription");

  return {
    title,
    description,
    canonical: `${SITE_URL}/${locale}/privacy`,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/privacy`,
      locale: tCommon("ogLocale"),
      type: "website",
    },
  };
}

export default function PrivacyPage() {
  return <PrivacySection />;
}
