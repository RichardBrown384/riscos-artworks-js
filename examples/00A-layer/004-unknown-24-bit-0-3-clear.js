/*
Example: 004-unknown-24-bit-0-3-clear

Purpose:
To demonstrate that if you don't set both bits 0 and 3 of unknown 24 then the layer isn't drawn.
 */

const {
  Builders: {
    List,
  },

} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks, createRecordLayer } = require('../record-creators');

const LAYER = createRecordLayer(0, 'Foreground');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
