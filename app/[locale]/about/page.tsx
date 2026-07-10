import { AboutCards } from "@/components/sections/about/about-cards";
import { AboutContent } from "@/components/sections/about/about-content";
import { AboutGallery } from "@/components/sections/about/about-gallery";
import { AboutHeroBanner } from "@/components/sections/about/about-hero-banner";
import { Navbar } from "@/components/ui/navbar";
import { RenderCms } from "@/components/ui/render-cms";

type AboutProps = {
  params: Promise<{ locale: string }>;
};

const aboutPagePopulate = new URLSearchParams([
  ["populate[menuItems]", "true"],
  ["populate[aboutBanner][populate][image]", "true"],
  ["populate[aboutCards][populate][image]", "true"],
  ["populate[images]", "true"],
  ["populate[mainImage]", "true"],
]);

export default async function About({ params }: AboutProps) {
  const { locale } = await params;

  return (
    <RenderCms
      locale={locale}
      cmsPath="about-page"
      populate={aboutPagePopulate}
      render={({ content }) => (
        <>
          <Navbar menuItems={content?.menuItems ?? []} />
          <AboutHeroBanner content={content?.aboutBanner ?? {}} />
          <AboutCards content={content?.aboutCards ?? []} />
          <AboutContent content={content ?? {}} />
          <AboutGallery content={content?.images ?? []} />
        </>
      )}
    />
  );
}
