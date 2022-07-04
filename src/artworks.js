/* eslint-disable no-bitwise, max-classes-per-file */

const RECORD_00 = 0x00;
const RECORD_TEXT = 0x01;
const RECORD_PATH = 0x02;
const RECORD_SPRITE = 0x05;
const RECORD_GROUP = 0x06;
const RECORD_LAYER = 0x0A;
const RECORD_WORK_AREA = 0x21;
const RECORD_22 = 0x22;
const RECORD_SAVE_LOCATION = 0x23;
const RECORD_STROKE_COLOUR = 0x24;
const RECORD_STROKE_WIDTH = 0x25;
const RECORD_FILL_COLOUR = 0x26;
const RECORD_JOIN_STYLE = 0x27;
const RECORD_LINE_CAP_END = 0x28;
const RECORD_LINE_CAP_START = 0x29;
const RECORD_2A = 0x2A;
const RECORD_2B = 0x2B;
const RECORD_2C = 0x2C;
const RECORD_2E = 0x2E;
const RECORD_CHARACTER = 0x2D;
const RECORD_FONT_NAME = 0x2F;
const RECORD_FONT_SIZE = 0x30;
const RECORD_31 = 0x31;
const RECORD_32 = 0x32;
const RECORD_33 = 0x33;
const RECORD_34 = 0x34;
const RECORD_35 = 0x35;
const RECORD_37 = 0x37;
const RECORD_38 = 0x38;
const RECORD_FILE_INFO = 0x39;
const RECORD_3A = 0x3A;
const RECORD_3B = 0x3B;
const RECORD_3D = 0x3D;
const RECORD_3E = 0x3E;
const RECORD_3F = 0x3F;
const RECORD_42 = 0x42;

const FILL_FLAT = 0;
const FILL_LINEAR = 1;
const FILL_RADIAL = 2;

const CAP_BUTT = 0;
const CAP_ROUND = 1;
const CAP_SQUARE = 2;
const CAP_TRIANGLE = 3;

const STRING_LENGTH_LIMIT = 2048;

class ArtworksError extends Error {
  constructor(message, position, data) {
    super(message);
    this.name = 'ArtworksError';
    this.position = position;
    this.data = data;
  }
}

class ArtworksFile {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this.length = buffer.byteLength;
    this.position = 0;
  }

  getLength() {
    return this.length;
  }

  getPosition() {
    return this.position;
  }

  setPosition(v) {
    this.position = v;
  }

  check(condition, message, data = {}) {
    if (!condition) {
      throw new ArtworksError(message, this.getPosition(), data);
    }
  }

  fail(message, data = {}) {
    this.check(false, message, data);
  }

  checkAlignment(message, data = {}) {
    this.check(this.getPosition() % 4 === 0, message, data);
  }

  checkPositionAndSize(n) {
    this.check(this.position >= 0, 'reading off the start of a file');
    this.check(this.position <= this.getLength() - n, 'reading off the end of the file');
  }

  readByte() {
    this.checkPositionAndSize(1);
    const b = this.view.getUint8(this.position);
    this.position += 1;
    return b;
  }

  readBytes(n) {
    const result = [];
    for (let i = 0; i < n; i += 1) {
      result.push(this.readByte());
    }
    return result;
  }

  readUint() {
    this.checkAlignment('misaligned uint');
    this.checkPositionAndSize(4);
    const v = this.view.getUint32(this.position, true);
    this.position += 4;
    return v;
  }

  readInt() {
    this.checkAlignment('misaligned int');
    this.checkPositionAndSize(4);
    const v = this.view.getInt32(this.position, true);
    this.position += 4;
    return v;
  }

  readStringFully(n) {
    this.checkAlignment('misaligned string');
    const chars = [];
    for (let i = 0, terminated = false; i < n; i = 1 + i) {
      const c = this.readByte();
      if (c === 0) {
        terminated = true;
      } else if (!terminated) {
        chars.push(c);
      }
    }
    return String.fromCharCode(...chars);
  }

  readString(n = STRING_LENGTH_LIMIT) {
    this.checkAlignment('misaligned string');
    const chars = [];
    for (let i = 0; i < n; i = 1 + i) {
      const c = this.readByte();
      if (c === 0) {
        break;
      }
      chars.push(c);
    }
    return String.fromCharCode(...chars);
  }

  readPoint() {
    this.checkAlignment('misaligned point');
    const x = this.readInt();
    const y = this.readInt();
    return { x, y };
  }

  readBoundingBox() {
    this.checkAlignment('misaligned bounding box');
    const minX = this.readInt();
    const minY = this.readInt();
    const maxX = this.readInt();
    const maxY = this.readInt();
    return {
      minX, minY, maxX, maxY,
    };
  }

  readPolyline(n) {
    this.checkAlignment('misaligned polyline');
    const points = [];
    for (let i = 0; i < n; i += 1) {
      points.push(this.readPoint());
    }
    return points;
  }

  readPath() {
    this.checkAlignment('misaligned path');
    const path = [];
    for (;;) {
      const tag = this.readUint();
      const maskedTag = tag & 0xFF;
      if (maskedTag === 0) {
        break;
      } else if (maskedTag === 2) {
        const p0 = this.readPoint();
        path.push({
          tag: 'M',
          points: [p0],
        });
      } else if (maskedTag === 4) {
        // skip
      } else if (maskedTag === 5) {
        path.push({ tag: 'Z' });
      } else if (maskedTag === 6) {
        const p0 = this.readPoint();
        const p1 = this.readPoint();
        const p2 = this.readPoint();
        path.push({
          tag: 'C',
          points: [p0, p1, p2],
        });
      } else if (maskedTag === 8) {
        const p0 = this.readPoint();
        path.push({
          tag: 'L',
          points: [p0],
        });
      } else {
        this.fail('unsupported path tag', { tag: tag.toString(16) });
      }
    }
    return path;
  }

  readHeader() {
    this.checkAlignment('misaligned header');
    return {
      identifier: this.readStringFully(4),
      version: this.readUint(),
      program: this.readStringFully(8),
      unknown16: this.readUint(),
      bodyPosition: this.readUint(),
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
      ubufPosition: this.readInt(),
      spriteAreaPosition: this.readInt(),
      unknown48: this.readUint(),
      unknown52: this.readUint(),
      unknown56: this.readUint(),
      palettePosition: this.readInt(),
    };
  }

  readPaletteEntry() {
    this.checkAlignment('misaligned palette entry');
    return {
      name: this.readStringFully(24),
      colour: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
      unknown40: this.readUint(),
      unknown44: this.readUint(),
    };
  }

  readPalette() {
    this.checkAlignment('misaligned palette');
    const colours = [];
    const count = this.readUint() & 0x7FFFFFFF;
    const unknown4 = this.readUint() & 0x7FFFFFFF;
    for (let n = 0; n < count; n += 1) {
      colours.push(this.readPaletteEntry());
    }
    return {
      unknown4,
      colours,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  readRecord00() {
  }

  readRecordText({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
      unknown40: this.readUint(),
      unknown44: this.readUint(),
      rectangle: this.readPolyline(4),
    });
  }

  readRecordPath({ populateRecord }) {
    populateRecord({
      path: this.readPath(),
    });
  }

  readRecordSprite({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      name: this.readStringFully(12),
      unknown40: this.readUint(),
      unknown44: this.readUint(),
      unknown48: this.readInt(),
      unknown52: this.readInt(),
      unknown56: this.readInt(),
      unknown60: this.readInt(),
      unknown64: this.readInt(),
      unknown68: this.readInt(),
      unknown72: this.readUint(),
      unknown76: this.readUint(),
      unknown80: this.readUint(),
      unknown84: this.readUint(),
      unknown88: this.readUint(),
      unknown92: this.readUint(),
      unknown96: this.readUint(),
      unknown100: this.readUint(),
    });
    const palette = [];
    const count = this.readUint();
    for (let n = 0; n < count; n += 1) {
      palette.push(this.readUint());
    }
    populateRecord({ palette });
  }

  readRecordGroup({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
    });
  }

  readRecordLayer({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      name: this.readStringFully(32),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  readRecordWorkArea() {
  }

  // eslint-disable-next-line class-methods-use-this
  readRecord22() {
  }

  readRecordSaveLocation({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      saveLocation: this.readString(),
    });
  }

  readRecordStrokeColour({ populateRecord }) {
    populateRecord({
      strokeColour: this.readUint(),
    });
  }

  readRecordStrokeWidth({ populateRecord }) {
    populateRecord({
      strokeWidth: this.readUint(),
    });
  }

  readRecordFillColour({ populateRecord }) {
    const fillType = this.readUint();
    populateRecord({
      fillType,
      unknown28: this.readUint(),
    });
    if (fillType === FILL_FLAT) {
      populateRecord({
        colour: this.readUint(),
      });
    } else if (fillType === FILL_LINEAR) {
      populateRecord({
        gradientLine: this.readPolyline(2),
        startColour: this.readUint(),
        endColour: this.readUint(),
      });
    } else if (fillType === FILL_RADIAL) {
      populateRecord({
        gradientLine: this.readPolyline(2),
        startColour: this.readUint(),
        endColour: this.readUint(),
      });
    } else {
      this.fail('unsupported fill type', fillType);
    }
  }

  readRecordJoinStyle({ populateRecord }) {
    populateRecord({
      joinStyle: this.readUint(),
    });
  }

  readRecordLineCapEnd({ populateRecord }) {
    populateRecord({
      capStyle: this.readUint(),
      capTriangle: this.readUint(),
    });
  }

  readRecordLineCapStart({ populateRecord }) {
    populateRecord({
      capStyle: this.readUint(),
      capTriangle: this.readUint(),
    });
  }

  readRecord2A({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
    });
  }

  readRecord2B({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
    });
  }

  readRecord2C({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      path: this.readPath(),
    });
  }

  readRecord2E({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readStringFully(8),
      unknown36: this.readStringFully(24),
      unknown60: this.readInt(),
      unknown64: this.readInt(),
    });
  }

  readRecordCharacter({ populateRecord }) {
    populateRecord({
      characterCode: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
      unknown40: this.readUint(),
    });
  }

  readRecordFontName({ populateRecord }) {
    populateRecord({
      fontName: this.readString(),
    });
  }

  readRecordFontSize({ populateRecord }) {
    populateRecord({
      xSize: this.readUint(),
      ySize: this.readUint(),
    });
  }

  readRecord31({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
    });
  }

  readRecord32({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
    });
  }

  readRecord33({ populateRecord }) {
    populateRecord({
      unknown24: this.readInt(),
      unknown28: this.readInt(),
      unknown32: this.readInt(),
      unknown36: this.readInt(),
      unknown40: this.readInt(),
      unknown44: this.readInt(),
    });
  }

  readRecord34({ populateRecord }) {
    populateRecord({
      triangle: this.readPolyline(3),
      path: this.readPath(),
    });
  }

  readRecord35({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      triangle: this.readPolyline(3),
      path: this.readPath(),
    });
  }

  readRecord37({ populateRecord }) {
    populateRecord({
      path: this.readPath(),
    });
  }

  readRecord38({ populateRecord }) {
    populateRecord({
      path: this.readPath(),
      unknownTrailer: this.readBytes(68),
    });
  }

  readRecordFileInfo({ populateRecord }) {
    populateRecord({
      fileInfo: this.readString(),
    });
  }

  readRecord3A({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
      unknown40: this.readUint(),
      unknown44: this.readUint(),
      unknown48: this.readUint(),
      unknown52: this.readUint(),
      unknown56: this.readUint(),
      unknown60: this.readUint(),
      unknown64: this.readUint(),
    });
  }

  readRecord3B({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
      unknown36: this.readUint(),
      unknown40: this.readUint(),
      unknown44: this.readUint(),
      unknown48: this.readUint(),
      unknown52: this.readUint(),
      unknown56: this.readUint(),
      unknown60: this.readUint(),
    });
  }

  readRecord3D({ populateRecord }) {
    populateRecord({
      path: this.readPath(),
    });
  }

  readRecord3E({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
    });
  }

  readRecord3F({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      unknown28: this.readUint(),
      unknown32: this.readUint(),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  readRecord42() {
  }

  readRecord(callbacks, { next }) {
    const checkLast = (message) => {
      this.check(next === 0, message);
    };
    const { populateRecord, unsupportedRecord } = callbacks;
    const type = this.readUint();
    const unknown4 = this.readUint();
    const boundingBox = this.readBoundingBox();
    populateRecord({ type, boundingBox, unknown4 });
    switch (type & 0xFF) {
      case RECORD_00:
        this.readRecord00(callbacks);
        break;
      case RECORD_TEXT:
        this.readRecordText(callbacks);
        break;
      case RECORD_PATH:
        this.readRecordPath(callbacks);
        break;
      case RECORD_SPRITE:
        checkLast('records after sprite');
        this.readRecordSprite(callbacks);
        break;
      case RECORD_GROUP:
        this.readRecordGroup(callbacks);
        break;
      case RECORD_LAYER:
        this.readRecordLayer(callbacks);
        break;
      case RECORD_WORK_AREA:
        checkLast('records after work area');
        this.readRecordWorkArea(callbacks);
        break;
      case RECORD_22:
        checkLast('records after record 22');
        this.readRecord22(callbacks);
        break;
      case RECORD_SAVE_LOCATION:
        checkLast('records after save location');
        this.readRecordSaveLocation(callbacks);
        break;
      case RECORD_STROKE_COLOUR:
        checkLast('records after stroke colour');
        this.readRecordStrokeColour(callbacks);
        break;
      case RECORD_STROKE_WIDTH:
        checkLast('records after stroke width');
        this.readRecordStrokeWidth(callbacks);
        break;
      case RECORD_FILL_COLOUR:
        checkLast('records after fill colour');
        this.readRecordFillColour(callbacks);
        break;
      case RECORD_JOIN_STYLE:
        checkLast('records after join style');
        this.readRecordJoinStyle(callbacks);
        break;
      case RECORD_LINE_CAP_END:
        checkLast('records after end line cap');
        this.readRecordLineCapEnd(callbacks);
        break;
      case RECORD_LINE_CAP_START:
        checkLast('records after start line cap');
        this.readRecordLineCapStart(callbacks);
        break;
      case RECORD_2A:
        checkLast('records after record 2a');
        this.readRecord2A(callbacks);
        break;
      case RECORD_2B:
        checkLast('records after record 2b');
        this.readRecord2B(callbacks);
        break;
      case RECORD_2C:
        this.readRecord2C(callbacks);
        break;
      case RECORD_2E:
        checkLast('records after record 2e');
        this.readRecord2E(callbacks);
        break;
      case RECORD_CHARACTER:
        this.readRecordCharacter(callbacks);
        break;
      case RECORD_FONT_NAME:
        checkLast('records after font name');
        this.readRecordFontName(callbacks);
        break;
      case RECORD_FONT_SIZE:
        checkLast('records after font size');
        this.readRecordFontSize(callbacks);
        break;
      case RECORD_31:
        this.readRecord31(callbacks);
        break;
      case RECORD_32:
        checkLast('records after record 32');
        this.readRecord32(callbacks);
        break;
      case RECORD_33:
        this.readRecord33(callbacks);
        break;
      case RECORD_34:
        this.readRecord34(callbacks);
        break;
      case RECORD_35:
        this.readRecord35(callbacks);
        break;
      case RECORD_37:
        this.readRecord37(callbacks);
        break;
      case RECORD_38:
        this.readRecord38(callbacks);
        break;
      case RECORD_FILE_INFO:
        checkLast('records after file info');
        this.readRecordFileInfo(callbacks);
        break;
      case RECORD_3A:
        this.readRecord3A(callbacks);
        break;
      case RECORD_3B:
        checkLast('records after record 3b');
        this.readRecord3B(callbacks);
        break;
      case RECORD_3D:
        checkLast('records after 3d');
        this.readRecord3D(callbacks);
        break;
      case RECORD_3E:
        checkLast('records after record 3e');
        this.readRecord3E(callbacks);
        break;
      case RECORD_3F:
        checkLast('records after record 3f');
        this.readRecord3F(callbacks);
        break;
      case RECORD_42:
        this.readRecord42(callbacks);
        break;
      default:
        unsupportedRecord();
        break;
    }
  }

  checkPointer(pointer) {
    const { position, previous, next } = pointer;
    this.check(previous <= 0, 'positive previous pointer', pointer);
    this.check(next >= 0, 'negative next pointer', pointer);
    this.check(position + next < this.getLength(), 'next pointer would overrun', pointer);
  }

  readNodePointer() {
    const position = this.getPosition();
    const previous = this.readInt();
    const next = this.readInt();
    const pointer = { position, previous, next };
    this.checkPointer(pointer);
    return pointer;
  }

  readChildPointer() {
    const position = this.getPosition();
    const next = this.readInt();
    const previous = this.readInt();
    const pointer = { position, previous, next };
    this.checkPointer(pointer);
    return pointer;
  }

  readNodes(callbacks) {
    const { startRecord, finishRecord } = callbacks;
    for (;;) {
      const pointer = this.readNodePointer();
      const { position, next } = pointer;
      startRecord({ pointer });
      this.readChildren(callbacks);
      finishRecord();
      if (next === 0) {
        break;
      }
      this.setPosition(position + next);
    }
  }

  readChildren(callbacks) {
    const { startRecord, finishRecord } = callbacks;
    for (;;) {
      const pointer = this.readChildPointer();
      const { position, next } = pointer;
      startRecord({ pointer });
      this.readRecord(callbacks, pointer);
      if (next !== 0) {
        this.readGrandchildren(callbacks, position + next - 8);
      }
      finishRecord();
      if (next === 0) {
        break;
      }
      this.setPosition(position + next);
    }
  }

  readGrandchildren(callbacks, pointerPosition) {
    const { populateRecord } = callbacks;
    const current = this.getPosition();
    this.check(
      current <= pointerPosition,
      'insufficient space for grandchild pointer',
      { current, pointerPosition },
    );
    this.setPosition(pointerPosition);
    const pointer = this.readNodePointer();
    const { position, next } = pointer;
    if (next > 0) {
      populateRecord({
        childPointer: pointer,
      });
      this.setPosition(position + next);
      this.readNodes(callbacks);
    }
  }

  load() {
    const unsupported = [];
    const records = [];
    const stack = [];

    const checkStack = () => {
      this.check(stack.length !== 0, 'empty stack');
    };

    const startRecord = (data) => {
      stack.push({ ...data, children: [] });
    };

    const populateRecord = (data) => {
      checkStack();
      const { children, ...oldData } = stack.pop();
      stack.push({ ...oldData, ...data, children });
    };

    const finishRecord = () => {
      checkStack();
      if (stack.length > 1) {
        const child = stack.pop();
        const parent = stack.pop();
        parent.children.push(child);
        stack.push(parent);
      } else {
        records.push(stack.pop());
      }
    };

    const unsupportedRecord = () => {
      checkStack();
      const record = stack[stack.length - 1];
      unsupported.push(record);
    };

    try {
      this.setPosition(0);
      const header = this.readHeader();

      const { bodyPosition, palettePosition } = header;

      this.setPosition(bodyPosition);
      this.readNodes({
        startRecord,
        finishRecord,
        populateRecord,
        unsupportedRecord,
      });

      this.setPosition(palettePosition);
      const palette = this.readPalette();
      return {
        header,
        records,
        palette,
        unsupported,
      };
    } catch (error) {
      return {
        error,
        recordStack: stack,
      };
    }
  }
}

module.exports = {
  RECORD_00,
  RECORD_TEXT,
  RECORD_PATH,
  RECORD_SPRITE,
  RECORD_GROUP,
  RECORD_LAYER,
  RECORD_WORK_AREA,
  RECORD_22,
  RECORD_SAVE_LOCATION,
  RECORD_STROKE_COLOUR,
  RECORD_STROKE_WIDTH,
  RECORD_FILL_COLOUR,
  RECORD_JOIN_STYLE,
  RECORD_LINE_CAP_START,
  RECORD_LINE_CAP_END,
  RECORD_2A,
  RECORD_2B,
  RECORD_2C,
  RECORD_2E,
  RECORD_CHARACTER,
  RECORD_FONT_NAME,
  RECORD_FONT_SIZE,
  RECORD_31,
  RECORD_32,
  RECORD_33,
  RECORD_34,
  RECORD_35,
  RECORD_37,
  RECORD_38,
  RECORD_FILE_INFO,
  RECORD_3A,
  RECORD_3B,
  RECORD_3D,
  RECORD_3E,
  RECORD_3F,
  RECORD_42,

  FILL_FLAT,
  FILL_LINEAR,
  FILL_RADIAL,

  CAP_BUTT,
  CAP_ROUND,
  CAP_SQUARE,
  CAP_TRIANGLE,

  Artworks: {
    load(buffer) {
      return new ArtworksFile(Uint8Array.from(buffer).buffer).load();
    },
  },
};
