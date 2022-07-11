/*
Example: 103-pentagram-override-fill-flat-triangle-default-fill-flat

Purpose:

To demonstrate that a path consumes a subsequent style attribute and that
the attribute is not applied to subsequent paths.

Therefore, !AWViewer should render a 30% black pentagram in the background
and a red triangle on top.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src/artworks');

const {
  STROKE_COLOUR_BLUE,
  FILL_FLAT_RED,
  FILL_FLAT_BLACK_30,
  PATH_TRIANGLE,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(STROKE_COLOUR_BLUE),
      List.of(PATH_PENTAGRAM, FILL_FLAT_BLACK_30),
      List.of(PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
