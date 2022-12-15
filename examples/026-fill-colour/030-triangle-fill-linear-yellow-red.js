/*
Example: 030-triangle-fill-linear-yellow-red

Purpose:
To demonstrate the linear gradient fills !AWViewer
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_LINEAR_YELLOW_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_LINEAR_YELLOW_RED),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
