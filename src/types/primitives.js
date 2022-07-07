/* eslint-disable no-bitwise */

const Constants = require('../constants');

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
  if (maskedTag === Constants.TAG_END
      || maskedTag === Constants.TAG_UNKNOWN
      || maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
    return { maskedTag, tag };
  }
  if (maskedTag === Constants.TAG_MOVE || maskedTag === Constants.TAG_LINE) {
    const p0 = readPoint(view);
    return { maskedTag, tag, points: [p0] };
  }
  if (maskedTag === Constants.TAG_BEZIER) {
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
    if (maskedTag === Constants.TAG_END) {
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

module.exports = {
  readPoint,
  readBoundingBox,
  readPolyline,
  readPathElement,
  readPath,
  readPaletteEntry,
  readPalette,
  readHeader,
  readNodePointer,
  readChildPointer,
};
