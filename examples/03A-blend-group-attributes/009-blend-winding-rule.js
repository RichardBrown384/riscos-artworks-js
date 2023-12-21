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

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_6000,
  WINDING_RULE_EVEN_ODD,
  WINDING_RULE_NON_ZERO,
  DASH_PATTERN_EMPTY,
  JOIN_BEVEL,
  END_CAP_BUTT,
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedPentagram } = require('../path-creators');

const { createSimpleAttributeBlendGroup } = require('../simple-blend-group');

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

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_6000),
  List.of(END_CAP_BUTT),
  List.of(JOIN_BEVEL),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  List.of(WORK_AREA),
);
