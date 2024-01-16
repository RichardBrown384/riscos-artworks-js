/*
Example: 006-blend-rotated-squares-to-triangle

Purpose:

To demonstrate what happens when you blend between a square rotated through various angles to a triangle.

What's surprising about this is that regardless of the degree of rotation !AWViewer decides to
split the triangle at the same point (midway along the second edge).

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

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

const GROUP_0_START_PATH = createClosedNSidedPolygon(4, 150_000, 150_000, 50_000, degToRad(0));
const GROUP_0_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 150_000, 50_000);

const GROUP_1_START_PATH = createClosedNSidedPolygon(4, 150_000, 450_000, 50_000, degToRad(10));
const GROUP_1_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 450_000, 50_000);

const GROUP_2_START_PATH = createClosedNSidedPolygon(4, 150_000, 750_000, 50_000, degToRad(20));
const GROUP_2_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 750_000, 50_000);

const GROUP_3_START_PATH = createClosedNSidedPolygon(4, 150_000, 1_050_000, 50_000, degToRad(30));
const GROUP_3_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_050_000, 50_000);

const GROUP_4_START_PATH = createClosedNSidedPolygon(4, 150_000, 1_350_000, 50_000, degToRad(40));
const GROUP_4_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_350_000, 50_000);

const GROUP_5_START_PATH = createClosedNSidedPolygon(4, 150_000, 1_650_000, 50_000, degToRad(50));
const GROUP_5_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_650_000, 50_000);

const GROUP_6_START_PATH = createClosedNSidedPolygon(4, 150_000, 1_950_000, 50_000, degToRad(60));
const GROUP_6_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 1_950_000, 50_000);

const GROUP_7_START_PATH = createClosedNSidedPolygon(4, 150_000, 2_250_000, 50_000, degToRad(70));
const GROUP_7_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 2_250_000, 50_000);

const GROUP_8_START_PATH = createClosedNSidedPolygon(4, 150_000, 2_550_000, 50_000, degToRad(80));
const GROUP_8_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 2_550_000, 50_000);

const GROUP_9_START_PATH = createClosedNSidedPolygon(4, 150_000, 2_850_000, 50_000, degToRad(90));
const GROUP_9_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 2_850_000, 50_000);

const GROUP_10_START_PATH = createClosedNSidedPolygon(4, 150_000, 3_150_000, 50_000, degToRad(100));
const GROUP_10_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 3_150_000, 50_000);

const GROUP_11_START_PATH = createClosedNSidedPolygon(4, 150_000, 3_450_000, 50_000, degToRad(110));
const GROUP_11_END_PATH = createClosedNSidedPolygon(3, 1_050_000, 3_450_000, 50_000);

const INSERTS = [0, 0, 1, 0, 0];

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(JOIN_BEVEL),
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  ...createBlendedGeometryWithInserts(GROUP_0_START_PATH, GROUP_0_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_1_START_PATH, GROUP_1_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_2_START_PATH, GROUP_2_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_3_START_PATH, GROUP_3_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_4_START_PATH, GROUP_4_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_5_START_PATH, GROUP_5_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_6_START_PATH, GROUP_6_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_7_START_PATH, GROUP_7_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_8_START_PATH, GROUP_8_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_9_START_PATH, GROUP_9_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_10_START_PATH, GROUP_10_END_PATH, INSERTS, 8),
  ...createBlendedGeometryWithInserts(GROUP_11_START_PATH, GROUP_11_END_PATH, INSERTS, 8),
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
  createSimpleGeometryBlendGroup(GROUP_9_START_PATH, GROUP_9_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_10_START_PATH, GROUP_10_END_PATH, 8),
  createSimpleGeometryBlendGroup(GROUP_11_START_PATH, GROUP_11_END_PATH, 8),
  List.of(WORK_AREA),
);
