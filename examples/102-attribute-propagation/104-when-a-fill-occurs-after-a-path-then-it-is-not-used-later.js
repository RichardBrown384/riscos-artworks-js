/*
Example: 104-when-a-fill-occurs-after-a-path-then-it-is-not-used-later

Purpose:

To demonstrate that a path consumes a subsequent style attribute and that
the attribute is not applied to subsequent paths.

Therefore, !AWViewer should render a 30% black pentagram in the background
and a red triangle on top.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  STROKE_COLOUR_BLUE,
  FILL_FLAT_RED,
  FILL_FLAT_BLACK_30,
  PATH_TRIANGLE,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(STROKE_COLOUR_BLUE),
  List.of(PATH_PENTAGRAM, FILL_FLAT_BLACK_30),
  List.of(PATH_TRIANGLE),
  List.of(WORK_AREA),
);
