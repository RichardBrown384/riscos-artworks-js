import { check } from '@rbrown/check';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
  ArtworksDashElements,
  ArtworksRecordDashPattern,
  DashPattern,
  RecordBodyDashPattern,
} from '../types/index.js';
import { ZERO_BOUNDING_BOX } from './record-creation-helpers.js';

function readDashPattern(reader: BinaryReader): DashPattern {
  const offset = reader.u32();
  const count = reader.u32();
  const elements = [];
  for (let i = 0; i < count; i += 1) {
    elements.push(reader.u32());
  }
  return { offset, count, elements };
}

function writeDashPattern(
  writer: BinaryWriter,
  { offset, count, elements }: DashPattern,
): void {
  check(
    count === elements.length,
    "length of dash pattern array doesn't agree with the count",
  );
  writer.u32(offset);
  writer.u32(count);
  for (let i = 0; i < count; i += 1) {
    writer.u32(elements[i]);
  }
}

export function readRecordBodyDashPattern(
  reader: BinaryReader,
): RecordBodyDashPattern {
  const pattern = reader.i32();
  const record: RecordBodyDashPattern = { pattern };
  if (pattern !== 0) {
    record.dashPattern = readDashPattern(reader);
  }
  return record satisfies RecordBodyDashPattern;
}

export function writeRecordBodyDashPattern(
  writer: BinaryWriter,
  record: RecordBodyDashPattern,
): void {
  const { pattern, dashPattern } = record;
  writer.i32(pattern);
  if (pattern === 0) {
    return;
  }
  check(dashPattern !== undefined, 'missing dash pattern');
  writeDashPattern(writer, dashPattern);
}

function createRecordDashPatternFromBody(
  body: RecordBodyDashPattern,
): ArtworksRecordDashPattern {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_2B_DASH_PATTERN,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_0,
    boundingBox: ZERO_BOUNDING_BOX,
    body,
    lists: [],
  };
}

export function createRecordDashPatternEmpty(): ArtworksRecordDashPattern {
  return createRecordDashPatternFromBody({
    pattern: 0,
  });
}

export function createRecordDashPattern(
  offset: number,
  ...elements: ArtworksDashElements
): ArtworksRecordDashPattern {
  return createRecordDashPatternFromBody({
    pattern: -1,
    dashPattern: {
      offset,
      count: elements.length,
      elements,
    },
  });
}
