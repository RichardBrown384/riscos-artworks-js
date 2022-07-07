/* eslint-disable no-bitwise */

const UnsupportedRecordError = require('../exceptions/unsupported-record-error');

const Constants = require('../constants');

const {
  readPolyline,
  readPath,
  readBoundingBox,
} = require('./primitives');

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
      throw new UnsupportedRecordError();
  }
}

module.exports = {
  readRecord00,
  readRecordText,
  readRecordPath,
  readSpritePalette,
  readRecordSprite,
  readRecordGroup,
  readRecordLayer,
  readRecordWorkArea,
  readRecord22,
  readRecordSaveLocation,
  readRecordStrokeColour,
  readRecordStrokeWidth,
  readFillGradient,
  readRecordFillColour,
  readRecordJoinStyle,
  readRecordLineCapEnd,
  readRecordLineCapStart,
  readRecordWindingRule,
  readDashPattern,
  readRecordDashPattern,
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
  readRecordHeader,
  readRecordBody,
};
