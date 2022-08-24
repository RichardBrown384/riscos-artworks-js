const Constants = require('../constants');
const { extractBitField } = require('../common/bitwise');

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
  const maskedTag = extractBitField(tag, 0, 8);
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
  const count = view.readUint32();
  const unknown4 = view.readUint32();
  const entries = [];
  for (let n = 0; n < count; n += 1) {
    entries.push(readPaletteEntry(view));
  }
  return {
    count: extractBitField(count, 0, 24),
    unknown4: extractBitField(unknown4, 0, 24),
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
};
