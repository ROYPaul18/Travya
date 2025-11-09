import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "wvbcahjgcu.ufs.sh",
      },
    ],
  },
};

export default withIntlayer(nextConfig);
