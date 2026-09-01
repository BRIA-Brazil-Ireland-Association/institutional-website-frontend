import { NewsListing } from "@/components/sections/news-listing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function News({ params }: any) {
  const { locale } = await params;

  return <NewsListing locale={locale} />;
}
