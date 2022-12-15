/*
Example: 002-triangle-fill-flat-red

Purpose:
To demonstrate the minimum file that will actually render something in !AWViewer
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
