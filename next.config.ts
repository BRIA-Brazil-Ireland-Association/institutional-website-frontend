import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const strapiCmsUrl = process.env.STRAPI_CMS_URL?.trim();
const storageUrl = process.env.STORAGE_PUBLIC_PATH
  ? new URL(process.env.STORAGE_PUBLIC_PATH.trim())
  : undefined;

const isLocalStrapi =
  storageUrl?.hostname === "localhost" ||
  storageUrl?.hostname === "127.0.0.1" ||
  storageUrl?.hostname === "0.0.0.0";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isLocalStrapi,
    qualities: [65, 75],
    remotePatterns: storageUrl?.origin
      ? [new URL(`${storageUrl.origin}/**`)]
      : [],
  },
  env: {
    NEXT_PUBLIC_STRAPI_CMS_URL: strapiCmsUrl,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
