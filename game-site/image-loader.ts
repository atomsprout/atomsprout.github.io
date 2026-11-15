'use client';

import type { ImageLoaderProps } from 'next/image';

// Generated at build time: GitHub Pages does not run Next's image server.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  return src.replace(/\.jpg$/, `-${width}.webp`).replace('/games/', '/games/optimized/');
}
