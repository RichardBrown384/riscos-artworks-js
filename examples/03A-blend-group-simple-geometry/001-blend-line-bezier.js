/*
Example: 001-blend-line-bezier

Purpose:

To demonstrate line - bezier interpolation.

The last case (GROUP3) demonstrates what happens when the bezier
is self intersecting. It appears that if the shape-self intersects
then another form of interpolation is used.

 */

const {
  Builders: {
    List,
    Path,
  },
  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_BLACK,
  STROKE_WIDTH_1280,
  JOIN_BEVEL,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare } = require('../path-creators');

const { createSimpleGeometryBlendGroup } = require('../simple-blend-group');

const GROUP_0 = createSimpleGeometryBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  createClosedSquare(1_000_000, 100_000, 100_000),
  6,
);

const GROUP_1 = createSimpleGeometryBlendGroup(
  createClosedSquare(100_000, 250_000, 100_000),
  Path.builder()
    .moveTo(1_000_000, 250_000, Constants.TAG_BIT_31)
    .lineTo(1_000_000, 350_000)
    .bezierTo(1_000_000, 450_000, 1_100_000, 450_000, 1_100_000, 350_000)
    .lineTo(1_100_000, 250_000)
    .closeSubPath()
    .end()
    .build(),
  6,
);

const GROUP_2 = createSimpleGeometryBlendGroup(
  createClosedSquare(100_000, 500_000, 100_000),
  Path.builder()
    .moveTo(1_000_000, 500_000, Constants.TAG_BIT_31)
    .lineTo(1_000_000, 600_000)
    .bezierTo(1_025_000, 500_000, 1_075_000, 700_000, 1_100_000, 600_000)
    .lineTo(1_100_000, 500_000)
    .closeSubPath()
    .end()
    .build(),
  6,
);

const GROUP_3 = createSimpleGeometryBlendGroup(
  createClosedSquare(100_000, 800_000, 100_000),
  Path.builder()
    .moveTo(1_000_000, 800_000, Constants.TAG_BIT_31)
    .lineTo(1_000_000, 900_000)
    .bezierTo(1_200_000, 1_100_000, 900_000, 1_100_000, 1_100_000, 900_000)
    .lineTo(1_100_000, 800_000)
    .closeSubPath()
    .end()
    .build(),
  6,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  List.of(JOIN_BEVEL),
  List.of(FILL_FLAT_TRANSPARENT),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  List.of(WORK_AREA),
);
