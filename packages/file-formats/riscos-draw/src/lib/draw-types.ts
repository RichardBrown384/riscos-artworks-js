import type { BoundingBox, Point } from '@rbrown/geometry';
import type { Sprite } from '@rbrown/riscos-sprite';

export interface DrawTransform {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export const OBJECT_TAG = {
  PATH: 2,
  SPRITE: 5,
  GROUP: 6,
  OPTIONS: 11,
  SPRITE_ROTATED: 13,
  JPEG: 16,
} as const;

export const JOIN_TAG = {
  MITRE: 0,
  ROUND: 1,
  BEVEL: 2,
} as const;

export type JoinTag = (typeof JOIN_TAG)[keyof typeof JOIN_TAG];

export const CAP_TAG = {
  BUTT: 0,
  ROUND: 1,
  SQUARE: 2,
  TRIANGLE: 3,
} as const;

export type CapTag = (typeof CAP_TAG)[keyof typeof CAP_TAG];

export const WINDING_RULE_TAG = {
  NON_ZERO: 0,
  EVEN_ODD: 1,
} as const;

export type WindingRuleTag =
  (typeof WINDING_RULE_TAG)[keyof typeof WINDING_RULE_TAG];

export const PATH_TAG = {
  END: 0,
  MOVE: 2,
  UNKNOWN: 4,
  CLOSE_SUB_PATH: 5,
  BEZIER: 6,
  LINE: 8,
} as const;

export type PathTag = (typeof PATH_TAG)[keyof typeof PATH_TAG];

export type DrawPathSegment =
  | { tag: typeof PATH_TAG.END }
  | { tag: typeof PATH_TAG.MOVE; to: Point }
  | { tag: typeof PATH_TAG.UNKNOWN }
  | { tag: typeof PATH_TAG.CLOSE_SUB_PATH }
  | { tag: typeof PATH_TAG.BEZIER; cp1: Point; cp2: Point; to: Point }
  | { tag: typeof PATH_TAG.LINE; to: Point };

export interface DrawDashPattern {
  offset: number;
  array: number[];
}

export interface DrawPathStyle {
  join: JoinTag;
  capEnd: CapTag;
  capStart: CapTag;
  windingRule: WindingRuleTag;
  dashPattern?: DrawDashPattern;
  triangleCapWidth: number;
  triangleCapLength: number;
}

export interface DrawPathObject {
  tag: typeof OBJECT_TAG.PATH;
  boundingBox: BoundingBox;
  fillColour: number;
  outlineColour: number;
  outlineWidth: number;
  pathStyle: DrawPathStyle;
  path: DrawPathSegment[];
}

export interface DrawSpriteObject {
  tag: typeof OBJECT_TAG.SPRITE;
  boundingBox: BoundingBox;
  sprite: Sprite;
}

export interface DrawGroupObject {
  tag: typeof OBJECT_TAG.GROUP;
  boundingBox: BoundingBox;
  name: string;
  children: DrawObject[];
}

export interface DrawOptionsObject {
  tag: typeof OBJECT_TAG.OPTIONS;
  boundingBox: BoundingBox;
  paperSize: number;
  paperLimits: number;
  gridSpacing1: number;
  gridSpacing2: number;
  gridDivision: number;
  gridType: number;
  gridAutoAdjustment: number;
  gridShown: number;
  gridLocking: number;
  gridUnits: number;
  zoomMultiplier: number;
  zoomDivider: number;
  zoomLocking: number;
  toolboxPresent: number;
  entryMode: number;
  undoBufferSizeBytes: number;
}

export interface DrawSpriteRotatedObject {
  tag: typeof OBJECT_TAG.SPRITE_ROTATED;
  boundingBox: BoundingBox;
  transform: DrawTransform;
  sprite: Sprite;
}

export interface DrawJpegObject {
  tag: typeof OBJECT_TAG.JPEG;
  boundingBox: BoundingBox;
  width: number; // draw units
  height: number; // draw units
  xDpi: number;
  yDpi: number;
  transform: DrawTransform;
  length: number;
  data: Uint8Array<ArrayBuffer>;
}

export type DrawObject =
  | DrawPathObject
  | DrawSpriteObject
  | DrawGroupObject
  | DrawOptionsObject
  | DrawSpriteRotatedObject
  | DrawJpegObject;

export interface DrawHeader {
  identifier: string;
  majorVersion: number;
  minorVersion: number;
  program: string;
  boundingBox: BoundingBox;
}

export interface DrawFile {
  header: DrawHeader;
  objects: DrawObject[];
}
