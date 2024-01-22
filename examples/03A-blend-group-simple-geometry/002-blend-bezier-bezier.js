/*
Example: 002-blend-bezier-bezier
Purpose:

To demonstrate bezier - bezier interpolation.

The third case demonstrates what happens when you interpolate between two
self-intersecting bezier segments.

Note: There appears to be some sort of problem with the file structure.
Putting the four interpolated curves behind the four blend groups crashes !AWViewer.
Interleaving the last set seems to resolve the issue.

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
  .lineTo(100_000, 200_000)
  .bezierTo(100_000, 250_000, 200_000, 250_000, 200_000, 200_000)
  .lineTo(200_000, 100_000)
  .closeSubPath()
  .end()
  .build();
const GROUP_0_END_PATH = Path.builder()
  .moveTo(1_000_000, 100_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 200_000)
  .bezierTo(1_000_000, 250_000, 1_100_000, 250_000, 1_100_000, 200_000)
  .lineTo(1_100_000, 100_000)
  .closeSubPath()
  .end()
  .build();

const GROUP_1_START_PATH = Path.builder()
  .moveTo(100_000, 300_000, Constants.TAG_BIT_31)
  .lineTo(100_000, 400_000)
  .bezierTo(100_000, 450_000, 200_000, 450_000, 200_000, 400_000)
  .lineTo(200_000, 300_000)
  .closeSubPath()
  .end()
  .build();
const GROUP_1_END_PATH = Path.builder()
  .moveTo(1_000_000, 300_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 400_000)
  .bezierTo(1_000_000, 350_000, 1_100_000, 350_000, 1_100_000, 400_000)
  .lineTo(1_100_000, 300_000)
  .closeSubPath()
  .end()
  .build();

const GROUP_2_START_PATH = Path.builder()
  .moveTo(100_000, 500_000, Constants.TAG_BIT_31)
  .lineTo(100_000, 600_000)
  .bezierTo(125_000, 700_000, 175_000, 500_000, 200_000, 600_000)
  .lineTo(200_000, 500_000)
  .closeSubPath()
  .end()
  .build();
const GROUP_2_END_PATH = Path.builder()
  .moveTo(1_000_000, 500_000, Constants.TAG_BIT_31)
  .lineTo(1_000_000, 600_000)
  .bezierTo(1_025_000, 500_000, 1_075_000, 700_000, 1_100_000, 600_000)
  .lineTo(1_100_000, 500_000)
  .closeSubPath()
  .end()
  .build();

const GROUP_3_START_PATH = Path.builder()
  .moveTo(100_000, 800_000, Constants.TAG_BIT_31)
  .lineTo(100_000, 900_000)
  .bezierTo(300_000, 1_050_000, 0, 1_050_000, 200_000, 900_000)
  .lineTo(200_000, 800_000)
  .closeSubPath()
  .end()
  .build();
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
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_0_START_PATH,
    endPath: GROUP_0_END_PATH,
    steps: 6,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_1_START_PATH,
    endPath: GROUP_1_END_PATH,
    steps: 6,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_2_START_PATH,
    endPath: GROUP_2_END_PATH,
    steps: 6,
  }),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 6),
  createSimplePathBlendGroup(GROUP_1_START_PATH, GROUP_1_END_PATH, 6),
  createSimplePathBlendGroup(GROUP_2_START_PATH, GROUP_2_END_PATH, 6),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_3_START_PATH,
    endPath: GROUP_3_END_PATH,
    steps: 6,
  }),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_3_START_PATH, GROUP_3_END_PATH, 6),
  List.of(WORK_AREA),
);
