/*
Example: 200-blend-bezier-split

Purpose:

To demonstrate that !AWViewer splits bezier segments when blending.

In the example below the Bezier below is split in two at the parametric distance of 0.3206
which is equal to the length of the second source line segment divided by the sum of the
lengths second and third source line segments, as with other examples involving straight lines.

The second target line segment (immediately after the bezier) is split in two at the parametric
distance of 0.3586 which is equal to the length of the fourth source line segment divided by
the sum of the lengths of the fourth and fifth source line segments.

0.3206 = L2 / (L2 + L3)
0.3586 = L4 / (L4 + L5)

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

const { createSimplePathBlendGroup } = require('../simple-blend-group');
const { createBlendedPathRecordsWithWeights } = require('../simulated-blend-group');

const GROUP_0_START_PATH = Path.builder()
  .moveTo(100_000, 100_000, Constants.TAG_BIT_31)
  .lineTo(100_000, 200_000) // L1
  .lineTo(120_000, 250_000) // L2
  .lineTo(175_000, 150_000) // L3
  .lineTo(200_000, 200_000) // L4
  .lineTo(200_000, 100_000) // L5
  .closeSubPath() // L6
  .end()
  .build();
const GROUP_0_END_PATH = Path.builder()
  .moveTo(1_000_000, 100_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 200_000)
  .bezierTo(1_020_000, 230_000, 1_080_000, 230_000, 1_100_000, 200_000)
  .lineTo(1_100_000, 100_000)
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
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_0_START_PATH,
    endPath: GROUP_0_END_PATH,
    endWeights: [
      [],
      [],
      [0.3206],
      [0.3586],
      [],
      [],
    ],
    steps: 7,
  }),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  List.of(WORK_AREA),
);
