import { CmsData, CmsPopulate, getCMSContent } from "@/services/cms";
import { ReactNode, Suspense, use } from "react";

type PageProps = {
  locale: string;
  cmsPath: string;
  fallback?: ReactNode;
  populate?: CmsPopulate;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({ content }: { content: any }) => ReactNode;
};

const getPageContent = (
  locale: string,
  path: string,
  populate: CmsPopulate,
) => {
  return getCMSContent({
    locale,
    path: [path],
    populate,
  });
};

export async function RenderCms({
  locale,
  cmsPath,
  fallback = <></>,
  populate = "*",
  render,
}: PageProps) {
  const cmsPromise = getPageContent(locale, cmsPath, populate);

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
