const UnsupportedRecordError = require('../exceptions/unsupported-record-error');

const Constants = require('../constants');

const {
  readColourIndex,
  writeColourIndex,
  readPolyline,
  writePolyline,
  readPath,
  writePath,
  readBoundingBox,
  readPalette,
  writePalette,
} = require('./primitives');

const { extractBitField } = require('../common/bitwise');

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

function createRecordGroup(unknown24, unknown28, unknown32) {
  return { unknown24, unknown28, unknown32 };
}

function readRecordGroup(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readUint32(),
    unknown32: view.readUint32(),
  };
}

function writeRecordGroup(view, { unknown24, unknown28, unknown32 }) {
  view.writeInt32(unknown24);
  view.writeInt32(unknown28);
  view.writeInt32(unknown32);
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

function readRecordWorkArea(view) {
  const paletteOffset = view.readInt32At(Constants.FILE_OFFSET_PALETTE_POSITION);
  if (paletteOffset < 0) {
    return {};
  }
  view.push(paletteOffset);
  const palette = readPalette(view);
  view.pop();
  return {
    palette,
  };
}

function writeRecordWorkArea(view, { palette }) {
  view.writeInt32At(Constants.FILE_OFFSET_PALETTE_POSITION, view.getPosition());
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
    strokeColour: readColourIndex(view),
  };
}

function writeRecordStrokeColour(view, { strokeColour }) {
  writeColourIndex(view, strokeColour);
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
      colour: readColourIndex(view),
    };
  }
  if (fillType === Constants.FILL_LINEAR || fillType === Constants.FILL_RADIAL) {
    return {
      gradientLine: readPolyline(view, 2),
      startColour: readColourIndex(view),
      endColour: readColourIndex(view),
    };
  }
  view.fail('unsupported fill type', fillType);
  return {};
}

function writeFillGradient(view, fillType, gradient) {
  if (fillType === Constants.FILL_FLAT) {
    writeColourIndex(view, gradient.colour);
  } else if (fillType === Constants.FILL_LINEAR || fillType === Constants.FILL_RADIAL) {
    writePolyline(view, gradient.gradientLine);
    writeColourIndex(view, gradient.startColour);
    writeColourIndex(view, gradient.endColour);
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

function createRecordRectangle(unknown24, path) {
  return { unknown24, path };
}

function readRecordRectangle(view) {
  return {
    unknown24: view.readUint32(),
    path: readPath(view),
  };
}

function writeRecordRectangle(view, { unknown24, path }) {
  view.writeUint32(unknown24);
  writePath(view, path);
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

function readRecord2E(view) {
  return {
    unknown24: view.readUint32(),
    unknown28: view.readStringFully(8),
    unknown36: view.readStringFully(24),
    unknown60: view.readInt32(),
    unknown64: view.readInt32(),
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

function createRecordEllipse(triangle, path) {
  return { triangle, path };
}

function readRecordEllipse(view) {
  return {
    triangle: readPolyline(view, 3),
    path: readPath(view),
  };
}

function writeRecordEllipse(view, { triangle, path }) {
  writePolyline(view, triangle);
  writePath(view, path);
}

function createRecordRoundedRectangle(cornerRadius, triangle, path) {
  return {
    cornerRadius,
    triangle,
    path,
  };
}

function readRecordRoundedRectangle(view) {
  return {
    cornerRadius: view.readUint32(),
    triangle: readPolyline(view, 3),
    path: readPath(view),
  };
}

function writeRecordRoundedRectangle(view, { cornerRadius, triangle, path }) {
  view.writeUint32(cornerRadius);
  writePolyline(view, triangle);
  writePath(view, path);
}

function readRecordDistortionGroup(view) {
  return {
    path: readPath(view),
    unknown156: view.readUint32(),
    unknown160: view.readUint32(),
    unknown164: view.readUint32(),
    unknown168: view.readUint32(),
    unknown172: view.readUint32(),
    unknown176: view.readUint32(),
    unknown180: view.readUint32(),
    unknown184: view.readUint32(),
    unknown188: view.readUint32(),
    originalObjectsBoundingBox: readBoundingBox(view),
  };
}

function readRecordPerspectiveGroup(view) {
  return {
    path: readPath(view),
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
    originalObjectsBoundingBox: readBoundingBox(view),
  };
}

function readRecordFileInfo(view) {
  return {
    fileInfo: view.readString(),
  };
}

function createRecordBlendGroup(
  unknown24,
  unknown28,
  unknown32,
  unknown36,
  unknown40,
  unknown44,
  unknown48,
  unknown52,
  unknown56,
  unknown60,
  unknown64,
) {
  return {
    unknown24,
    unknown28,
    unknown32,
    unknown36,
    unknown40,
    unknown44,
    unknown48,
    unknown52,
    unknown56,
    unknown60,
    unknown64,
  };
}

function readRecordBlendGroup(view) {
  return {
    unknown24: view.readInt32(),
    unknown28: view.readInt32(),
    unknown32: view.readInt32(),
    unknown36: view.readInt32(),
    unknown40: view.readInt32(),
    unknown44: view.readInt32(),
    unknown48: view.readInt32(),
    unknown52: view.readInt32(),
    unknown56: view.readInt32(),
    unknown60: view.readInt32(),
    unknown64: view.readInt32(),
  };
}

function writeRecordBlendGroup(view, record) {
  view.writeInt32(record.unknown24);
  view.writeInt32(record.unknown28);
  view.writeInt32(record.unknown32);
  view.writeInt32(record.unknown36);
  view.writeInt32(record.unknown40);
  view.writeInt32(record.unknown44);
  view.writeInt32(record.unknown48);
  view.writeInt32(record.unknown52);
  view.writeInt32(record.unknown56);
  view.writeInt32(record.unknown60);
  view.writeInt32(record.unknown64);
}

function createRecordBlendOptions(
  unknown24,
  blendSteps,
  unknown32,
  unknown36,
  unknown40,
  unknown44,
  unknown48,
  unknown52,
  unknown56,
  unknown60,
) {
  return {
    unknown24,
    blendSteps,
    unknown32,
    unknown36,
    unknown40,
    unknown44,
    unknown48,
    unknown52,
    unknown56,
    unknown60,
  };
}

function readRecordBlendOptions(view) {
  return {
    unknown24: view.readInt32(),
    blendSteps: view.readInt32(),
    unknown32: view.readInt32(),
    unknown36: view.readInt32(),
    unknown40: view.readInt32(),
    unknown44: view.readInt32(),
    unknown48: view.readInt32(),
    unknown52: view.readInt32(),
    unknown56: view.readInt32(),
    unknown60: view.readInt32(),
  };
}

function writeRecordBlendOptions(view, record) {
  view.writeInt32(record.unknown24);
  view.writeInt32(record.blendSteps);
  view.writeInt32(record.unknown32);
  view.writeInt32(record.unknown36);
  view.writeInt32(record.unknown40);
  view.writeInt32(record.unknown44);
  view.writeInt32(record.unknown48);
  view.writeInt32(record.unknown52);
  view.writeInt32(record.unknown56);
  view.writeInt32(record.unknown60);
}

function createRecordBlendPath(path) {
  return { path };
}

function readRecordBlendPath(view) {
  return {
    path: readPath(view),
  };
}

function writeRecordBlendPath(view, { path }) {
  writePath(view, path);
}

function createRecordMarkerStart(markerStyle, markerWidth, markerHeight) {
  return {
    markerStyle,
    markerWidth,
    markerHeight,
  };
}

function readRecordMarkerStart(view) {
  return {
    markerStyle: view.readInt32(),
    markerWidth: view.readUint32(),
    markerHeight: view.readUint32(),
  };
}

function writeRecordMarkerStart(view, { markerStyle, markerWidth, markerHeight }) {
  view.writeInt32(markerStyle);
  view.writeUint32(markerWidth);
  view.writeUint32(markerHeight);
}

function createRecordMarkerEnd(markerStyle, markerWidth, markerHeight) {
  return {
    markerStyle,
    markerWidth,
    markerHeight,
  };
}

function readRecordMarkerEnd(view) {
  return {
    markerStyle: view.readInt32(),
    markerWidth: view.readUint32(),
    markerHeight: view.readUint32(),
  };
}

function writeRecordMarkerEnd(view, { markerStyle, markerWidth, markerHeight }) {
  view.writeInt32(markerStyle);
  view.writeUint32(markerWidth);
  view.writeUint32(markerHeight);
}

function readRecordDistortionSubgroup() {
  return {};
}

function getUnsupportedRecordErrorMessage(type) {
  return `unsupported record ${type}, (0x${type.toString(16)})`;
}

function readRecordBody(view, header, pointer) {
  const isLast = () => pointer.next === 0;
  const checkLast = (message) => { view.check(isLast(), message); };
  const { type } = header;
  const maskedType = extractBitField(header.type, 0, 8);
  switch (maskedType) {
    case Constants.RECORD_00:
      return readRecord00(view);
    case Constants.RECORD_01_TEXT:
      return readRecordText(view);
    case Constants.RECORD_02_PATH:
      return readRecordPath(view);
    case Constants.RECORD_05_SPRITE:
      checkLast('records after sprite');
      return readRecordSprite(view);
    case Constants.RECORD_06_GROUP:
      return readRecordGroup(view);
    case Constants.RECORD_0A_LAYER:
      return readRecordLayer(view);
    case Constants.RECORD_21_WORK_AREA:
      checkLast('records after work area');
      return readRecordWorkArea(view);
    case Constants.RECORD_22:
      checkLast('records after record 22');
      return readRecord22(view);
    case Constants.RECORD_23_SAVE_LOCATION:
      checkLast('records after save location');
      return readRecordSaveLocation(view);
    case Constants.RECORD_24_STROKE_COLOUR:
      checkLast('records after stroke colour');
      return readRecordStrokeColour(view);
    case Constants.RECORD_25_STROKE_WIDTH:
      checkLast('records after stroke width');
      return readRecordStrokeWidth(view);
    case Constants.RECORD_26_FILL_COLOUR:
      checkLast('records after fill colour');
      return readRecordFillColour(view);
    case Constants.RECORD_27_JOIN_STYLE:
      checkLast('records after join style');
      return readRecordJoinStyle(view);
    case Constants.RECORD_28_LINE_CAP_END:
      checkLast('records after end line cap');
      return readRecordLineCapEnd(view);
    case Constants.RECORD_29_LINE_CAP_START:
      checkLast('records after start line cap');
      return readRecordLineCapStart(view);
    case Constants.RECORD_2A_WINDING_RULE:
      checkLast('records after winding rule');
      return readRecordWindingRule(view);
    case Constants.RECORD_2B_DASH_PATTERN:
      checkLast('records after record dash pattern');
      return readRecordDashPattern(view);
    case Constants.RECORD_2C_RECTANGLE:
      return readRecordRectangle(view);
    case Constants.RECORD_2D_CHARACTER:
      return readRecordCharacter(view);
    case Constants.RECORD_2E:
      checkLast('records after record 2e');
      return readRecord2E(view);
    case Constants.RECORD_2F_FONT_NAME:
      checkLast('records after font name');
      return readRecordFontName(view);
    case Constants.RECORD_30_FONT_SIZE:
      checkLast('records after font size');
      return readRecordFontSize(view);
    case Constants.RECORD_31:
      return readRecord31(view);
    case Constants.RECORD_32:
      checkLast('records after record 32');
      return readRecord32(view);
    case Constants.RECORD_33:
      return readRecord33(view);
    case Constants.RECORD_34_ELLIPSE:
      return readRecordEllipse(view);
    case Constants.RECORD_35_ROUNDED_RECTANGLE:
      return readRecordRoundedRectangle(view);
    case Constants.RECORD_37_DISTORTION_GROUP:
      return isLast() ? {} : readRecordDistortionGroup(view);
    case Constants.RECORD_38_PERSPECTIVE_GROUP:
      return isLast() ? {} : readRecordPerspectiveGroup(view);
    case Constants.RECORD_39_FILE_INFO:
      checkLast('records after file info');
      return readRecordFileInfo(view);
    case Constants.RECORD_3A_BLEND_GROUP:
      return readRecordBlendGroup(view);
    case Constants.RECORD_3B_BLEND_OPTIONS:
      checkLast('records after record 3b');
      return readRecordBlendOptions(view);
    case Constants.RECORD_3D_BLEND_PATH:
      checkLast('records after 3d');
      return readRecordBlendPath(view);
    case Constants.RECORD_3E_MARKER_START:
      checkLast('records after record marker start');
      return readRecordMarkerStart(view);
    case Constants.RECORD_3F_MARKER_END:
      checkLast('records after record marker end');
      return readRecordMarkerEnd(view);
    case Constants.RECORD_42_DISTORTION_SUBGROUP:
      return readRecordDistortionSubgroup();
    default:
      throw new UnsupportedRecordError(getUnsupportedRecordErrorMessage(type));
  }
}

function writeRecordBody(view, record) {
  const { type } = record;
  const maskedType = extractBitField(type, 0, 8);
  switch (maskedType) {
    case Constants.RECORD_02_PATH:
      writeRecordPath(view, record);
      break;
    case Constants.RECORD_0A_LAYER:
      writeRecordLayer(view, record);
      break;
    case Constants.RECORD_06_GROUP:
      writeRecordGroup(view, record);
      break;
    case Constants.RECORD_21_WORK_AREA:
      writeRecordWorkArea(view, record);
      break;
    case Constants.RECORD_24_STROKE_COLOUR:
      writeRecordStrokeColour(view, record);
      break;
    case Constants.RECORD_25_STROKE_WIDTH:
      writeRecordStrokeWidth(view, record);
      break;
    case Constants.RECORD_26_FILL_COLOUR:
      writeRecordFillColour(view, record);
      break;
    case Constants.RECORD_27_JOIN_STYLE:
      writeRecordJoinStyle(view, record);
      break;
    case Constants.RECORD_28_LINE_CAP_END:
      writeRecordLineCapEnd(view, record);
      break;
    case Constants.RECORD_29_LINE_CAP_START:
      writeRecordLineCapStart(view, record);
      break;
    case Constants.RECORD_2A_WINDING_RULE:
      writeRecordWindingRule(view, record);
      break;
    case Constants.RECORD_2B_DASH_PATTERN:
      writeRecordDashPattern(view, record);
      break;
    case Constants.RECORD_2C_RECTANGLE:
      writeRecordRectangle(view, record);
      break;
    case Constants.RECORD_34_ELLIPSE:
      writeRecordEllipse(view, record);
      break;
    case Constants.RECORD_35_ROUNDED_RECTANGLE:
      writeRecordRoundedRectangle(view, record);
      break;
    case Constants.RECORD_3A_BLEND_GROUP:
      writeRecordBlendGroup(view, record);
      break;
    case Constants.RECORD_3B_BLEND_OPTIONS:
      writeRecordBlendOptions(view, record);
      break;
    case Constants.RECORD_3D_BLEND_PATH:
      writeRecordBlendPath(view, record);
      break;
    case Constants.RECORD_3E_MARKER_START:
      writeRecordMarkerStart(view, record);
      break;
    case Constants.RECORD_3F_MARKER_END:
      writeRecordMarkerStart(view, record);
      break;
    default:
      throw new UnsupportedRecordError(getUnsupportedRecordErrorMessage(type));
  }
}

module.exports = {

  readRecord00,
  readRecordText,

  createRecordPath,
  readRecordPath,
  writeRecordPath,

  readSpritePalette,
  readRecordSprite,

  createRecordGroup,
  readRecordGroup,
  writeRecordGroup,

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

  createRecordRectangle,
  readRecordRectangle,
  writeRecordRectangle,

  readRecordCharacter,
  readRecord2E,
  readRecordFontName,
  readRecordFontSize,
  readRecord31,
  readRecord32,
  readRecord33,

  createRecordEllipse,
  readRecordEllipse,
  writeRecordEllipse,

  createRecordRoundedRectangle,
  readRecordRoundedRectangle,
  writeRecordRoundedRectangle,

  readRecordDistortionGroup,
  readRecordPerspectiveGroup,
  readRecordFileInfo,

  createRecordBlendGroup,
  readRecordBlendGroup,
  writeRecordBlendGroup,

  createRecordBlendOptions,
  readRecordBlendOptions,
  writeRecordBlendOptions,

  createRecordBlendPath,
  readRecordBlendPath,
  writeRecordBlendPath,

  createRecordMarkerStart,
  readRecordMarkerStart,
  writeRecordMarkerStart,

  createRecordMarkerEnd,
  readRecordMarkerEnd,
  writeRecordMarkerEnd,

  readRecordDistortionSubgroup,

  readRecordBody,
  writeRecordBody,
};
