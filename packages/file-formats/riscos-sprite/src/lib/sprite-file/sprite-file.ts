import { BinaryReader } from '@rbrown/io';

import { Sprite, SpriteFile, SpriteFileControlBlock } from '../sprite-types.js';
import { spriteFromArrayBuffer } from '../sprite/index.js';

function readSpriteFileControlBlock(
  reader: BinaryReader,
): SpriteFileControlBlock {
  return {
    spriteCount: reader.u32(),
    spriteOffset: reader.u32(),
    freeOffset: reader.u32(),
  };
}

export function spriteFileFromArrayBuffer(buffer: ArrayBuffer): SpriteFile {
  const reader = new BinaryReader(buffer);

  const controlBlock = readSpriteFileControlBlock(reader);
  const { spriteOffset, freeOffset } = controlBlock;

  const sprites: Sprite[] = [];

  let offset = spriteOffset - 4;
  const end = freeOffset - 4;

  while (offset < end) {
    reader.seek(offset);
    const sprite = spriteFromArrayBuffer(reader);
    sprites.push(sprite);
    offset += sprite.controlBlock.spriteOffset;
  }

  return { controlBlock, sprites };
}

/*
 * Sprite files don't have a header
 * We try to deserialize the sprite area and if we can do that
 * then there's a good chance it contains sprite data
 */
export function spriteFileIsHeaderPresent(buffer: ArrayBuffer): boolean {
  try {
    spriteFileFromArrayBuffer(buffer);
    return true;
  } catch {
    return false;
  }
}
