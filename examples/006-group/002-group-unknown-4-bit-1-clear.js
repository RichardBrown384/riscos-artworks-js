/*
Example: 002-group-unknown-4-bit-1-clear

Purpose:

To demonstrate that if bit 1 of unknown4 is clear then group doesn't get drawn
correctly in !AWViewer.

The first pentagon is partially visible but the file's bounding box appears to
be wrong.

 */

const {
  Builders: {
    BoundingBox,
    List,
  },
} = require('../../src').Artworks;

const {
  LAYER_FOREGROUND,
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1500,
  WORK_AREA,

} = require('../shared-objects');

const {
  createClosedNSidedPolygon,
} = require('../path-creators');

const {
  createArtworks, createRecordPath, createRecordGroupFull,
} = require('../record-creators');

const PENTAGON_RADIUS = 40_000;
const PENTAGON_PADDING = 10_000;

function createPentagon(x, y) {
  const path = createClosedNSidedPolygon(5, x, y, PENTAGON_RADIUS);
  return createRecordPath(path, PENTAGON_PADDING);
}

const PATH_PENTAGON_1 = createPentagon(50_000, 50_000);
const PATH_PENTAGON_2 = createPentagon(100_000, 75_000);
const PATH_PENTAGON_3 = createPentagon(150_000, 50_000);

const GROUP_BOUNDING_BOX = BoundingBox.builder()
  .minX(0)
  .minY(0)
  .maxX(200_000)
  .maxY(120_000)
  .build();

const GROUP = createRecordGroupFull(
  0,
  GROUP_BOUNDING_BOX,
  List.of(PATH_PENTAGON_2),
  List.of(PATH_PENTAGON_3),
);

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_1500),
  List.of(LAYER_FOREGROUND, GROUP, PATH_PENTAGON_1),
  List.of(WORK_AREA),
);
