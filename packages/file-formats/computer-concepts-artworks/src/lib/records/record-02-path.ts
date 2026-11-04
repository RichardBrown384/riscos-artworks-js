import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { pathBoundingBox, readPath, writePath } from '../primitives/index.js';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
  ArtworksPath,
  ArtworksRecord,
  RecordBodyPath,
} from '../types/index.js';
import { createAttributeLists } from './record-creation-helpers.js';

export function readRecordBodyPath(reader: BinaryReader): RecordBodyPath {
  return {
    path: readPath(reader),
  };
}

export function writeRecordBodyPath(
  writer: BinaryWriter,
  { path }: RecordBodyPath,
): void {
  writePath(writer, path);
}

export function createRecordPathFull(
  unknown4: number,
  path: ArtworksPath,
  padding: number,
  ...attributes: ArtworksRecord[]
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_02_PATH,
    flags: 0,
    unknown4,
    boundingBox: pathBoundingBox(path, padding),
    body: {
      path,
    },
    lists: createAttributeLists(attributes),
  };
}

export function createRecordPath(
  path: ArtworksPath,
  padding: number,
  ...attributes: ArtworksRecord[]
): ArtworksRecord {
  return createRecordPathFull(
    ARTWORKS_RECORD_UNKNOWN_4_BIT_1,
    path,
    padding,
    ...attributes,
  );
}
