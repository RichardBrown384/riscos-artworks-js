import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksPath,
  ArtworksPolyline,
  ArtworksRecord,
  RecordBodyEllipse,
} from '../types/index.js';
import {
  readPolyline,
  writePolyline,
  pathBoundingBox,
  readPath,
  writePath,
} from '../primitives/index.js';
import { createAttributeLists } from './record-creation-helpers.js';

export function readRecordBodyEllipse(reader: BinaryReader): RecordBodyEllipse {
  return {
    triangle: readPolyline(reader, 3),
    path: readPath(reader),
  };
}

export function writeRecordBodyEllipse(
  writer: BinaryWriter,
  { triangle, path }: RecordBodyEllipse,
): void {
  writePolyline(writer, triangle);
  writePath(writer, path);
}

export function createRecordEllipse(
  triangle: ArtworksPolyline,
  path: ArtworksPath,
  padding: number,
  ...attributes: ArtworksRecord[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_34_ELLIPSE,
    flags: 0,
    unknown4: ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    boundingBox: pathBoundingBox(path, padding),
    body: {
      triangle,
      path,
    },
    lists: createAttributeLists(attributes),
  };
}
