/*
Example: 014-triangle-stroke-red-stroke-width-3000-dash-empty

Purpose:
To demonstrate that an empty dash pattern does nothing
 */

const {
  Builders: {
    List,

    RecordDashPatternEmpty,
  },

  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

const DASH_PATTERN = RecordDashPatternEmpty.of(Constants.UNKNOWN_4_BIT_0);

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(DASH_PATTERN),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
