import { check } from '@rbrown/check';

import { SpriteBitmapLayout } from '../../sprite-types.js';

export class BitmapSampler {
  private readonly layout: SpriteBitmapLayout;
  private readonly bitmapView: DataView;
  private readonly bitMask: number;

  constructor(layout: SpriteBitmapLayout, bitmap: Uint8Array<ArrayBuffer>) {
    this.layout = layout;
    this.bitmapView = new DataView(
      bitmap.buffer,
      bitmap.byteOffset,
      bitmap.length,
    );
    this.bitMask =
      layout.bitsPerPixel === 32
        ? 0xffff_ffff >>> 0
        : (1 << layout.bitsPerPixel) - 1;
  }

  getPixel(x: number, y: number): number {
    const {
      bitsPerPixel,
      firstBitUsed,
      pixelWidth,
      pixelHeight,
      wordsPerLine,
    } = this.layout;

    check(x >= 0 && x < pixelWidth, 'x outside sprite bounds');
    check(y >= 0 && y < pixelHeight, 'y outside sprite bounds');

    const bitIndex = y * (32 * wordsPerLine) + x * bitsPerPixel + firstBitUsed;

    const wordIndex = bitIndex >>> 5;
    const bitOffset = bitIndex & 31;

    const word = this.bitmapView.getUint32(wordIndex << 2, true);

    return (word >>> bitOffset) & this.bitMask;
  }
}
