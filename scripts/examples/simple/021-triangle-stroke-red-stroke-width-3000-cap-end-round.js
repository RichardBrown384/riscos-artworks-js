/*
Example: 021-triangle-stroke-red-stroke-width-3000-cap-end-round

Purpose:
To demonstrate round end caps.

NB: We use an inverted V here so that it's possible to compare, in particular,
the butt and square caps with the opposite end without the need of another reference contour.

It's then also possible to infer the default (butt caps)
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,

    RecordLineCapEnd,
  },
  CAP_ROUND,
  UNKNOWN_4_BIT_0,
} = require('../../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  WORK_AREA,
} = require('../shared-objects');

const END_CAP = RecordLineCapEnd.of(UNKNOWN_4_BIT_0, CAP_ROUND);

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_COLOUR_RED),
      List.of(STROKE_WIDTH_3000),
      List.of(END_CAP),
      List.of(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
      List.of(WORK_AREA),
    ),
  )
  .build();
