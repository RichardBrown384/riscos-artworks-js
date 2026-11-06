import { BinaryReader } from '@rbrown/io';

import { readSpriteArray } from '../sprite-array/index.js';
import { SpriteArea, SpriteAreaControlBlock } from '../sprite-types.js';

function readSpriteAreaControlBlock(
  reader: BinaryReader,
): SpriteAreaControlBlock {
  return {
    // When embedded in !ArtWorks files, the size isn't reliable
    sizeInBytes: reader.u32(),
    spriteCount: reader.u32(),
    spriteOffset: reader.u32(),
    freeOffset: reader.u32(),
  };
}

export function spriteAreaFromBinaryReader(reader: BinaryReader): SpriteArea {
  const controlBlock = readSpriteAreaControlBlock(reader);
  const sprites = readSpriteArray(reader, controlBlock);
  return {
    controlBlock,
    sprites,
  };
}
