import { BoundingBox } from '@rbrown/geometry';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksRecord,
  RecordBodyBlendGroupOptions,
} from '../types/index.js';

export function readRecordBodyBlendGroupOptions(
  reader: BinaryReader,
): RecordBodyBlendGroupOptions {
  return {
    unknown24: reader.i32(),
    blendSteps: reader.i32(),
    unknown32: reader.i32(),
    unknown36: reader.i32(),
    unknown40: reader.i32(),
    unknown44: reader.i32(),
    unknown48: reader.i32(),
    unknown52: reader.i32(),
    unknown56: reader.i32(),
    unknown60: reader.i32(),
  };
}

export function writeRecordBodyBlendGroupOptions(
  writer: BinaryWriter,
  record: RecordBodyBlendGroupOptions,
): void {
  writer.i32(record.unknown24);
  writer.i32(record.blendSteps);
  writer.i32(record.unknown32);
  writer.i32(record.unknown36);
  writer.i32(record.unknown40);
  writer.i32(record.unknown44);
  writer.i32(record.unknown48);
  writer.i32(record.unknown52);
  writer.i32(record.unknown56);
  writer.i32(record.unknown60);
}

export function createRecordBlendGroupOptions(
  boundingBox: BoundingBox,
  blendSteps: number,
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_3B_BLEND_GROUP_OPTIONS,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    boundingBox,
    body: {
      unknown24: 0,
      blendSteps,
      unknown32: -1,
      unknown36: 0,
      unknown40: 0,
      unknown44: 0,
      unknown48: -1,
      unknown52: -1,
      unknown56: -1,
      unknown60: -1,
    },
    lists: [],
  };
}
