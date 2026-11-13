/*
Example: 108-blend-poly-lines-moving-second-target-vertex

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by allowing us to move the second vertex of the target path

We arbitrarily set the initial SECOND_VERTEX_Y to 120_000 and found by chance that !AWViewer
also adds points to the _source_ path. The new source points appear to be placed in the same
way as the target points, that is by taking into account the lengths of the opposing line segments.

The point distribution changes when SECOND_VERTEX_Y is greater than or equal to 132_231.
At the point the second vertex is slightly below the line defined by the 2nd and 3rd vertices.

The point distribution changes again when SECOND_VERTEX_Y is greater than or equal to 310_182.

 */

import {
  ARTWORKS_PATH_TAG_BIT_31,
  createPath,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';

import { createArtworks, createList } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  FILL_FLAT_TRANSPARENT,
  JOIN_BEVEL,
  STROKE_COLOUR_BLACK,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_1280,
  STROKE_WIDTH_3000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimplePathBlendGroup } from '../simple-blend-group.js';
import { createBlendedPathRecordsWithWeights } from '../simulated-blend-group.js';
import { lineLength } from '../util.js';

function sum(array: number[]): number {
  return array.reduce((x, y) => x + y, 0.0);
}

function parameter(lengths: number[], n: number): number {
  return sum(lengths.slice(0, n)) / sum(lengths);
}

const THRESHOLD_Y = 132_231;
const SECOND_VERTEX_Y = 120_000;

const T1 = lineLength(1_000_000, 100_000, 1_010_000, SECOND_VERTEX_Y);
const T2 = lineLength(1_010_000, SECOND_VERTEX_Y, 1_100_000, 450_000);
const B1 = parameter([T1, T2], 1);

const S1 = lineLength(100_000, 400_000, 120_000, 416_000);
const S2 = lineLength(120_000, 416_000, 150_000, 300_000);
const S3 = lineLength(150_000, 300_000, 200_000, 500_000);
const S4 = lineLength(200_000, 500_000, 150_000, 90_000);
const S5 = lineLength(150_000, 90_000, 130_000, 120_000);

const X1 = parameter([S1, S2, S3, S4, S5], 1);
const Y1 = parameter([S1, S2, S3, S4, S5], 2);
const Z1 = parameter([S1, S2, S3, S4, S5], 3);
const W1 = parameter([S1, S2, S3, S4, S5], 4);

const X2 = parameter([S1, S2, S3], 1);
const Y2 = parameter([S1, S2, S3], 2);
const Z2 = parameter([S4, S5], 1);

const SOURCE_WEIGHTS_1 = [
  [],
  [B1], // 0.0614
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

const TARGET_WEIGHTS_1 = [
  [],
  [],
  [],
  [X1, Y1, Z1, W1], // 0.0320, 0.1816 0.4391 0.9550
  [],
  [],
  [],
];

const TARGET_WEIGHTS_2: number[][] = [[], [], [X2, Y2], [Z2], [], [], []];

// The linter complains this is always truthy, but we actually
// might want to change the value of SECOND_VERTEX_Y to observe the results
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const BELOW_THRESHOLD = SECOND_VERTEX_Y < THRESHOLD_Y;

const SOURCE_WEIGHTS = BELOW_THRESHOLD ? SOURCE_WEIGHTS_1 : undefined;
const TARGET_WEIGHTS = BELOW_THRESHOLD ? TARGET_WEIGHTS_1 : TARGET_WEIGHTS_2;

const GROUP_0_START_PATH = createPath([
  pathMoveTo(100_000, 100_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(100_000, 400_000),
  pathLineTo(120_000, 416_000),
  pathLineTo(150_000, 300_000),
  pathLineTo(200_000, 500_000),
  pathLineTo(150_000, 90_000),
  pathLineTo(130_000, 120_000),
  pathLineTo(120_000, 11_000),
  pathCloseSubPath(),
  pathEnd(),
]);
const GROUP_0_END_PATH = createPath([
  pathMoveTo(1_000_000, 100_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(1_010_000, SECOND_VERTEX_Y),
  pathLineTo(1_100_000, 450_000),
  pathLineTo(1_120_000, 80_000),
  pathLineTo(1_110_000, 70_000),
  pathCloseSubPath(),
  pathEnd(),
]);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(JOIN_BEVEL),
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_0_START_PATH,
    startWeights: SOURCE_WEIGHTS,
    endPath: GROUP_0_END_PATH,
    endWeights: TARGET_WEIGHTS,
    steps: 7,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  createList(WORK_AREA),
);
