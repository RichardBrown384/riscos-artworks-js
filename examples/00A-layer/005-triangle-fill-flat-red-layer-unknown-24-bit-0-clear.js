/*
Example: 005-triangle-fill-flat-red-layer-unknown-24-bit-0-clear

Purpose:
To demonstrate that if you don't set bit 0 of a layer's unknown 24 then the layer isn't drawn.
 */

const {
  Builders: {
    List,
  },
  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks, createRecordLayer } = require('../record-creators');

const LAYER = createRecordLayer(Constants.LAYER_UNKNOWN_24_BIT_3, 'Foreground');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER, PATH_TRIANGLE),
  List.of(WORK_AREA),
);