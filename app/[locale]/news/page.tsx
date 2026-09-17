import { NewsListing } from "@/components/sections/news-listing";
import { getContent, getSingleContent, getText } from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type NewsProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("news-component", locale));

  return getPageMetadata({
    description: getDescription(getText(content, "description")),
    locale,
    path: "/news",
    title: getText(content, "title"),
  });
}

export default async function News({ params }: NewsProps) {
  const { locale } = await params;
  const content = getSingleContent(getContent("news-component", locale));
  const eyebrow = getText(content, "title");
  const title = getText(content, "sectionTitle");

  return <NewsListing eyebrow={eyebrow} isPage locale={locale} title={title} />;
}
