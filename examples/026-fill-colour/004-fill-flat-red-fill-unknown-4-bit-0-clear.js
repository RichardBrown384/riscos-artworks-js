/*
Example: 004-fill-flat-red-fill-unknown-4-bit-0-clear

Purpose:
To demonstrate that if bit 0 of unknown4 is clear then the fill doesn't get applied
and as there is no fill specified !AWViewer crashes when it tries to render geometry.
 */

const {
  Builders: {
    List,
    ColourIndex,

    RecordFillColourFlat,
  },

} = require('../../src').Artworks;

const {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

const {
  DEFAULT_PALETTE_INDEX_RED,
} = require('../default-palette');

const FILL = RecordFillColourFlat.of(0, ColourIndex.of(DEFAULT_PALETTE_INDEX_RED));

module.exports = createArtworks(
  List.of(FILL),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
