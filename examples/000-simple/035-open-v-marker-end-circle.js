/*
Example: 035-open-v-marker-end-circle

Purpose:
Demonstrates circle end markers
 */

const {
  Builders: {
    List,

    RecordMarkerEnd,
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
const { createArtworks } = require('../record-creators');

const MARKER_END = RecordMarkerEnd.builder()
  .unknown4(Constants.UNKNOWN_4_BIT_0)
  .markerStyle(Constants.MARKER_CIRCLE)
  .markerWidth(0x10000 * 6)
  .markerHeight(0x10000 * 4)
  .build();

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(MARKER_END),
  List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  List.of(WORK_AREA),
);
