import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
