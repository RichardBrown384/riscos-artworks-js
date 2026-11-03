/*
Example: 107-blend-poly-lines-moving-second-vertex

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by allowing the second source vertex to be moved vertically.

The first two insertion weights are computed by using the actual vertex coordinates.

This file is only valid for the y coordinate range of [400_000, 420_000]. Values outside this
range will probably produce different results.

Behaviour for various second source vertex y coordinates:

First regime means point distribution is A X' Y' B C
Second regime means point distribution is A X' B Y' C

400_000 first regime
410_000 first regime
415_000 first regime
417_500 first regime
418_750 first regime
419_375 first regime
419_454 first regime
419_464 first regime
419_466 first regime
419_467 first regime
419_468 first regime
419_469 second regime
419_474 second regime
419_493 second regime
419_532 second regime
419_688 second regime
420_000 second regime

 */

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

import { createArtworks, createList } from '../record-creators.js';

import { createSimplePathBlendGroup } from '../simple-blend-group.js';
import { createBlendedPathRecordsWithWeights } from '../simulated-blend-group.js';
import { lineLength } from '../util.js';
import {
  PathBuilder,
  ARTWORKS_PATH_TAG_BIT_31,
} from '@rbrown/computer-concepts-artworks';

const THRESHOLD_Y = 419_469;

const Y = THRESHOLD_Y;

const L1 = lineLength(100_000, 100_000, 100_000, Y);
const L2 = lineLength(100_000, Y, 120_000, 416_000);
const L3 = lineLength(120_000, 416_000, 150_000, 300_000);
const L4 = lineLength(150_000, 300_000, 200_000, 500_000);

const P1 = L1 / (L1 + L2 + L3);
const P2 = (L1 + L2) / (L1 + L2 + L3);

const Q1 = L1 / (L1 + L2);
const Q2 = L3 / (L3 + L4);

// The linter complains this is always truthy, but we actually
// might want to change the value of SECOND_VERTEX_Y to observe the results
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const BELOW_THRESHOLD = Y < THRESHOLD_Y;

const W1: number[] = BELOW_THRESHOLD ? [P1, P2] : [Q1];
const W2: number[] = BELOW_THRESHOLD ? [] : [Q2];
const W3: number[] = [0.92]; // calculated  [0.9197]
const W4: number[] = [];
const W5: number[] = [];

const GROUP_0_START_PATH = new PathBuilder()
  .moveTo(100_000, 100_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(100_000, Y)
  .lineTo(120_000, 416_000)
  .lineTo(150_000, 300_000)
  .lineTo(200_000, 500_000)
  .lineTo(150_000, 90_000)
  .lineTo(130_000, 120_000)
  .lineTo(120_000, 11_000)
  .closeSubPath()
  .end()
  .build();
const GROUP_0_END_PATH = new PathBuilder()
  .moveTo(1_000_000, 100_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(1_010_000, 370_000)
  .lineTo(1_100_000, 450_000)
  .lineTo(1_120_000, 80_000)
  .lineTo(1_110_000, 70_000)
  .closeSubPath()
  .end()
  .build();

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
    endWeights: [[], W1, W2, W3, W4, W5, []],
    steps: 7,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  createList(WORK_AREA),
);
