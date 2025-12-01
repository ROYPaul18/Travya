import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  images: {
    remotePatterns: [
      {
        hostname: "wvbcahjgcu.ufs.sh",
      },
    ],
  },
};

export default withIntlayer(nextConfig);
