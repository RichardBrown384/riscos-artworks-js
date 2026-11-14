/*
Example: 008-blend-start-line-cap

Purpose:

To demonstrate how start line caps are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from butt cap to round cap
2. Attempt to blend from butt cap to square cap
3. Attempt to blend from butt cap to butt cap
4. Attempt to blend from butt cap to triangle cap
5. Attempt to blend from triangle cap to butt cap

The start caps are only applied for the start and end states.

The intermediate states draw a closed contour.
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createOpenInvertedV } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  END_CAP_BUTT,
  FILL_FLAT_BLACK_30,
  JOIN_BEVEL,
  START_CAP_BUTT,
  START_CAP_ROUND,
  START_CAP_SQUARE,
  START_CAP_TRIANGLE_W2_H4,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleAttributeBlendGroup(
  createOpenInvertedV(100_000, 100_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 100_000, 100_000),
  START_CAP_ROUND,
  3,
);

const GROUP_1 = createSimpleAttributeBlendGroup(
  createOpenInvertedV(100_000, 250_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 250_000, 100_000),
  START_CAP_SQUARE,
  3,
);

const GROUP_2 = createSimpleAttributeBlendGroup(
  createOpenInvertedV(100_000, 400_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 400_000, 100_000),
  START_CAP_BUTT,
  3,
);

const GROUP_3 = createSimpleAttributeBlendGroup(
  createOpenInvertedV(100_000, 550_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 550_000, 100_000),
  START_CAP_TRIANGLE_W2_H4,
  3,
);

const GROUP_4 = createSimpleAttributeBlendGroup(
  createOpenInvertedV(100_000, 700_000, 100_000),
  START_CAP_TRIANGLE_W2_H4,
  createOpenInvertedV(500_000, 700_000, 100_000),
  START_CAP_BUTT,
  3,
);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_6000),
  createList(END_CAP_BUTT),
  createList(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  createList(WORK_AREA),
);
