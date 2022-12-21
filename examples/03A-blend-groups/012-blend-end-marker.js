/*
Example: 012-blend-end-marker

Purpose:

To demonstrate how end markers are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from triangle 4,4 to arrowhead 4,6
2. Attempt to blend from triangle 4,4 to circle 6,4
3. Attempt to blend from triangle 4,4 to triangle 4,4
4. Attempt to blend from triangle 4,4 to arrow tail 4,4
5. Attempt to blend from arrow tail 4,4 to triangle 4,4

The end markers are only applied for the start and end states.

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
  START_MARKER_NONE,
  END_MARKER_TRIANGLE_W4_H4,
  END_MARKER_ARROW_HEAD_W4_H6,
  END_MARKER_CIRCLE_W6_H4,
  END_MARKER_ARROW_TAIL_W4_H4,
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createOpenInvertedV } = require('../path-creators');

const createSimpleBlendGroup = require('./shared');

const GROUP_0 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 100_000, 100_000),
  END_MARKER_TRIANGLE_W4_H4,
  createOpenInvertedV(500_000, 100_000, 100_000),
  END_MARKER_ARROW_HEAD_W4_H6,
  3,
);

const GROUP_1 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 250_000, 100_000),
  END_MARKER_TRIANGLE_W4_H4,
  createOpenInvertedV(500_000, 250_000, 100_000),
  END_MARKER_CIRCLE_W6_H4,
  3,
);

const GROUP_2 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 400_000, 100_000),
  END_MARKER_TRIANGLE_W4_H4,
  createOpenInvertedV(500_000, 400_000, 100_000),
  END_MARKER_TRIANGLE_W4_H4,
  3,
);

const GROUP_3 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 550_000, 100_000),
  END_MARKER_TRIANGLE_W4_H4,
  createOpenInvertedV(500_000, 550_000, 100_000),
  END_MARKER_ARROW_TAIL_W4_H4,
  3,
);

const GROUP_4 = createSimpleBlendGroup(
  createOpenInvertedV(100_000, 700_000, 100_000),
  END_MARKER_ARROW_TAIL_W4_H4,
  createOpenInvertedV(500_000, 700_000, 100_000),
  END_MARKER_TRIANGLE_W4_H4,
  3,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_6000),
  List.of(START_MARKER_NONE),
  List.of(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  List.of(WORK_AREA),
);
