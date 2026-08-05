import { AboutBanner } from "@/components/sections/about-banner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function About({ params }: any) {
  const { locale } = await params;

  return <AboutBanner locale={locale} compact={false} />;
}
