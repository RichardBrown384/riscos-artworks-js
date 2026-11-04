import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksMarkerStyle,
  ArtworksRecord,
  RecordBodyMarkerStart,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyMarkerStart(
  reader: BinaryReader,
): RecordBodyMarkerStart {
  return {
    markerStyle: reader.i32(),
    markerWidth: reader.u32(),
    markerHeight: reader.u32(),
  };
}

export function writeRecordBodyMarkerStart(
  writer: BinaryWriter,
  { markerStyle, markerWidth, markerHeight }: RecordBodyMarkerStart,
): void {
  writer.i32(markerStyle);
  writer.u32(markerWidth);
  writer.u32(markerHeight);
}

export function createRecordMarkerStart(
  markerStyle: ArtworksMarkerStyle,
  markerWidth: number,
  markerHeight: number,
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_3E_MARKER_START,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      markerStyle,
      markerWidth,
      markerHeight,
    },
    lists: [],
  };
}
