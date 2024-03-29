/*
Example: 009-when-objects-are-beneath-a-group-they-are-drawn-last-and-in-order

Purpose:

Draws a 30% black hexagon stroked blue
behind a red hexagon stroked red
behind a radially-filled hexagon stroked blue.

The purpose is to demonstrate that grouped objects are drawn
after the group's siblings and that the group members
are drawn in order.
 */

const {
  Builders: {
    BoundingBox,
    List,
  },
} = require('../../src').Artworks;

const {
  LAYER_FOREGROUND,
  FILL_FLAT_RED,
  FILL_FLAT_BLACK_30,
  FILL_RADIAL_RED_YELLOW,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,
  WORK_AREA,

} = require('../shared-objects');

const {
  createClosedNSidedPolygon,
} = require('../path-creators');

const {
  createArtworks, createRecordPath, createRecordGroup,
} = require('../record-creators');

const HEXAGON_RADIUS = 40_000;
const HEXAGON_PADDING = 10_000;

function createHexagon(x, y, ...attributes) {
  const path = createClosedNSidedPolygon(6, x, y, HEXAGON_RADIUS);
  return createRecordPath(path, HEXAGON_PADDING, ...attributes);
}

const PATH_HEXAGON_1 = createHexagon(50_000, 50_000);
const PATH_HEXAGON_2 = createHexagon(100_000, 75_000, FILL_FLAT_RED);
const PATH_HEXAGON_3 = createHexagon(150_000, 50_000, FILL_RADIAL_RED_YELLOW);

const GROUP_BOUNDING_BOX = BoundingBox.builder()
  .minX(0)
  .minY(0)
  .maxX(200_000)
  .maxY(120_000)
  .build();

const GROUP = createRecordGroup(
  GROUP_BOUNDING_BOX,
  List.of(PATH_HEXAGON_2, STROKE_WIDTH_6000),
  List.of(PATH_HEXAGON_3, STROKE_COLOUR_BLUE),
);

module.exports = createArtworks(
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(LAYER_FOREGROUND, GROUP, PATH_HEXAGON_1, STROKE_COLOUR_BLUE),
  List.of(WORK_AREA),
);
