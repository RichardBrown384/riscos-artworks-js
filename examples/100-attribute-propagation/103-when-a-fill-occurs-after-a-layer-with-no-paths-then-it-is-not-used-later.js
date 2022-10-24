/*
Example: 103-when-a-fill-occurs-after-a-layer-with-no-paths-then-it-is-not-used-later

Purpose:
To demonstrate that if a style attribute appears after a layer with no paths
then it is not used on subsequent paths on following layers.

!AWViewer renders a red triangle, not 30% black.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  FILL_FLAT_RED,
  FILL_FLAT_BLACK_30,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER_FOREGROUND, FILL_FLAT_BLACK_30),
  List.of(PATH_TRIANGLE),
  List.of(WORK_AREA),
);
