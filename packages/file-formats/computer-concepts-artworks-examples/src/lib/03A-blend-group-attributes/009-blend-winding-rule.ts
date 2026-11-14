/*
Example: 009-blend-winding-rule

Purpose:

To demonstrate how winding rules are interpolated with blend groups.

The file deals with four cases

1. Attempt to blend from even-odd to non-zero
2. Attempt to blend from even-odd to even-odd
3. Attempt to blend from non-zero to non-zero
4. Attempt to blend from non-zero to even-odd

The rule appears to be that before the halfway point use the start rule and
beyond that the end rule.
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createClosedPentagram } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
  END_CAP_BUTT,
  FILL_FLAT_BLACK_30,
  JOIN_BEVEL,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  WINDING_RULE_NON_ZERO,
  WORK_AREA,
} from '../shared-objects.js';
import { createSimpleAttributeBlendGroup } from '../simple-blend-group.js';

const GROUP_0 = createSimpleAttributeBlendGroup(
  createClosedPentagram(100_000, 100_000, 60_000),
  WINDING_RULE_EVEN_ODD,
  createClosedPentagram(500_000, 100_000, 60_000),
  WINDING_RULE_NON_ZERO,
  3,
);

const GROUP_1 = createSimpleAttributeBlendGroup(
  createClosedPentagram(100_000, 250_000, 60_000),
  WINDING_RULE_EVEN_ODD,
  createClosedPentagram(500_000, 250_000, 60_000),
  WINDING_RULE_EVEN_ODD,
  3,
);

const GROUP_2 = createSimpleAttributeBlendGroup(
  createClosedPentagram(100_000, 400_000, 60_000),
  WINDING_RULE_NON_ZERO,
  createClosedPentagram(500_000, 400_000, 60_000),
  WINDING_RULE_NON_ZERO,
  3,
);

const GROUP_3 = createSimpleAttributeBlendGroup(
  createClosedPentagram(100_000, 550_000, 60_000),
  WINDING_RULE_NON_ZERO,
  createClosedPentagram(500_000, 550_000, 60_000),
  WINDING_RULE_EVEN_ODD,
  3,
);

export default createArtworks(
  createList(WINDING_RULE_EVEN_ODD),
  createList(DASH_PATTERN_EMPTY),
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_6000),
  createList(END_CAP_BUTT),
  createList(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  createList(WORK_AREA),
);
