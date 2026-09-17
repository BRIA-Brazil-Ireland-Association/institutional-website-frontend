import { AboutBanner } from "@/components/sections/about-banner";
import { ContactBanner } from "@/components/sections/contact-banner";
import { EventsBanner } from "@/components/sections/events-banner";
import GalleryBanner from "@/components/sections/gallery-banner";
import { HeroBanner } from "@/components/sections/hero-banner";
import { NewsBanner } from "@/components/sections/news-banner";
import { PartnersBanner } from "@/components/sections/partners-banner";
import { TeamBanner } from "@/components/sections/team-banner";
import {
  getContent,
  getObject,
  getSingleContent,
  getText,
} from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("hero", locale));
  const image = getObject(content, "image");

  return getPageMetadata({
    description: getDescription(getText(content, "subtitle")),
    image: getText(image, "url"),
    locale,
    title: "Brazil-Ireland Association",
  });
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <>
      <HeroBanner locale={locale} />
      <AboutBanner locale={locale} compact={true} />
      <TeamBanner locale={locale} compact={true} />
      <EventsBanner locale={locale} compact={true} />
      <GalleryBanner locale={locale} compact={false} />
      <PartnersBanner locale={locale} compact={true} />
      <ContactBanner locale={locale} compact={true} />
      <NewsBanner locale={locale} />
    </>
  );
}
