import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: [
    "@sammelfieber/api",
    "@sammelfieber/db",
    "@sammelfieber/ui",
    "@sammelfieber/validators",
    "@sammelfieber/types",
    "@sammelfieber/i18n",
    "@sammelfieber/ai",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
