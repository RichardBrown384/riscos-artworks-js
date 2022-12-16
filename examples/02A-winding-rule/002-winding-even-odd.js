/*
Example: 002-winding-even-odd

Purpose:
To demonstrate the even-odd winding rule
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
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks } = require('../record-creators');

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_3000),
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(LAYER_FOREGROUND, PATH_PENTAGRAM),
  List.of(WORK_AREA),
);
