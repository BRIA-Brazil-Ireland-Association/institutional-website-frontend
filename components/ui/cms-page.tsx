import { CmsData, CmsPopulate, getCMSContent } from "@/services/cms";
import { ReactNode, Suspense, use } from "react";
import { Loading } from "./loading";

type PageProps = {
  locale: string;
  cmsPath: string;
  fallback?: ReactNode;
  populate?: CmsPopulate;
  revalidate?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({ content }: { content: any }) => ReactNode;
};

const getPageContent = (
  locale: string,
  path: string,
  populate: CmsPopulate,
  revalidate: number,
) => {
  return getCMSContent({
    locale,
    path: [path],
    populate,
    revalidate,
  });
};

export async function CmsPage({
  locale,
  cmsPath,
  fallback = <Loading />,
  populate = "*",
  revalidate = 60,
  render,
}: PageProps) {
  const cmsPromise = getPageContent(locale, cmsPath, populate, revalidate);

  return (
    <Suspense fallback={fallback}>
      <PageContent cmsPromise={cmsPromise} render={render} />
    </Suspense>
  );
}

const PageContent = ({
  cmsPromise,
  render,
}: {
  cmsPromise: Promise<CmsData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({ content }: { content: any }) => ReactNode;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any = use(cmsPromise);

  return render({ content });
};
