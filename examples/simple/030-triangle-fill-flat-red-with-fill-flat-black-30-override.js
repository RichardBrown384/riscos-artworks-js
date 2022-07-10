/*
Example: 030-triangle-fill-flat-red-with-fill-flat-black-30-override

Purpose:
To demonstrate that if a style record appears after a path record
then the style record is applied before the path is rendered.

!AWViewer renders a Black 30 triangle.
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
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  FILL_FLAT_BLACK_30,
  WORK_AREA,
} = require('../shared-objects');

module.exports.moduleFilename = module.filename;
module.exports.artworks = Artworks.builder()
  .version(9)
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE, FILL_FLAT_BLACK_30),
      List.of(WORK_AREA),
    ),
  )
  .build();
