import { EventsBanner } from "@/components/sections/events-banner";
import {
  getContent,
  getObject,
  getSingleContent,
  getText,
} from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type EventsProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: EventsProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("events-component", locale));
  const image = getObject(content, "image");

  return getPageMetadata({
    description: getDescription(getText(content, "description")),
    image: getText(image, "url"),
    locale,
    path: "/events",
    title: getText(content, "sectionTitle"),
  });
}

export default async function Events({ params }: EventsProps) {
  const { locale } = await params;

  return <EventsBanner locale={locale} compact={false} />;
}
