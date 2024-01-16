/*
Example: 010-blend-poly-lines

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

The weights were worked out by hand by using a tape measure placed up against the screen.

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

const {
  createSimpleGeometryBlendGroup,
  createBlendedGeometryWithWeights,
} = require('../simple-blend-group');

const GROUP_0_START_PATH = Path.builder()
  .moveTo(100_000, 100_000, Constants.TAG_BIT_31)
  .lineTo(100_000, 400_000)
  .lineTo(120_000, 416_000)
  .lineTo(150_000, 300_000)
  .lineTo(200_000, 500_000)
  .lineTo(150_000, 90_000)
  .lineTo(130_000, 120_000)
  .lineTo(120_000, 110_00)
  .closeSubPath()
  .end()
  .build();
const GROUP_0_END_PATH = Path.builder()
  .moveTo(1_000_000, 100_000, Constants.TAG_BIT_31)
  .lineTo(1_010_000, 370_000)
  .lineTo(1_100_000, 450_000)
  .lineTo(1_120_000, 80_000)
  .lineTo(1_110_000, 70_000)
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
  ...createBlendedGeometryWithWeights(GROUP_0_START_PATH, GROUP_0_END_PATH, [
    [],
    [0.67, 0.73],
    [],
    [0.92],
    [],
    [],
    [],
  ], 7),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimpleGeometryBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  List.of(WORK_AREA),
);
