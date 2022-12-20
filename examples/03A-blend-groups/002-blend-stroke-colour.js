/*
Example: 002-blend-stroke-colour

Purpose:

To demonstrate how stroke colours are interpolated with blend groups.

It appears, that unless we're missing some hidden option, stroke colours aren't interpolated.

The file deals with five cases

1. Attempt to blend from blue to red stroke
2. Attempt to blend from blue to transparent stroke
3. Attempt to blend from transparent to red stroke
4. Attempt to blend from transparent to transparent stroke
5. Attempt to blend from blue to blue stroke.

In all five cases the stroke is absent from the intermediate steps.
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
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const {
  createStartRectangle,
  createEndRectangle,
  createSimpleRectangleBlendGroup,
} = require('./shared');

const GROUP_0 = createSimpleRectangleBlendGroup(
  createStartRectangle(100_000, 100_000, 100_000, 100_000),
  STROKE_COLOUR_BLUE,
  createEndRectangle(500_000, 100_000, 100_000, 100_000),
  STROKE_COLOUR_RED,
  3,
);

const GROUP_1 = createSimpleRectangleBlendGroup(
  createStartRectangle(100_000, 250_000, 100_000, 100_000),
  STROKE_COLOUR_BLUE,
  createEndRectangle(500_000, 250_000, 100_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  3,
);

const GROUP_2 = createSimpleRectangleBlendGroup(
  createStartRectangle(100_000, 400_000, 100_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  createEndRectangle(500_000, 400_000, 100_000, 100_000),
  STROKE_COLOUR_RED,
  3,
);

const GROUP_3 = createSimpleRectangleBlendGroup(
  createStartRectangle(100_000, 550_000, 100_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  createEndRectangle(500_000, 550_000, 100_000, 100_000),
  STROKE_COLOUR_TRANSPARENT,
  3,
);

const GROUP_4 = createSimpleRectangleBlendGroup(
  createStartRectangle(100_000, 550_000, 100_000, 100_000),
  STROKE_COLOUR_BLUE,
  createEndRectangle(500_000, 550_000, 100_000, 100_000),
  STROKE_COLOUR_BLUE,
  3,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_WIDTH_6000),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  List.of(WORK_AREA),
);
