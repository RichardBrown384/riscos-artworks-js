import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksRecordStrokeWidth,
  RecordBodyStrokeWidth,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyStrokeWidth(
  reader: BinaryReader,
): RecordBodyStrokeWidth {
  return {
    strokeWidth: reader.u32(),
  };
}

export function writeRecordBodyStrokeWidth(
  writer: BinaryWriter,
  { strokeWidth }: RecordBodyStrokeWidth,
): void {
  writer.u32(strokeWidth);
}

export function createRecordStrokeWidth(
  strokeWidth: number,
): ArtworksRecordStrokeWidth {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_25_STROKE_WIDTH,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      strokeWidth,
    },
    lists: [],
  };
}
