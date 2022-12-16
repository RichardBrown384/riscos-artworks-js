/*
Example: 001-unknown-24-bit-0-3-set

Purpose:
To demonstrate that if you set both bits 0 and 3 of unknown 24 then the layer is drawn.
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

const LAYER = createRecordLayer('Foreground');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
