import { AboutBanner } from "@/components/sections/about-banner";
import {
  getContent,
  getObject,
  getSingleContent,
  getText,
} from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type AboutProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("about-page", locale));
  const image = getObject(content, "image");

  return getPageMetadata({
    description: getDescription(getText(content, "description")),
    image: getText(image, "url"),
    locale,
    path: "/about",
    title: getText(content, "sectionTitle"),
  });
}

export default async function About({ params }: AboutProps) {
  const { locale } = await params;

  return <AboutBanner locale={locale} compact={false} />;
}
