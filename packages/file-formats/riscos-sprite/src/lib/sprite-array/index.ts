import { BinaryReader } from '@rbrown/io';

import {
  Sprite,
  SpriteAreaControlBlock,
  SpriteFileControlBlock,
} from '../sprite-types.js';
import { spriteFromArrayBuffer } from '../sprite/index.js';

export function readSpriteArray(
  reader: BinaryReader,
  controlBlock: SpriteFileControlBlock | SpriteAreaControlBlock,
): Sprite[] {
  const sprites: Sprite[] = [];

  const { spriteOffset, freeOffset } = controlBlock;
  let offset = spriteOffset - 4;
  const end = freeOffset - 4;

  while (offset < end) {
    reader.seek(offset);
    const sprite = spriteFromArrayBuffer(reader);
    sprites.push(sprite);
    offset += sprite.controlBlock.spriteOffset;
  }

  return sprites;
}
