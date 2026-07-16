import { EventsBanner } from "@/components/sections/events-banner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Events({ params }: any) {
  const { locale } = await params;

  return <EventsBanner locale={locale} compact={false} />;
}
