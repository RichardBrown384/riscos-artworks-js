import { Sprite } from '../../sprite-types.js';
import { BitmapSampler } from './bitmap-sampler.js';

export class PixelSampler {
  private readonly imageSampler: BitmapSampler;
  private readonly maskSampler: BitmapSampler | undefined;

  constructor(sprite: Sprite) {
    const {
      layout: { image: imageLayout, mask: maskLayout },
      image,
      mask,
    } = sprite;
    this.imageSampler = new BitmapSampler(imageLayout, image);
    this.maskSampler = mask ? new BitmapSampler(maskLayout, mask) : undefined;
  }

  getPixel(x: number, y: number): number {
    return this.imageSampler.getPixel(x, y);
  }

  getMask(x: number, y: number): 0 | 1 {
    return this.maskSampler?.getPixel(x, y) === 0 ? 0 : 1;
  }
}
