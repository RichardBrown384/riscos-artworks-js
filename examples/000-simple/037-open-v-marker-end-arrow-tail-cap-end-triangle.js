/*
Example: 037-open-v-marker-end-arrow-tail-cap-end-triangle

Purpose:
Demonstrates the interaction between end line caps and end line markers.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordLineCapEnd,
    RecordMarkerEnd,
  },
  CAP_TRIANGLE,
  MARKER_ARROW_TAIL,

  UNKNOWN_4_BIT_0,
} = require('../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  WORK_AREA,
} = require('../shared-objects');

const END_CAP = RecordLineCapEnd.of(
  UNKNOWN_4_BIT_0,
  CAP_TRIANGLE,
  RecordLineCapEnd.capTriangle(10 * 128, 10 * 128),
);

const MARKER_END = RecordMarkerEnd.builder()
  .unknown4(UNKNOWN_4_BIT_0)
  .markerStyle(MARKER_ARROW_TAIL)
  .markerWidth(0x10000 * 4)
  .markerHeight(0x10000 * 4)
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(END_CAP),
      List.of(MARKER_END),
      List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
      List.of(WORK_AREA),
    ),
  )
  .build();
