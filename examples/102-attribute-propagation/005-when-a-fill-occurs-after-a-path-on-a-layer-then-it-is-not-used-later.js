/*
Example: 005-when-a-fill-occurs-after-a-path-on-a-layer-then-it-is-not-used-later

Purpose:

To demonstrate that, even with layers, a path consumes a subsequent style attribute and that
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
  LAYER_BACKGROUND,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(STROKE_COLOUR_BLUE),
  List.of(LAYER_BACKGROUND, PATH_PENTAGRAM, FILL_FLAT_BLACK_30),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
