import { ArtworksRecord, FilePointer, List } from '../types/index.js';

export function createListWithPointer(
  records: ArtworksRecord[],
  pointer: FilePointer,
): List {
  return {
    records,
    pointer,
  };
}

export function createList(...records: ArtworksRecord[]): List {
  return { records };
}
