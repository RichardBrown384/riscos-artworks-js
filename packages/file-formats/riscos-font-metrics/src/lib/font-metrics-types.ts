import { BoundingBox } from '@rbrown/geometry';

export interface FontMetricsMiscellaneous {
  boundingBox: BoundingBox;
  defaultXOffset: number;
  defaultYOffset: number;
  italicHOffsetPerEm: number;
  underlinePosition: number;
  underlineThickness: number;
  capHeight: number;
  xHeight: number;
  descender: number;
  ascender: number;
}

export type FontMetricKerningPair = Partial<
  Record<number, { x: number; y: number }>
>;

export type FontMetricsKerningPairs = Partial<
  Record<number, FontMetricKerningPair>
>;

export interface FontMetrics {
  name: string;
  unknown40: number;
  unknown44: number;
  version: number;
  flags: number;
  n: number;
  mapSize: number;
  map: number[];
  boundingBoxes: BoundingBox[];
  xOffsets: number[];
  yOffsets: number[];
  miscellaneous?: FontMetricsMiscellaneous;
  kerning?: FontMetricsKerningPairs;
}
