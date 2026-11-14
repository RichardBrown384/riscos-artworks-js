/*
Example: 010-blend-dash-pattern

Purpose:

To demonstrate how dash patterns are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from empty pattern to dashed pattern offset 0
2. Attempt to blend from empty pattern to empty pattern
3. Attempt to blend from dashed pattern offset 0 to empty pattern
4. Attempt to blend from dashed pattern offset 0 to dashed pattern offset 5000
5. Attempt to blend from dashed pattern offset 0 to dashed pattern offset 0

The behaviour here is very odd.

When a join type is specified the viewport is filled with blue (the stroke colour).

When a join type isn't specified everything renders as expected,
except of course the intermediate shapes aren't stroked.

Case 2 is the only case that render properly when on its own within the file.
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createClosedSquare } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  DASH_PATTERN_OFFSET_0,
  DASH_PATTERN_OFFSET_5000,
  FILL_FLAT_BLACK_30,
  JOIN_BEVEL,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  DASH_PATTERN_EMPTY,
  createClosedSquare(500_000, 100_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  3,
);

const GROUP_1 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  DASH_PATTERN_EMPTY,
  createClosedSquare(500_000, 250_000, 100_000),
  DASH_PATTERN_EMPTY,
  3,
);

const GROUP_2 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 400_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  createClosedSquare(500_000, 400_000, 100_000),
  DASH_PATTERN_EMPTY,
  3,
);

const GROUP_3 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 550_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  createClosedSquare(500_000, 550_000, 100_000),
  DASH_PATTERN_OFFSET_5000,
  3,
);

const GROUP_4 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 700_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  createClosedSquare(500_000, 700_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  3,
);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_6000),
  createList(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  createList(WORK_AREA),
);
