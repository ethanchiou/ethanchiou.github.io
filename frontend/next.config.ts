import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  distDir: '../docs', // Output to docs folder at repo root
  images: {
    //Static export
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
