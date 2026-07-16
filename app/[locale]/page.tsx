import { AboutBanner } from "@/components/sections/about-banner";
import { EventsBanner } from "@/components/sections/events-banner";
import { HeroBanner } from "@/components/sections/hero-banner";
import { PartnersBanner } from "@/components/sections/partners-banner";
import { TeamBanner } from "@/components/sections/team-banner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home({ params }: any) {
  const { locale } = await params;

  return (
    <>
      <HeroBanner locale={locale} />
      <AboutBanner locale={locale} compact={true} />
      <TeamBanner locale={locale} compact={true} />
      <EventsBanner locale={locale} compact={true} />
      <PartnersBanner locale={locale} compact={true} />
    </>
  );
}
