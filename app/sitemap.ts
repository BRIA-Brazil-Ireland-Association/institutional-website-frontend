import { getArticles } from "@/services/api/articles";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/services/seo";
import type { MetadataRoute } from "next";

const staticPaths = [
  "",
  "/about",
  "/contact",
  "/events",
  "/news",
  "/partners",
  "/team",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
    })),
  );
  const articlePages = routing.locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      ...(article.date ? { lastModified: new Date(article.date) } : {}),
      url: `${SITE_URL}/${locale}/news/${article.slug}`,
    })),
  );

  return [...staticPages, ...articlePages];
}
