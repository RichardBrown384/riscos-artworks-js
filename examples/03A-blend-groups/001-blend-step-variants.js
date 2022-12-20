/*
Example: 001-blend-step-variants

Purpose:

To demonstrate how blend steps work.

Note a couple of issues:

1. If you change first blend steps value to be zero (not one) only one solitary rectangle is drawn
2. The intermediate steps are stroked white in the simple view. Not sure why this is the case.

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

const {
  createStartRectangle,
  createEndRectangle,
  createSimpleRectangleBlendGroup,
} = require('./shared');

function createSimpleRectangleBlendGroups() {
  const groups = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      const steps = 4 * row + col + 1;
      const startRectangle = createStartRectangle(
        10_000 + 100_000 * col,
        10_000 + 100_000 * row,
        50_000,
        50_000,
      );
      const endRectangle = createEndRectangle(
        30_000 + 100_000 * col,
        30_000 + 100_000 * row,
        20_000,
        20_000,
      );
      const group = createSimpleRectangleBlendGroup(
        startRectangle,
        FILL_FLAT_RED,
        endRectangle,
        FILL_FLAT_BLUE,
        steps,
      );
      groups.push(group);
    }
  }
  return groups;
}

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(STROKE_COLOUR_TRANSPARENT),
  ...createSimpleRectangleBlendGroups(),
  List.of(WORK_AREA),
);
