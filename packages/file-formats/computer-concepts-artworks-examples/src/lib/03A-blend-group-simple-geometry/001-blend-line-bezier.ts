/*
Example: 001-blend-line-bezier

Purpose:

To demonstrate line - bezier interpolation.

The last case (GROUP3) demonstrates what happens when the bezier
is self intersecting. It appears that if the shape-self intersects
then another form of interpolation is used.

In this case it looks as if the contour is split into 5 segments and then
interpolated using the normal code.

 */

import {
  ARTWORKS_PATH_TAG_BIT_31,
  createPath,
  pathBezierTo,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';

import { createClosedSquare } from '../path-creators.js';
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

const GROUP_0_START_PATH = createClosedSquare(100_000, 100_000, 100_000);
const GROUP_0_END_PATH = createClosedSquare(1_000_000, 100_000, 100_000);

const GROUP_1_START_PATH = createClosedSquare(100_000, 250_000, 100_000);
const GROUP_1_END_PATH = createPath([
  pathMoveTo(1_000_000, 250_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(1_000_000, 350_000),
  pathBezierTo(1_000_000, 450_000, 1_100_000, 450_000, 1_100_000, 350_000),
  pathLineTo(1_100_000, 250_000),
  pathCloseSubPath(),
  pathEnd(),
]);

const GROUP_2_START_PATH = createClosedSquare(100_000, 500_000, 100_000);
const GROUP_2_END_PATH = createPath([
  pathMoveTo(1_000_000, 500_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(1_000_000, 600_000),
  pathBezierTo(1_025_000, 500_000, 1_075_000, 700_000, 1_100_000, 600_000),
  pathLineTo(1_100_000, 500_000),
  pathCloseSubPath(),
  pathEnd(),
]);

const GROUP_3_START_PATH = createClosedSquare(100_000, 800_000, 100_000);
const GROUP_3_END_PATH = createPath([
  pathMoveTo(1_000_000, 800_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(1_000_000, 900_000),
  pathBezierTo(1_200_000, 1_100_000, 900_000, 1_100_000, 1_100_000, 900_000),
  pathLineTo(1_100_000, 800_000),
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
    steps: 6,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_1_START_PATH,
    endPath: GROUP_1_END_PATH,
    steps: 6,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_2_START_PATH,
    endPath: GROUP_2_END_PATH,
    steps: 6,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_3_START_PATH,
    endPath: GROUP_3_END_PATH,
    steps: 6,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 6),
  createSimplePathBlendGroup(GROUP_1_START_PATH, GROUP_1_END_PATH, 6),
  createSimplePathBlendGroup(GROUP_2_START_PATH, GROUP_2_END_PATH, 6),
  createSimplePathBlendGroup(GROUP_3_START_PATH, GROUP_3_END_PATH, 6),
  createList(WORK_AREA),
);
