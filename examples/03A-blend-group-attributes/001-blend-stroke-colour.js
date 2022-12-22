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

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  STROKE_COLOUR_TRANSPARENT,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
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

const createSimpleBlendGroup = require('../simple-blend-group');

const GROUP_0 = createSimpleBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  STROKE_COLOUR_BLUE,
  createClosedSquare(500_000, 100_000, 100_000),
  STROKE_COLOUR_RED,
  3,
);

const GROUP_1 = createSimpleBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  STROKE_COLOUR_BLUE,
  createClosedSquare(500_000, 250_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  3,
);

const GROUP_2 = createSimpleBlendGroup(
  createClosedSquare(100_000, 400_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  createClosedSquare(500_000, 400_000, 100_000),
  STROKE_COLOUR_RED,
  3,
);

const GROUP_3 = createSimpleBlendGroup(
  createClosedSquare(100_000, 550_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  createClosedSquare(500_000, 550_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  3,
);

const GROUP_4 = createSimpleBlendGroup(
  createClosedSquare(100_000, 700_000, 100_000),
  STROKE_COLOUR_BLUE,
  createClosedSquare(500_000, 700_000, 100_000),
  STROKE_COLOUR_BLUE,
  3,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_WIDTH_6000),
  List.of(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  List.of(WORK_AREA),
);
