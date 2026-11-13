import { check } from '@rbrown/check';
import type { BoundingBox, Point } from '@rbrown/geometry';
import { BinaryReader } from '@rbrown/io';

import {
  OUTLINE_SEGMENT_TAG,
  type Character,
  type Characters,
  type Chunk,
  type Chunks,
  type Composite,
  type FontPathSegment,
  type Outlines,
  type OutlinesHeader,
  type Scaffold,
  type ScaffoldData,
  type ScaffoldLine,
  type ScaffoldLines,
  type Scaffolds,
} from './font-outlines-types.js';

const IDENTIFIER_FONT = 'FONT';

function isBitSet(v: number, n: number): boolean {
  return ((v >>> n) & 1) !== 0;
}

function extractBitField(v: number, n: number, width: number): number {
  return (v >>> n) & ((1 << width) - 1);
}

function signExtend12(v: number): number {
  return ((v & 0xfff) ^ 0x800) - 0x800;
}

function readCharacter(buffer: ArrayBuffer, position: number): Character {
  const d = new BinaryReader(buffer, position);

  const flags = d.u8();

  const has12BitCoordinates = isBitSet(flags, 0);
  const isOutline = isBitSet(flags, 3);
  const hasCompositeBaseCharacter = isBitSet(flags, 4);
  const hasCompositeAccentCharacter = isBitSet(flags, 5);
  const has16BitCharacterCodes = isBitSet(flags, 6);

  check(isOutline, 'Bitmap characters not supported');

  function readCharacterCode(): number {
    return has16BitCharacterCodes ? d.u16() : d.u8();
  }

  function readPoint(): Point {
    if (has12BitCoordinates) {
      const a = d.u8();
      const b = d.u8();
      const c = d.u8();
      const v = (c << 16) + (b << 8) + a;
      return { x: signExtend12(v), y: signExtend12(v >>> 12) };
    }
    return { x: d.i8(), y: d.i8() };
  }

  function readBoundingBox(): BoundingBox {
    const { x: minX, y: minY } = readPoint();
    const { x: maxX, y: maxY } = readPoint();
    return {
      minX,
      minY,
      maxX,
      maxY,
    };
  }

  const paths: FontPathSegment[][] = [];

  function pushPath(path: FontPathSegment[]) {
    paths.push(path);
  }

  function readPath() {
    const path: FontPathSegment[] = [];
    for (;;) {
      const segment = d.u8();
      const type = extractBitField(segment, 0, 2);
      const xScaffold = extractBitField(segment, 2, 3);
      const yScaffold = extractBitField(segment, 5, 3);
      if (
        type === OUTLINE_SEGMENT_TAG.MOVE ||
        type === OUTLINE_SEGMENT_TAG.LINE
      ) {
        path.push({
          type,
          xScaffold,
          yScaffold,
          to: readPoint(),
        });
      } else if (type === OUTLINE_SEGMENT_TAG.CURVE) {
        path.push({
          type,
          xScaffold,
          yScaffold,
          cp1: readPoint(),
          cp2: readPoint(),
          to: readPoint(),
        });
      } else {
        check(
          type === OUTLINE_SEGMENT_TAG.TERMINATOR,
          'unsupported segment type',
        );
        path.push({
          type: OUTLINE_SEGMENT_TAG.TERMINATOR,
          xScaffold,
          yScaffold,
        });
        pushPath(path);
        return segment;
      }
    }
  }

  const composites: Composite[] = [];

  function pushComposite(code: number, offset: Point) {
    composites.push({ code, offset });
  }

  function readComposites() {
    let code = readCharacterCode();
    while (code !== 0) {
      pushComposite(code, readPoint());
      code = readCharacterCode();
    }
  }

  if (hasCompositeBaseCharacter) {
    pushComposite(readCharacterCode(), { x: 0, y: 0 });
    if (hasCompositeAccentCharacter) {
      pushComposite(readCharacterCode(), readPoint());
    }
    return {
      position,
      flags,
      composites,
    };
  }

  const boundingBox = readBoundingBox();
  let segment = readPath();
  while (isBitSet(segment, 2)) {
    segment = readPath();
  }
  if (isBitSet(segment, 3)) {
    readComposites();
  }

  const [fillPath, ...strokePaths] = paths;

  return {
    position,
    flags,
    boundingBox,
    fillPath,
    strokePaths,
    composites,
  };
}

function readChunk(
  buffer: ArrayBuffer,
  position: number,
  version: number,
  dependencyByteCount: number,
): Chunk {
  const d = new BinaryReader(buffer, position);

  function readChunkFlags() {
    if (version < 6) {
      return 0;
    }
    if (version < 7) {
      return 0x80;
    }
    return d.u32();
  }

  const chunkFlags = readChunkFlags();

  const hasDependencyBytes = isBitSet(chunkFlags, 7);

  const characterOffsetStart = position + d.tell();
  const charOffsets: number[] = [];
  for (let i = 0; i < 32; i += 1) {
    charOffsets.push(d.u32());
  }

  const dependencyBytes: number[] = [];
  if (hasDependencyBytes) {
    for (let i = 0; i < dependencyByteCount; i += 1) {
      dependencyBytes.push(d.u8());
    }
  }

  const characters: Characters = {};
  for (let i = 0; i < 32; i += 1) {
    if (charOffsets[i] !== 0) {
      const charOffset = characterOffsetStart + charOffsets[i];
      characters[i] = readCharacter(buffer, charOffset);
    }
  }

  return {
    position,
    chunkFlags,
    charOffsets,
    dependencyBytes,
    characters,
  };
}

function readChunks(
  buffer: ArrayBuffer,
  position: number,
  version: number,
  chunkCount: number,
): Chunks {
  const d = new BinaryReader(buffer, position);

  const chunkOffsets: number[] = [];
  for (let i = 0; i < chunkCount + 1; i += 1) {
    chunkOffsets.push(d.u32());
  }

  const dependencyByteCount = Math.trunc((chunkCount + 7) / 8);
  const chunks: Chunks = {};
  for (let i = 0; i < chunkCount; i += 1) {
    if (chunkOffsets[i] !== chunkOffsets[i + 1]) {
      chunks[i] = readChunk(
        buffer,
        chunkOffsets[i],
        version,
        dependencyByteCount,
      );
    }
  }

  return chunks;
}

function readScaffoldData(
  buffer: ArrayBuffer,
  position: number,
  has16BitCharacter: boolean = true,
): ScaffoldData {
  const d = new BinaryReader(buffer, position);

  function readScaffoldLine(): ScaffoldLine {
    const data = d.u16();
    const width = d.u8();
    return {
      coordinate: signExtend12(data),
      link: extractBitField(data, 12, 3),
      linear: isBitSet(data, 15),
      width,
    };
  }

  function readScaffoldLines(mask: number): ScaffoldLines {
    const lines: ScaffoldLines = {};
    for (let i = 0; i < 8; i += 1) {
      if (isBitSet(mask, i)) {
        lines[i] = readScaffoldLine();
      }
    }
    return lines;
  }

  const base = has16BitCharacter ? d.u16() : d.u8();
  const xBaseDefinitions = d.u8();
  const yBaseDefinitions = d.u8();
  const xLocalDefinitions = d.u8();
  const yLocalDefinitions = d.u8();
  const xLines = readScaffoldLines(xLocalDefinitions);
  const yLines = readScaffoldLines(yLocalDefinitions);

  return {
    base,
    xBaseDefinitions,
    yBaseDefinitions,
    xLocalDefinitions,
    yLocalDefinitions,
    xLines,
    yLines,
  };
}

function readScaffold(
  buffer: ArrayBuffer,
  position: number,
  indexCount: number,
  flags: number,
): Scaffold {
  const d = new BinaryReader(buffer, position);

  const all16BitCharacterCodes = isBitSet(flags, 0);

  const dataSize = d.u16();
  const offsets: number[] = [];
  for (let i = 0; i < indexCount - 1; i += 1) {
    offsets.push(d.u16());
  }
  const skeletonThresholdPixelSize = d.u8();

  const data: Scaffolds = {};
  for (let i = 0; i < offsets.length; i += 1) {
    const offset = offsets[i];
    if (offset !== 0) {
      if (all16BitCharacterCodes) {
        data[i] = readScaffoldData(buffer, position + offset);
      } else {
        data[i] = readScaffoldData(
          buffer,
          position + extractBitField(offset, 0, 14),
          isBitSet(offset, 15),
        );
      }
    }
  }

  return {
    flags,
    dataSize,
    data,
    skeletonThresholdPixelSize,
  };
}

function readOutlinesHeader(
  buffer: ArrayBuffer,
  position: number,
): OutlinesHeader {
  const d = new BinaryReader(buffer, position);

  const identifier = d.string(4);
  const bpp = d.u8();
  const version = d.u8();

  const designSize = d.u16();

  const boundingBox: BoundingBox = {
    minX: d.i16(),
    minY: d.i16(),
    maxX: d.i16(),
    maxY: d.i16(),
  };

  return {
    headerSize: d.tell() - position,
    identifier,
    bpp,
    version,
    designSize,
    boundingBox,
  };
}

function fontOutlinesIsHeaderPresent(
  buffer: ArrayBuffer,
  position: number = 0,
): boolean {
  return readOutlinesHeader(buffer, position).identifier === IDENTIFIER_FONT;
}

export function fontOutlinesFromArrayBuffer(
  buffer: ArrayBuffer,
  position: number = 0,
): Outlines | undefined {
  if (!fontOutlinesIsHeaderPresent(buffer, position)) {
    return undefined;
  }
  const header = readOutlinesHeader(buffer, position);
  const { headerSize, identifier, bpp, version } = header;

  check(
    identifier === IDENTIFIER_FONT,
    'Incorrect file signature, expected FONT',
  );
  check(bpp === 0, 'Bitmap outline, expected outlines');
  check(
    [6, 7, 8].includes(version),
    'Only version 6, 7, and 8 outlines supported',
  );

  const d = new BinaryReader(buffer, position);
  d.skip(headerSize);

  let chunkIndexOffset = d.tell();
  let chunkCount = 8;

  const scaffoldIndexOffset = d.tell() + 36;
  let scaffoldIndexCount = 256;
  let scaffoldFlags = 0;

  if (version > 7) {
    chunkIndexOffset = d.u32();
    chunkCount = d.u32();
    scaffoldIndexCount = d.u32();
    scaffoldFlags = d.u32();
  }

  const scaffold = readScaffold(
    buffer,
    scaffoldIndexOffset,
    scaffoldIndexCount,
    scaffoldFlags,
  );

  const chunks = readChunks(buffer, chunkIndexOffset, version, chunkCount);

  return {
    header,
    scaffold,
    chunkCount,
    chunks,
  };
}
