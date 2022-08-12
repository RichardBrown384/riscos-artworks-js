/*
Example: 043-open-v-marker-start-arrow-tail-cap-start-triangle

Purpose:
Demonstrates the interaction between start line caps and start line markers.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordLineCapStart,
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

const START_CAP = RecordLineCapStart.of(
  Constants.UNKNOWN_4_BIT_0,
  Constants.CAP_TRIANGLE,
  RecordLineCapStart.capTriangle(10 * 128, 10 * 128),
);

const MARKER_START = RecordMarkerStart.builder()
  .unknown4(Constants.UNKNOWN_4_BIT_0)
  .markerStyle(Constants.MARKER_ARROW_TAIL)
  .markerWidth(0x10000 * 4)
  .markerHeight(0x10000 * 4)
  .build();

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(START_CAP),
      List.of(MARKER_START),
      List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
      List.of(WORK_AREA),
    ),
  )
  .build();
