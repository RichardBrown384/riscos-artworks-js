/*
Example: 002-blend-group-no-dash-pattern.js

Purpose:

To demonstrate the smallest possible blend group without a dash pattern crashes
!AWViewer

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
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare } = require('../path-creators');

const { createSimpleAttributeBlendGroup } = require('../simple-blend-group');

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedSquare(100_000, 100_000, 100_000),
  FILL_FLAT_BLUE,
  createClosedSquare(1_000_000, 100_000, 50_000),
  FILL_FLAT_RED,
  6,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(STROKE_COLOUR_TRANSPARENT),
  GROUP_0,
  List.of(WORK_AREA),
);
