import { BinaryWriter } from '@rbrown/io';
import { check } from '@rbrown/check';

import {
  ArtworksFile,
  ArtworksHeader,
  ArtworksRecord,
  List,
} from '../types/index.js';

import {
  createListPointer,
  createListsPointer,
  createRecordPointer,
  writeArtworksHeader,
  writeListPointer,
  writeListsPointer,
  writeRecordPointer,
} from '../structures/index.js';

import { writeRecordBody, writeRecordHeader } from '../records/index.js';

import { SubLists, SubListsElement } from './sublists.js';

export class ArtworksWriter {
  private readonly writer: BinaryWriter;
  private readonly header: ArtworksHeader;
  private readonly children: List[];

  constructor(writer: BinaryWriter, { header, lists }: ArtworksFile) {
    this.writer = writer;
    this.header = header;
    this.children = lists;
  }

  write(): number {
    const { bodyPosition } = this.header;

    this.writer.seek(0);
    writeArtworksHeader(this.writer, this.header);

    this.writer.seek(bodyPosition);
    this.writeLists(this.children, bodyPosition);

    return this.writer.tell();
  }

  private writeLists(
    lists: List[],
    listsPointerPosition: number,
    recordPointerPosition?: number,
  ) {
    let previous = listsPointerPosition - this.writer.tell();
    for (let i = 0; i < lists.length; i += 1) {
      const list = lists[i];
      const start = this.writer.tell();
      this.reservePointerSpace();
      const listStart = this.writer.tell();
      this.writeList(list.records, recordPointerPosition || listStart);
      const end = this.writer.tell();
      const next = i < lists.length - 1 ? end - start : 0;
      this.writeListPointer(start, previous, next);
      previous = -next;
    }
  }

  private writeList(
    list: ArtworksRecord[],
    recordPointerPosition: number,
  ): void {
    let previous = recordPointerPosition - this.writer.tell();
    const subLists = new SubLists();
    for (let i = 0; i < list.length; i += 1) {
      const record = list[i];
      const start = this.writer.tell();
      this.reservePointerSpace();
      writeRecordHeader(this.writer, record);
      writeRecordBody(this.writer, record);
      if (i < list.length - 1) {
        subLists.add(start, this.writer.tell(), record.lists);
        this.reservePointerSpace();
      } else {
        check(record.lists.length === 0, 'Final record in list has children');
      }
      const end = this.writer.tell();
      const next = i < list.length - 1 ? end - start : 0;
      this.writeRecordPointer(start, previous, next);
      previous = -next;
    }
    this.writeSubLists(subLists.getList());
  }

  private writeSubLists(subLists: SubListsElement[]): void {
    for (let i = 0; i < subLists.length; i += 1) {
      const { recordPointerPosition, listsPointerPosition, lists } =
        subLists[i];
      const position = this.writer.tell();
      const next = position - listsPointerPosition;
      this.writeListsPointer(listsPointerPosition, 0, next);
      this.writeLists(lists, listsPointerPosition, recordPointerPosition);
    }
  }

  private reservePointerSpace() {
    this.writer.seek(this.writer.tell() + 8);
  }

  private writeListsPointer(position: number, previous: number, next: number) {
    writeListsPointer(
      this.writer,
      createListsPointer(position, previous, next),
    );
  }

  private writeListPointer(position: number, previous: number, next: number) {
    writeListPointer(this.writer, createListPointer(position, previous, next));
  }

  private writeRecordPointer(position: number, previous: number, next: number) {
    writeRecordPointer(
      this.writer,
      createRecordPointer(position, previous, next),
    );
  }
}
