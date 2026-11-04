import { check } from '@rbrown/check';
import { BinaryReader } from '@rbrown/io';

import { readPalette } from '../primitives/index.js';
import { readRecordBody, readRecordHeader } from '../records/index.js';
import {
  createListWithPointer,
  readArtworksHeader,
  readListPointer,
  readListsPointer,
  readRecordPointer,
} from '../structures/index.js';
import { ArtworksFile, ArtworksRecord, List, Palette } from '../types/index.js';

export class ArtworksReader {
  private readonly reader: BinaryReader;

  constructor(reader: BinaryReader) {
    this.reader = reader;
  }

  read(): ArtworksFile {
    this.reader.seek(0);
    const header = readArtworksHeader(this.reader);

    const { bodyPosition, palettePosition } = header;

    this.reader.seek(bodyPosition);
    const lists: List[] = this.readLists();
    const palette = this.readPalette(palettePosition);

    return {
      header,
      lists,
      palette,
    };
  }

  readLists(): List[] {
    const lists = [] as List[];
    for (;;) {
      const pointer = readListPointer(this.reader);
      const { position, next } = pointer;
      const records = this.readRecords();
      lists.push(createListWithPointer(records, pointer));
      if (next === 0) {
        break;
      }
      this.reader.seek(position + next);
    }
    return lists;
  }

  readRecords(): ArtworksRecord[] {
    const list: ArtworksRecord[] = [];
    for (;;) {
      const pointer = readRecordPointer(this.reader);
      const header = readRecordHeader(this.reader);
      const { position, next } = pointer;
      list.push({
        pointer,
        ...header,
        ...readRecordBody(this.reader, header, pointer),
        lists: next !== 0 ? this.readSubLists(position + next - 8) : [],
      });
      if (next === 0) {
        break;
      }
      this.reader.seek(position + next);
    }
    return list;
  }

  readSubLists(listsPointerPosition: number): List[] {
    const current = this.reader.tell();
    check(
      current <= listsPointerPosition,
      `insufficient space for sub-lists pointer ${String(current)} ${String(listsPointerPosition)}`,
    );
    this.reader.seek(listsPointerPosition);
    const pointer = readListsPointer(this.reader);
    const { position, next } = pointer;
    if (next > 0) {
      this.reader.seek(position + next);
      return this.readLists();
    }
    return [];
  }

  readPalette(palettePosition: number): Palette | undefined {
    if (palettePosition === -1) {
      return undefined;
    }
    this.reader.seek(palettePosition);
    return readPalette(this.reader);
  }
}
