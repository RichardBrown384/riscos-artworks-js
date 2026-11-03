/*
Example: 101-blend-poly-lines-with-cusp-bezier

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by introducing a solitary cusp bezier segment

The change over in the point distribution regime occurs when
the displacement is greater than or equal to 47_712

displacement to arc length

47.711 = 314.2051
47.712 = 314.2056

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
import {
  PathBuilder,
  ARTWORKS_PATH_TAG_BIT_31,
} from '@rbrown/computer-concepts-artworks';

const CONTROL_X_DISPLACEMENT = 50_000;

const GROUP_0_START_PATH = new PathBuilder()
  .moveTo(100_000, 100_000, ARTWORKS_PATH_TAG_BIT_31)
  .bezierTo(
    100_000 - CONTROL_X_DISPLACEMENT,
    100_000,
    100_000 + CONTROL_X_DISPLACEMENT,
    400_000,
    100_000,
    400_000,
  )
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
    endWeights: [
      [],
      [0.93], // calculated [0.9249]
      [0.37], // calculated [0.3676]
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
