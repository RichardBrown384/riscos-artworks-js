/*
Example: 002-blend-stroke-width

Purpose:

To demonstrate how stroke widths are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from width 6000 to width 3000
2. Attempt to blend from width 6000 to width none
3. Attempt to blend from width none to width 3000
4. Attempt to blend from width none to width none
5. Attempt to blend from width 6000 to width 6000

Important point to note:

If the join style is missing from the file then the interpolated shapes are not stroked.

If the join style is present then the attribute is interpolated as expected.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_NONE,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  JOIN_BEVEL,
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare } = require('../path-creators');

const { createSimpleAttributeBlendGroup } = require('../simple-blend-group');

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  STROKE_WIDTH_6000,
  createClosedSquare(500_000, 100_000, 100_000),
  STROKE_WIDTH_3000,
  3,
);

const GROUP_1 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  STROKE_WIDTH_6000,
  createClosedSquare(500_000, 250_000, 100_000),
  STROKE_WIDTH_NONE,
  3,
);

const GROUP_2 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 400_000, 100_000),
  STROKE_WIDTH_NONE,
  createClosedSquare(500_000, 400_000, 100_000),
  STROKE_WIDTH_3000,
  3,
);

const GROUP_3 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 550_000, 100_000),
  STROKE_WIDTH_NONE,
  createClosedSquare(500_000, 550_000, 100_000),
  STROKE_WIDTH_NONE,
  3,
);

const GROUP_4 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 700_000, 100_000),
  STROKE_WIDTH_6000,
  createClosedSquare(500_000, 700_000, 100_000),
  STROKE_WIDTH_6000,
  3,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_6000),
  List.of(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  List.of(WORK_AREA),
);
