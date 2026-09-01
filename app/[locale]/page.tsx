import { AboutBanner } from "@/components/sections/about-banner";
import { ContactBanner } from "@/components/sections/contact-banner";
import { EventsBanner } from "@/components/sections/events-banner";
import GalleryBanner from "@/components/sections/gallery-banner";
import { HeroBanner } from "@/components/sections/hero-banner";
import { NewsBanner } from "@/components/sections/news-banner";
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
      <NewsBanner locale={locale} />
      <GalleryBanner locale={locale} compact={false} />
      <PartnersBanner locale={locale} compact={true} />
      <ContactBanner locale={locale} compact={true} />
    </>
  );
}
