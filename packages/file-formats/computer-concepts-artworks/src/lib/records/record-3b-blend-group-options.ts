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
  body: RecordBodyBlendGroupOptions,
): void {
  writer.i32(body.unknown24);
  writer.i32(body.blendSteps);
  writer.i32(body.unknown32);
  writer.i32(body.unknown36);
  writer.i32(body.unknown40);
  writer.i32(body.unknown44);
  writer.i32(body.unknown48);
  writer.i32(body.unknown52);
  writer.i32(body.unknown56);
  writer.i32(body.unknown60);
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
