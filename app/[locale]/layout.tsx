import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { routing } from "@/i18n/routing";
import { AppProviders } from "@/providers/app-providers";
import {
  getContent,
  getMediaUrl,
  getObject,
  getSingleContent,
  getText,
  type CmsEntry,
} from "@/services/content";
import { SITE_URL } from "@/services/seo";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
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

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

const getGlobalContent = cache((locale: string) =>
  getSingleContent(getContent("global", locale)),
);

const buildMetadataFromGlobal = (global: CmsEntry | null): Metadata => {
  const title = getText(global, "siteName");
  const siteName = title ?? "Brazil-Ireland Association";
  const description = getText(global, "siteDescription");
  const locale = getText(global, "locale")?.replace("-", "_");
  const favicon = getObject(global, "favicon");
  const faviconUrl = getMediaUrl(favicon);
  const logo = getObject(global, "Logo");
  const logoUrl = getMediaUrl(logo);
  const logoAlt = getText(logo, "alternativeText") ?? siteName;
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    verification: {
      google: "V8iToGgipDzU0awmFUomqikHxLpy1HM-77Ys1hs1EHo",
    },
    robots: isPreview
      ? {
          follow: false,
          index: false,
        }
      : {
          follow: true,
          googleBot: {
            follow: true,
            index: true,
          },
          index: true,
        },
    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
    openGraph: {
      title: siteName,
      description,
      images: logoUrl
        ? [
            {
              url: logoUrl,
              ...(logoAlt ? { alt: logoAlt } : {}),
            },
          ]
        : undefined,
      locale,
      siteName,
    },
    twitter: {
      card: "summary",
      title: siteName,
      description,
      images: logoUrl ? [logoUrl] : undefined,
    },
  };
};

const getOrganizationJsonLd = (global: CmsEntry | null) => {
  const name = getText(global, "siteName");
  const description = getText(global, "siteDescription");
  const logoUrl = getMediaUrl(getObject(global, "Logo"));
  const instagramUrl = getText(global, "instagramUrl");
  const linkedinUrl = getText(global, "linkedinUrl");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...(description ? { description } : {}),
    ...(logoUrl ? { logo: new URL(logoUrl, SITE_URL).toString() } : {}),
    ...(name ? { name } : {}),
    sameAs: [instagramUrl, linkedinUrl].filter((url): url is string =>
      Boolean(url),
    ),
    url: SITE_URL,
  };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  setRequestLocale(locale);

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

  setRequestLocale(locale);

  const globalContent = await getGlobalContent(locale);
  const organizationJsonLd = JSON.stringify(
    getOrganizationJsonLd(globalContent),
  ).replace(/</g, "\\u003c");

  return (
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
          type="application/ld+json"
        />
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
