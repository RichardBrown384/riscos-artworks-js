/*
Example: 201-blend-bezier-multiple-split

Purpose:

To demonstrate that !AWViewer splits bezier segments multiple times when blending.

In the example below the Bezier below is split in three at the parametric distances of
0.3723 and 0.6277.

These parametric distances can be computed by taking the ratios of the lengths of the
2nd, 3rd and 4th line segments on the source contour.

0.3723 = L2 / (L2 + L3 + L4)
0.6277 = (L2 + L3) / (L2 + L3 + L4)
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

const GROUP_0_START_PATH = createPath([
  pathMoveTo(100_000, 100_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(100_000, 200_000), // L1
  pathLineTo(130_000, 250_000), // L2
  pathLineTo(170_000, 250_000), // L3
  pathLineTo(200_000, 200_000), // L4
  pathLineTo(200_000, 100_000), // L5
  pathCloseSubPath(), // L6
  pathEnd(),
]);
const GROUP_0_END_PATH = createPath([
  pathMoveTo(1_000_000, 100_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(1_000_000, 200_000),
  pathBezierTo(1_020_000, 230_000, 1_080_000, 230_000, 1_100_000, 200_000),
  pathLineTo(1_100_000, 100_000),
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
    endWeights: [[], [], [0.3723, 0.6277], [], [], []],
    steps: 7,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  createList(WORK_AREA),
);
