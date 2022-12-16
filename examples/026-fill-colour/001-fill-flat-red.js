/*
Example: 001-fill-flat-red

Purpose:
To demonstrate flat fills !AWViewer
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const { createArtworks } = require('../record-creators');

const {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
