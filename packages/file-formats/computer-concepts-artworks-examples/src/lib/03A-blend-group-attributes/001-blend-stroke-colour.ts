/*
Example: 001-blend-stroke-colour

Purpose:

To demonstrate how stroke colours are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from blue to red stroke
2. Attempt to blend from blue to transparent stroke
3. Attempt to blend from transparent to red stroke
4. Attempt to blend from transparent to transparent stroke
5. Attempt to blend from blue to blue stroke.

Important point to note:

If the join style is missing from the file then the interpolated shapes are not stroked.

If the join style is present then the attribute is interpolated as expected.

When interpolating to/from transparent the colours are mixed with white.

 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createClosedSquare } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  FILL_FLAT_BLACK_30,
  JOIN_BEVEL,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
  STROKE_COLOUR_TRANSPARENT,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  STROKE_COLOUR_BLUE,
  createClosedSquare(500_000, 100_000, 100_000),
  STROKE_COLOUR_RED,
  3,
);

const GROUP_1 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  STROKE_COLOUR_BLUE,
  createClosedSquare(500_000, 250_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  3,
);

const GROUP_2 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 400_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  createClosedSquare(500_000, 400_000, 100_000),
  STROKE_COLOUR_RED,
  3,
);

const GROUP_3 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 550_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  createClosedSquare(500_000, 550_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  3,
);

const GROUP_4 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 700_000, 100_000),
  STROKE_COLOUR_BLUE,
  createClosedSquare(500_000, 700_000, 100_000),
  STROKE_COLOUR_BLUE,
  3,
);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_WIDTH_6000),
  createList(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  createList(WORK_AREA),
);
