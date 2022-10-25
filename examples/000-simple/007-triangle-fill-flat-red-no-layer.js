/*
Example: 007-triangle-fill-flat-red-no-layer.

Purpose:
To demonstrate that a layer isn't required for !AWViewer to render a triangle
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
