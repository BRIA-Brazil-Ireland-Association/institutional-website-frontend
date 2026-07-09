import { DefaultContainer } from "@/components/layout/default-container";
import { AboutBanner } from "@/components/sections/home/about-banner";
import { EventsBanner } from "@/components/sections/home/events-banner";
import { HeroBanner } from "@/components/sections/home/hero-banner";
import { PartnersBanner } from "@/components/sections/home/partners-banner";
import { TeamBanner } from "@/components/sections/home/team-banner";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <DefaultContainer>
      <HeroBanner locale={locale} />
      <AboutBanner />
      <TeamBanner />
      <EventsBanner />
      <PartnersBanner />
    </DefaultContainer>
  );
}
