import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksRecord,
  ArtworksMarkerStyle,
  RecordBodyMarkerEnd,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyMarkerEnd(
  reader: BinaryReader,
): RecordBodyMarkerEnd {
  return {
    markerStyle: reader.i32(),
    markerWidth: reader.u32(),
    markerHeight: reader.u32(),
  };
}

export function writeRecordBodyMarkerEnd(
  writer: BinaryWriter,
  { markerStyle, markerWidth, markerHeight }: RecordBodyMarkerEnd,
): void {
  writer.i32(markerStyle);
  writer.u32(markerWidth);
  writer.u32(markerHeight);
}

export function createRecordMarkerEnd(
  markerStyle: ArtworksMarkerStyle,
  markerWidth: number,
  markerHeight: number,
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_3F_MARKER_END,
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
