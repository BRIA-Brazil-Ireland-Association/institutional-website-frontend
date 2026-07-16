import { PartnersBanner } from "@/components/sections/partners-banner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Partners({ params }: any) {
  const { locale } = await params;

  return <PartnersBanner locale={locale} compact={false} />;
}
