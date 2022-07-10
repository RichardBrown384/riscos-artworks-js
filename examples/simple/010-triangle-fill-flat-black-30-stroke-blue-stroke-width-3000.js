/*
Example: 010-triangle-fill-flat-black-30-stroke-blue-stroke-width-3000

Purpose:
To demonstrate setting the stroke width.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src/artworks');

const {
  FILL_FLAT_BLACK_30,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(FILL_FLAT_BLACK_30),
      List.of(STROKE_COLOUR_BLUE),
      List.of(STROKE_WIDTH_3000),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
