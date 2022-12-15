/*
Example: 003-winding-non-zero

Purpose:
To demonstrate the non-zero winding rule
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
  WINDING_RULE_NON_ZERO,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_3000),
  List.of(WINDING_RULE_NON_ZERO),
  List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
  List.of(WORK_AREA),
);
