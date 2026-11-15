import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    deviceSizes: [640, 960, 1280, 1920, 2560],
    imageSizes: [128, 320],
  },
};

export default nextConfig;
