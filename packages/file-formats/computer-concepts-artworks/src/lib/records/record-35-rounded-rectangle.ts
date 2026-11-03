import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksPath,
  ArtworksPolyline,
  ArtworksRecord,
  RecordBodyRoundedRectangle,
} from '../types/index.js';
import {
  readPolyline,
  writePolyline,
  pathBoundingBox,
  readPath,
  writePath,
} from '../primitives/index.js';
import { createAttributeLists } from './record-creation-helpers.js';

export function readRecordBodyRoundedRectangle(
  reader: BinaryReader,
): RecordBodyRoundedRectangle {
  return {
    cornerRadius: reader.u32(),
    triangle: readPolyline(reader, 3),
    path: readPath(reader),
  };
}

export function writeRecordBodyRoundedRectangle(
  writer: BinaryWriter,
  { cornerRadius, triangle, path }: RecordBodyRoundedRectangle,
): void {
  writer.u32(cornerRadius);
  writePolyline(writer, triangle);
  writePath(writer, path);
}

export function createRecordRoundedRectangle(
  cornerRadius: number,
  triangle: ArtworksPolyline,
  path: ArtworksPath,
  padding: number,
  ...attributes: ArtworksRecord[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_35_ROUNDED_RECTANGLE,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    boundingBox: pathBoundingBox(path, padding),
    body: {
      cornerRadius,
      triangle,
      path: path,
    },
    lists: createAttributeLists(attributes),
  };
}
