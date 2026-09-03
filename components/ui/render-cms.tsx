import { getContent } from "@/services/content";
import { ReactNode } from "react";

type PageProps = {
  locale: string;
  cmsPath: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({ content }: { content: any }) => ReactNode;
};

export function RenderCms({ locale, cmsPath, render }: PageProps) {
  const content = getContent(cmsPath, locale);

  return render({ content });
}
