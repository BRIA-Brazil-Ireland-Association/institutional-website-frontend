import { TeamBanner } from "@/components/sections/team-banner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Team({ params }: any) {
  const { locale } = await params;

  return <TeamBanner locale={locale} compact={false} />;
}
