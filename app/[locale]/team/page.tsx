import { TeamBanner } from "@/components/sections/team-banner";
import {
  getContent,
  getObject,
  getSingleContent,
  getText,
} from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type TeamProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: TeamProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("team-page", locale));
  const image = getObject(content, "image");

  return getPageMetadata({
    description: getDescription(getText(content, "description")),
    image: getText(image, "url"),
    locale,
    path: "/team",
    title: getText(content, "sectionTitle"),
  });
}

export default async function Team({ params }: TeamProps) {
  const { locale } = await params;

  return <TeamBanner locale={locale} compact={false} />;
}
