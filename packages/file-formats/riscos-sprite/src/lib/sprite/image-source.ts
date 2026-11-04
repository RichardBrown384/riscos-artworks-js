import { check } from '@rbrown/check';
import { ImageSource } from '@rbrown/imaging';

import { Sprite } from '../sprite-types.js';
import { createColourCodec } from './colour.js';
import { PixelSampler } from './sampler/index.js';

export function spriteToImageSource(sprite: Sprite): ImageSource {
  const sampler = new PixelSampler(sprite);
  const codec = createColourCodec(sprite);

  const { pixelWidth, pixelHeight } = sprite.layout.image;
  const { xDpi, yDpi } = sprite.format;

  function getPixel(x: number, y: number): number {
    check(x >= 0 && x < pixelWidth, 'pixelWidth exceeded');
    check(y >= 0 && y < pixelHeight, 'pixelHeight  exceeded');
    const index = sampler.getPixel(x, y);
    const mask = sampler.getMask(x, y);

    return codec.decode(index, mask);
  }

  return {
    pixelWidth,
    pixelHeight,
    xDpi,
    yDpi,
    getPixel,
  };
}
