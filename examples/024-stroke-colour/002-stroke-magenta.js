/*
Example: 002-stroke-magenta

Purpose:
To demonstrate setting the stroke colour.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_BLACK_30,
  STROKE_WIDTH_1500,
  STROKE_COLOUR_MAGENTA,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_WIDTH_1500),
  List.of(STROKE_COLOUR_MAGENTA),
  List.of(LAYER_FOREGROUND, PATH_TRIANGLE),
  List.of(WORK_AREA),
);
