import {
  SpriteBitmapLayout,
  SpriteControlBlock,
  SpriteLayout,
  SpriteFormat,
} from '../sprite-types.js';
import { check } from '@rbrown/check';

function checkLayout({
  bitsPerLine,
  bitsPerPixel,
  firstBitUsed,
  lastBitUsed,
}: {
  bitsPerLine: number;
  bitsPerPixel: number;
  firstBitUsed: number;
  lastBitUsed: number;
}): void {
  // Check the first and last used aren't insane before proceeding
  check(firstBitUsed < 32, 'first bit used not in first word');
  check(lastBitUsed < 32, 'last bit used not in last word');

  // Check that we use all the bits allocated to us
  const remainingBits = bitsPerLine % bitsPerPixel;
  check(remainingBits === 0, 'non integral number of pixels per line');

  // We should use all the bits allocated to us in the first word
  const remainingFirstWordBits = (32 - firstBitUsed) % bitsPerPixel;
  check(
    remainingFirstWordBits === 0,
    'non integral number of pixels in first word',
  );

  // We should use all the bits allocated to us in the last word
  const remainingLastWordBits = (32 - lastBitUsed - 1) % bitsPerPixel;
  check(
    remainingLastWordBits === 0,
    'non integral number of pixels in last word',
  );
}

export function spriteLayoutFromControlBlockAndFormat(
  { wordWidth, lineHeight, firstBitUsed, lastBitUsed }: SpriteControlBlock,
  { imageBitsPerPixel, maskBitsPerPixel }: SpriteFormat,
): SpriteLayout {
  const imageBitsPerLine = 32 * wordWidth + 1 + lastBitUsed - firstBitUsed;
  const pixelWidth = imageBitsPerLine / imageBitsPerPixel;
  const pixelHeight = lineHeight + 1;

  const imageWordsPerLine = wordWidth + 1;
  const imageSizeInBytes = 4 * imageWordsPerLine * pixelHeight;

  const imageLayout: SpriteBitmapLayout = {
    bitsPerPixel: imageBitsPerPixel,
    pixelWidth,
    pixelHeight,
    sizeInBytes: imageSizeInBytes,
    wordsPerLine: imageWordsPerLine,
    firstBitUsed,
  } as const;

  // For old RISC OS sprites this should be exactly the same as the image layout
  // Newer sprites have a 1 bpp mask and first bit used is forced to zero
  const maskBitsPerLine = maskBitsPerPixel * pixelWidth + firstBitUsed;
  const maskWordsPerLine = Math.floor((maskBitsPerLine + 31) / 32);
  const maskSizeInBytes = 4 * maskWordsPerLine * pixelHeight;

  const maskLayout: SpriteBitmapLayout = {
    bitsPerPixel: maskBitsPerPixel,
    pixelWidth,
    pixelHeight,
    sizeInBytes: maskSizeInBytes,
    wordsPerLine: maskWordsPerLine,
    firstBitUsed,
  };

  checkLayout({
    bitsPerLine: imageBitsPerLine,
    bitsPerPixel: imageBitsPerPixel,
    firstBitUsed,
    lastBitUsed,
  });

  check(pixelWidth > 0, 'zero or negative sprite width');
  check(pixelHeight > 0, 'zero or negative sprite height');

  return {
    image: imageLayout,
    mask: maskLayout,
  };
}
