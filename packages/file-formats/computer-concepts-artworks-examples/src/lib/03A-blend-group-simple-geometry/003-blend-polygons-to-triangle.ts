/*
Example: 003-blend-polygons-to-triangle

Purpose:

To demonstrate what happens when you blend between shapes that have a different number of points

 */

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

import { createArtworks, createList } from '../record-creators.js';

import { createClosedNSidedPolygon } from '../path-creators.js';

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
);
const GROUP_0_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  150_000,
  50_000,
);

const GROUP_1_START_PATH = createClosedNSidedPolygon(
  5,
  150_000,
  450_000,
  50_000,
);
const GROUP_1_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  450_000,
  50_000,
);

const GROUP_2_START_PATH = createClosedNSidedPolygon(
  6,
  150_000,
  750_000,
  50_000,
);
const GROUP_2_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  750_000,
  50_000,
);

const GROUP_3_START_PATH = createClosedNSidedPolygon(
  7,
  150_000,
  1_050_000,
  50_000,
);
const GROUP_3_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_050_000,
  50_000,
);

const GROUP_4_START_PATH = createClosedNSidedPolygon(
  8,
  150_000,
  1_350_000,
  50_000,
);
const GROUP_4_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_350_000,
  50_000,
);

const GROUP_5_START_PATH = createClosedNSidedPolygon(
  9,
  150_000,
  1_650_000,
  50_000,
);
const GROUP_5_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_650_000,
  50_000,
);

const GROUP_6_START_PATH = createClosedNSidedPolygon(
  10,
  150_000,
  1_950_000,
  50_000,
);
const GROUP_6_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  1_950_000,
  50_000,
);

const GROUP_7_START_PATH = createClosedNSidedPolygon(
  11,
  150_000,
  2_250_000,
  50_000,
);
const GROUP_7_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  2_250_000,
  50_000,
);

const GROUP_8_START_PATH = createClosedNSidedPolygon(
  12,
  150_000,
  2_550_000,
  50_000,
);
const GROUP_8_END_PATH = createClosedNSidedPolygon(
  3,
  1_050_000,
  2_550_000,
  50_000,
);

const INSERTS_0 = [0, 0, 1, 0, 0];
const INSERTS_1 = [0, 1, 0, 1, 0];
const INSERTS_2 = [0, 1, 1, 1, 0];
const INSERTS_3 = [0, 1, 2, 1, 0];
const INSERTS_4 = [0, 2, 1, 2, 0];
const INSERTS_5 = [0, 2, 2, 2, 0];
const INSERTS_6 = [0, 2, 3, 2, 0];
const INSERTS_7 = [0, 3, 2, 3, 0];
const INSERTS_8 = [0, 3, 3, 3, 0];

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
    endWeights: convertInsertsListToWeightsList(INSERTS_0),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_1_START_PATH,
    endPath: GROUP_1_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_1),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_2_START_PATH,
    endPath: GROUP_2_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_2),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_3_START_PATH,
    endPath: GROUP_3_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_3),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_4_START_PATH,
    endPath: GROUP_4_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_4),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_5_START_PATH,
    endPath: GROUP_5_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_5),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_6_START_PATH,
    endPath: GROUP_6_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_6),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_7_START_PATH,
    endPath: GROUP_7_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_7),
    steps: 8,
  }),
  ...createBlendedPathRecordsWithWeights({
    startPath: GROUP_8_START_PATH,
    endPath: GROUP_8_END_PATH,
    endWeights: convertInsertsListToWeightsList(INSERTS_8),
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
  createList(WORK_AREA),
);
