/*
Example: 108-when-a-path-does-not-have-a-sibling-attribute-the-others-are-applied

Purpose:

File to draw multiple hexagons with varying number of attributes.

Some observations:

1. The placement of layer objects within the tree doesn't cause immediate problems for the viewer
2. When paths don't have style siblings their style children are applied.

 */

const {
  Builders: {
    Artworks,
    BoundingBox,
    Lists,
    List,

    RecordLayer,
    RecordPath,
  },
  UNKNOWN_4_BIT_1,
  LAYER_UNKNOWN_24_BIT_0,
  LAYER_UNKNOWN_24_BIT_3,
} = require('../../src/artworks');

const {
  PATH_TRIANGLE,
  FILL_FLAT_RED,
  FILL_FLAT_BLACK_30,
  FILL_RADIAL_RED_YELLOW,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
  STROKE_COLOUR_MAGENTA,
  STROKE_WIDTH_1500,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,

  LAYER_FOREGROUND,
  WORK_AREA,

} = require('../shared-objects');

const {
  createClosedPentagram,
  createClosedNSidedPolygon,
} = require('../path-creators');

const {
  createRecordPath,
} = require('../record-creators');

const PENTAGRAM = createClosedPentagram(100_000, 100_000, 80_000);
const PATH_PENTAGRAM = RecordPath.builder()
  .unknown4(UNKNOWN_4_BIT_1)
  .boundingBox(BoundingBox.of(PENTAGRAM, 10_000))
  .path(PENTAGRAM)
  .lists(
    Lists.of(
      List.of(STROKE_WIDTH_6000),
      List.of(FILL_FLAT_RED),
    ),
  )
  .build();

const HEXAGON_RADIUS = 40_000;
const HEXAGON_PADDING = 10_000;

function createHexagon(x, y, ...attributes) {
  const path = createClosedNSidedPolygon(6, x, y, HEXAGON_RADIUS);
  return createRecordPath(path, HEXAGON_PADDING, ...attributes);
}

const PATH_HEXAGON_1 = createHexagon(150_000, 50_000);
const PATH_HEXAGON_2 = createHexagon(200_000, 50_000);
const PATH_HEXAGON_3 = createHexagon(250_000, 50_000, FILL_FLAT_RED);
const PATH_HEXAGON_4 = createHexagon(300_000, 50_000, FILL_FLAT_RED);
const PATH_HEXAGON_5 = createHexagon(150_000, 250_000, STROKE_COLOUR_MAGENTA);
const PATH_HEXAGON_6 = createHexagon(200_000, 250_000, STROKE_COLOUR_MAGENTA);
const PATH_HEXAGON_7 = createHexagon(250_000, 250_000, FILL_FLAT_RED, STROKE_WIDTH_3000);
const PATH_HEXAGON_8 = createHexagon(300_000, 250_000, FILL_FLAT_RED, STROKE_WIDTH_3000);

const LAYER = RecordLayer.builder()
  .unknown24(LAYER_UNKNOWN_24_BIT_0 + LAYER_UNKNOWN_24_BIT_3)
  .name('Foreground')
  .lists(
    Lists.of(
      List.of(PATH_PENTAGRAM, STROKE_COLOUR_BLUE),
      List.of(PATH_HEXAGON_1),
      List.of(PATH_HEXAGON_2, STROKE_COLOUR_BLUE),
      List.of(PATH_HEXAGON_3, LAYER_FOREGROUND),
      List.of(PATH_HEXAGON_4, STROKE_COLOUR_MAGENTA),
      List.of(PATH_HEXAGON_5, LAYER_FOREGROUND),
      List.of(PATH_HEXAGON_6, FILL_RADIAL_RED_YELLOW),
      List.of(PATH_HEXAGON_7, LAYER_FOREGROUND),
      List.of(PATH_HEXAGON_8, STROKE_COLOUR_BLUE),
    ),
  )
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_BLACK_30),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_1500),
      List.of(LAYER, PATH_TRIANGLE, STROKE_WIDTH_3000),
      List.of(WORK_AREA),
    ),
  )
  .build();
