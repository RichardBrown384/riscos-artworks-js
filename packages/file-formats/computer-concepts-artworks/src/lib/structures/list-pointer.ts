import { BinaryReader, BinaryWriter } from '@rbrown/io';

import { FilePointer } from '../types/index.js';
import { checkPointer } from './check-pointer.js';

export function readListPointer(reader: BinaryReader) {
  const position = reader.tell();
  const previous = reader.i32();
  const next = reader.i32();
  const pointer = { position, previous, next };
  checkPointer(reader.length(), pointer);
  return pointer;
}

export function writeListPointer(writer: BinaryWriter, pointer: FilePointer) {
  checkPointer(writer.length(), pointer);
  const { position, previous, next } = pointer;
  writer.i32At(position, previous);
  writer.i32At(position + 4, next);
}

export function createListPointer(
  position: number,
  previous: number,
  next: number,
) {
  return { position, previous, next };
}
