/* eslint-disable no-bitwise */

const Constants = require('../constants');

function createColourIndex(colour) {
  return colour;
}

function readColourIndex(view) {
  view.checkAlignment('misaligned colour index');
  return view.readUint32();
}

function writeColourIndex(view, colour) {
  view.checkAlignment('misaligned colour index');
  view.writeUint32(colour);
}

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
  return { tag, ...(points && { points }) };
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
  component0,
  component1,
  component2,
  component3,
  flags,
) {
  return {
    name, colour, component0, component1, component2, component3, flags,
  };
}

function readPaletteEntry(view) {
  view.checkAlignment('misaligned palette entry');
  return {
    name: view.readStringFully(24),
    colour: view.readUint32(),
    component0: view.readUint32(),
    component1: view.readUint32(),
    component2: view.readUint32(),
    component3: view.readUint32(),
    flags: view.readUint32(),
  };
}

function writePaletteEntry(view, entry) {
  view.checkAlignment('misaligned palette entry');
  view.writeString(entry.name, 24);
  view.writeUint32(entry.colour);
  view.writeUint32(entry.component0);
  view.writeUint32(entry.component1);
  view.writeUint32(entry.component2);
  view.writeUint32(entry.component3);
  view.writeUint32(entry.flags);
}

function createPalette(entries) {
  return {
    count: entries.length,
    unknown4: entries.length,
    entries,
  };
}

function readPalette(view) {
  view.checkAlignment('misaligned palette');
  const count = view.readUint32() & 0x7FFFFFFF;
  const unknown4 = view.readUint32() & 0x7FFFFFFF;
  const entries = [];
  for (let n = 0; n < count; n += 1) {
    entries.push(readPaletteEntry(view));
  }
  return {
    count,
    unknown4,
    entries,
  };
}

function writePalette(view, palette) {
  view.checkAlignment('misaligned palette');
  const { count, unknown4, entries } = palette;
  view.writeUint32(count);
  view.writeUint32(unknown4);
  for (let i = 0; i < entries.length; i += 1) {
    writePaletteEntry(view, entries[i]);
  }
}

function createHeader(identifier, version, program, bodyPosition) {
  return {
    identifier, version, program, bodyPosition,
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
    europeanPaperWidth: view.readUint32(),
    europeanPaperHeight: view.readUint32(),
    unknown32: view.readUint32(),
    unknown36: view.readUint32(),
    ubufPosition: view.readInt32(),
    spriteAreaPosition: view.readInt32(),
    unknown48: view.readUint32(),
    americanPaperWidth: view.readUint32(),
    americanPaperHeight: view.readUint32(),
    palettePosition: view.readInt32(),
    unknown64: view.readUint32(),
    unknown68: view.readUint32(),
    unknown72: view.readUint32(),
    unknown76: view.readUint32(),
    unknown80: view.readUint32(),
    unknown84: view.readUint32(),
    unknown88: view.readUint32(),
  };
}

function writeHeader(view, header) {
  view.checkAlignment('misaligned header');
  view.writeString(header.identifier, 4);
  view.writeUint32(header.version);
  view.writeString(header.program, 8);
  view.writeUint32(header.unknown16 || 0);
  view.writeUint32(header.bodyPosition);
  view.writeUint32(header.europeanPaperWidth || 0);
  view.writeUint32(header.europeanPaperHeight || 0);
  view.writeUint32(header.unknown32 || 0);
  view.writeUint32(header.unknown36 || 0);
  view.writeInt32(-1); // undo buffer position
  view.writeInt32(-1); // sprite position
  view.writeUint32(header.unknown48 || 0);
  view.writeUint32(header.americanPaperWidth || 0);
  view.writeUint32(header.americanPaperHeight || 0);
  view.writeInt32(-1); // palette position
  view.writeUint32(header.unknown64 || 0);
  view.writeUint32(header.unknown68 || 0);
  view.writeUint32(header.unknown72 || 0);
  view.writeUint32(header.unknown76 || 0);
  view.writeUint32(header.unknown80 || 0);
  view.writeUint32(header.unknown84 || 0);
  view.writeUint32(header.unknown88 || 0);
}

function createListsPointer(position, previous, next) {
  return { position, previous, next };
}

function readListsPointer(view) {
  const position = view.getPosition();
  const previous = view.readInt32();
  const next = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function writeListsPointer(view, pointer) {
  view.checkPointer(pointer);
  const { position, previous, next } = pointer;
  view.writeInt32At(position, previous);
  view.writeInt32At(position + 4, next);
}

function createListPointer(position, previous, next) {
  return { position, previous, next };
}

function readListPointer(view) {
  const position = view.getPosition();
  const previous = view.readInt32();
  const next = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function writeListPointer(view, pointer) {
  view.checkPointer(pointer);
  const { position, previous, next } = pointer;
  view.writeInt32At(position, previous);
  view.writeInt32At(position + 4, next);
}

function createRecordPointer(position, previous, next) {
  return { position, previous, next };
}

function readRecordPointer(view) {
  const position = view.getPosition();
  const next = view.readInt32();
  const previous = view.readInt32();
  const pointer = { position, previous, next };
  view.checkPointer(pointer);
  return pointer;
}

function writeRecordPointer(view, pointer) {
  view.checkPointer(pointer);
  const { position, previous, next } = pointer;
  view.writeInt32At(position, next);
  view.writeInt32At(position + 4, previous);
}

module.exports = {
  createColourIndex,
  readColourIndex,
  writeColourIndex,

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
  writeHeader,

  createListsPointer,
  readListsPointer,
  writeListsPointer,

  createListPointer,
  readListPointer,
  writeListPointer,

  createRecordPointer,
  readRecordPointer,
  writeRecordPointer,
};
