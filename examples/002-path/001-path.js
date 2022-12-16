/*
Example: 001-path

Purpose:
To demonstrate paths !AWViewer
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const { createArtworks } = require('../record-creators');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_BLACK,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_BLACK),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
