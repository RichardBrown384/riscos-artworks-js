/*
Example: 041-open-v-marker-start-circle

Purpose:
Demonstrates circle start markers
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordMarkerStart,
  },
  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  WORK_AREA,
} = require('../shared-objects');

const MARKER_START = RecordMarkerStart.builder()
  .unknown4(Constants.UNKNOWN_4_BIT_0)
  .markerStyle(Constants.MARKER_CIRCLE)
  .markerWidth(0x10000 * 6)
  .markerHeight(0x10000 * 4)
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(MARKER_START),
      List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
      List.of(WORK_AREA),
    ),
  )
  .build();
