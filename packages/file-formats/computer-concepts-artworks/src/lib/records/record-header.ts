import { makeCheckEnumValue } from '@rbrown/check';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { readBoundingBox, writeBoundingBox } from '../primitives/index.js';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksRecordHeader,
  ArtworksRecordType,
} from '../types/index.js';

const checkArtworksRecordType: (
  value: unknown,
  message: string,
) => asserts value is ArtworksRecordType = makeCheckEnumValue(
  ARTWORKS_RECORD_TYPE_TAG,
);

function readArtworksRecordType(type: number): ArtworksRecordType {
  const v = (type >>> 0) & 0xff;
  checkArtworksRecordType(v, 'unsupported artworks record type');
  return v;
}

export function readRecordHeader(reader: BinaryReader): ArtworksRecordHeader {
  reader.aligned(4, 'misaligned record header');
  const type = reader.u32();
  return {
    type: readArtworksRecordType(type),
    flags: type,
    unknown4: reader.u32(),
    boundingBox: readBoundingBox(reader),
  };
}

export function writeRecordHeader(
  writer: BinaryWriter,
  header: ArtworksRecordHeader,
) {
  writer.aligned(4, 'misaligned record header');
  const { type, flags, unknown4, boundingBox } = header;
  writer.u32((type >>> 0) + ((flags >>> 0) & ~0xff));
  writer.u32(unknown4);
  writeBoundingBox(writer, boundingBox);
}
