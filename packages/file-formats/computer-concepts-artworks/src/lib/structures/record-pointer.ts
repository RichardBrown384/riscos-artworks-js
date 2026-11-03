import { BinaryReader, BinaryWriter } from '@rbrown/io';
import { checkPointer } from './check-pointer.js';
import { FilePointer } from '../types/index.js';

export function readRecordPointer(reader: BinaryReader) {
  const position = reader.tell();
  const next = reader.i32();
  const previous = reader.i32();
  const pointer = { position, previous, next };
  checkPointer(reader.length(), pointer);
  return pointer;
}

export function writeRecordPointer(writer: BinaryWriter, pointer: FilePointer) {
  checkPointer(writer.length(), pointer);
  const { position, previous, next } = pointer;
  writer.writeInt32At(position, next);
  writer.writeInt32At(position + 4, previous);
}

export function createRecordPointer(
  position: number,
  previous: number,
  next: number,
) {
  return { position, previous, next };
}
