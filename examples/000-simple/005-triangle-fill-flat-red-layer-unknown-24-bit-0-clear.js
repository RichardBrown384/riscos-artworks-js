/*
Example: 005-triangle-fill-flat-red-layer-unknown-24-bit-0-clear

Purpose:
To demonstrate that if you don't set bit 0 of a layer's unknown 24 then the layer isn't drawn.
 */

const {
  Builders: {
    List,

    RecordLayer,
  },

  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

const LAYER = RecordLayer
  .builder()
  .unknown24(Constants.LAYER_UNKNOWN_24_BIT_3)
  .name('Foreground')
  .build();

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
