import { ArticleDetail } from "@/components/sections/article-detail";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function NewsArticle({ params }: any) {
  const { locale, slug } = await params;

  return <ArticleDetail locale={locale} slug={slug} />;
}
