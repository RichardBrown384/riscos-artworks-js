const Constants = require('../constants');

const {
  createNodePointer,
  writeNodePointer,
  createChildPointer,
  writeChildPointer,
} = require('../types/primitives');

const { writeRecordBody, writeRecordHeader } = require('../types/records');

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
    this.writeNodes(this.children);

    return this.view.getPosition();
  }

  writeNodes(children) {
    let previous = 0;
    for (let i = 0; i < children.length; i += 1) {
      const start = this.view.getPosition();
      this.view.setPosition(start + 8);
      this.writeChildren(children[i]);
      const end = this.view.getPosition();
      const next = (i < children.length - 1) ? end - start : 0;
      writeNodePointer(this.view, createNodePointer(start, previous, next));
      previous = -next;
    }
  }

  writeChildren(children) {
    let previous = 0;
    for (let i = 0; i < children.length; i += 1) {
      const start = this.view.getPosition();
      this.view.setPosition(start + 8);
      writeRecordHeader(this.view, children[i]);
      writeRecordBody(this.view, children[i]);
      if (i < children.length - 1) {
        const pointerPosition = this.view.getPosition();
        writeNodePointer(
          this.view,
          createNodePointer(pointerPosition, 0, 0),
        );
        this.view.setPosition(pointerPosition + 8);
      }
      const end = this.view.getPosition();
      const next = (i < children.length - 1) ? (end - start) : 0;
      writeChildPointer(this.view, createChildPointer(start, previous, next));
      previous = -next;
    }
  }
}

module.exports = ArtworksWriter;
