/*
Example: 003-blend-polygons-to-triangle

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

 */

const {
  Builders: {
    List,
  },
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

const { createClosedNSidedPolygon } = require('../path-creators');

const { createSimpleGeometryBlendGroup, createBlendedGeometryWithInserts } = require('../simple-blend-group');

const GROUP_0_START_PATH = createClosedNSidedPolygon(4, 150_000, 150_000, 50_000);
const GROUP_0_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 150_000, 50_000);

const GROUP_1_START_PATH = createClosedNSidedPolygon(5, 150_000, 450_000, 50_000);
const GROUP_1_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 450_000, 50_000);

const GROUP_2_START_PATH = createClosedNSidedPolygon(6, 150_000, 750_000, 50_000);
const GROUP_2_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 750_000, 50_000);

const GROUP_3_START_PATH = createClosedNSidedPolygon(7, 150_000, 1_050_000, 50_000);
const GROUP_3_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_050_000, 50_000);

const GROUP_4_START_PATH = createClosedNSidedPolygon(8, 150_000, 1_350_000, 50_000);
const GROUP_4_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_350_000, 50_000);

const GROUP_5_START_PATH = createClosedNSidedPolygon(9, 150_000, 1_650_000, 50_000);
const GROUP_5_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_650_000, 50_000);

const GROUP_6_START_PATH = createClosedNSidedPolygon(10, 150_000, 1_950_000, 50_000);
const GROUP_6_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_950_000, 50_000);

const GROUP_7_START_PATH = createClosedNSidedPolygon(11, 150_000, 2_250_000, 50_000);
const GROUP_7_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 2_250_000, 50_000);

const GROUP_8_START_PATH = createClosedNSidedPolygon(12, 150_000, 2_550_000, 50_000);
const GROUP_8_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 2_550_000, 50_000);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(JOIN_BEVEL),
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  ...createBlendedGeometryWithInserts(GROUP_0_START_PATH, GROUP_0_END_PATH, [0, 0, 1, 0, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_1_START_PATH, GROUP_1_END_PATH, [0, 1, 0, 1, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_2_START_PATH, GROUP_2_END_PATH, [0, 1, 1, 1, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_3_START_PATH, GROUP_3_END_PATH, [0, 1, 2, 1, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_4_START_PATH, GROUP_4_END_PATH, [0, 2, 1, 2, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_5_START_PATH, GROUP_5_END_PATH, [0, 2, 2, 2, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_6_START_PATH, GROUP_6_END_PATH, [0, 2, 3, 2, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_7_START_PATH, GROUP_7_END_PATH, [0, 3, 2, 3, 0], 8),
  ...createBlendedGeometryWithInserts(GROUP_8_START_PATH, GROUP_8_END_PATH, [0, 3, 3, 3, 0], 8),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_1280),
  createSimpleGeometryBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_1_START_PATH, GROUP_1_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_2_START_PATH, GROUP_2_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_3_START_PATH, GROUP_3_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_4_START_PATH, GROUP_4_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_5_START_PATH, GROUP_5_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_6_START_PATH, GROUP_6_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_7_START_PATH, GROUP_7_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_8_START_PATH, GROUP_8_END_PATH, 8),
  List.of(WORK_AREA),
);
