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

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  DASH_PATTERN_OFFSET_0,
  DASH_PATTERN_OFFSET_5000,
  JOIN_BEVEL,
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare } = require('../path-creators');

const createSimpleBlendGroup = require('../simple-blend-group');

const GROUP_0 = createSimpleBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  DASH_PATTERN_EMPTY,
  createClosedSquare(500_000, 100_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  3,
);

const GROUP_1 = createSimpleBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  DASH_PATTERN_EMPTY,
  createClosedSquare(500_000, 250_000, 100_000),
  DASH_PATTERN_EMPTY,
  3,
);

const GROUP_2 = createSimpleBlendGroup(
  createClosedSquare(100_000, 400_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  createClosedSquare(500_000, 400_000, 100_000),
  DASH_PATTERN_EMPTY,
  3,
);

const GROUP_3 = createSimpleBlendGroup(
  createClosedSquare(100_000, 550_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  createClosedSquare(500_000, 550_000, 100_000),
  DASH_PATTERN_OFFSET_5000,
  3,
);

const GROUP_4 = createSimpleBlendGroup(
  createClosedSquare(100_000, 700_000, 100_000),
  DASH_PATTERN_OFFSET_0,
  createClosedSquare(500_000, 700_000, 100_000),
  DASH_PATTERN_OFFSET_0,
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
