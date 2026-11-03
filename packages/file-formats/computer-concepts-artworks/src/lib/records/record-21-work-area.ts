import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksRecord,
  Palette,
  RecordBodyWorkArea,
} from '../types/index.js';
import { check } from '@rbrown/check';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';
import { FILE_OFFSET_PALETTE_POSITION } from '../structures/index.js';
import { readPalette, writePalette } from '../primitives/index.js';

export function readRecordBodyWorkArea(
  reader: BinaryReader,
): RecordBodyWorkArea {
  const paletteOffset = reader.readInt32At(FILE_OFFSET_PALETTE_POSITION);
  if (paletteOffset < 0) {
    return {};
  }
  const position = reader.tell();
  reader.seek(paletteOffset);
  const palette = readPalette(reader);
  reader.seek(position);
  return {
    palette,
  };
}

export function writeRecordBodyWorkArea(
  writer: BinaryWriter,
  { palette }: RecordBodyWorkArea,
): void {
  check(palette !== undefined, 'expected to write out a palette');
  writer.writeInt32At(FILE_OFFSET_PALETTE_POSITION, writer.tell());
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
