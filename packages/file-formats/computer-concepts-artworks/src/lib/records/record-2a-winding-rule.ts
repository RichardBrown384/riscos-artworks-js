import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksRecordWindingRule,
  ArtworksWindingRule,
  RecordBodyWindingRule,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyWindingRule(
  reader: BinaryReader,
): RecordBodyWindingRule {
  return {
    windingRule: reader.u32(),
  };
}

export function writeRecordBodyWindingRule(
  writer: BinaryWriter,
  { windingRule }: RecordBodyWindingRule,
): void {
  writer.u32(windingRule);
}

export function createRecordWindingRule(
  windingRule: ArtworksWindingRule,
): ArtworksRecordWindingRule {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_2A_WINDING_RULE,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      windingRule,
    },
    lists: [],
  };
}
