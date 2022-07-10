/*
Example: 009-triangle-fill-flat-red-stroke-blue

Purpose:
To demonstrate setting the stroke colour.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../../src/artworks');

const {
  FILL_FLAT_BLACK_30,
  STROKE_COLOUR_BLUE,
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
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
