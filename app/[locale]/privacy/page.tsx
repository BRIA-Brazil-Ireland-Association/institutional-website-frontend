import { PrivacyPolicy } from "@/components/sections/privacy-policy";
import { getContent, getSingleContent, getText } from "@/services/content";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type PrivacyProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("privacy-page", locale));

  return getPageMetadata({
    description: getDescription(getText(content, "description")),
    locale,
    path: "/privacy",
    title: getText(content, "sectionTitle") ?? "Privacy Policy",
  });
}

export default async function Privacy({ params }: PrivacyProps) {
  const { locale } = await params;

  return <PrivacyPolicy locale={locale} />;
}
