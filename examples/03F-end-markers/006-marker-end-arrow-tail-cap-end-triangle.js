/*
Example: 006-marker-end-arrow-tail-cap-end-triangle

Purpose:
Demonstrates the interaction between end line caps and end line markers.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  END_MARKER_ARROW_TAIL_W4_H4,
  END_CAP_TRIANGLE_W10_H10,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(END_CAP_TRIANGLE_W10_H10),
  List.of(END_MARKER_ARROW_TAIL_W4_H4),
  List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  List.of(WORK_AREA),
);
