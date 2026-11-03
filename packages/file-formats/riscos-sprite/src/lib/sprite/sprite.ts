import { BinaryReader } from '@rbrown/io';
import { check } from '@rbrown/check';
import type {
  Sprite,
  SpriteControlBlock,
  SpritePaletteEntry,
} from '../sprite-types.js';
import { spriteLayoutFromControlBlockAndFormat } from './layout.js';
import { spriteFormatFromControlBlock } from './format.js';

function readSpritePaletteArea(
  reader: BinaryReader,
  paletteAreaSize: number,
): SpritePaletteEntry[] {
  reader.aligned(4, 'misaligned sprite palette');

  check(
    paletteAreaSize % 8 === 0,
    'palette area size not divisible by 8 ' + paletteAreaSize.toString(),
  );

  const count = paletteAreaSize / 8;

  const palette: SpritePaletteEntry[] = [];
  for (let n = 0; n < count; n += 1) {
    palette.push({
      first: reader.u32(),
      second: reader.u32(),
    });
  }

  return palette;
}

export function spriteFromArrayBuffer(reader: BinaryReader): Sprite {
  reader.aligned(4, 'misaligned sprite');

  // 1. Control block
  const controlBlockStart = reader.tell();

  const controlBlock: SpriteControlBlock = {
    spriteOffset: reader.u32(),
    spriteName: reader.string(12),
    wordWidth: reader.u32(),
    lineHeight: reader.u32(),
    firstBitUsed: reader.u32(),
    lastBitUsed: reader.u32(),
    imageOffset: reader.u32(),
    maskOffset: reader.u32(),
    mode: reader.u32(),
  };

  const imageStart = controlBlockStart + controlBlock.imageOffset;

  const paletteSize = imageStart - reader.tell();
  if (paletteSize !== 0) {
    controlBlock.palette = readSpritePaletteArea(reader, paletteSize);
  }

  // 2. Sprite format and layout
  const format = spriteFormatFromControlBlock(controlBlock);
  const layout = spriteLayoutFromControlBlockAndFormat(controlBlock, format);

  // 3. Sprite
  reader.seek(imageStart);
  const sprite: Sprite = {
    controlBlock,
    format,
    layout,
    image: reader.u8a(layout.image.sizeInBytes),
  };

  // 4. Mask
  const maskStart = controlBlockStart + controlBlock.maskOffset;
  if (maskStart !== imageStart) {
    reader.seek(maskStart);
    sprite.mask = reader.u8a(layout.mask.sizeInBytes);
  }

  return sprite;
}
