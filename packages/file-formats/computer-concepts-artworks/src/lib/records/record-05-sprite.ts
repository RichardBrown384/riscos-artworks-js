import { BinaryReader } from '@rbrown/io';
import { RecordBodySprite, SpritePalette } from '../types/index.js';

function readSpritePalette(reader: BinaryReader): SpritePalette {
  const palette = [];
  const count = reader.u32();
  for (let n = 0; n < count; n += 1) {
    palette.push(reader.u32());
  }
  return palette;
}

export function readRecordBodySprite(reader: BinaryReader): RecordBodySprite {
  return {
    unknown24: reader.u32(),
    name: reader.paddedCString(12),
    unknown40: reader.u32(),
    unknown44: reader.u32(),
    unknown48: reader.i32(),
    unknown52: reader.i32(),
    unknown56: reader.i32(),
    unknown60: reader.i32(),
    unknown64: reader.i32(),
    unknown68: reader.i32(),
    unknown72: reader.u32(),
    unknown76: reader.u32(),
    unknown80: reader.u32(),
    unknown84: reader.u32(),
    unknown88: reader.u32(),
    unknown92: reader.u32(),
    unknown96: reader.u32(),
    unknown100: reader.u32(),
    palette: readSpritePalette(reader),
  };
}
