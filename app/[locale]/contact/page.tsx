import { ContactBanner } from "@/components/sections/contact-banner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Contact({ params }: any) {
  const { locale } = await params;

  return <ContactBanner locale={locale} compact={false} />;
}
