/*
Example: 001-triangle-fill-none

Purpose:
To demonstrate that !AWViewer crashes when a file doesn't contain a fill record
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const { createArtworks } = require('../record-creators');

const {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

module.exports = createArtworks(
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
