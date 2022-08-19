/*
Example: 003-triangle-fill-flat-red-fill-bit-0-clear

Purpose:
To demonstrate that if you don't set the fill's bit 0 of unknown4 then the fill doesn't get applied
and crashes !AWViewer.
 */

const {
  Builders: {
    Artworks,
    Lists,
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

const {
  DEFAULT_PALETTE_INDEX_RED,
} = require('../default-palette');

const FILL = RecordFillColourFlat.of(0, ColourIndex.of(DEFAULT_PALETTE_INDEX_RED));

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL),
      List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
      List.of(WORK_AREA),
    ),
  )
  .build();
