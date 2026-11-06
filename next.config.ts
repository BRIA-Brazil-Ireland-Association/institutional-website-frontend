import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    qualities: [65, 75],
  },
  async rewrites() {
    return [
      {
        source: "/en/report-2026",
        destination: "/report-2026/en/index.html",
      },
      {
        source: "/pt-BR/relatorio-2026",
        destination: "/report-2026/pt/index.html",
      },
      {
        source: "/en/report-2026/event",
        destination: "/report-2026/event/en/index.html",
      },
      {
        source: "/pt-BR/relatorio-2026/evento",
        destination: "/report-2026/event/pt/index.html",
      },
      {
        source: "/en/report-2026/event-interest",
        destination: "/report-2026/event-interest/en/index.html",
      },
      {
        source: "/pt-BR/relatorio-2026/evento-interesse",
        destination: "/report-2026/event-interest/pt/index.html",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
