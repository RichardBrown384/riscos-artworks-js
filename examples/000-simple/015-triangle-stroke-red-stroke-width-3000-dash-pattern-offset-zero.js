/*
Example: 015-triangle-stroke-red-stroke-width-3000-dash-pattern-offset-zero

Purpose:
To demonstrate dash patterns with offset zero.
 */

const {
  Builders: {
    List,

    RecordDashPattern,
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

const DASH_PATTERN = RecordDashPattern.builder()
  .unknown4(Constants.UNKNOWN_4_BIT_0)
  .elements(5000, 10000, 5000)
  .build();

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_RED),
  List.of(STROKE_WIDTH_3000),
  List.of(DASH_PATTERN),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
