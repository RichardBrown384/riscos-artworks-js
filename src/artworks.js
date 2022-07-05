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
const RECORD_WINDING_RULE = 0x2A;
const RECORD_DASH_PATTERN = 0x2B;
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

const JOIN_MITRE = 0;
const JOIN_ROUND = 1;
const JOIN_BEVEL = 2;

const CAP_BUTT = 0;
const CAP_ROUND = 1;
const CAP_SQUARE = 2;
const CAP_TRIANGLE = 3;

const WINDING_RULE_NON_ZERO = 0;
const WINDING_RULE_EVEN_ODD = 1;

const STRING_LENGTH_LIMIT = 2048;

class ArtworksError extends Error {
  constructor(message, position, data) {
    super(message);
    this.name = 'ArtworksError';
    this.position = position;
    this.data = data;
  }
}

function readPoint(view) {
  view.checkAlignment('misaligned point');
  return {
    x: view.readInt(),
    y: view.readInt(),
  };
}

function readBoundingBox(view) {
  view.checkAlignment('misaligned bounding box');
  return {
    minX: view.readInt(),
    minY: view.readInt(),
    maxX: view.readInt(),
    maxY: view.readInt(),
  };
}

function readPolyline(view, n) {
  view.checkAlignment('misaligned polyline');
  const points = [];
  for (let i = 0; i < n; i += 1) {
    points.push(readPoint(view));
  }
  return points;
}

function readPath(view) {
  view.checkAlignment('misaligned path');
  const path = [];
  for (; ;) {
    const tag = view.readUint();
    const maskedTag = tag & 0xFF;
    if (maskedTag === 0) {
      break;
    } else if (maskedTag === 2) {
      const p0 = readPoint(view);
      path.push({
        tag: 'M',
        points: [p0],
      });
    } else if (maskedTag === 4) {
      // skip
    } else if (maskedTag === 5) {
      path.push({ tag: 'Z' });
    } else if (maskedTag === 6) {
      const p0 = readPoint(view);
      const p1 = readPoint(view);
      const p2 = readPoint(view);
      path.push({
        tag: 'C',
        points: [p0, p1, p2],
      });
    } else if (maskedTag === 8) {
      const p0 = readPoint(view);
      path.push({
        tag: 'L',
        points: [p0],
      });
    } else {
      view.fail('unsupported path tag', { tag: tag.toString(16) });
    }
  }
  return path;
}

function readPaletteEntry(view) {
  view.checkAlignment('misaligned palette entry');
  return {
    name: view.readStringFully(24),
    colour: view.readUint(),
    unknown28: view.readUint(),
    unknown32: view.readUint(),
    unknown36: view.readUint(),
    unknown40: view.readUint(),
    unknown44: view.readUint(),
  };
}

function readPalette(view) {
  view.checkAlignment('misaligned palette');
  const count = view.readUint() & 0x7FFFFFFF;
  const unknown4 = view.readUint() & 0x7FFFFFFF;
  const colours = [];
  for (let n = 0; n < count; n += 1) {
    colours.push(readPaletteEntry(view));
  }
  return {
    count,
    unknown4,
    colours,
  };
}

function readHeader(view) {
  view.checkAlignment('misaligned header');
  return {
    identifier: view.readStringFully(4),
    version: view.readUint(),
    program: view.readStringFully(8),
    unknown16: view.readUint(),
    bodyPosition: view.readUint(),
    unknown24: view.readUint(),
    unknown28: view.readUint(),
    unknown32: view.readUint(),
    unknown36: view.readUint(),
    ubufPosition: view.readInt(),
    spriteAreaPosition: view.readInt(),
    unknown48: view.readUint(),
    unknown52: view.readUint(),
    unknown56: view.readUint(),
    palettePosition: view.readInt(),
  };
}

function readRecord00() {
  return {};
}

function readRecordText(view) {
  return {
    unknown24: view.readUint(),
    unknown28: view.readUint(),
    unknown32: view.readUint(),
    unknown36: view.readUint(),
    unknown40: view.readUint(),
    unknown44: view.readUint(),
    rectangle: readPolyline(view, 4),
  };
}

function readRecordPath(view) {
  return {
    path: readPath(view),
  };
}

function readSpritePalette(view) {
  const palette = [];
  const count = view.readUint();
  for (let n = 0; n < count; n += 1) {
    palette.push(view.readUint());
  }
  return palette;
}

function readRecordSprite(view) {
  return {
    unknown24: view.readUint(),
    name: view.readStringFully(12),
    unknown40: view.readUint(),
    unknown44: view.readUint(),
    unknown48: view.readInt(),
    unknown52: view.readInt(),
    unknown56: view.readInt(),
    unknown60: view.readInt(),
    unknown64: view.readInt(),
    unknown68: view.readInt(),
    unknown72: view.readUint(),
    unknown76: view.readUint(),
    unknown80: view.readUint(),
    unknown84: view.readUint(),
    unknown88: view.readUint(),
    unknown92: view.readUint(),
    unknown96: view.readUint(),
    unknown100: view.readUint(),
    palette: readSpritePalette(view),
  };
}

function readRecordGroup(view) {
  return {
    unknown24: view.readUint(),
    unknown28: view.readUint(),
    unknown32: view.readUint(),
  };
}

function readRecordLayer(view) {
  return {
    unknown24: view.readUint(),
    name: view.readStringFully(32),
  };
}

function readRecordWorkArea() {
  return {};
}

function readRecord22() {
  return {};
}

function readRecordSaveLocation(view) {
  return {
    unknown24: view.readUint(),
    saveLocation: view.readString(),
  };
}

function readRecordStrokeColour(view) {
  return {
    strokeColour: view.readUint(),
  };
}

function readRecordStrokeWidth(view) {
  return {
    strokeWidth: view.readUint(),
  };
}

function readFillGradient(view, fillType) {
  if (fillType === FILL_FLAT) {
    return {
      colour: view.readUint(),
    };
  }
  if (fillType === FILL_LINEAR || fillType === FILL_RADIAL) {
    return {
      gradientLine: readPolyline(view, 2),
      startColour: view.readUint(),
      endColour: view.readUint(),
    };
  }
  view.fail('unsupported fill type', fillType);
  return {};
}

function readRecordFillColour(view) {
  const fillType = view.readUint();
  return {
    fillType,
    unknown28: view.readUint(),
    ...readFillGradient(view, fillType),
  };
}

function readRecordJoinStyle(view) {
  return {
    joinStyle: view.readUint(),
  };
}

function readRecordLineCapEnd(view) {
  return {
    capStyle: view.readUint(),
    capTriangle: view.readUint(),
  };
}

function readRecordLineCapStart(view) {
  return {
    capStyle: view.readUint(),
    capTriangle: view.readUint(),
  };
}

function readRecordWindingRule(view) {
  return {
    windingRule: view.readUint(),
  };
}

function readDashPattern(view, pattern) {
  if (pattern === 0) {
    return {};
  }
  const offset = view.readUint();
  const count = view.readUint();
  const array = [];
  for (let i = 0; i < count; i += 1) {
    array.push(view.readUint());
  }
  return { offset, count, array };
}

function readRecordDashPattern(view) {
  const pattern = view.readUint();
  return {
    pattern,
    ...readDashPattern(view, pattern),
  };
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

  readRecord2C({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      path: readPath(this),
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
      triangle: readPolyline(this, 3),
      path: readPath(this),
    });
  }

  readRecord35({ populateRecord }) {
    populateRecord({
      unknown24: this.readUint(),
      triangle: readPolyline(this, 3),
      path: readPath(this),
    });
  }

  readRecord37({ populateRecord }) {
    populateRecord({
      path: readPath(this),
    });
  }

  readRecord38({ populateRecord }) {
    populateRecord({
      path: readPath(this),
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
      path: readPath(this),
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
    const boundingBox = readBoundingBox(this);
    populateRecord({ type, boundingBox, unknown4 });
    switch (type & 0xFF) {
      case RECORD_00:
        populateRecord(readRecord00(this));
        break;
      case RECORD_TEXT:
        populateRecord(readRecordText(this));
        break;
      case RECORD_PATH:
        populateRecord(readRecordPath(this));
        break;
      case RECORD_SPRITE:
        checkLast('records after sprite');
        populateRecord(readRecordSprite(this));
        break;
      case RECORD_GROUP:
        populateRecord(readRecordGroup(this));
        break;
      case RECORD_LAYER:
        populateRecord(readRecordLayer(this));
        break;
      case RECORD_WORK_AREA:
        checkLast('records after work area');
        populateRecord(readRecordWorkArea(this));
        break;
      case RECORD_22:
        checkLast('records after record 22');
        populateRecord(readRecord22(this));
        break;
      case RECORD_SAVE_LOCATION:
        checkLast('records after save location');
        populateRecord(readRecordSaveLocation(this));
        break;
      case RECORD_STROKE_COLOUR:
        checkLast('records after stroke colour');
        populateRecord(readRecordStrokeColour(this));
        break;
      case RECORD_STROKE_WIDTH:
        checkLast('records after stroke width');
        populateRecord(readRecordStrokeWidth(this));
        break;
      case RECORD_FILL_COLOUR:
        checkLast('records after fill colour');
        populateRecord(readRecordFillColour(this));
        break;
      case RECORD_JOIN_STYLE:
        checkLast('records after join style');
        populateRecord(readRecordJoinStyle(this));
        break;
      case RECORD_LINE_CAP_END:
        checkLast('records after end line cap');
        populateRecord(readRecordLineCapEnd(this));
        break;
      case RECORD_LINE_CAP_START:
        checkLast('records after start line cap');
        populateRecord(readRecordLineCapStart(this));
        break;
      case RECORD_WINDING_RULE:
        checkLast('records after winding rule');
        populateRecord(readRecordWindingRule(this));
        break;
      case RECORD_DASH_PATTERN:
        checkLast('records after record dash pattern');
        populateRecord(readRecordDashPattern(this));
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
      const header = readHeader(this);

      const { bodyPosition, palettePosition } = header;

      this.setPosition(bodyPosition);
      this.readNodes({
        startRecord,
        finishRecord,
        populateRecord,
        unsupportedRecord,
      });

      this.setPosition(palettePosition);
      const palette = readPalette(this);
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
  RECORD_WINDING_RULE,
  RECORD_DASH_PATTERN,
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

  JOIN_MITRE,
  JOIN_ROUND,
  JOIN_BEVEL,

  CAP_BUTT,
  CAP_ROUND,
  CAP_SQUARE,
  CAP_TRIANGLE,

  WINDING_RULE_NON_ZERO,
  WINDING_RULE_EVEN_ODD,

  Artworks: {
    load(buffer) {
      return new ArtworksFile(Uint8Array.from(buffer).buffer).load();
    },
  },
};
