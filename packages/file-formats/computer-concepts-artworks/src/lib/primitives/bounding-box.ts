import { BoundingBox } from '@rbrown/geometry';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

export function readBoundingBox(reader: BinaryReader): BoundingBox {
  reader.aligned(4, 'misaligned bounding box');
  return {
    minX: reader.i32(),
    minY: reader.i32(),
    maxX: reader.i32(),
    maxY: reader.i32(),
  };
}

export function writeBoundingBox(
  writer: BinaryWriter,
  { minX, minY, maxX, maxY }: BoundingBox,
): void {
  writer.aligned(4, 'misaligned bounding box');
  writer.i32(minX);
  writer.i32(minY);
  writer.i32(maxX);
  writer.i32(maxY);
}
