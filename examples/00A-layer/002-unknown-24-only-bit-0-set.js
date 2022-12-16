/*
Example: 002-unknown-24-only-bit-0-set

Purpose:
To demonstrate that if only set bit 0 of unknown 24 then the layer isn't drawn.
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

const { createArtworks, createRecordLayerFull } = require('../record-creators');

const LAYER = createRecordLayerFull(Constants.LAYER_UNKNOWN_24_BIT_0, 'Foreground');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
