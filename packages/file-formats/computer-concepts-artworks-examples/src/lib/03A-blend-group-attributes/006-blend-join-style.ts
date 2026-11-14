/*
Example: 006-blend-join-style

Purpose:

To demonstrate how join styles are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from round join to round join
2. Attempt to blend from round join to bevel join
3. Attempt to blend from round join to mitre join
4. Attempt to blend from mitre join to round join
5. Attempt to blend from bevel join to round join

The rule appears to be that before the halfway point use the start join and
beyond that the end join.
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createClosedSquare } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  FILL_FLAT_BLACK_30,
  JOIN_BEVEL,
  JOIN_MITRE,
  JOIN_ROUND,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  JOIN_ROUND,
  createClosedSquare(500_000, 100_000, 100_000),
  JOIN_ROUND,
  3,
);

const GROUP_1 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  JOIN_ROUND,
  createClosedSquare(500_000, 250_000, 100_000),
  JOIN_BEVEL,
  3,
);

const GROUP_2 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 400_000, 100_000),
  JOIN_ROUND,
  createClosedSquare(500_000, 400_000, 100_000),
  JOIN_MITRE,
  3,
);

const GROUP_3 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 550_000, 100_000),
  JOIN_MITRE,
  createClosedSquare(500_000, 550_000, 100_000),
  JOIN_ROUND,
  3,
);

const GROUP_4 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 700_000, 100_000),
  JOIN_BEVEL,
  createClosedSquare(500_000, 700_000, 100_000),
  JOIN_ROUND,
  3,
);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_6000),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  createList(WORK_AREA),
);
