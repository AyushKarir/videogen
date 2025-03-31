import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "modelslab-bom.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pub-3626123a908346a7a8be8d9295f44e26.r2.dev",
      },
      {
        protocol: "https",
        hostname: "cdn2.stablediffusionapi.com",
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
