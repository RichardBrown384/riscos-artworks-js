import { makeCheckEnumValue } from '@rbrown/check';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  readColourIndex,
  readPolyline,
  writeColourIndex,
  writePolyline,
} from '../primitives/index.js';
import {
  ARTWORKS_FILL_TYPE_TAG,
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksColourIndex,
  ArtworksFillType,
  ArtworksRecordFillColour,
  FillGradientFlat,
  FillGradientShaded,
  RecordBodyFillColour,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

const checkFillTypeTag: (
  value: unknown,
  message: string,
) => asserts value is ArtworksFillType = makeCheckEnumValue(
  ARTWORKS_FILL_TYPE_TAG,
);

function readFillType(reader: BinaryReader): ArtworksFillType {
  const v = reader.u32();
  checkFillTypeTag(v, 'unsupported fill gradient');
  return v;
}

function writeFillType(writer: BinaryWriter, fillType: ArtworksFillType): void {
  writer.u32(fillType);
}

function readFillGradientFlat(reader: BinaryReader): FillGradientFlat {
  return {
    tag: 'flat',
    colour: readColourIndex(reader),
  };
}

function writeFillGradientFlat(
  writer: BinaryWriter,
  { colour }: FillGradientFlat,
): void {
  writeColourIndex(writer, colour);
}

function readFillGradientShaded(reader: BinaryReader): FillGradientShaded {
  return {
    tag: 'shaded',
    gradientLine: readPolyline(reader, 2),
    startColour: readColourIndex(reader),
    endColour: readColourIndex(reader),
  };
}

function writeFillGradientShaded(
  writer: BinaryWriter,
  { gradientLine, startColour, endColour }: FillGradientShaded,
): void {
  writePolyline(writer, gradientLine);
  writeColourIndex(writer, startColour);
  writeColourIndex(writer, endColour);
}

export function readRecordBodyFillColour(
  reader: BinaryReader,
): RecordBodyFillColour {
  const fillType = readFillType(reader);
  const unknown28 = reader.u32();
  switch (fillType) {
    case ARTWORKS_FILL_TYPE_TAG.FLAT:
      return {
        fillType,
        unknown28,
        gradient: readFillGradientFlat(reader),
      };
    case ARTWORKS_FILL_TYPE_TAG.LINEAR:
    case ARTWORKS_FILL_TYPE_TAG.RADIAL:
      return {
        fillType,
        unknown28,
        gradient: readFillGradientShaded(reader),
      };
  }
}

export function writeRecordBodyFillColour(
  writer: BinaryWriter,
  { fillType, unknown28, gradient }: RecordBodyFillColour,
): void {
  writeFillType(writer, fillType);
  writer.u32(unknown28);
  switch (fillType) {
    case ARTWORKS_FILL_TYPE_TAG.FLAT: {
      writeFillGradientFlat(writer, gradient);
      return;
    }
    case ARTWORKS_FILL_TYPE_TAG.LINEAR:
    case ARTWORKS_FILL_TYPE_TAG.RADIAL: {
      writeFillGradientShaded(writer, gradient);
      return;
    }
  }
}

export function createRecordFillColourFlatFull(
  unknown4: number,
  colour: ArtworksColourIndex,
): ArtworksRecordFillColour {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR,
    flags: 0,
    unknown4,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      fillType: ARTWORKS_FILL_TYPE_TAG.FLAT,
      unknown28: 0,
      gradient: {
        tag: 'flat',
        colour,
      },
    },
    lists: [],
  };
}

export function createRecordFillColourFlat(
  colour: ArtworksColourIndex,
): ArtworksRecordFillColour {
  return createRecordFillColourFlatFull(
    ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    colour,
  );
}

export function createRecordFillColourGradient(
  fillType:
    typeof ARTWORKS_FILL_TYPE_TAG.LINEAR | typeof ARTWORKS_FILL_TYPE_TAG.RADIAL,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  startColour: ArtworksColourIndex,
  endColour: ArtworksColourIndex,
): ArtworksRecordFillColour {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body: {
      fillType,
      unknown28: 0,
      gradient: {
        tag: 'shaded',
        gradientLine: [
          { x: x0, y: y0 },
          { x: x1, y: y1 },
        ],
        startColour,
        endColour,
      },
    },
    lists: [],
  };
}
