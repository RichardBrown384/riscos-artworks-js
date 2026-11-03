import { BinaryReader, BinaryWriter } from '@rbrown/io';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksPath,
  ArtworksRecord,
  RecordBodyBlendPath,
} from '../types/index.js';
import { pathBoundingBox, readPath, writePath } from '../primitives/index.js';

export function readRecordBodyBlendPath(
  reader: BinaryReader,
): RecordBodyBlendPath {
  return {
    path: readPath(reader),
  };
}

export function writeRecordBodyBlendPath(
  writer: BinaryWriter,
  { path }: RecordBodyBlendPath,
): void {
  writePath(writer, path);
}

export function createRecordBlendPath(
  path: ArtworksPath,
  padding: number,
): ArtworksRecord {
  return {
    type: ARTWORKS_RECORD_TYPE_TAG.RECORD_3D_BLEND_PATH,
    flags: 0,
    unknown4: 0,
    boundingBox: pathBoundingBox(path, padding),
    body: {
      path,
    },
    lists: [],
  };
}
