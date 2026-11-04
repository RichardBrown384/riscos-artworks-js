import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_0,
  ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_3,
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksRecord,
  List,
  RecordBodyLayer,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyLayer(reader: BinaryReader): RecordBodyLayer {
  return {
    unknown24: reader.u32(),
    name: reader.paddedCString(32),
  };
}

export function writeRecordBodyLayer(
  writer: BinaryWriter,
  record: RecordBodyLayer,
): void {
  const { unknown24, name } = record;
  writer.u32(unknown24);
  writer.paddedCString(name, 32);
}

export function createRecordLayerFull(
  unknown24: number,
  name: string,
  ...lists: List[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_0A_LAYER,
    flags: 0,
    unknown4: 0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      unknown24,
      name,
    },
    lists,
  };
}

export function createRecordLayer(
  name: string,
  ...lists: List[]
): ArtworksRecord {
  return createRecordLayerFull(
    ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_0 +
      ARTWORKS_RECORD_BODY_LAYER_UNKNOWN_24_BIT_3,
    name,
    ...lists,
  );
}
