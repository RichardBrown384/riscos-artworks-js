/*
Example: 017-pentagram-fill-red-stroke-blue-stroke-width-3000-winding-none

Purpose:
To demonstrate that the default winding rule is even-odd
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src/artworks');

const {
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(STROKE_COLOUR_BLUE),
      List.of(STROKE_WIDTH_3000),
      List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
      List.of(WORK_AREA),
    ),
  )
  .build();
