import { Sprite, SpritePaletteFormat } from '../sprite-types.js';
import { packRGBA32 } from '@rbrown/imaging';

function expand5to8(v: number): number {
  return (v << 3) | ((v >>> 2) & 0xff);
}

export interface ColourCodec {
  decode(value: number, mask: 0 | 1): number;
}

function createPaletteCodec(format: SpritePaletteFormat): ColourCodec {
  const palette = format.palette;
  const bitMask = (1 << format.imageBitsPerPixel) - 1;

  return {
    decode(value: number, mask: 0 | 1): number {
      const raw = palette[value & bitMask].first;
      const r = (raw >>> 8) & 0xff;
      const g = (raw >>> 16) & 0xff;
      const b = (raw >>> 24) & 0xff;
      const a = mask === 0 ? 0 : 0xff;
      return packRGBA32(r, g, b, a);
    },
  };
}

function createBgr555Codec(): ColourCodec {
  return {
    decode(value: number, mask: 0 | 1): number {
      const r = expand5to8((value >>> 0) & 0x1f);
      const g = expand5to8((value >>> 5) & 0x1f);
      const b = expand5to8((value >>> 10) & 0x1f);
      const a = mask === 0 ? 0 : 0xff;
      return packRGBA32(r, g, b, a);
    },
  };
}

function createBgr888Codec(): ColourCodec {
  return {
    decode(value: number, mask: 0 | 1): number {
      const r = (value >>> 0) & 0xff;
      const g = (value >>> 8) & 0xff;
      const b = (value >>> 16) & 0xff;
      const a = mask === 0 ? 0 : 0xff;
      return packRGBA32(r, g, b, a);
    },
  };
}

export function createColourCodec(sprite: Sprite): ColourCodec {
  switch (sprite.format.colourModel) {
    case 'palette':
      return createPaletteCodec(sprite.format);
    case 'bgr555':
      return createBgr555Codec();
    case 'bgr888':
      return createBgr888Codec();
  }
}
