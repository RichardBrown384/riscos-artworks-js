/*
Example: 034-open-v-marker-end-arrow-head

Purpose:
Demonstrates arrow head end markers
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordMarkerEnd,
  },
  MARKER_ARROW_HEAD,

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

const MARKER_END = RecordMarkerEnd.builder()
  .unknown4(UNKNOWN_4_BIT_0)
  .markerStyle(MARKER_ARROW_HEAD)
  .markerWidth(0x10000 * 4)
  .markerHeight(0x10000 * 6)
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(MARKER_END),
      List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
      List.of(WORK_AREA),
    ),
  )
  .build();
