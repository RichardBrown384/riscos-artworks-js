/*
Example: 023-open-v-stroke-red-stroke-width-3000-cap-end-open-v-2-4

Purpose:
To demonstrate triangle end caps (width 2x stroke width, height 4x)

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
  CAP_TRIANGLE,
  UNKNOWN_4_BIT_0,
} = require('../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  WORK_AREA,
} = require('../shared-objects');

const END_CAP = RecordLineCapEnd.of(
  UNKNOWN_4_BIT_0,
  CAP_TRIANGLE,
  RecordLineCapEnd.capTriangle(2 * 128, 4 * 128),
);

module.exports = Artworks.builder()
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