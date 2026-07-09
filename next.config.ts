import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const strapiCmsUrl = process.env.STRAPI_CMS_URL?.trim();
const strapiUrl = strapiCmsUrl ? new URL(strapiCmsUrl) : undefined;
const strapiUploadsPattern = strapiUrl
  ? new URL("/uploads/**", strapiUrl.origin)
  : undefined;
const isLocalStrapi =
  strapiUrl?.hostname === "localhost" ||
  strapiUrl?.hostname === "127.0.0.1" ||
  strapiUrl?.hostname === "0.0.0.0";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isLocalStrapi,
    remotePatterns: strapiUploadsPattern ? [strapiUploadsPattern] : [],
  },
  env: {
    NEXT_PUBLIC_STRAPI_CMS_URL: strapiCmsUrl,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
