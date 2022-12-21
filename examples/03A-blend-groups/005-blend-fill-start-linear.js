/*
Example: 005-blend-fill-start-linear

Purpose:

To demonstrate how linear fills are interpolated with blend groups.

This file demonstrates a number of cases

1. Linear fill cyan + white to linear fill yellow + red.
2. Linear fill cyan + white to flat fill red.
3. Linear fill cyan + white to radial fill yellow + red. In this case the fill end point
   is within the bounds of the final shape.
4. Linear fill cyan + white to radial fill yellow + red. In this case the fill end point
   is within the bounds of the final shape, and close to the centre.
5. Linear fill cyan + white to radial fill yellow + red. In this case the fill end point
   is outside the bounds of the final shape.
6. Linear fill cyan + red to flat fill transparent. Note that the colours tend to
   interpolate to white.
7. Flat fill transparent to linear fill cyan + red.

Cases 3, 4, and 5 demonstrate that ArtWorks doesn't appear to interpolate
linear and radial fills properly. The rule appears to be that before
the halfway mark use the linear fill and beyond that use the radial fill.
 */

const {
  Builders: {
    List,
  },
  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  FILL_FLAT_BLUE,
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_BLACK,
  STROKE_WIDTH_3000,
  WINDING_RULE_EVEN_ODD,
  JOIN_BEVEL,
  DASH_PATTERN_EMPTY,
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
  createRecordPath,
  createRecordFillColourGradient,
} = require('../record-creators');

const { createClosedRectangle } = require('../path-creators');

const createSimpleBlendGroup = require('./shared');

const {
  DEFAULT_PALETTE_INDEX_YELLOW,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_CYAN,
  DEFAULT_PALETTE_INDEX_WHITE,
} = require('../default-palette');

const GROUP_0 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 100_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    150_000,
    100_000,
    150_000,
    170_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  createClosedRectangle(1_000_000, 100_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    1_000_000,
    100_000,
    1_100_000,
    200_000,
    DEFAULT_PALETTE_INDEX_YELLOW,
    DEFAULT_PALETTE_INDEX_RED,
  ),
  8,
);

const GROUP_1 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 250_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    150_000,
    250_000,
    150_000,
    320_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  createClosedRectangle(1_000_000, 250_000, 100_000, 100_000),
  FILL_FLAT_RED,
  8,
);

const GROUP_2 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 400_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    150_000,
    400_000,
    150_000,
    470_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  createClosedRectangle(1_000_000, 400_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    1_050_000,
    450_000,
    1_050_000,
    400_000,
    DEFAULT_PALETTE_INDEX_YELLOW,
    DEFAULT_PALETTE_INDEX_RED,
  ),
  8,
);

const GROUP_3 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 550_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    150_000,
    550_000,
    150_000,
    620_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  createClosedRectangle(1_000_000, 550_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    1_050_000,
    600_000,
    1_050_000,
    590_000,
    DEFAULT_PALETTE_INDEX_YELLOW,
    DEFAULT_PALETTE_INDEX_RED,
  ),
  8,
);

const GROUP_4 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 700_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    150_000,
    700_000,
    150_000,
    770_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  createClosedRectangle(1_000_000, 700_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    1_050_000,
    750_000,
    300_000,
    750_000,
    DEFAULT_PALETTE_INDEX_YELLOW,
    DEFAULT_PALETTE_INDEX_RED,
  ),
  8,
);

const GROUP_5 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 850_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    150_000,
    850_000,
    150_000,
    920_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_RED,
  ),
  createClosedRectangle(1_000_000, 850_000, 100_000, 100_000),
  FILL_FLAT_TRANSPARENT,
  8,
);

const GROUP_6 = createSimpleBlendGroup(
  createClosedRectangle(100_000, 1_000_000, 100_000, 100_000),
  FILL_FLAT_TRANSPARENT,
  createClosedRectangle(1_000_000, 1_000_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    1_050_000,
    1_000_000,
    1_050_000,
    1_097_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_RED,
  ),
  8,
);

const TRANSPARENT_BLEND_BACKGROUND = createRecordPath(
  createClosedRectangle(90_000, 840_000, 1_020_000, 270_000),
  10_000,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_3000),
  List.of(JOIN_BEVEL),
  List.of(TRANSPARENT_BLEND_BACKGROUND, FILL_FLAT_BLUE),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  GROUP_5,
  GROUP_6,
  List.of(WORK_AREA),
);
