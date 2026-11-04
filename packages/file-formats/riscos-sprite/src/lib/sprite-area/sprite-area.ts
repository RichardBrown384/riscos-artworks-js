import { BinaryReader } from '@rbrown/io';

import { Sprite, SpriteArea, SpriteAreaControlBlock } from '../sprite-types.js';
import { spriteFromArrayBuffer } from '../sprite/index.js';

function readSpriteAreaControlBlock(
  reader: BinaryReader,
): SpriteAreaControlBlock {
  return {
    spriteCount: reader.u32(),
    spriteOffset: reader.u32(),
    freeOffset: reader.u32(),
  };
}

export function spriteAreaFromArrayBuffer(buffer: ArrayBuffer): SpriteArea {
  const reader = new BinaryReader(buffer);

  const controlBlock = readSpriteAreaControlBlock(reader);
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
export function spriteAreaIsHeaderPresent(buffer: ArrayBuffer): boolean {
  spriteAreaFromArrayBuffer(buffer);
  try {
    spriteAreaFromArrayBuffer(buffer);
    return true;
  } catch {
    return false;
  }
}
