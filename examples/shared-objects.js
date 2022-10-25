const {
  Constants,
} = require('../src').Artworks;

const {
  DEFAULT_PALETTE,
  PALETTE_INDEX_TRANSPARENT,
  DEFAULT_PALETTE_INDEX_BLACK,
  DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT,
  DEFAULT_PALETTE_INDEX_WHITE,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_BLUE,
  DEFAULT_PALETTE_INDEX_MAGENTA,
  DEFAULT_PALETTE_INDEX_YELLOW,
} = require('./default-palette');

const {
  createClosedEquilateralTriangle,
  createOpenInvertedV,
  createClosedPentagram,
} = require('./path-creators');

const {
  createRecordPath,
  createRecordLayer,
  createRecordWorkArea,
  createRecordStrokeColour,
  createRecordStrokeWidth,
  createRecordFillColourFlat,
  createRecordFillColourGradient,
  createRecordJoinStyle,
  createRecordLineCapEnd,
  createRecordLineCapStart,
  createRecordWindingRule,
  createRecordDashPatternEmpty,
  createRecordDashPattern,
} = require('./record-creators');

module.exports.PATH_TRIANGLE = createRecordPath(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000),
  10_000,
);

module.exports.PATH_OPEN_INVERTED_V = createRecordPath(
  createOpenInvertedV(10_000, 10_000, 100_000),
  10_100,
);

module.exports.PATH_PENTAGRAM = createRecordPath(
  createClosedPentagram(100_000, 100_000, 80_000),
  10_000,
);

const LAYER_UNKNOWN_24 = Constants.LAYER_UNKNOWN_24_BIT_0 + Constants.LAYER_UNKNOWN_24_BIT_3;
module.exports.LAYER_BACKGROUND = createRecordLayer(LAYER_UNKNOWN_24, 'Background');
module.exports.LAYER_FOREGROUND = createRecordLayer(LAYER_UNKNOWN_24, 'Foreground');

module.exports.WORK_AREA = createRecordWorkArea(DEFAULT_PALETTE);

module.exports.STROKE_COLOUR_RED = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_RED);
module.exports.STROKE_COLOUR_BLUE = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_BLUE);
module.exports.STROKE_COLOUR_MAGENTA = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_MAGENTA);
module.exports.STROKE_COLOUR_TRANSPARENT = createRecordStrokeColour(PALETTE_INDEX_TRANSPARENT);

module.exports.STROKE_WIDTH_960 = createRecordStrokeWidth(960);
module.exports.STROKE_WIDTH_1280 = createRecordStrokeWidth(1280);
module.exports.STROKE_WIDTH_1500 = createRecordStrokeWidth(1500);
module.exports.STROKE_WIDTH_3000 = createRecordStrokeWidth(3000);
module.exports.STROKE_WIDTH_6000 = createRecordStrokeWidth(6000);

module.exports.FILL_FLAT_TRANSPARENT = createRecordFillColourFlat(PALETTE_INDEX_TRANSPARENT);
module.exports.FILL_FLAT_BLACK = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_BLACK);
module.exports.FILL_FLAT_BLACK_30 = createRecordFillColourFlat(
  DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT,
);
module.exports.FILL_FLAT_WHITE = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_WHITE);
module.exports.FILL_FLAT_RED = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_RED);
module.exports.FILL_FLAT_BLUE = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_BLUE);

module.exports.FILL_LINEAR_YELLOW_RED = createRecordFillColourGradient(
  Constants.FILL_LINEAR,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_YELLOW,
  DEFAULT_PALETTE_INDEX_RED,
);

module.exports.FILL_RADIAL_RED_YELLOW = createRecordFillColourGradient(
  Constants.FILL_RADIAL,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_YELLOW,
);

module.exports.JOIN_MITRE = createRecordJoinStyle(Constants.JOIN_MITRE);
module.exports.JOIN_ROUND = createRecordJoinStyle(Constants.JOIN_ROUND);
module.exports.JOIN_BEVEL = createRecordJoinStyle(Constants.JOIN_BEVEL);

module.exports.END_CAP_BUTT = createRecordLineCapEnd(Constants.CAP_BUTT);
module.exports.END_CAP_ROUND = createRecordLineCapEnd(Constants.CAP_ROUND);
module.exports.END_CAP_SQUARE = createRecordLineCapEnd(Constants.CAP_SQUARE);
module.exports.END_CAP_TRIANGLE_W2_H4 = createRecordLineCapEnd(Constants.CAP_TRIANGLE, 2, 4);
module.exports.END_CAP_TRIANGLE_W4_H2 = createRecordLineCapEnd(Constants.CAP_TRIANGLE, 4, 2);

module.exports.START_CAP_BUTT = createRecordLineCapStart(Constants.CAP_BUTT);
module.exports.START_CAP_ROUND = createRecordLineCapStart(Constants.CAP_ROUND);
module.exports.START_CAP_SQUARE = createRecordLineCapStart(Constants.CAP_SQUARE);
module.exports.START_CAP_TRIANGLE_W2_H4 = createRecordLineCapStart(Constants.CAP_TRIANGLE, 2, 4);
module.exports.START_CAP_TRIANGLE_W4_H2 = createRecordLineCapStart(Constants.CAP_TRIANGLE, 4, 2);

module.exports.WINDING_RULE_EVEN_ODD = createRecordWindingRule(Constants.WINDING_RULE_EVEN_ODD);
module.exports.WINDING_RULE_NON_ZERO = createRecordWindingRule(Constants.WINDING_RULE_NON_ZERO);

module.exports.DASH_PATTERN_EMPTY = createRecordDashPatternEmpty();
module.exports.DASH_PATTERN_OFFSET_0 = createRecordDashPattern(0, 5000, 10000, 5000);
module.exports.DASH_PATTERN_OFFSET_5000 = createRecordDashPattern(5000, 5000, 10000, 5000);
