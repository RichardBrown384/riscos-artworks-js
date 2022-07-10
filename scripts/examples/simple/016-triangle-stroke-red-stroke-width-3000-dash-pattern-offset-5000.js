/*
Example: 016-triangle-stroke-red-stroke-width-3000-dash-pattern-offset-5000

Purpose:
To demonstrate dash patterns with non-zero offset.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordDashPattern,
  },

  UNKNOWN_4_BIT_0,
} = require('../../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const DASH_PATTERN = RecordDashPattern.builder()
  .unknown4(UNKNOWN_4_BIT_0)
  .offset(5000)
  .elements(5000, 10000, 5000)
  .build();

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
