const {
  writeArtworksHeader,
  writeRecordHeader,
  createListsPointer,
  writeListsPointer,
  createListPointer,
  writeListPointer,
  createRecordPointer,
  writeRecordPointer,
} = require('../types/structures');

const {
  writeRecordBody,
} = require('../types/records');

const SubLists = require('./sublists');
const {} = require("../types/structures");

class ArtworksWriter {
  constructor(view, { header, children }) {
    this.view = view;
    this.header = header;
    this.children = children;
  }

  write() {
    const { bodyPosition } = this.header;

    this.view.setPosition(0);
    writeArtworksHeader(this.view, this.header);

    this.view.setPosition(bodyPosition);
    this.writeLists(this.children, bodyPosition);

    return this.view.getPosition();
  }

  writeLists(lists, listsPointerPosition, recordPointerPosition) {
    let previous = listsPointerPosition - this.view.getPosition();
    for (let i = 0; i < lists.length; i += 1) {
      const list = lists[i];
      const start = this.view.getPosition();
      this.reservePointerSpace();
      const listStart = this.view.getPosition();
      this.writeList(list.children, recordPointerPosition || listStart);
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
      } else {
        this.view.check(record.children.length === 0, 'Final record in list has children');
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
