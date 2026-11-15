import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const games = fileURLToPath(new URL('../public/games/', import.meta.url));
const output = path.join(games, 'optimized');
const widths = [128, 320, 640, 960, 1280, 1920, 2560];
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });

for (const game of ['wedge', 'aether', 'fivefold']) {
  for (const suffix of ['hero', '1', '2', '3']) {
    const name = `${game}-${suffix}`;
    const source = path.join(games, `${name}.jpg`);
    for (const width of widths) {
      await sharp(source).resize({ width }).webp({ quality: 82 })
        .toFile(path.join(output, `${name}-${width}.webp`));
    }
    // Social previews stay JPEG for clients that do not support WebP.
    if (suffix === 'hero') {
      for (const width of [640, 960, 1280, 1920]) {
        // A centered square retains the same visible area when object-fit crops
        // it into the 680px-tall phone hero, without downloading a wide panorama.
        await sharp(source).resize({ width, height: width, fit: 'cover', position: 'centre' })
          .webp({ quality: 82 }).toFile(path.join(output, `${name}-phone-${width}.webp`));
      }
      await sharp(source).resize({ width: 1200 }).jpeg({ quality: 80, mozjpeg: true })
        .toFile(path.join(output, `${name}-social.jpg`));
    }
  }
}
console.log('Generated responsive game artwork and social previews.');
