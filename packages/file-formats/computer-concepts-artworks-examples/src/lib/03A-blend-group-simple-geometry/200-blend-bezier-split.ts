/*
Example: 200-blend-bezier-split

Purpose:

To demonstrate that !AWViewer splits bezier segments when blending.

In the example below the Bezier below is split in two at the parametric distance of 0.3206
which is equal to the length of the second source line segment divided by the sum of the
lengths second and third source line segments, as with other examples involving straight lines.

The second target line segment (immediately after the bezier) is split in two at the parametric
distance of 0.3586 which is equal to the length of the fourth source line segment divided by
the sum of the lengths of the fourth and fifth source line segments.

0.3206 = L2 / (L2 + L3)
0.3586 = L4 / (L4 + L5)

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
  pathLineTo(120_000, 250_000), // L2
  pathLineTo(175_000, 150_000), // L3
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
    endWeights: [[], [], [0.3206], [0.3586], [], []],
    steps: 7,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  createList(WORK_AREA),
);
