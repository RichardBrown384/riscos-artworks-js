/*
Example: 014-triangle-stroke-red-stroke-width-3000-dash-empty.js

Purpose:
To demonstrate that an empty dash pattern does nothing
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordDashPatternEmpty,
  },

  UNKNOWN_4_BIT_0,
} = require('../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const DASH_PATTERN = RecordDashPatternEmpty.of(UNKNOWN_4_BIT_0);

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(DASH_PATTERN),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
