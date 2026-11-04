import { Point } from '@rbrown/geometry';
import { BinaryReader, BinaryWriter } from '@rbrown/io';

export function readPoint(reader: BinaryReader): Point {
  reader.aligned(4, 'misaligned point');
  return {
    x: reader.i32(),
    y: reader.i32(),
  };
}

export function writePoint(writer: BinaryWriter, { x, y }: Point): void {
  writer.aligned(4, 'misaligned point');
  writer.i32(x);
  writer.i32(y);
}
