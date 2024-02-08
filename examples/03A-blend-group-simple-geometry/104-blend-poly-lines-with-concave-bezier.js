/*
Example: 104-blend-poly-lines-with-concave-bezier

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by introducing a solitary concave bezier segment

We tabulate here the x-coordinates of the control points (divided by 1000) and the arc length
of the bezier segment (similarly divided by 1000).

140.000 = 307.8182
150.000 = 312.0686
152.000 = 313.0185
154.000 = 314.0006
154.250 = 314.1256
154.287 = 314.1441
154.306 = 314.1537
154.315 = 314.1582
154.316 = 314.1587
154.317 = 314.1592
154.318 = 314.1597 (point distribution changes)
154.319 = 314.1602
154.320 = 314.1607
154.325 = 314.1632
154.500 = 314.2511
155.000 = 314.5035
160.000 = 317.1348

When the x coordinate is greater than or equal to 154318 point distribution regime
changes in the interpolated shape.

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

const CONTROL_POINT_X = 154_317;

const GROUP_0_START_PATH = Path.builder()
  .moveTo(100_000, 100_000, Constants.TAG_BIT_31)
  .bezierTo(CONTROL_POINT_X, 200_000, CONTROL_POINT_X, 300_000, 100_000, 400_000)
  .lineTo(120_000, 416_000)
  .lineTo(150_000, 300_000)
  .lineTo(200_000, 500_000)
  .lineTo(150_000, 90_000)
  .lineTo(130_000, 120_000)
  .lineTo(120_000, 11_000)
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
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_0_START_PATH,
    endPath: GROUP_0_END_PATH,
    endWeights: [
      [],
      [0.6835666886895685, 0.7392959168293128],
      [],
      [0.92], // calculated  [0.9197]
      [],
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
