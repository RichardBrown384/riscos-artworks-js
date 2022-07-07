/* eslint-disable no-bitwise */

const Constants = require('../constants');

function createPoint(x, y) {
  return { x, y };
}

function readPoint(view) {
  view.checkAlignment('misaligned point');
  return {
    x: view.readInt32(),
    y: view.readInt32(),
  };
}

function writePoint(view, { x, y }) {
  view.checkAlignment('misaligned point');
  view.writeInt32(x);
  view.writeInt32(y);
}

function createBoundingBox(minX, minY, maxX, maxY) {
  return {
    minX, minY, maxX, maxY,
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

function writeBoundingBox(view, {
  minX, minY, maxX, maxY,
}) {
  view.checkAlignment('misaligned bounding box');
  view.writeInt32(minX);
  view.writeInt32(minY);
  view.writeInt32(maxX);
  view.writeInt32(maxY);
}

function createPolyline(points) {
  return points;
}

function readPolyline(view, n) {
  view.checkAlignment('misaligned polyline');
  const points = [];
  for (let i = 0; i < n; i += 1) {
    points.push(readPoint(view));
  }
  return points;
}

function writePolyline(view, polyline) {
  view.checkAlignment('misaligned polyline');
  for (let i = 0; i < polyline.length; i += 1) {
    writePoint(view, polyline[i]);
  }
}

function createPathElement(tag, points) {
  return { tag, points };
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

function writePathElement(view, element) {
  const { tag, points = [] } = element;
  view.writeUint32(tag);
  for (let i = 0; i < points.length; i += 1) {
    writePoint(view, points[i]);
  }
}

function createPath(elements) {
  return elements;
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

function writePath(view, path) {
  view.checkAlignment('misaligned path');
  for (let i = 0; i < path.length; i += 1) {
    writePathElement(view, path[i]);
  }
}

function createPaletteEntry(
  name,
  colour,
  unknown28,
  unknown32,
  unknown36,
  unknown40,
  unknown44,
) {
  return {
    name, colour, unknown28, unknown32, unknown36, unknown40, unknown44,
  };
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

function writePaletteEntry(view, entry) {
  view.checkAlignment('misaligned palette entry');
  view.writeString(entry.name, 24);
  view.writeInt32(entry.colour);
  view.writeInt32(entry.unknown28);
  view.writeInt32(entry.unknown32);
  view.writeInt32(entry.unknown36);
  view.writeInt32(entry.unknown40);
  view.writeInt32(entry.unknown44);
}

function createPalette(entries) {
  return {
    count: entries.length,
    unknown4: entries.length,
    colours: entries, // TODO create issue to rename
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

function writePalette(view, palette) {
  view.checkAlignment('misaligned palette');
  const { count, unknown4, colours } = palette;
  view.writeUint32(count);
  view.writeUint32(unknown4);
  for (let i = 0; i < colours.length; i += 1) {
    writePaletteEntry(view, colours[i]);
  }
}

function createHeader(identifier, version, program) {
  return { identifier, version, program };
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

function createNodePointer(position, previous, next) {
  return { position, previous, next };
}

function readNodePointer(view) {
  const position = view.getPosition();
  const previous = view.readInt32();
  const next = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function writeNodePointer(view, pointer) {
  view.checkPointer(pointer);
  const { position, previous, next } = pointer;
  view.writeInt32At(position, previous);
  view.writeInt32At(position + 4, next);
}

function createChildPointer(position, previous, next) {
  return { position, previous, next };
}

function readChildPointer(view) {
  const position = view.getPosition();
  const next = view.readInt32();
  const previous = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function writeChildPointer(view, pointer) {
  view.checkPointer(pointer);
  const { position, previous, next } = pointer;
  view.writeInt32At(position, next);
  view.writeInt32At(position + 4, previous);
}

module.exports = {
  createPoint,
  readPoint,
  writePoint,

  createBoundingBox,
  readBoundingBox,
  writeBoundingBox,

  createPolyline,
  readPolyline,
  writePolyline,

  createPathElement,
  readPathElement,
  writePathElement,

  createPath,
  readPath,
  writePath,

  createPaletteEntry,
  readPaletteEntry,
  writePaletteEntry,

  createPalette,
  readPalette,
  writePalette,

  createHeader,
  readHeader,

  createNodePointer,
  readNodePointer,
  writeNodePointer,

  createChildPointer,
  readChildPointer,
  writeChildPointer,
};
