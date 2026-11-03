import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksRecordStrokeColour,
  ArtworksColourIndex,
  RecordBodyStrokeColour,
} from '../types/index.js';
import { readColourIndex, writeColourIndex } from '../primitives/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

export function readRecordBodyStrokeColour(
  reader: BinaryReader,
): RecordBodyStrokeColour {
  return {
    strokeColour: readColourIndex(reader),
  };
}

export function writeRecordBodyStrokeColour(
  writer: BinaryWriter,
  { strokeColour }: RecordBodyStrokeColour,
): void {
  writeColourIndex(writer, strokeColour);
}

export function createRecordStrokeColour(
  strokeColour: ArtworksColourIndex,
): ArtworksRecordStrokeColour {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_24_STROKE_COLOUR,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      strokeColour,
    },
    lists: [],
  };
}
