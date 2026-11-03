/*
Example: 003-blend-step-variants

Purpose:

To demonstrate how blend steps work.

Note a couple of issues:

1. If you change first blend steps value to be zero (not one) only one solitary rectangle is drawn
2. The intermediate steps are stroked white in the simple view. Not sure why this is the case.

 */

import {
  DASH_PATTERN_EMPTY,
  FILL_FLAT_BLUE,
  FILL_FLAT_RED,
  STROKE_COLOUR_TRANSPARENT,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';

import { createArtworks, createList } from '../record-creators.js';

import { createClosedSquare } from '../path-creators.js';

import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

function createSimpleAttributeBlendGroups() {
  const groups = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      const steps = 4 * row + col + 1;
      const startRectangle = createClosedSquare(
        10_000 + 100_000 * col,
        10_000 + 100_000 * row,
        50_000,
      );
      const endRectangle = createClosedSquare(
        30_000 + 100_000 * col,
        30_000 + 100_000 * row,
        20_000,
      );
      const group = createSimpleAttributeBlendGroup(
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

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(STROKE_COLOUR_TRANSPARENT),
  ...createSimpleAttributeBlendGroups(),
  createList(WORK_AREA),
);
