/*
Example: 001-smallest-file

Purpose:
To demonstrate the smallest file that will render something in !AWViewer
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

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(PATH_TRIANGLE),
  List.of(WORK_AREA),
);
