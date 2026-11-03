import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksRecordLineCapEnd,
  ArtworksLineCapStyle,
  RecordBodyLineCapEnd,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyLineCapEnd(
  reader: BinaryReader,
): RecordBodyLineCapEnd {
  return {
    capStyle: reader.u32(),
    capTriangle: reader.u32(),
  };
}

export function writeRecordBodyLineCapEnd(
  writer: BinaryWriter,
  { capStyle, capTriangle }: RecordBodyLineCapEnd,
): void {
  writer.u32(capStyle);
  writer.u32(capTriangle);
}

export function createCapEndTriangle(width: number, height: number): number {
  return (height << 16) + width;
}

export function createRecordLineCapEnd(
  capStyle: ArtworksLineCapStyle,
  capTriangle: number,
): ArtworksRecordLineCapEnd {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_28_LINE_CAP_END,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      capStyle,
      capTriangle,
    },
    lists: [],
  };
}
