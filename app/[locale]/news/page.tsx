import { NewsListing } from "@/components/sections/news-listing";
import { getContent, getSingleContent, getText } from "@/services/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function News({ params }: any) {
  const { locale } = await params;
  const content = getSingleContent(getContent("news-component", locale));
  const eyebrow = getText(content, "title");
  const title = getText(content, "sectionTitle");

  return <NewsListing eyebrow={eyebrow} locale={locale} title={title} />;
}
