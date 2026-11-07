import { check } from '@rbrown/check';
import { BinaryReader } from '@rbrown/io';

import {
  Sprite,
  SpriteAreaControlBlock,
  SpriteFileControlBlock,
} from '../sprite-types.js';
import { spriteFromBinaryReader } from '../sprite/index.js';

export function readSpriteArray(
  reader: BinaryReader,
  controlBlock: SpriteFileControlBlock | SpriteAreaControlBlock,
): Sprite[] {
  const { spriteOffset, freeOffset, spriteCount } = controlBlock;

  // The offsets in the control block are relative to the start of the Sprite Area.
  // Sprite Files omit the first 32-bit word, but the offsets in the control block
  // are relative to the missing word.
  const spriteAreaOffset = reader.tell() - 16;
  const start = spriteAreaOffset + spriteOffset;
  const end = spriteAreaOffset + freeOffset;

  const sprites: Sprite[] = [];

  for (let i = 0, offset = start; i < spriteCount; i++) {
    check(offset < end, 'unexpected sprite data');
    reader.seek(offset);
    const sprite = spriteFromBinaryReader(reader);
    sprites.push(sprite);
    offset += sprite.controlBlock.spriteOffset;
  }

  return sprites;
}
