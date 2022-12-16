/*
Example: 005-fill-radial-red-yellow

Purpose:
To demonstrate the radial gradient fills !AWViewer
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_RADIAL_RED_YELLOW,
  STROKE_WIDTH_3000,
  STROKE_COLOUR_BLUE,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_RADIAL_RED_YELLOW),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_3000),
  List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
  List.of(WORK_AREA),
);
