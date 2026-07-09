import { DefaultContainer } from "@/components/layout/default-container";
import { Navbar } from "@/components/layout/navbar";
import { AboutBanner } from "@/components/sections/home/about-banner";
import { EventsBanner } from "@/components/sections/home/events-banner";
import { HeroBanner } from "@/components/sections/home/hero-banner";
import { PartnersBanner } from "@/components/sections/home/partners-banner";
import { TeamBanner } from "@/components/sections/home/team-banner";
import { Loading } from "@/components/ui/loading";
import { CmsData, getCMSContent } from "@/services/cms";
import { Suspense, use } from "react";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

const getHomePageContent = (locale: string) => {
  return getCMSContent({
    locale,
    path: ["home-page"],
    populate: "*",
  });
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const cmsPromise = getHomePageContent(locale);

  return (
    <Suspense fallback={<Loading />}>
      <HomePageContent cmsPromise={cmsPromise} />
    </Suspense>
  );
}

const HomePageContent = ({ cmsPromise }: { cmsPromise: Promise<CmsData> }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroContent: any = use(cmsPromise);

  return (
    <DefaultContainer>
      <Navbar menuItems={heroContent?.menuItems ?? []} />
      <HeroBanner />
      <AboutBanner />
      <TeamBanner />
      <EventsBanner />
      <PartnersBanner />
    </DefaultContainer>
  );
};
