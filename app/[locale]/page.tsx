import { AboutBanner } from "@/components/sections/home/about-banner";
import { EventsBanner } from "@/components/sections/home/events-banner";
import { HeroBanner } from "@/components/sections/home/hero-banner";
import { PartnersBanner } from "@/components/sections/home/partners-banner";
import { TeamBanner } from "@/components/sections/home/team-banner";
import { RenderCms } from "@/components/ui/render-cms";
import { Navbar } from "@/components/ui/navbar";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

const homePagePopulate = new URLSearchParams([
  ["populate[menuItems]", "true"],
  ["populate[heroBanner][populate][image]", "true"],
  ["populate[heroBanner][populate][kpis][populate]", "*"],
  ["populate[partnersBanner][populate][partners][populate][image]", "true"],
  ["populate[aboutBanner][populate]", "*"],
  ["populate[teamBanner][populate][banner][populate]", "*"],
  ["populate[eventsBanner][populate][banner][populate]", "*"],
]);

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <RenderCms
      locale={locale}
      cmsPath="home-page"
      populate={homePagePopulate}
      render={({ content }) => (
        <>
          <Navbar menuItems={content?.menuItems ?? []} />
          <HeroBanner content={content?.heroBanner ?? {}} />
          <AboutBanner content={content?.aboutBanner ?? {}} />
          <TeamBanner content={content?.teamBanner ?? {}} />
          <EventsBanner content={content?.eventsBanner ?? {}} locale={locale} />
          <PartnersBanner content={content?.partnersBanner ?? {}} />
        </>
      )}
    />
  );
}
