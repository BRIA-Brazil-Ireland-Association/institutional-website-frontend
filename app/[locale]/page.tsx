import { DefaultContainer } from "@/components/layout/default-container";
import { Navbar } from "@/components/layout/navbar";
import { AboutBanner } from "@/components/sections/home/about-banner";
import { EventsBanner } from "@/components/sections/home/events-banner";
import { HeroBanner } from "@/components/sections/home/hero-banner";
import { PartnersBanner } from "@/components/sections/home/partners-banner";
import { TeamBanner } from "@/components/sections/home/team-banner";
import { CmsPage } from "@/components/ui/cms-page";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

const homePagePopulate = new URLSearchParams([
  ["populate[menuItems]", "true"],
  ["populate[heroBanner][populate][image]", "true"],
  ["populate[heroBanner][populate][kpis][populate]", "*"],
]);

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <CmsPage
      locale={locale}
      cmsPath="home-page"
      populate={homePagePopulate}
      render={({ content }) => (
        <DefaultContainer>
          <Navbar menuItems={content?.menuItems ?? []} />
          <HeroBanner content={content?.heroBanner} />
          <AboutBanner />
          <TeamBanner />
          <EventsBanner />
          <PartnersBanner />
        </DefaultContainer>
      )}
    />
  );
}
