/*
Example: 031-pentagram-fill-radial-red-yellow

Purpose:
To demonstrate the radial gradient fills !AWViewer
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src/artworks');

const {
  FILL_RADIAL_RED_YELLOW,
  STROKE_WIDTH_3000,
  STROKE_COLOUR_BLUE,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_RADIAL_RED_YELLOW),
      List.of(STROKE_COLOUR_BLUE),
      List.of(STROKE_WIDTH_3000),
      List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
      List.of(WORK_AREA),
    ),
  )
  .build();
