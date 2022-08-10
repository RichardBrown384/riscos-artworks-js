/*
Example: 107-when-there-are-multiple-paths-beneath-beneath-a-layer-the-are-draw-in-order

Purpose:

Draws a 30% black triangle stroked red
behind a red pentagon stroked blue
behind a red-yellow radially-filled pentagon stroked magenta.

To demonstrate the order in which objects beneath a layer are rendered.

 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordLayer,
  },
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
  WORK_AREA, createRecordPathFromPath,
} = require('../shared-objects');

const {
  createClosedPentagram,
  createClosedNSidedPolygon,
} = require('../path-creators');

const PENTAGRAM = createClosedPentagram(100_000, 100_000, 80_000);
const PATH_PENTAGRAM = createRecordPathFromPath(
  PENTAGRAM,
  10_000,
  STROKE_WIDTH_6000,
  FILL_FLAT_RED,
);

const HEXAGON = createClosedNSidedPolygon(6, 150_000, 50_000, 40_000);
const PATH_HEXAGON = createRecordPathFromPath(
  HEXAGON,
  10_000,
  STROKE_WIDTH_1500,
  FILL_RADIAL_RED_YELLOW,
);

const LAYER = RecordLayer.builder()
  .unknown24(LAYER_UNKNOWN_24_BIT_0 + LAYER_UNKNOWN_24_BIT_3)
  .name('Foreground')
  .lists(
    Lists.of(
      List.of(PATH_PENTAGRAM, STROKE_COLOUR_BLUE),
      List.of(PATH_HEXAGON, STROKE_COLOUR_MAGENTA),
    ),
  )
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_BLACK_30),
      List.of(STROKE_COLOUR_RED),
      List.of(LAYER, PATH_TRIANGLE, STROKE_WIDTH_3000),
      List.of(WORK_AREA),
    ),
  )
  .build();