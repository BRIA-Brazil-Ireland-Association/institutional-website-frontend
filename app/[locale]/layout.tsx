import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { routing } from "@/i18n/routing";
import { AppProviders } from "@/providers/app-providers";
import {
  getCMSContent,
  getMediaUrl,
  getObject,
  getSingleContent,
  getText,
  type CmsEntry,
} from "@/services/cms";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";

export const dynamic = "force-dynamic";

const fallbackTitle = "Institutional Website";
const fallbackDescription = "Institutional website boilerplate";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

function buildMetadataFromGlobal(global: CmsEntry | null): Metadata {
  const seo =
    getObject(global, "defaultSeo") ??
    getObject(global, "seo") ??
    getObject(global, "metadata");
  const title =
    getText(seo, "metaTitle", "title") ??
    getText(global, "metaTitle", "title", "siteName") ??
    fallbackTitle;
  const description =
    getText(seo, "metaDescription", "description") ??
    getText(global, "metaDescription", "description", "siteDescription") ??
    fallbackDescription;
  const image =
    getObject(seo, "shareImage") ??
    getObject(seo, "image") ??
    getObject(global, "shareImage") ??
    getObject(global, "image") ??
    getObject(global, "favicon");
  const imageUrl = getMediaUrl(image);
  const imageAlt = getText(image, "alternativeText") ?? title;
  const faviconUrl = getMediaUrl(getObject(global, "favicon"));

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
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: imageAlt,
            },
          ]
        : undefined,
      locale: getText(global, "locale")?.replace("-", "_"),
      siteName: getText(global, "siteName"),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
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

  const globalContent = await getCMSContent({
    locale,
    path: ["global"],
    populate: "*",
  });

  return buildMetadataFromGlobal(getSingleContent(globalContent));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Navbar />
          <AppProviders>{children}</AppProviders>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
