/*
Example: 005-marker-start-arrow-tail

Purpose:
Demonstrates arrow tail start markers
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
  START_MARKER_ARROW_TAIL_W4_H4,
  PATH_OPEN_INVERTED_V,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(START_MARKER_ARROW_TAIL_W4_H4),
  List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  List.of(WORK_AREA),
);
