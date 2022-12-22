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
  JOIN_BEVEL,
  END_CAP_BUTT,
  START_CAP_BUTT,
  START_CAP_ROUND,
  START_CAP_SQUARE,
  START_CAP_TRIANGLE_W2_H4,
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createOpenInvertedV } = require('../path-creators');

const createSimpleBlendGroup = require('../simple-blend-group');

const GROUP_0 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 100_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 100_000, 100_000),
  START_CAP_ROUND,
  3,
);

const GROUP_1 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 250_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 250_000, 100_000),
  START_CAP_SQUARE,
  3,
);

const GROUP_2 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 400_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 400_000, 100_000),
  START_CAP_BUTT,
  3,
);

const GROUP_3 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 550_000, 100_000),
  START_CAP_BUTT,
  createOpenInvertedV(500_000, 550_000, 100_000),
  START_CAP_TRIANGLE_W2_H4,
  3,
);

const GROUP_4 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 700_000, 100_000),
  START_CAP_TRIANGLE_W2_H4,
  createOpenInvertedV(500_000, 700_000, 100_000),
  START_CAP_BUTT,
  3,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_6000),
  List.of(END_CAP_BUTT),
  List.of(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  List.of(WORK_AREA),
);
