/*
Example: 001-blend-line-bezier

Purpose:

To demonstrate line - bezier interpolation.

The last case (GROUP3) demonstrates what happens when the bezier
is self intersecting. It appears that if the shape-self intersects
then another form of interpolation is used.

In this case it looks as if the contour is split into 5 segments and then
interpolated using the normal code.

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
  STROKE_COLOUR_RED,
  STROKE_WIDTH_1280,
  STROKE_WIDTH_3000,
  JOIN_BEVEL,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare } = require('../path-creators');

const { createSimpleGeometryBlendGroup, createBlendedGeometry } = require('../simple-blend-group');

const GROUP_0_START_PATH = createClosedSquare(100_000, 100_000, 100_000);
const GROUP_0_END_PATH = createClosedSquare(1_000_000, 100_000, 100_000);

const GROUP_1_START_PATH = createClosedSquare(100_000, 250_000, 100_000);
const GROUP_1_END_PATH = Path.builder()
  .moveTo(1_000_000, 250_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 350_000)
  .bezierTo(1_000_000, 450_000, 1_100_000, 450_000, 1_100_000, 350_000)
  .lineTo(1_100_000, 250_000)
  .closeSubPath()
  .end()
  .build();

const GROUP_2_START_PATH = createClosedSquare(100_000, 500_000, 100_000);
const GROUP_2_END_PATH = Path.builder()
  .moveTo(1_000_000, 500_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 600_000)
  .bezierTo(1_025_000, 500_000, 1_075_000, 700_000, 1_100_000, 600_000)
  .lineTo(1_100_000, 500_000)
  .closeSubPath()
  .end()
  .build();

const GROUP_3_START_PATH = createClosedSquare(100_000, 800_000, 100_000);
const GROUP_3_END_PATH = Path.builder()
  .moveTo(1_000_000, 800_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 900_000)
  .bezierTo(1_200_000, 1_100_000, 900_000, 1_100_000, 1_100_000, 900_000)
  .lineTo(1_100_000, 800_000)
  .closeSubPath()
  .end()
  .build();

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(JOIN_BEVEL),
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  createBlendedGeometry(GROUP_0_START_PATH, GROUP_0_END_PATH, 6),
  createBlendedGeometry(GROUP_1_START_PATH, GROUP_1_END_PATH, 6),
  createBlendedGeometry(GROUP_2_START_PATH, GROUP_2_END_PATH, 6),
  createBlendedGeometry(GROUP_3_START_PATH, GROUP_3_END_PATH, 6),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimpleGeometryBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 6),
  createSimpleGeometryBlendGroup(GROUP_1_START_PATH, GROUP_1_END_PATH, 6),
  createSimpleGeometryBlendGroup(GROUP_2_START_PATH, GROUP_2_END_PATH, 6),
  createSimpleGeometryBlendGroup(GROUP_3_START_PATH, GROUP_3_END_PATH, 6),
  List.of(WORK_AREA),
);
