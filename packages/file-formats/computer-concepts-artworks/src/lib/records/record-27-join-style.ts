import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksJoinStyle,
  ArtworksRecordJoinStyle,
  RecordBodyJoinStyle,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyJoinStyle(
  reader: BinaryReader,
): RecordBodyJoinStyle {
  return {
    joinStyle: reader.u32(),
  };
}

export function writeRecordBodyJoinStyle(
  writer: BinaryWriter,
  { joinStyle }: RecordBodyJoinStyle,
): void {
  writer.u32(joinStyle);
}

export function createRecordJoinStyle(
  joinStyle: ArtworksJoinStyle,
): ArtworksRecordJoinStyle {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_27_JOIN_STYLE,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      joinStyle,
    },
    lists: [],
  };
}
