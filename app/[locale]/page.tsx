import { AboutBanner } from "@/components/sections/about-banner";
import { EventsBanner } from "@/components/sections/events-banner";
import GalleryBanner from "@/components/sections/gallery-banner";
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
      <GalleryBanner locale={locale} compact={false} />
      <PartnersBanner locale={locale} compact={true} />
    </>
  );
}
