/*
Example: 018-blend-poly-lines-moving-second-target-vertex

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

This differs from 010-blend-poly-lines by allowing us to move the second vertex of the target path

We arbitrarily set the initial SECOND_VERTEX_Y to 120_000 and found by chance that !AWViewer
also adds points to the _source_ path. The new source points appear to be placed in the same
way as the target points, that is by taking into account the lengths of the opposing line segments.

The point distribution changes when SECOND_VERTEX_Y is greater than or equal to 132_231.
At the point the second vertex is slightly below the line defined by the 2nd and 3rd vertices.

The point distribution changes again when SECOND_VERTEX_Y is greater than or equal to 310_182.

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
const { lineLength } = require('../util');

function sum(array) {
  return array.reduce((x, y) => x + y, 0.0);
}

function parameter(lengths, n) {
  return sum(lengths.slice(0, n)) / sum(lengths);
}

const THRESHOLD_Y = 132_231;
const SECOND_VERTEX_Y = 120_000;

const T1 = lineLength(1_000_000, 100_000, 1_010_000, SECOND_VERTEX_Y);
const T2 = lineLength(1_010_000, SECOND_VERTEX_Y, 1_100_000, 450_000);
const B1 = parameter([T1, T2], 1);

const S1 = lineLength(100_000, 400_000, 120_000, 416_000);
const S2 = lineLength(120_000, 416_000, 150_000, 300_000);
const S3 = lineLength(150_000, 300_000, 200_000, 500_000);
const S4 = lineLength(200_000, 500_000, 150_000, 90_000);
const S5 = lineLength(150_000, 90_000, 130_000, 120_000);

const X1 = parameter([S1, S2, S3, S4, S5], 1);
const Y1 = parameter([S1, S2, S3, S4, S5], 2);
const Z1 = parameter([S1, S2, S3, S4, S5], 3);
const W1 = parameter([S1, S2, S3, S4, S5], 4);

const X2 = parameter([S1, S2, S3], 1);
const Y2 = parameter([S1, S2, S3], 2);
const Z2 = parameter([S4, S5], 1);

const SOURCE_WEIGHTS_1 = [
  [],
  [B1], // 0.0614
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

const TARGET_WEIGHTS_1 = [
  [],
  [],
  [],
  [X1, Y1, Z1, W1], // 0.0320, 0.1816 0.4391 0.9550
  [],
  [],
  [],
];

const TARGET_WEIGHTS_2 = [
  [],
  [],
  [X2, Y2],
  [Z2],
  [],
  [],
  [],
];

const SOURCE_WEIGHTS = (SECOND_VERTEX_Y < THRESHOLD_Y) ? SOURCE_WEIGHTS_1 : null;
const TARGET_WEIGHTS = (SECOND_VERTEX_Y < THRESHOLD_Y) ? TARGET_WEIGHTS_1 : TARGET_WEIGHTS_2;

const GROUP_0_START_PATH = Path.builder()
  .moveTo(100_000, 100_000, Constants.TAG_BIT_31)
  .lineTo(100_000, 400_000)
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
  .lineTo(1_010_000, SECOND_VERTEX_Y)
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
    startWeights: SOURCE_WEIGHTS,
    endPath: GROUP_0_END_PATH,
    endWeights: TARGET_WEIGHTS,
    steps: 7,
  }),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 7),
  List.of(WORK_AREA),
);
