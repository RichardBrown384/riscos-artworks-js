const Constants = require('../constants');

const {
  createListsPointer,
  writeListsPointer,
  createListPointer,
  writeListPointer,
  createRecordPointer,
  writeRecordPointer,
} = require('../types/primitives');

const { writeRecordBody, writeRecordHeader } = require('../types/records');

const SubLists = require('./sublists');

const DEFAULT_IDENTIFIER = 'Top!';
const DEFAULT_PROGRAM = 'TopDraw';
const DEFAULT_BODY_OFFSET = 128;

class ArtworksWriter {
  constructor(view, { header, children }) {
    this.view = view;
    this.header = header;
    this.children = children;
  }

  write() {
    this.view.writeStringAt(Constants.FILE_OFFSET_IDENTIFIER, DEFAULT_IDENTIFIER, 4);
    this.view.writeInt32At(Constants.FILE_OFFSET_VERSION, this.header.version);
    this.view.writeStringAt(Constants.FILE_OFFSET_PROGRAM, DEFAULT_PROGRAM, 8);
    this.view.writeInt32At(Constants.FILE_OFFSET_BODY_OFFSET, DEFAULT_BODY_OFFSET);
    this.view.writeInt32At(Constants.FILE_OFFSET_UNDO_OFFSET, -1);
    this.view.writeInt32At(Constants.FILE_OFFSET_SPRITE_AREA_OFFSET, -1);
    this.view.writeInt32At(Constants.FILE_OFFSET_PALETTE_OFFSET, -1);

    this.view.setPosition(DEFAULT_BODY_OFFSET);
    this.writeLists(this.children, DEFAULT_BODY_OFFSET);

    return this.view.getPosition();
  }

  writeLists(lists, listsPointerPosition, recordPointerPosition) {
    let previous = listsPointerPosition - this.view.getPosition();
    for (let i = 0; i < lists.length; i += 1) {
      const list = lists[i];
      const start = this.view.getPosition();
      this.reservePointerSpace();
      this.writeList(list.children, recordPointerPosition || this.view.getPosition());
      const end = this.view.getPosition();
      const next = (i < lists.length - 1) ? end - start : 0;
      this.writeListPointer(start, previous, next);
      previous = -next;
    }
  }

  writeList(list, recordPointerPosition) {
    let previous = recordPointerPosition - this.view.getPosition();
    const subLists = new SubLists();
    for (let i = 0; i < list.length; i += 1) {
      const record = list[i];
      const start = this.view.getPosition();
      this.reservePointerSpace();
      writeRecordHeader(this.view, record);
      writeRecordBody(this.view, record);
      if (i < list.length - 1) {
        subLists.add(start, this.view.getPosition(), record.children);
        this.reservePointerSpace();
      }
      const end = this.view.getPosition();
      const next = (i < list.length - 1) ? (end - start) : 0;
      this.writeRecordPointer(start, previous, next);
      previous = -next;
    }
    this.writeSubLists(subLists.getList());
  }

  writeSubLists(subLists) {
    for (let i = 0; i < subLists.length; i += 1) {
      const {
        recordPointerPosition,
        listsPointerPosition,
        lists,
      } = subLists[i];
      const position = this.view.getPosition();
      const next = position - listsPointerPosition;
      this.writeListsPointer(listsPointerPosition, 0, next);
      this.writeLists(lists, listsPointerPosition, recordPointerPosition);
    }
  }

  reservePointerSpace() {
    this.view.setPosition(this.view.getPosition() + 8);
  }

  writeListsPointer(position, previous, next) {
    writeListsPointer(this.view, createListsPointer(position, previous, next));
  }

  writeListPointer(position, previous, next) {
    writeListPointer(this.view, createListPointer(position, previous, next));
  }

  writeRecordPointer(position, previous, next) {
    writeRecordPointer(this.view, createRecordPointer(position, previous, next));
  }
}

module.exports = ArtworksWriter;
