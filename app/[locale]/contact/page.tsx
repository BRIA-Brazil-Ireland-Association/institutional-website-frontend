import { ContactBanner } from "@/components/sections/contact-banner";
import { getContent, getSingleContent, getText } from "@/services/content";
import { getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";

type ContactProps = {
  params: Promise<{ locale: string }>;
};

const getContactDescription = (
  content: ReturnType<typeof getSingleContent>,
) => {
  const description = getText(content, "description");

  if (description) {
    return description;
  }

  const engagementOptions = Array.isArray(content?.engagementOptions)
    ? content.engagementOptions
    : [];
  const engagementTitles = engagementOptions
    .map((option) => getText(option, "title"))
    .filter((title): title is string => Boolean(title));

  return engagementTitles.length > 0 ? engagementTitles.join(" · ") : undefined;
};

export async function generateMetadata({
  params,
}: ContactProps): Promise<Metadata> {
  const { locale } = await params;
  const content = getSingleContent(getContent("contact-page", locale));

  return getPageMetadata({
    description: getContactDescription(content),
    locale,
    path: "/contact",
    title: getText(content, "sectionTitle", "title") ?? "Contact BRIA",
  });
}

export default async function Contact({ params }: ContactProps) {
  const { locale } = await params;

  return <ContactBanner locale={locale} compact={false} />;
}
