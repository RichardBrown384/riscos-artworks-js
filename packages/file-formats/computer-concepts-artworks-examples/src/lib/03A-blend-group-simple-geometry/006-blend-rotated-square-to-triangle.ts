/*
Example: 006-blend-rotated-squares-to-triangle

Purpose:

To demonstrate what happens when you blend between a square rotated through
various angles to a triangle.

What's surprising about this is that regardless of the degree of rotation !AWViewer decides to
split the triangle at the same point (midway along the second edge).

 */

import { degreesToRadians } from '@rbrown/geometry';

import { createClosedNSidedPolygon } from '../path-creators.js';
import { createArtworks, createList } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  FILL_FLAT_TRANSPARENT,
  JOIN_BEVEL,
  STROKE_COLOUR_BLACK,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_1280,
  STROKE_WIDTH_3000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimplePathBlendGroup } from '../simple-blend-group.js';
import {
  convertInsertsListToWeightsList,
  createBlendedPathRecordsWithWeights,
} from '../simulated-blend-group.js';

const GROUP_0_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  150_000,
  50_000,
  degreesToRadians(0),
);
const GROUP_0_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  150_000,
  50_000,
);

const GROUP_1_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  450_000,
  50_000,
  degreesToRadians(10),
);
const GROUP_1_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  450_000,
  50_000,
);

const GROUP_2_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  750_000,
  50_000,
  degreesToRadians(20),
);
const GROUP_2_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  750_000,
  50_000,
);

const GROUP_3_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  1_050_000,
  50_000,
  degreesToRadians(30),
);
const GROUP_3_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_050_000,
  50_000,
);

const GROUP_4_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  1_350_000,
  50_000,
  degreesToRadians(40),
);
const GROUP_4_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_350_000,
  50_000,
);

const GROUP_5_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  1_650_000,
  50_000,
  degreesToRadians(50),
);
const GROUP_5_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_650_000,
  50_000,
);

const GROUP_6_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  1_950_000,
  50_000,
  degreesToRadians(60),
);
const GROUP_6_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_950_000,
  50_000,
);

const GROUP_7_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  2_250_000,
  50_000,
  degreesToRadians(70),
);
const GROUP_7_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  2_250_000,
  50_000,
);

const GROUP_8_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  2_550_000,
  50_000,
  degreesToRadians(80),
);
const GROUP_8_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  2_550_000,
  50_000,
);

const GROUP_9_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  2_850_000,
  50_000,
  degreesToRadians(90),
);
const GROUP_9_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  2_850_000,
  50_000,
);

const GROUP_10_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  3_150_000,
  50_000,
  degreesToRadians(100),
);
const GROUP_10_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  3_150_000,
  50_000,
);

const GROUP_11_START_PATH = createClosedNSidedPolygon(
  4,
  150_000,
  3_450_000,
  50_000,
  degreesToRadians(110),
);
const GROUP_11_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  3_450_000,
  50_000,
);

const INSERTS = [0, 0, 1, 0, 0];

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(JOIN_BEVEL),
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_0_START_PATH,
    endPath: GROUP_0_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_1_START_PATH,
    endPath: GROUP_1_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_2_START_PATH,
    endPath: GROUP_2_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_3_START_PATH,
    endPath: GROUP_3_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_4_START_PATH,
    endPath: GROUP_4_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_5_START_PATH,
    endPath: GROUP_5_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_6_START_PATH,
    endPath: GROUP_6_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_7_START_PATH,
    endPath: GROUP_7_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_8_START_PATH,
    endPath: GROUP_8_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_9_START_PATH,
    endPath: GROUP_9_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_10_START_PATH,
    endPath: GROUP_10_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_11_START_PATH,
    endPath: GROUP_11_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS),
    steps: 8,
  }),
  createList(STROKE_COLOUR_BLACK),
  createList(STROKE_WIDTH_1280),
  createSimplePathBlendGroup(GROUP_0_START_PATH, GROUP_0_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_1_START_PATH, GROUP_1_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_2_START_PATH, GROUP_2_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_3_START_PATH, GROUP_3_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_4_START_PATH, GROUP_4_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_5_START_PATH, GROUP_5_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_6_START_PATH, GROUP_6_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_7_START_PATH, GROUP_7_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_8_START_PATH, GROUP_8_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_9_START_PATH, GROUP_9_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_10_START_PATH, GROUP_10_END_PATH, 8),
  createSimplePathBlendGroup(GROUP_11_START_PATH, GROUP_11_END_PATH, 8),
  createList(WORK_AREA),
);
