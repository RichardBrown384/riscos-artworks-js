import { check } from '@rbrown/check';
import { BinaryReader, BinaryWriter } from '@rbrown/io';
import { SpriteArea, spriteAreaFromBinaryReader } from '@rbrown/riscos-sprite';

import { readPalette, writePalette } from '../primitives/index.js';
import {
  FILE_OFFSET_PALETTE_POSITION,
  FILE_OFFSET_SPRITE_AREA_POSITION,
} from '../structures/index.js';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksRecord,
  Palette,
  RecordBodyWorkArea,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

function readWorkAreaPalette(
  reader: BinaryReader,
  paletteOffset: number,
): Palette | undefined {
  if (paletteOffset < 0) {
    return undefined;
  }
  const position = reader.tell();
  reader.seek(paletteOffset);
  const palette = readPalette(reader);
  reader.seek(position);
  return palette;
}

function readWorkAreaSpriteArea(
  reader: BinaryReader,
  spriteAreaOffset: number,
): SpriteArea | undefined {
  if (spriteAreaOffset < 0) {
    return undefined;
  }
  const position = reader.tell();
  reader.seek(spriteAreaOffset);
  const spriteArea = spriteAreaFromBinaryReader(reader);
  reader.seek(position);
  return spriteArea;
}

// TODO: It would be better here to be able to pass the palette and sprite area offsets down
// so we can not have to rewind the film as it were to extract the two offsets
export function readRecordBodyWorkArea(
  reader: BinaryReader,
): RecordBodyWorkArea {
  const palette = readWorkAreaPalette(
    reader,
    reader.i32At(FILE_OFFSET_PALETTE_POSITION),
  );
  const spriteArea = readWorkAreaSpriteArea(
    reader,
    reader.i32At(FILE_OFFSET_SPRITE_AREA_POSITION),
  );
  return {
    palette,
    spriteArea,
  };
}

export function writeRecordBodyWorkArea(
  writer: BinaryWriter,
  { palette, spriteArea }: RecordBodyWorkArea,
): void {
  check(palette !== undefined, 'expected to write out a palette');
  check(spriteArea === undefined, 'writing sprite areas unsupported');
  writer.i32At(FILE_OFFSET_PALETTE_POSITION, writer.tell());
  writePalette(writer, palette);
}

export function createRecordWorkArea(palette: Palette): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_21_WORK_AREA,
    flags: 0,
    unknown4: 0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      palette,
    },
    lists: [],
  };
}
