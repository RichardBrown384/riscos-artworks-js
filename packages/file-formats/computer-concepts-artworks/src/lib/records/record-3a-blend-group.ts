import { BoundingBox } from '@rbrown/geometry';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksRecord,
  List,
  RecordBodyBlendGroup,
} from '../types/index.js';

export function readRecordBodyBlendGroup(
  reader: BinaryReader,
): RecordBodyBlendGroup {
  return {
    unknown24: reader.i32(),
    unknown28: reader.i32(),
    unknown32: reader.i32(),
    unknown36: reader.i32(),
    unknown40: reader.i32(),
    unknown44: reader.i32(),
    unknown48: reader.i32(),
    unknown52: reader.i32(),
    unknown56: reader.i32(),
    unknown60: reader.i32(),
    unknown64: reader.i32(),
  };
}

export function writeRecordBodyBlendGroup(
  writer: BinaryWriter,
  body: RecordBodyBlendGroup,
): void {
  writer.i32(body.unknown24);
  writer.i32(body.unknown28);
  writer.i32(body.unknown32);
  writer.i32(body.unknown36);
  writer.i32(body.unknown40);
  writer.i32(body.unknown44);
  writer.i32(body.unknown48);
  writer.i32(body.unknown52);
  writer.i32(body.unknown56);
  writer.i32(body.unknown60);
  writer.i32(body.unknown64);
}

export function createRecordBlendGroup(
  boundingBox: BoundingBox,
  ...lists: List[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_3A_BLEND_GROUP,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    boundingBox,
    body: {
      unknown24: 0,
      unknown28: 0,
      unknown32: 0,
      unknown36: 0,
      unknown40: 0,
      unknown44: -1,
      unknown48: -1,
      unknown52: -1,
      unknown56: -1,
      unknown60: -1,
      unknown64: -1,
    },
    lists,
  };
}
