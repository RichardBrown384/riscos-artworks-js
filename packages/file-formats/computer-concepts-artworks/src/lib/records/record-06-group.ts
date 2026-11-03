import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksRecord,
  List,
  RecordBodyGroup,
} from '../types/index.js';
import { BoundingBox } from '@rbrown/geometry';

export function readRecordBodyGroup(reader: BinaryReader): RecordBodyGroup {
  return {
    unknown24: reader.u32(),
    unknown28: reader.u32(),
    unknown32: reader.u32(),
  };
}

export function writeRecordBodyGroup(
  writer: BinaryWriter,
  { unknown24, unknown28, unknown32 }: RecordBodyGroup,
): void {
  writer.u32(unknown24);
  writer.u32(unknown28);
  writer.u32(unknown32);
}

export function createRecordGroupFull(
  unknown4: number,
  boundingBox: BoundingBox,
  ...lists: List[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_06_GROUP,
    flags: 0,
    unknown4,
    boundingBox: boundingBox,
    body: {
      unknown24: 0,
      unknown28: 0,
      unknown32: 0,
    },
    lists,
  };
}

export function createRecordGroup(
  boundingBox: BoundingBox,
  ...lists: List[]
): ArtworksRecord {
  return createRecordGroupFull(
    ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    boundingBox,
    ...lists,
  );
}
