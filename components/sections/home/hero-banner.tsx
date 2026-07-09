import { Skeleton } from "@/components/ui/skeleton";
import { getCMSContent, type CmsData } from "@/services/cms";
import { Suspense, use } from "react";

type HeroBannerProps = {
  locale: string;
};

function getHeroContent(locale: string) {
  return getCMSContent({
    locale,
    path: ["hero"],
    populate: "*",
  });
}

function HeroBannerContent({ cmsPromise }: { cmsPromise: Promise<CmsData> }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroContent: any = use(cmsPromise);

  return (
    <section className="flex min-h-96 flex-col items-center justify-center bg-zinc-100 text-center text-black">
      {heroContent.Label}
    </section>
  );
}

export function HeroBanner({ locale }: HeroBannerProps) {
  const cmsPromise = getHeroContent(locale);

  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
      <HeroBannerContent cmsPromise={cmsPromise} />
    </Suspense>
  );
}
