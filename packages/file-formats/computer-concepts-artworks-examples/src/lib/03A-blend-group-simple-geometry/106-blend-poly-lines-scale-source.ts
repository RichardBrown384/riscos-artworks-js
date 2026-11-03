/*
Example: 106-blend-poly-lines-scale-source

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by allowing the source geometry to be scaled.

For scales up to 25.0 it appears the point distribution is unchanged.

Interestingly, for a scale of 0 the routine doesn't crash and appears to work.

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
import { AffineTransform } from '../affine-transform.js';
import {
  PathBuilder,
  ARTWORKS_PATH_TAG_BIT_31,
} from '@rbrown/computer-concepts-artworks';

const SCALE = 0.4;

const GROUP_0_START_PATH_TRANSFORM = new AffineTransform()
  .translate(-100_000, -100_000)
  .scale(SCALE)
  .translate(100_000, 100_000);

const GROUP_0_START_PATH = GROUP_0_START_PATH_TRANSFORM.transformPath(
  new PathBuilder()
    .moveTo(100_000, 100_000, ARTWORKS_PATH_TAG_BIT_31)
    .lineTo(100_000, 400_000)
    .lineTo(120_000, 416_000)
    .lineTo(150_000, 300_000)
    .lineTo(200_000, 500_000)
    .lineTo(150_000, 90_000)
    .lineTo(130_000, 120_000)
    .lineTo(120_000, 11_000)
    .closeSubPath()
    .end()
    .build(),
);
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
    endWeights: [
      [],
      [0.67, 0.73], // calculated [0.6735, 0.7310]
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
