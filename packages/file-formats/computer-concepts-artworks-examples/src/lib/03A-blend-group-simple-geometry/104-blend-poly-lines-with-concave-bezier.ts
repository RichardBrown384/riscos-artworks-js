/*
Example: 104-blend-poly-lines-with-concave-bezier

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by introducing a solitary concave bezier segment

We tabulate here the x-coordinates of the control points (divided by 1000) and the arc length
of the bezier segment (similarly divided by 1000).

140.000 = 307.8182
150.000 = 312.0686
152.000 = 313.0185
154.000 = 314.0006
154.250 = 314.1256
154.287 = 314.1441
154.306 = 314.1537
154.315 = 314.1582
154.316 = 314.1587
154.317 = 314.1592
154.318 = 314.1597 (point distribution changes)
154.319 = 314.1602
154.320 = 314.1607
154.325 = 314.1632
154.500 = 314.2511
155.000 = 314.5035
160.000 = 317.1348

When the x coordinate is greater than or equal to 154318 point distribution regime
changes in the interpolated shape.

*/

import {
  ARTWORKS_PATH_TAG_BIT_31,
  createList,
  createPath,
  pathBezierTo,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
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

const CONTROL_POINT_X = 154_317;

const GROUP_0_START_PATH = createPath([
  pathMoveTo(100_000, 100_000, ARTWORKS_PATH_TAG_BIT_31),
  pathBezierTo(
    CONTROL_POINT_X,
    200_000,
    CONTROL_POINT_X,
    300_000,
    100_000,
    400_000,
  ),
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
  pathLineTo(1_010_000, 370_000),
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
    endPath: GROUP_0_END_PATH,
    endWeights: [
      [],
      [0.6835666886895685, 0.7392959168293128],
      [],
      [0.92], // calculated  [0.9197]
      [],
      [],
      [],
    ],
    steps: 7,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  createList(WORK_AREA),
);
