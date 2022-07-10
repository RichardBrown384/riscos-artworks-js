/* eslint-disable no-bitwise */

const UnsupportedRecordError = require('../exceptions/unsupported-record-error');

const Constants = require('../constants');

const {
  readPolyline,
  readPath,
  writePath,
  readBoundingBox,
  writeBoundingBox,
  writePalette, writePolyline,
} = require('./primitives');

function createRecordHeader(type, unknown4, boundingBox) {
  return { type, unknown4, boundingBox };
}

function readRecordHeader(view) {
  view.checkAlignment('misaligned record header');
  return {
    type: view.readUint32(),
    unknown4: view.readUint32(),
    boundingBox: readBoundingBox(view),
  };
}

function writeRecordHeader(view, header) {
  view.checkAlignment('misaligned record header');
  const { type, unknown4, boundingBox } = header;
  view.writeUint32(type);
  view.writeUint32(unknown4);
  writeBoundingBox(view, boundingBox);
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

function createRecordPath(path) {
  return {
    path,
  };
}

function readRecordPath(view) {
  return {
    path: readPath(view),
  };
}

function writeRecordPath(view, { path }) {
  writePath(view, path);
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

function createRecordLayer(unknown24, name) {
  return {
    unknown24,
    name,
  };
}

function readRecordLayer(view) {
  return {
    unknown24: view.readUint32(),
    name: view.readStringFully(32),
  };
}

function writeRecordLayer(view, record) {
  const { unknown24, name } = record;
  view.writeUint32(unknown24);
  view.writeString(name, 32);
}

function createRecordWorkArea(palette) {
  return {
    palette,
  };
}

function readRecordWorkArea() {
  return {};
}

function writeRecordWorkArea(view, { palette }) {
  view.writeInt32At(Constants.FILE_OFFSET_PALETTE_OFFSET, view.getPosition());
  writePalette(view, palette);
}

function readRecord22() {
  return {};
}

function readRecordSaveLocation(view) {
  return {
    fileType: view.readUint32(),
    filePath: view.readString(),
  };
}

function createRecordStrokeColour(strokeColour) {
  return { strokeColour };
}

function readRecordStrokeColour(view) {
  return {
    strokeColour: view.readUint32(),
  };
}

function writeRecordStrokeColour(view, { strokeColour }) {
  view.writeUint32(strokeColour);
}

function createRecordStrokeWidth(strokeWidth) {
  return { strokeWidth };
}

function readRecordStrokeWidth(view) {
  return {
    strokeWidth: view.readUint32(),
  };
}

function writeRecordStrokeWidth(view, { strokeWidth }) {
  view.writeUint32(strokeWidth);
}

function createFillGradientFlat(colour) {
  return { colour };
}

function createFillGradientShaded(gradientLine, startColour, endColour) {
  return { gradientLine, startColour, endColour };
}

function readFillGradient(view, fillType) {
  if (fillType === Constants.FILL_FLAT) {
    return {
      colour: view.readUint32(),
    };
  }
  if (fillType === Constants.FILL_LINEAR || fillType === Constants.FILL_RADIAL) {
    return {
      gradientLine: readPolyline(view, 2),
      startColour: view.readUint32(),
      endColour: view.readUint32(),
    };
  }
  view.fail('unsupported fill type', fillType);
  return {};
}

function writeFillGradient(view, fillType, gradient) {
  if (fillType === Constants.FILL_FLAT) {
    view.writeUint32(gradient.colour);
  } else if (fillType === Constants.FILL_LINEAR || fillType === Constants.FILL_RADIAL) {
    writePolyline(view, gradient.gradientLine);
    view.writeUint32(gradient.startColour);
    view.writeUint32(gradient.endColour);
  } else {
    view.fail('unsupported fill type', fillType);
  }
}

function createRecordFillColour(fillType, unknown28, gradient) {
  return {
    fillType,
    unknown28,
    ...gradient,
  };
}

function readRecordFillColour(view) {
  const fillType = view.readUint32();
  return {
    fillType,
    unknown28: view.readUint32(),
    ...readFillGradient(view, fillType),
  };
}

function writeRecordFillColour(view, { fillType, unknown28, ...gradient }) {
  view.writeUint32(fillType);
  view.writeUint32(unknown28);
  writeFillGradient(view, fillType, gradient);
}

function createRecordJoinStyle(joinStyle) {
  return { joinStyle };
}

function readRecordJoinStyle(view) {
  return {
    joinStyle: view.readUint32(),
  };
}

function writeRecordJoinStyle(view, { joinStyle }) {
  view.writeUint32(joinStyle);
}

function createRecordLineCapEnd(capStyle, capTriangle) {
  return { capStyle, capTriangle };
}

function readRecordLineCapEnd(view) {
  return {
    capStyle: view.readUint32(),
    capTriangle: view.readUint32(),
  };
}

function writeRecordLineCapEnd(view, { capStyle, capTriangle }) {
  view.writeUint32(capStyle);
  view.writeUint32(capTriangle);
}

function createRecordLineCapStart(capStyle, capTriangle) {
  return { capStyle, capTriangle };
}

function readRecordLineCapStart(view) {
  return {
    capStyle: view.readUint32(),
    capTriangle: view.readUint32(),
  };
}

function writeRecordLineCapStart(view, { capStyle, capTriangle }) {
  view.writeUint32(capStyle);
  view.writeUint32(capTriangle);
}

function createRecordWindingRule(windingRule) {
  return { windingRule };
}

function readRecordWindingRule(view) {
  return {
    windingRule: view.readUint32(),
  };
}

function writeRecordWindingRule(view, { windingRule }) {
  view.writeUint32(windingRule);
}

function createDashPattern(offset, elements) {
  return {
    offset,
    count: elements.length,
    elements,
  };
}

function readDashPattern(view) {
  const offset = view.readUint32();
  const count = view.readUint32();
  const elements = [];
  for (let i = 0; i < count; i += 1) {
    elements.push(view.readUint32());
  }
  return { offset, count, elements };
}

function writeDashPattern(view, { offset, count, elements }) {
  view.check(count === elements.length, 'length of dash pattern array doesn\'t agree with the count');
  view.writeUint32(offset);
  view.writeUint32(count);
  for (let i = 0; i < count; i += 1) {
    view.writeUint32(elements[i]);
  }
}

function createRecordDashPatternEmpty() {
  return { pattern: 0 };
}

function createRecordDashPattern(offset, elements) {
  return {
    pattern: -1,
    ...createDashPattern(offset, elements),
  };
}

function readRecordDashPattern(view) {
  const pattern = view.readInt32();
  return {
    pattern,
    ...(pattern !== 0 && readDashPattern(view, pattern)),
  };
}

function writeRecordDashPattern(view, record) {
  const { pattern } = record;
  view.writeInt32(pattern);
  if (pattern === 0) {
    return;
  }
  writeDashPattern(view, record);
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

function getUnsupportedRecordErrorMessage(type) {
  return `unsupported record ${type}, (0x${type.toString(16)})`;
}

function readRecordBody(view, header, checkLast) {
  const { type } = header;
  switch (type & 0xFF) {
    case Constants.RECORD_00:
      return readRecord00(view);
    case Constants.RECORD_TEXT:
      return readRecordText(view);
    case Constants.RECORD_PATH:
      return readRecordPath(view);
    case Constants.RECORD_SPRITE:
      checkLast('types after sprite');
      return readRecordSprite(view);
    case Constants.RECORD_GROUP:
      return readRecordGroup(view);
    case Constants.RECORD_LAYER:
      return readRecordLayer(view);
    case Constants.RECORD_WORK_AREA:
      checkLast('types after work area');
      return readRecordWorkArea(view);
    case Constants.RECORD_22:
      checkLast('types after record 22');
      return readRecord22(view);
    case Constants.RECORD_SAVE_LOCATION:
      checkLast('types after save location');
      return readRecordSaveLocation(view);
    case Constants.RECORD_STROKE_COLOUR:
      checkLast('types after stroke colour');
      return readRecordStrokeColour(view);
    case Constants.RECORD_STROKE_WIDTH:
      checkLast('types after stroke width');
      return readRecordStrokeWidth(view);
    case Constants.RECORD_FILL_COLOUR:
      checkLast('types after fill colour');
      return readRecordFillColour(view);
    case Constants.RECORD_JOIN_STYLE:
      checkLast('types after join style');
      return readRecordJoinStyle(view);
    case Constants.RECORD_LINE_CAP_END:
      checkLast('types after end line cap');
      return readRecordLineCapEnd(view);
    case Constants.RECORD_LINE_CAP_START:
      checkLast('types after start line cap');
      return readRecordLineCapStart(view);
    case Constants.RECORD_WINDING_RULE:
      checkLast('types after winding rule');
      return readRecordWindingRule(view);
    case Constants.RECORD_DASH_PATTERN:
      checkLast('types after record dash pattern');
      return readRecordDashPattern(view);
    case Constants.RECORD_2C:
      return readRecord2C(view);
    case Constants.RECORD_2E:
      checkLast('types after record 2e');
      return readRecord2E(view);
    case Constants.RECORD_CHARACTER:
      return readRecordCharacter(view);
    case Constants.RECORD_FONT_NAME:
      checkLast('types after font name');
      return readRecordFontName(view);
    case Constants.RECORD_FONT_SIZE:
      checkLast('types after font size');
      return readRecordFontSize(view);
    case Constants.RECORD_31:
      return readRecord31(view);
    case Constants.RECORD_32:
      checkLast('types after record 32');
      return readRecord32(view);
    case Constants.RECORD_33:
      return readRecord33(view);
    case Constants.RECORD_34:
      return readRecord34(view);
    case Constants.RECORD_35:
      return readRecord35(view);
    case Constants.RECORD_37:
      return readRecord37(view);
    case Constants.RECORD_38:
      return readRecord38(view);
    case Constants.RECORD_FILE_INFO:
      checkLast('types after file info');
      return readRecordFileInfo(view);
    case Constants.RECORD_3A:
      return readRecord3A(view);
    case Constants.RECORD_3B:
      checkLast('types after record 3b');
      return readRecord3B(view);
    case Constants.RECORD_3D:
      checkLast('types after 3d');
      return readRecord3D(view);
    case Constants.RECORD_3E:
      checkLast('types after record 3e');
      return readRecord3E(view);
    case Constants.RECORD_3F:
      checkLast('types after record 3f');
      return readRecord3F(view);
    case Constants.RECORD_42:
      return readRecord42();
    default:
      throw new UnsupportedRecordError(getUnsupportedRecordErrorMessage(type));
  }
}

function writeRecordBody(view, record) {
  const { type } = record;
  switch (type) {
    case Constants.RECORD_PATH:
      writeRecordPath(view, record);
      break;
    case Constants.RECORD_LAYER:
      writeRecordLayer(view, record);
      break;
    case Constants.RECORD_WORK_AREA:
      writeRecordWorkArea(view, record);
      break;
    case Constants.RECORD_STROKE_COLOUR:
      writeRecordStrokeColour(view, record);
      break;
    case Constants.RECORD_STROKE_WIDTH:
      writeRecordStrokeWidth(view, record);
      break;
    case Constants.RECORD_FILL_COLOUR:
      writeRecordFillColour(view, record);
      break;
    case Constants.RECORD_JOIN_STYLE:
      writeRecordJoinStyle(view, record);
      break;
    case Constants.RECORD_LINE_CAP_END:
      writeRecordLineCapEnd(view, record);
      break;
    case Constants.RECORD_LINE_CAP_START:
      writeRecordLineCapStart(view, record);
      break;
    case Constants.RECORD_WINDING_RULE:
      writeRecordWindingRule(view, record);
      break;
    case Constants.RECORD_DASH_PATTERN:
      writeRecordDashPattern(view, record);
      break;
    default:
      throw new UnsupportedRecordError(getUnsupportedRecordErrorMessage(type));
  }
}

module.exports = {

  createRecordHeader,
  readRecordHeader,
  writeRecordHeader,

  readRecord00,
  readRecordText,

  createRecordPath,
  readRecordPath,
  writeRecordPath,

  readSpritePalette,
  readRecordSprite,
  readRecordGroup,

  createRecordLayer,
  readRecordLayer,
  writeRecordLayer,

  createRecordWorkArea,
  readRecordWorkArea,
  writeRecordWorkArea,

  readRecord22,
  readRecordSaveLocation,

  createRecordStrokeColour,
  readRecordStrokeColour,
  writeRecordStrokeColour,

  createRecordStrokeWidth,
  readRecordStrokeWidth,
  writeRecordStrokeWidth,

  createFillGradientFlat,
  createFillGradientShaded,
  readFillGradient,
  writeFillGradient,

  createRecordFillColour,
  readRecordFillColour,
  writeRecordFillColour,

  createRecordJoinStyle,
  readRecordJoinStyle,
  writeRecordJoinStyle,

  createRecordLineCapEnd,
  readRecordLineCapEnd,
  writeRecordLineCapEnd,

  createRecordLineCapStart,
  readRecordLineCapStart,
  writeRecordLineCapStart,

  createRecordWindingRule,
  readRecordWindingRule,
  writeRecordWindingRule,

  createDashPattern,
  readDashPattern,
  writeDashPattern,

  createRecordDashPatternEmpty,
  createRecordDashPattern,
  readRecordDashPattern,
  writeRecordDashPattern,

  readRecord2C,
  readRecord2E,
  readRecordCharacter,
  readRecordFontName,
  readRecordFontSize,
  readRecord31,
  readRecord32,
  readRecord33,
  readRecord34,
  readRecord35,
  readRecord37,
  readRecord38,
  readRecordFileInfo,
  readRecord3A,
  readRecord3B,
  readRecord3D,
  readRecord3E,
  readRecord3F,
  readRecord42,

  readRecordBody,
  writeRecordBody,
};