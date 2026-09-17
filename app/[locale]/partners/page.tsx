import { PartnersBanner } from "@/components/sections/partners-banner";
import { getContent, getSingleContent, getText } from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type PartnersProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PartnersProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("partner", locale));

  return getPageMetadata({
    description: getDescription(getText(content, "description")),
    locale,
    path: "/partners",
    title: getText(content, "label"),
  });
}

export default async function Partners({ params }: PartnersProps) {
  const { locale } = await params;

  return <PartnersBanner locale={locale} compact={false} />;
}
