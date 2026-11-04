import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksLineCapStyle,
  ArtworksRecordLineCapStart,
  RecordBodyLineCapStart,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyLineCapStart(
  reader: BinaryReader,
): RecordBodyLineCapStart {
  return {
    capStyle: reader.u32(),
    capTriangle: reader.u32(),
  };
}

export function writeRecordBodyLineCapStart(
  writer: BinaryWriter,
  { capStyle, capTriangle }: RecordBodyLineCapStart,
): void {
  writer.u32(capStyle);
  writer.u32(capTriangle);
}

export function createCapStartTriangle(width: number, height: number): number {
  return (height << 16) + width;
}

export function createRecordLineCapStart(
  capStyle: ArtworksLineCapStyle,
  capTriangle: number,
): ArtworksRecordLineCapStart {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_29_LINE_CAP_START,
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
