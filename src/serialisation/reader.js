const UnsupportedRecordError = require('../exceptions/unsupported-record-error');

const {
  readNodePointer,
  readChildPointer,
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
      this.readNodes();

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

  readNodes() {
    for (;;) {
      const pointer = readNodePointer(this.view);
      const { position, next } = pointer;
      this.startRecord({ pointer });
      this.readChildren();
      this.finishRecord();
      if (next === 0) {
        break;
      }
      this.view.setPosition(position + next);
    }
  }

  readChildren() {
    for (;;) {
      const pointer = readChildPointer(this.view);
      const header = readRecordHeader(this.view);
      const { position, next } = pointer;
      const checkLast = (message) => {
        this.view.check(next === 0, message);
      };
      this.startRecord({ pointer, ...header });
      this.readRecordBody(header, checkLast);
      if (next !== 0) {
        this.readGrandchildren(position + next - 8);
      }
      this.finishRecord();
      if (next === 0) {
        break;
      }
      this.view.setPosition(position + next);
    }
  }

  readRecordBody(header, checkLast) {
    try {
      this.populateRecord(readRecordBody(this.view, header, checkLast));
    } catch (e) {
      if (e instanceof UnsupportedRecordError) {
        this.unsupportedRecord();
      } else {
        throw e;
      }
    }
  }

  readGrandchildren(pointerPosition) {
    const current = this.view.getPosition();
    this.view.check(
      current <= pointerPosition,
      'insufficient space for grandchild pointer',
      { current, pointerPosition },
    );
    this.view.setPosition(pointerPosition);
    const pointer = readNodePointer(this.view);
    const { position, next } = pointer;
    if (next > 0) {
      this.populateRecord({
        childPointer: pointer,
      });
      this.view.setPosition(position + next);
      this.readNodes();
    }
  }
}

module.exports = ArtworksReader;
