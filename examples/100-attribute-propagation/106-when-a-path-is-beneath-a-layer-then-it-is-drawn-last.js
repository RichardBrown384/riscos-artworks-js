/*
Example: 106-when-a-path-is-beneath-a-layer-then-it-is-drawn-last

Purpose:

Draws a 30% black triangle, stroked red with a stroke width of 3000 behind a red pentagram,
stroked blue with a stroke width of 6000.

This example demonstrates two things.

Firstly, the order in which things are drawn:
The layer's siblings (the triangle) are drawn first and end up
behind the layer's descendants (the pentagram).

Secondly, some details about how attributes are propagated:

The triangle doesn't inherit any properties from the pentagram and vice versa.
The rules appear to be

1. Attribute changes that happen beneath the layer stay beneath the layer.
2. Attribute changes that happen at the same level as the layer don't propagate down.
(Otherwise in this case the pentagram would be stroked red).

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
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,
  WORK_AREA,
} = require('../shared-objects');

const {
  createClosedPentagram,
} = require('../path-creators');

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

const LAYER = RecordLayer.builder()
  .unknown24(LAYER_UNKNOWN_24_BIT_0 + LAYER_UNKNOWN_24_BIT_3)
  .name('Foreground')
  .lists(
    Lists.of(
      List.of(PATH_PENTAGRAM, STROKE_COLOUR_BLUE),
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
