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

const TAG_END = 0;
const TAG_MOVE = 2;
const TAG_UNKNOWN = 4;
const TAG_CLOSE_SUB_PATH = 5;
const TAG_BEZIER = 6;
const TAG_LINE = 8;

const STRING_LENGTH_LIMIT = 2048;

class ArtworksError extends Error {
  constructor(position, data, ...options) {
    super(...options);
    this.name = 'ArtworksError';
    this.position = position;
    this.data = data;
  }
}
class UnsupportedRecordError extends Error {}

function readPoint(view) {
  view.checkAlignment('misaligned point');
  return {
    x: view.readInt32(),
    y: view.readInt32(),
  };
}

function readBoundingBox(view) {
  view.checkAlignment('misaligned bounding box');
  return {
    minX: view.readInt32(),
    minY: view.readInt32(),
    maxX: view.readInt32(),
    maxY: view.readInt32(),
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

function readPathElement(view) {
  const tag = view.readUint32();
  const maskedTag = tag & 0xFF;
  if (maskedTag === TAG_END || maskedTag === TAG_UNKNOWN || maskedTag === TAG_CLOSE_SUB_PATH) {
    return { maskedTag, tag };
  }
  if (maskedTag === TAG_MOVE || maskedTag === TAG_LINE) {
    const p0 = readPoint(view);
    return { maskedTag, tag, points: [p0] };
  }
  if (maskedTag === TAG_BEZIER) {
    const p0 = readPoint(view);
    const p1 = readPoint(view);
    const p2 = readPoint(view);
    return { maskedTag, tag, points: [p0, p1, p2] };
  }
  view.fail('unsupported path tag', { tag: tag.toString(16) });
  return {};
}

function readPath(view) {
  view.checkAlignment('misaligned path');
  const path = [];
  for (; ;) {
    const { maskedTag, ...element } = readPathElement(view);
    path.push(element);
    if (maskedTag === TAG_END) {
      break;
    }
  }
  return path;
}

function readPaletteEntry(view) {
  view.checkAlignment('misaligned palette entry');
  return {
    name: view.readStringFully(24),
    colour: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    unknown40: view.readUint32(),
    unknown44: view.readUint32(),
  };
}

function readPalette(view) {
  view.checkAlignment('misaligned palette');
  const count = view.readUint32() & 0x7FFFFFFF;
  const unknown4 = view.readUint32() & 0x7FFFFFFF;
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
    version: view.readUint32(),
    program: view.readStringFully(8),
    unknown16: view.readUint32(),
    bodyPosition: view.readUint32(),
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    ubufPosition: view.readInt32(),
    spriteAreaPosition: view.readInt32(),
    unknown48: view.readUint32(),
    unknown52: view.readUint32(),
    unknown56: view.readUint32(),
    palettePosition: view.readInt32(),
  };
}

function readNodePointer(view) {
  const position = view.getPosition();
  const previous = view.readInt32();
  const next = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function readChildPointer(view) {
  const position = view.getPosition();
  const next = view.readInt32();
  const previous = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function readRecord00() {
  return {};
}

function readRecordText(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    unknown40: view.readUint32(),
    unknown44: view.readUint32(),
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
  const count = view.readUint32();
  for (let n = 0; n < count; n += 1) {
    palette.push(view.readUint32());
  }
  return palette;
}

function readRecordSprite(view) {
  return {
    unknown24: view.readUint32(),
    name: view.readStringFully(12),
    unknown40: view.readUint32(),
    unknown44: view.readUint32(),
    unknown48: view.readInt32(),
    unknown52: view.readInt32(),
    unknown56: view.readInt32(),
    unknown60: view.readInt32(),
    unknown64: view.readInt32(),
    unknown68: view.readInt32(),
    unknown72: view.readUint32(),
    unknown76: view.readUint32(),
    unknown80: view.readUint32(),
    unknown84: view.readUint32(),
    unknown88: view.readUint32(),
    unknown92: view.readUint32(),
    unknown96: view.readUint32(),
    unknown100: view.readUint32(),
    palette: readSpritePalette(view),
  };
}

function readRecordGroup(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
  };
}

function readRecordLayer(view) {
  return {
    unknown24: view.readUint32(),
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
    unknown24: view.readUint32(),
    saveLocation: view.readString(),
  };
}

function readRecordStrokeColour(view) {
  return {
    strokeColour: view.readUint32(),
  };
}

function readRecordStrokeWidth(view) {
  return {
    strokeWidth: view.readUint32(),
  };
}

function readFillGradient(view, fillType) {
  if (fillType === FILL_FLAT) {
    return {
      colour: view.readUint32(),
    };
  }
  if (fillType === FILL_LINEAR || fillType === FILL_RADIAL) {
    return {
      gradientLine: readPolyline(view, 2),
      startColour: view.readUint32(),
      endColour: view.readUint32(),
    };
  }
  view.fail('unsupported fill type', fillType);
  return {};
}

function readRecordFillColour(view) {
  const fillType = view.readUint32();
  return {
    fillType,
    unknown28: view.readUint32(),
    ...readFillGradient(view, fillType),
  };
}

function readRecordJoinStyle(view) {
  return {
    joinStyle: view.readUint32(),
  };
}

function readRecordLineCapEnd(view) {
  return {
    capStyle: view.readUint32(),
    capTriangle: view.readUint32(),
  };
}

function readRecordLineCapStart(view) {
  return {
    capStyle: view.readUint32(),
    capTriangle: view.readUint32(),
  };
}

function readRecordWindingRule(view) {
  return {
    windingRule: view.readUint32(),
  };
}

function readDashPattern(view, pattern) {
  if (pattern === 0) {
    return {};
  }
  const offset = view.readUint32();
  const count = view.readUint32();
  const array = [];
  for (let i = 0; i < count; i += 1) {
    array.push(view.readUint32());
  }
  return { offset, count, array };
}

function readRecordDashPattern(view) {
  const pattern = view.readUint32();
  return {
    pattern,
    ...readDashPattern(view, pattern),
  };
}

function readRecord2C(view) {
  return {
    unknown24: view.readUint32(),
    path: readPath(view),
  };
}

function readRecord2E(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readStringFully(8),
    unknown36: view.readStringFully(24),
    unknown60: view.readInt32(),
    unknown64: view.readInt32(),
  };
}

function readRecordCharacter(view) {
  return {
    characterCode: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    unknown40: view.readUint32(),
  };
}

function readRecordFontName(view) {
  return {
    fontName: view.readString(),
  };
}

function readRecordFontSize(view) {
  return {
    xSize: view.readUint32(),
    ySize: view.readUint32(),
  };
}

function readRecord31(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
  };
}

function readRecord32(view) {
  return {
    unknown24: view.readUint32(),
  };
}

function readRecord33(view) {
  return {
    unknown24: view.readInt32(),
    unknown28: view.readInt32(),
    unknown32: view.readInt32(),
    unknown36: view.readInt32(),
    unknown40: view.readInt32(),
    unknown44: view.readInt32(),
  };
}

function readRecord34(view) {
  return {
    triangle: readPolyline(view, 3),
    path: readPath(view),
  };
}

function readRecord35(view) {
  return {
    unknown24: view.readUint32(),
    triangle: readPolyline(view, 3),
    path: readPath(view),
  };
}

function readRecord37(view) {
  return {
    path: readPath(view),
  };
}

function readRecord38(view) {
  return {
    path: readPath(view),
    unknown88: view.readUint32(),
    unknown92: view.readUint32(),
    unknown96: view.readUint32(),
    unknown100: view.readUint32(),
    unknown104: view.readUint32(),
    unknown108: view.readUint32(),
    unknown112: view.readUint32(),
    unknown116: view.readUint32(),
    unknown120: view.readUint32(),
    unknown124: view.readUint32(),
    unknown128: view.readUint32(),
    unknown132: view.readUint32(),
    unknown136: view.readUint32(),
    unknown140: view.readUint32(),
    unknown144: view.readUint32(),
    unknown148: view.readUint32(),
    unknown152: view.readUint32(),
  };
}

function readRecordFileInfo(view) {
  return {
    fileInfo: view.readString(),
  };
}

function readRecord3A(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    unknown40: view.readUint32(),
    unknown44: view.readUint32(),
    unknown48: view.readUint32(),
    unknown52: view.readUint32(),
    unknown56: view.readUint32(),
    unknown60: view.readUint32(),
    unknown64: view.readUint32(),
  };
}

function readRecord3B(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    unknown40: view.readUint32(),
    unknown44: view.readUint32(),
    unknown48: view.readUint32(),
    unknown52: view.readUint32(),
    unknown56: view.readUint32(),
    unknown60: view.readUint32(),
  };
}

function readRecord3D(view) {
  return {
    path: readPath(view),
  };
}

function readRecord3E(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
  };
}

function readRecord3F(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
  };
}

function readRecord42() {
  return {};
}

function readRecordHeader(view) {
  return {
    type: view.readUint32(),
    unknown4: view.readUint32(),
    boundingBox: readBoundingBox(view),
  };
}

function readRecordBody(view, header, checkLast) {
  const { type } = header;
  switch (type & 0xFF) {
    case RECORD_00:
      return readRecord00(view);
    case RECORD_TEXT:
      return readRecordText(view);
    case RECORD_PATH:
      return readRecordPath(view);
    case RECORD_SPRITE:
      checkLast('records after sprite');
      return readRecordSprite(view);
    case RECORD_GROUP:
      return readRecordGroup(view);
    case RECORD_LAYER:
      return readRecordLayer(view);
    case RECORD_WORK_AREA:
      checkLast('records after work area');
      return readRecordWorkArea(view);
    case RECORD_22:
      checkLast('records after record 22');
      return readRecord22(view);
    case RECORD_SAVE_LOCATION:
      checkLast('records after save location');
      return readRecordSaveLocation(view);
    case RECORD_STROKE_COLOUR:
      checkLast('records after stroke colour');
      return readRecordStrokeColour(view);
    case RECORD_STROKE_WIDTH:
      checkLast('records after stroke width');
      return readRecordStrokeWidth(view);
    case RECORD_FILL_COLOUR:
      checkLast('records after fill colour');
      return readRecordFillColour(view);
    case RECORD_JOIN_STYLE:
      checkLast('records after join style');
      return readRecordJoinStyle(view);
    case RECORD_LINE_CAP_END:
      checkLast('records after end line cap');
      return readRecordLineCapEnd(view);
    case RECORD_LINE_CAP_START:
      checkLast('records after start line cap');
      return readRecordLineCapStart(view);
    case RECORD_WINDING_RULE:
      checkLast('records after winding rule');
      return readRecordWindingRule(view);
    case RECORD_DASH_PATTERN:
      checkLast('records after record dash pattern');
      return readRecordDashPattern(view);
    case RECORD_2C:
      return readRecord2C(view);
    case RECORD_2E:
      checkLast('records after record 2e');
      return readRecord2E(view);
    case RECORD_CHARACTER:
      return readRecordCharacter(view);
    case RECORD_FONT_NAME:
      checkLast('records after font name');
      return readRecordFontName(view);
    case RECORD_FONT_SIZE:
      checkLast('records after font size');
      return readRecordFontSize(view);
    case RECORD_31:
      return readRecord31(view);
    case RECORD_32:
      checkLast('records after record 32');
      return readRecord32(view);
    case RECORD_33:
      return readRecord33(view);
    case RECORD_34:
      return readRecord34(view);
    case RECORD_35:
      return readRecord35(view);
    case RECORD_37:
      return readRecord37(view);
    case RECORD_38:
      return readRecord38(view);
    case RECORD_FILE_INFO:
      checkLast('records after file info');
      return readRecordFileInfo(view);
    case RECORD_3A:
      return readRecord3A(view);
    case RECORD_3B:
      checkLast('records after record 3b');
      return readRecord3B(view);
    case RECORD_3D:
      checkLast('records after 3d');
      return readRecord3D(view);
    case RECORD_3E:
      checkLast('records after record 3e');
      return readRecord3E(view);
    case RECORD_3F:
      checkLast('records after record 3f');
      return readRecord3F(view);
    case RECORD_42:
      return readRecord42();
    default:
      throw new UnsupportedRecordError();
  }
}

class ArtworksFile {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this.length = buffer.byteLength;
    this.position = 0;
    // TODO temporary, so we can split to the two classes
    this.unsupported = [];
    this.records = [];
    this.stack = [];
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
      throw new ArtworksError(this.getPosition(), data, message);
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

  checkPointer(pointer) {
    const { position, previous, next } = pointer;
    this.check(previous <= 0, 'positive previous pointer', pointer);
    this.check(next >= 0, 'negative next pointer', pointer);
    this.check(position + next < this.getLength(), 'next pointer would overrun', pointer);
  }

  readUint8() {
    this.checkPositionAndSize(1);
    const b = this.view.getUint8(this.position);
    this.position += 1;
    return b;
  }

  readUint32() {
    this.checkAlignment('misaligned uint');
    this.checkPositionAndSize(4);
    const v = this.view.getUint32(this.position, true);
    this.position += 4;
    return v;
  }

  readInt32() {
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
      const c = this.readUint8();
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
      const c = this.readUint8();
      if (c === 0) {
        break;
      }
      chars.push(c);
    }
    return String.fromCharCode(...chars);
  }

  // TODO temporaries
  checkStack() {
    this.check(this.stack.length !== 0, 'empty stack');
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

  readRecordBody(header, checkLast) {
    try {
      this.populateRecord(readRecordBody(this, header, checkLast));
    } catch (e) {
      if (e instanceof UnsupportedRecordError) {
        this.unsupportedRecord();
      } else {
        throw e;
      }
    }
  }

  readNodes() {
    for (;;) {
      const pointer = readNodePointer(this);
      const { position, next } = pointer;
      this.startRecord({ pointer });
      this.readChildren();
      this.finishRecord();
      if (next === 0) {
        break;
      }
      this.setPosition(position + next);
    }
  }

  readChildren() {
    for (;;) {
      const pointer = readChildPointer(this);
      const header = readRecordHeader(this);
      const { position, next } = pointer;
      const checkLast = (message) => {
        this.check(next === 0, message);
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
      this.setPosition(position + next);
    }
  }

  readGrandchildren(pointerPosition) {
    const current = this.getPosition();
    this.check(
      current <= pointerPosition,
      'insufficient space for grandchild pointer',
      { current, pointerPosition },
    );
    this.setPosition(pointerPosition);
    const pointer = readNodePointer(this);
    const { position, next } = pointer;
    if (next > 0) {
      this.populateRecord({
        childPointer: pointer,
      });
      this.setPosition(position + next);
      this.readNodes();
    }
  }

  load() {
    try {
      this.setPosition(0);
      const header = readHeader(this);

      const { bodyPosition, palettePosition } = header;

      this.setPosition(bodyPosition);
      this.readNodes();

      this.setPosition(palettePosition);
      const palette = readPalette(this);
      return {
        header,
        records: this.records,
        palette,
        unsupported: this.unsupported,
      };
    } catch (error) {
      return {
        error,
        recordStack: this.stack,
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

  TAG_END,
  TAG_MOVE,
  TAG_UNKNOWN,
  TAG_CLOSE_SUB_PATH,
  TAG_BEZIER,
  TAG_LINE,

  Artworks: {
    load(buffer) {
      return new ArtworksFile(Uint8Array.from(buffer).buffer).load();
    },
  },
};
