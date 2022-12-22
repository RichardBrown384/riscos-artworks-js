/*
Example: 001-blend-group

Purpose:

To demonstrate the smallest possible blend group.

 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  FILL_FLAT_BLUE,
  STROKE_COLOUR_TRANSPARENT,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare } = require('../path-creators');

const createSimpleBlendGroup = require('../simple-blend-group');

const GROUP_0 = createSimpleBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  FILL_FLAT_BLUE,
  createClosedSquare(1_000_000, 100_000, 50_000),
  FILL_FLAT_RED,
  6,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(STROKE_COLOUR_TRANSPARENT),
  GROUP_0,
  List.of(WORK_AREA),
);
