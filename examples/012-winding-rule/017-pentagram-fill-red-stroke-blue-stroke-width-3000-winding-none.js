/*
Example: 017-pentagram-fill-red-stroke-blue-stroke-width-3000-winding-none

Purpose:
To demonstrate that the default winding rule is even-odd
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_3000),
  List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
  List.of(WORK_AREA),
);
