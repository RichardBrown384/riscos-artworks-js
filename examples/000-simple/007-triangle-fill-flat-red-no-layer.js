/*
Example: 007-triangle-fill-flat-red-no-layer.

Purpose:
To demonstrate that a layer isn't required for !AWViewer to render a triangle
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
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();