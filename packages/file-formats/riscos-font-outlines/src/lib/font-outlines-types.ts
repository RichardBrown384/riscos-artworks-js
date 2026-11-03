import type { BoundingBox, Point } from '@rbrown/geometry';

export const OUTLINE_SEGMENT_TAG = {
  TERMINATOR: 0,
  MOVE: 1,
  LINE: 2,
  CURVE: 3,
} as const;

export type FontPathSegment =
  | {
      type: typeof OUTLINE_SEGMENT_TAG.TERMINATOR;
      xScaffold: number;
      yScaffold: number;
    }
  | {
      type: typeof OUTLINE_SEGMENT_TAG.MOVE;
      xScaffold: number;
      yScaffold: number;
      to: Point;
    }
  | {
      type: typeof OUTLINE_SEGMENT_TAG.LINE;
      xScaffold: number;
      yScaffold: number;
      to: Point;
    }
  | {
      type: typeof OUTLINE_SEGMENT_TAG.CURVE;
      xScaffold: number;
      yScaffold: number;
      cp1: Point;
      cp2: Point;
      to: Point;
    };

export interface Composite {
  code: number;
  offset: Point;
}

export interface Character {
  position: number;
  flags: number;
  composites: Composite[];
  boundingBox?: BoundingBox;
  fillPath?: FontPathSegment[];
  strokePaths?: FontPathSegment[][];
}

export type Characters = Partial<Record<number, Character>>;

export interface Chunk {
  position: number;
  chunkFlags: number;
  charOffsets: number[];
  dependencyBytes: number[];
  characters: Characters;
}

export type Chunks = Partial<Record<number, Chunk>>;

export interface ScaffoldLine {
  coordinate: number;
  link: number;
  linear: boolean;
  width: number;
}

export type ScaffoldLines = Partial<Record<number, ScaffoldLine>>;

export interface ScaffoldData {
  base: number;
  xBaseDefinitions: number;
  yBaseDefinitions: number;
  xLocalDefinitions: number;
  yLocalDefinitions: number;
  xLines: ScaffoldLines;
  yLines: ScaffoldLines;
}

export type Scaffolds = Partial<Record<number, ScaffoldData>>;

export interface Scaffold {
  flags: number;
  dataSize: number;
  data: Scaffolds;
  skeletonThresholdPixelSize: number;
}

export interface OutlinesHeader {
  headerSize: number;
  identifier: string;
  bpp: number;
  version: number;
  designSize: number;
  boundingBox: BoundingBox;
}

export interface Outlines {
  header: OutlinesHeader;
  scaffold: Scaffold;
  chunkCount: number;
  chunks: Chunks;
}
