/*
Example: 004-blend-fill-start-flat

Purpose:

To demonstrate how flat fills are interpolated with blend groups.

This file demonstrates a number of cases

1. Flat fill red to flat fill cyan. Note that the midpoint is grey, which implies ArtWorks
   interpolates colours linearly over the RGB colour space.
2. Flat fill red to linear fill cyan + white.
3. Flat fill red to radial fill cyan + white. In this case the fill end point is within the bounds
   of the final shape.
4. Flat fill red to radial fill cyan + white. In this case the fill end point is within the bounds
   of the final shape, and close to the centre.
5. Flat fill red to radial fill cyan + white. In this case the fill end point is outside the bounds
   of the final shape.
6. Flat fill red to flat fill transparent. Note that the colours tend to interpolate to white.
7. Flat fill transparent to flat fill red.
8. Flat fill transparent to flat fill transparent.

Cases 3, 4, and 5 demonstrate that the fills are computed in world rather than object co-ordinates.
This is because case 5's later blend steps start taking on a shade of cyan whereas in cases 4 and 5
the final blend steps remain decidedly pink (as they are outside the radius defined by the fill).

 */

const {
  Builders: {
    List,
  },
  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  FILL_FLAT_CYAN,
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_BLACK,
  STROKE_WIDTH_3000,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
  createRecordPath,
  createRecordFillColourGradient,
} = require('../record-creators');

const {
  createRectangle,
  createSimpleRectangleBlendGroup,
} = require('./shared');

const {
  DEFAULT_PALETTE_INDEX_CYAN,
  DEFAULT_PALETTE_INDEX_WHITE,
} = require('../default-palette');

const {
  createClosedRectangle,
} = require('../path-creators');

const GROUP_0 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 100_000, 100_000, 100_000),
  FILL_FLAT_RED,
  createRectangle(1_000_000, 100_000, 100_000, 100_000),
  FILL_FLAT_CYAN,
  8,
);

const GROUP_1 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 250_000, 100_000, 100_000),
  FILL_FLAT_RED,
  createRectangle(1_000_000, 250_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    1_050_000,
    250_000,
    1_050_000,
    300_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  8,
);

const GROUP_2 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 400_000, 100_000, 100_000),
  FILL_FLAT_RED,
  createRectangle(1_000_000, 400_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    1_050_000,
    450_000,
    1_050_000,
    400_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  8,
);

const GROUP_3 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 550_000, 100_000, 100_000),
  FILL_FLAT_RED,
  createRectangle(1_000_000, 550_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    1_050_000,
    600_000,
    1_050_000,
    590_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  8,
);

const GROUP_4 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 700_000, 100_000, 100_000),
  FILL_FLAT_RED,
  createRectangle(1_000_000, 700_000, 100_000, 100_000),
  createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    1_050_000,
    750_000,
    300_000,
    750_000,
    DEFAULT_PALETTE_INDEX_CYAN,
    DEFAULT_PALETTE_INDEX_WHITE,
  ),
  8,
);

const GROUP_5 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 850_000, 100_000, 100_000),
  FILL_FLAT_RED,
  createRectangle(1_000_000, 850_000, 100_000, 100_000),
  FILL_FLAT_TRANSPARENT,
  8,
);

const GROUP_6 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 1_000_000, 100_000, 100_000),
  FILL_FLAT_TRANSPARENT,
  createRectangle(1_000_000, 1_000_000, 100_000, 100_000),
  FILL_FLAT_RED,
  8,
);

const GROUP_7 = createSimpleRectangleBlendGroup(
  createRectangle(100_000, 1_150_000, 100_000, 100_000),
  FILL_FLAT_TRANSPARENT,
  createRectangle(1_000_000, 1_150_000, 100_000, 100_000),
  FILL_FLAT_TRANSPARENT,
  8,
);

const TRANSPARENT_BLEND_BACKGROUND = createRecordPath(
  createClosedRectangle(90_000, 840_000, 1_020_000, 420_000),
  10_000,
);

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(STROKE_COLOUR_BLACK),
  List.of(STROKE_WIDTH_3000),
  List.of(TRANSPARENT_BLEND_BACKGROUND, FILL_FLAT_CYAN),
  GROUP_0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  GROUP_5,
  GROUP_6,
  GROUP_7,
  List.of(WORK_AREA),
);
