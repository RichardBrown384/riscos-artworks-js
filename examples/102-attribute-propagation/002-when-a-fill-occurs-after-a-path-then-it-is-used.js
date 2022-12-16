/*
Example: 002-when-a-fill-occurs-after-a-path-then-it-is-used

Purpose:
To demonstrate that if a style attribute appears after a path
then that overrides the preceding attribute.

!AWViewer renders a 30% black triangle, not red.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  FILL_FLAT_RED,
  FILL_FLAT_BLACK_30,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE, FILL_FLAT_BLACK_30),
  List.of(WORK_AREA),
);
