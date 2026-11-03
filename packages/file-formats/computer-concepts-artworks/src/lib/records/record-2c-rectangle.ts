import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksPath,
  ArtworksRecord,
  RecordBodyRectangle,
} from '../types/index.js';
import { pathBoundingBox, readPath, writePath } from '../primitives/index.js';
import { createAttributeLists } from './record-creation-helpers.js';

export function readRecordBodyRectangle(
  reader: BinaryReader,
): RecordBodyRectangle {
  return {
    unknown24: reader.u32(),
    path: readPath(reader),
  };
}

export function writeRecordBodyRectangle(
  writer: BinaryWriter,
  { unknown24, path }: RecordBodyRectangle,
): void {
  writer.u32(unknown24);
  writePath(writer, path);
}

export function createRecordRectangle(
  path: ArtworksPath,
  padding: number,
  unknown24: number,
  ...attributes: ArtworksRecord[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_2C_RECTANGLE,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    boundingBox: pathBoundingBox(path, padding),
    body: {
      unknown24,
      path,
    },
    lists: createAttributeLists(attributes),
  };
}
