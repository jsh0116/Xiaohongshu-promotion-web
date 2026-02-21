import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@widgets/hero-section/HeroSection";
import { PainSection } from "@widgets/pain-section/PainSection";
import { FeaturesSection } from "@widgets/features-section/FeaturesSection";
import { LeadFormSection } from "@widgets/lead-form-section/LeadFormSection";
import { SocialProofToast } from "@features/social-proof-toast/SocialProofToast";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <PainSection />
      <FeaturesSection />
      <LeadFormSection />
      <SocialProofToast />
    </main>
  );
}
