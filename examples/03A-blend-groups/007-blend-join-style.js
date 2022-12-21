/*
Example: 007-blend-join-style

Purpose:

To demonstrate how join styles are interpolated with blend groups.

The file deals with five cases

1. Attempt to blend from round join to round join
2. Attempt to blend from round join to bevel join
3. Attempt to blend from round join to mitre join
4. Attempt to blend from mitre join to round join
5. Attempt to blend from bevel join to round join

The rule appears to be that before the halfway point use the start join and
beyond that the end join.
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
  DASH_PATTERN_EMPTY,
  JOIN_ROUND,
  JOIN_BEVEL,
  JOIN_MITRE,
  WORK_AREA,
  FILL_FLAT_BLACK_30,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedRectangle } = require('../path-creators');

const createSimpleBlendGroup = require('./shared');

const GROUP_0 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 100_000, 100_000, 100_000),
  JOIN_ROUND,
  createClosedRectangle(500_000, 100_000, 100_000, 100_000),
  JOIN_ROUND,
  3,
);

const GROUP_1 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 250_000, 100_000, 100_000),
  JOIN_ROUND,
  createClosedRectangle(500_000, 250_000, 100_000, 100_000),
  JOIN_BEVEL,
  3,
);

const GROUP_2 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 400_000, 100_000, 100_000),
  JOIN_ROUND,
  createClosedRectangle(500_000, 400_000, 100_000, 100_000),
  JOIN_MITRE,
  3,
);

const GROUP_3 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 550_000, 100_000, 100_000),
  JOIN_MITRE,
  createClosedRectangle(500_000, 550_000, 100_000, 100_000),
  JOIN_ROUND,
  3,
);

const GROUP_4 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 700_000, 100_000, 100_000),
  JOIN_BEVEL,
  createClosedRectangle(500_000, 700_000, 100_000, 100_000),
  JOIN_ROUND,
  3,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(FILL_FLAT_BLACK_30),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_6000),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  List.of(WORK_AREA),
);
