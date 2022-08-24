const { writeBoundingBox, readBoundingBox } = require('./primitives');

function createArtworks(header, children) {
  return { header, children };
}

function createArtworksHeader(identifier, version, program, bodyPosition) {
  return {
    identifier, version, program, bodyPosition,
  };
}

function readArtworksHeader(view) {
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

function writeArtworksHeader(view, header) {
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

function createRecord(pointer, header, body, children) {
  return {
    ...(pointer && { pointer }),
    ...header,
    ...body,
    children,
  };
}

function createLists(lists) {
  return lists;
}

function createList(pointer, list) {
  return {
    ...(pointer && { pointer }),
    children: list,
  };
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
  createArtworks,

  createArtworksHeader,
  readArtworksHeader,
  writeArtworksHeader,

  createRecordHeader,
  readRecordHeader,
  writeRecordHeader,

  createRecord,

  createLists,

  createList,

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
