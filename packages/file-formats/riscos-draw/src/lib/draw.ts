import { makeCheckEnumValue } from '@rbrown/check';
import type { BoundingBox, Point } from '@rbrown/geometry';
import { BinaryReader } from '@rbrown/io';
import { spriteFromBinaryReader } from '@rbrown/riscos-sprite';

import {
  CAP_TAG,
  JOIN_TAG,
  OBJECT_TAG,
  PATH_TAG,
  WINDING_RULE_TAG,
  type CapTag,
  type DrawDashPattern,
  type DrawFile,
  type DrawGroupObject,
  type DrawHeader,
  type DrawJpegObject,
  type DrawObject,
  type DrawOptionsObject,
  type DrawPathObject,
  type DrawPathSegment,
  type DrawPathStyle,
  type DrawSpriteObject,
  type DrawSpriteRotatedObject,
  type DrawTransform,
  type JoinTag,
  type PathTag,
  type WindingRuleTag,
} from './draw-types.js';

const checkJoinTag: (
  value: unknown,
  message: string,
) => asserts value is JoinTag = makeCheckEnumValue(JOIN_TAG);

const checkPathTag: (
  value: unknown,
  message: string,
) => asserts value is PathTag = makeCheckEnumValue(PATH_TAG);

const checkCapTag: (
  value: unknown,
  message: string,
) => asserts value is CapTag = makeCheckEnumValue(CAP_TAG);

const checkWindingRuleTag: (
  value: unknown,
  message: string,
) => asserts value is WindingRuleTag = makeCheckEnumValue(WINDING_RULE_TAG);

const IDENTIFIER_DRAW = 'Draw';

function readPoint(reader: BinaryReader): Point {
  reader.aligned(4, 'misaligned point');
  const x = reader.i32();
  const y = reader.i32();
  return { x, y };
}

function readBoundingBox(reader: BinaryReader): BoundingBox {
  reader.aligned(4, 'misaligned bounding box');
  const minX = reader.i32();
  const minY = reader.i32();
  const maxX = reader.i32();
  const maxY = reader.i32();
  return {
    minX,
    minY,
    maxX,
    maxY,
  };
}

function readTransformationMatrix(reader: BinaryReader): DrawTransform {
  reader.aligned(4, 'misaligned transformation matrix');
  return {
    a: reader.i32(),
    b: reader.i32(),
    c: reader.i32(),
    d: reader.i32(),
    e: reader.i32(),
    f: reader.i32(),
  };
}

function readHeader(reader: BinaryReader): DrawHeader {
  reader.aligned(4, 'misaligned header');
  return {
    identifier: reader.string(4),
    majorVersion: reader.u32(),
    minorVersion: reader.u32(),
    program: reader.string(12),
    boundingBox: readBoundingBox(reader),
  };
}

function readPathSegment(reader: BinaryReader): DrawPathSegment {
  reader.aligned(4, 'misaligned path segment');
  const tag = reader.u32();
  checkPathTag(tag, 'unsupported path tag');
  switch (tag) {
    case PATH_TAG.END:
    case PATH_TAG.UNKNOWN:
    case PATH_TAG.CLOSE_SUB_PATH:
      return { tag };

    case PATH_TAG.MOVE:
    case PATH_TAG.LINE: {
      const to = readPoint(reader);
      return { tag, to };
    }

    case PATH_TAG.BEZIER: {
      const cp1 = readPoint(reader);
      const cp2 = readPoint(reader);
      const to = readPoint(reader);
      return { tag, cp1, cp2, to };
    }
  }
}

function readPath(reader: BinaryReader): DrawPathSegment[] {
  reader.aligned(4, 'misaligned path');
  const path: DrawPathSegment[] = [];
  while (reader.remaining()) {
    path.push(readPathSegment(reader));
  }
  return path;
}

function readJoin(style: number): JoinTag {
  const v = style & 0x3;
  checkJoinTag(v, 'unsupported join style');
  return v;
}

function readCapEnd(style: number): CapTag {
  const v = (style >>> 2) & 0x3;
  checkCapTag(v, 'unsupported cap end style');
  return v;
}

function readCapStart(style: number): CapTag {
  const v = (style >>> 4) & 0x3;
  checkCapTag(v, 'unsupported cap start style');
  return v;
}

function readWindingRule(style: number): WindingRuleTag {
  const v = (style >>> 6) & 0x1;
  checkWindingRuleTag(v, 'unsupported winding rule');
  return v;
}

function readDashPattern(
  reader: BinaryReader,
  style: number,
): DrawDashPattern | undefined {
  if ((style >>> 7) & 0x1) {
    reader.aligned(4, 'misaligned dash');
    const offset = reader.i32();
    const count = reader.u32();
    const array: number[] = [];
    for (let i = 0; i < count; i += 1) {
      array.push(reader.i32());
    }
    return { offset, array };
  }
  return undefined;
}

function readPathStyle(reader: BinaryReader): DrawPathStyle {
  reader.aligned(4, 'misaligned path style');
  const style = reader.u32();
  const dashPatten = readDashPattern(reader, style);
  return {
    join: readJoin(style),
    capEnd: readCapEnd(style),
    capStart: readCapStart(style),
    windingRule: readWindingRule(style),
    dashPattern: dashPatten,
    triangleCapWidth: (style >>> 16) & 0xff,
    triangleCapLength: (style >>> 24) & 0xff,
  };
}

function readPathObject(reader: BinaryReader): DrawPathObject {
  reader.aligned(4, 'misaligned path object');
  return {
    tag: OBJECT_TAG.PATH,
    boundingBox: readBoundingBox(reader),
    fillColour: reader.u32(),
    outlineColour: reader.u32(),
    outlineWidth: reader.u32(),
    pathStyle: readPathStyle(reader),
    path: readPath(reader),
  };
}

function readSpriteObject(reader: BinaryReader): DrawSpriteObject {
  reader.aligned(4, 'misaligned sprite object');
  return {
    tag: OBJECT_TAG.SPRITE,
    boundingBox: readBoundingBox(reader),
    sprite: spriteFromBinaryReader(reader),
  };
}

function readGroupObject(reader: BinaryReader): DrawGroupObject {
  reader.aligned(4, 'misaligned group object');
  return {
    tag: OBJECT_TAG.GROUP,
    boundingBox: readBoundingBox(reader),
    name: reader.string(12),
    children: readObjects(reader),
  };
}

function readOptionsObject(reader: BinaryReader): DrawOptionsObject {
  reader.aligned(4, 'misaligned options object');
  return {
    tag: OBJECT_TAG.OPTIONS,
    boundingBox: readBoundingBox(reader),
    paperSize: reader.u32(),
    paperLimits: reader.u32(),
    gridSpacing1: reader.u32(),
    gridSpacing2: reader.u32(),
    gridDivision: reader.u32(),
    gridType: reader.u32(),
    gridAutoAdjustment: reader.u32(),
    gridShown: reader.u32(),
    gridLocking: reader.u32(),
    gridUnits: reader.u32(),
    zoomMultiplier: reader.u32(),
    zoomDivider: reader.u32(),
    zoomLocking: reader.u32(),
    toolboxPresent: reader.u32(),
    entryMode: reader.u32(),
    undoBufferSizeBytes: reader.u32(),
  };
}

function readSpriteRotatedObject(
  reader: BinaryReader,
): DrawSpriteRotatedObject {
  reader.aligned(4, 'misaligned sprite rotated object');
  return {
    tag: OBJECT_TAG.SPRITE_ROTATED,
    boundingBox: readBoundingBox(reader),
    transform: readTransformationMatrix(reader),
    sprite: spriteFromBinaryReader(reader),
  };
}

function readJpegObject(reader: BinaryReader): DrawJpegObject {
  reader.aligned(4, 'misaligned jpeg object');

  const boundingBox = readBoundingBox(reader);
  const width = reader.u32();
  const height = reader.u32();
  const xDpi = reader.u32();
  const yDpi = reader.u32();
  const transform = readTransformationMatrix(reader);
  const length = reader.u32();
  const data = reader.u8a(length);

  return {
    tag: OBJECT_TAG.JPEG,
    boundingBox,
    width,
    height,
    xDpi,
    yDpi,
    transform,
    length,
    data,
  };
}

function readObjectForType(
  reader: BinaryReader,
  type: number,
): DrawObject | undefined {
  reader.aligned(4, 'misaligned object body');
  switch (type) {
    case OBJECT_TAG.PATH:
      return readPathObject(reader);
    case OBJECT_TAG.SPRITE:
      return readSpriteObject(reader);
    case OBJECT_TAG.GROUP:
      return readGroupObject(reader);
    case OBJECT_TAG.OPTIONS:
      return readOptionsObject(reader);
    case OBJECT_TAG.SPRITE_ROTATED:
      return readSpriteRotatedObject(reader);
    case OBJECT_TAG.JPEG:
      return readJpegObject(reader);
    default:
      console.log('Unrecognized type ', type);
      return undefined;
  }
}

function readObjects(reader: BinaryReader) {
  reader.aligned(4, 'misaligned objects');
  const objects: DrawObject[] = [];
  while (reader.remaining()) {
    const position = reader.tell();
    const type = reader.u32();
    const size = reader.u32();
    const end = position + size;
    const objectReader = reader.subreader(size - 8);
    const object = readObjectForType(objectReader, type);
    if (object) {
      objects.push(object);
    }
    reader.seek(end);
  }
  return objects;
}

function drawIsHeaderPresent(buffer: ArrayBuffer): boolean {
  const reader = new BinaryReader(buffer);
  return readHeader(reader).identifier === IDENTIFIER_DRAW;
}

export function drawFromArrayBuffer(buffer: ArrayBuffer): DrawFile | undefined {
  if (!drawIsHeaderPresent(buffer)) {
    return undefined;
  }
  const reader = new BinaryReader(buffer);
  const header = readHeader(reader);
  const objects = readObjects(reader);
  return {
    header,
    objects,
  };
}
