const UnsupportedRecordError = require('../exceptions/unsupported-record-error');

const {
  readListsPointer,
  readListPointer,
  readRecordPointer,
  readHeader,
} = require('../types/primitives');

const {
  readRecordBody,
  readRecordHeader,
} = require('../types/records');

class ArtworksReader {
  constructor(view) {
    this.view = view;
    this.unsupported = [];
    this.records = [];
    this.stack = [];
  }

  checkStack() {
    this.view.check(this.stack.length !== 0, 'empty stack');
  }

  startRecord(data) {
    this.stack.push({ ...data, children: [] });
  }

  populateRecord(data) {
    this.checkStack();
    const { children, ...oldData } = this.stack.pop();
    this.stack.push({ ...oldData, ...data, children });
  }

  finishRecord() {
    this.checkStack();
    if (this.stack.length > 1) {
      const child = this.stack.pop();
      const parent = this.stack.pop();
      parent.children.push(child);
      this.stack.push(parent);
    } else {
      this.records.push(this.stack.pop());
    }
  }

  unsupportedRecord() {
    this.checkStack();
    const record = this.stack[this.stack.length - 1];
    this.unsupported.push(record);
  }

  read() {
    try {
      this.view.setPosition(0);
      const header = readHeader(this.view);

      const { bodyPosition } = header;

      this.view.setPosition(bodyPosition);
      this.readLists();

      const {
        children: [{ palette = {} }],
      } = this.records.at(-1);

      return {
        header,
        records: this.records,
        palette,
        unsupported: this.unsupported,
      };
    } catch (error) {
      return {
        error,
        stack: this.stack,
      };
    }
  }

  readLists() {
    for (;;) {
      const pointer = readListPointer(this.view);
      const { position, next } = pointer;
      this.startRecord({ pointer });
      this.readList();
      this.finishRecord();
      if (next === 0) {
        break;
      }
      this.view.setPosition(position + next);
    }
  }

  readList() {
    for (;;) {
      const pointer = readRecordPointer(this.view);
      const header = readRecordHeader(this.view);
      const { position, next } = pointer;
      this.startRecord({ pointer, ...header });
      this.readRecordBody(header, pointer);
      if (next !== 0) {
        this.readSubLists(position + next - 8);
      }
      this.finishRecord();
      if (next === 0) {
        break;
      }
      this.view.setPosition(position + next);
    }
  }

  readRecordBody(header, pointer) {
    try {
      this.populateRecord(readRecordBody(this.view, header, pointer));
    } catch (e) {
      if (e instanceof UnsupportedRecordError) {
        this.unsupportedRecord();
      } else {
        throw e;
      }
    }
  }

  readSubLists(listsPointerPosition) {
    const current = this.view.getPosition();
    this.view.check(
      current <= listsPointerPosition,
      'insufficient space for sub-lists pointer',
      { current, listsPointerPosition },
    );
    this.view.setPosition(listsPointerPosition);
    const listsPointer = readListsPointer(this.view);
    const { position, next } = listsPointer;
    if (next > 0) {
      this.populateRecord({
        listsPointer,
      });
      this.view.setPosition(position + next);
      this.readLists();
    }
  }
}

module.exports = ArtworksReader;
