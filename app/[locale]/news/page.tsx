import { NewsListing } from "@/components/sections/news-listing";
import { getCMSContent, getSingleContent, getText } from "@/services/cms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function News({ params }: any) {
  const { locale } = await params;
  const content = getSingleContent(
    await getCMSContent({ locale, path: ["news-component"] }),
  );
  const eyebrow = getText(content, "title");
  const title = getText(content, "sectionTitle");

  return <NewsListing eyebrow={eyebrow} locale={locale} title={title} />;
}
