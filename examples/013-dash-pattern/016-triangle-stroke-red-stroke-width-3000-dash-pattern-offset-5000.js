/*
Example: 016-triangle-stroke-red-stroke-width-3000-dash-pattern-offset-5000

Purpose:
To demonstrate dash patterns with non-zero offset.
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
  PATH_TRIANGLE,
  DASH_PATTERN_OFFSET_5000,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(DASH_PATTERN_OFFSET_5000),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
