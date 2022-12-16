/*
Example: 001-when-two-fills-occur-before-a-path-then-the-second-is-used

Purpose:

To demonstrate that when two fills occur before a path then the path is shaded
using the second colour.

!AWViewer should render a 30% black triangle, not red.
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
  List.of(FILL_FLAT_BLACK_30),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
