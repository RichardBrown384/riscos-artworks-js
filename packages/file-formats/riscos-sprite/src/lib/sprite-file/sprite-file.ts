import { BinaryReader } from '@rbrown/io';

import { readSpriteArray } from '../sprite-array/index.js';
import { SpriteFile, SpriteFileControlBlock } from '../sprite-types.js';

function readSpriteFileControlBlock(
  reader: BinaryReader,
): SpriteFileControlBlock {
  return {
    spriteCount: reader.u32(),
    spriteOffset: reader.u32(),
    freeOffset: reader.u32(),
  };
}

/*
 * Sprite files don't have a sensible header
 * We try to deserialize the sprite area and if we can do that
 * then there's a good chance it contains sprite data
 */
export function spriteFileFromArrayBuffer(
  buffer: ArrayBuffer,
): SpriteFile | undefined {
  try {
    const reader = new BinaryReader(buffer);
    const controlBlock = readSpriteFileControlBlock(reader);
    const sprites = readSpriteArray(reader, controlBlock);
    return {
      controlBlock,
      sprites,
    };
  } catch {
    return undefined;
  }
}
