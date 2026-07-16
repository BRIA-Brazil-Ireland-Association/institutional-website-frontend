import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { routing } from "@/i18n/routing";
import { AppProviders } from "@/providers/app-providers";
import {
  getCMSContent,
  getMediaUrl,
  getObject,
  getSingleContent,
  getStrapiCmsOrigin,
  getText,
  type CmsEntry,
} from "@/services/cms";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { cache } from "react";
import "../globals.css";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

const globalPopulate = new URLSearchParams([
  ["populate[Logo]", "true"],
  ["populate[favicon]", "true"],
  ["populate[logoWhite]", "true"],
  ["populate[defaultSeo]", "true"],
  ["populate[menus]", "true"],
  ["populate[localizations]", "true"],
  ["populate[footer][populate][navigationLinks]", "true"],
  ["populate[footer][populate][informationLinks]", "true"],
  ["populate[footer][populate][communityLinks]", "true"],
]);

const getGlobalContent = cache(async (locale: string) =>
  getSingleContent(
    await getCMSContent({
      locale,
      path: ["global"],
      populate: globalPopulate,
      revalidate: 300,
    }),
  ),
);

function buildMetadataFromGlobal(global: CmsEntry | null): Metadata {
  const title = getText(global, "siteName");
  const description = getText(global, "siteDescription");
  const locale = getText(global, "locale")?.replace("-", "_");
  const favicon = getObject(global, "favicon");
  const faviconUrl = getMediaUrl(favicon);
  const faviconAlt = getText(favicon, "alternativeText") ?? title;

  return {
    title,
    description,
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
    openGraph: {
      title,
      description,
      images: faviconUrl
        ? [
            {
              url: faviconUrl,
              ...(faviconAlt ? { alt: faviconAlt } : {}),
            },
          ]
        : undefined,
      locale,
      siteName: title,
    },
    twitter: {
      card: faviconUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: faviconUrl ? [faviconUrl] : undefined,
    },
  };
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  return buildMetadataFromGlobal(await getGlobalContent(locale));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const globalContent = await getGlobalContent(locale);

  return (
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <link rel="preconnect" href={getStrapiCmsOrigin()} />
        <NextIntlClientProvider>
          <AppProviders globalContent={globalContent}>
            <Navbar />
            {children}
            <Footer />
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
