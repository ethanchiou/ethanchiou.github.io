import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    //Static export
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
