const {
  Constants: {

    FILL_LINEAR,
    FILL_RADIAL,

    JOIN_MITRE,
    JOIN_ROUND,
    JOIN_BEVEL,

    CAP_BUTT,
    CAP_ROUND,
    CAP_SQUARE,
    CAP_TRIANGLE,

    WINDING_RULE_EVEN_ODD,
    WINDING_RULE_NON_ZERO,

    MARKER_NONE,
    MARKER_TRIANGLE,
    MARKER_ARROW_HEAD,
    MARKER_CIRCLE,
    MARKER_ARROW_TAIL,
  },
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
  createRecordStartMarker,
  createRecordEndMarker,
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

module.exports.LAYER_BACKGROUND = createRecordLayer('Background');
module.exports.LAYER_FOREGROUND = createRecordLayer('Foreground');

module.exports.WORK_AREA = createRecordWorkArea(DEFAULT_PALETTE);

module.exports.STROKE_COLOUR_BLACK = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_BLACK);
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
  FILL_LINEAR,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_YELLOW,
  DEFAULT_PALETTE_INDEX_RED,
);

module.exports.FILL_RADIAL_RED_YELLOW = createRecordFillColourGradient(
  FILL_RADIAL,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_YELLOW,
);

module.exports.JOIN_MITRE = createRecordJoinStyle(JOIN_MITRE);
module.exports.JOIN_ROUND = createRecordJoinStyle(JOIN_ROUND);
module.exports.JOIN_BEVEL = createRecordJoinStyle(JOIN_BEVEL);

module.exports.END_CAP_BUTT = createRecordLineCapEnd(CAP_BUTT);
module.exports.END_CAP_ROUND = createRecordLineCapEnd(CAP_ROUND);
module.exports.END_CAP_SQUARE = createRecordLineCapEnd(CAP_SQUARE);
module.exports.END_CAP_TRIANGLE_W2_H4 = createRecordLineCapEnd(CAP_TRIANGLE, 2, 4);
module.exports.END_CAP_TRIANGLE_W4_H2 = createRecordLineCapEnd(CAP_TRIANGLE, 4, 2);
module.exports.END_CAP_TRIANGLE_W10_H10 = createRecordLineCapEnd(CAP_TRIANGLE, 10, 10);

module.exports.START_CAP_BUTT = createRecordLineCapStart(CAP_BUTT);
module.exports.START_CAP_ROUND = createRecordLineCapStart(CAP_ROUND);
module.exports.START_CAP_SQUARE = createRecordLineCapStart(CAP_SQUARE);
module.exports.START_CAP_TRIANGLE_W2_H4 = createRecordLineCapStart(CAP_TRIANGLE, 2, 4);
module.exports.START_CAP_TRIANGLE_W4_H2 = createRecordLineCapStart(CAP_TRIANGLE, 4, 2);
module.exports.START_CAP_TRIANGLE_W10_H10 = createRecordLineCapStart(CAP_TRIANGLE, 10, 10);

module.exports.WINDING_RULE_EVEN_ODD = createRecordWindingRule(WINDING_RULE_EVEN_ODD);
module.exports.WINDING_RULE_NON_ZERO = createRecordWindingRule(WINDING_RULE_NON_ZERO);

module.exports.DASH_PATTERN_EMPTY = createRecordDashPatternEmpty();
module.exports.DASH_PATTERN_OFFSET_0 = createRecordDashPattern(0, 5000, 10000, 5000);
module.exports.DASH_PATTERN_OFFSET_5000 = createRecordDashPattern(5000, 5000, 10000, 5000);

module.exports.START_MARKER_NONE = createRecordStartMarker(MARKER_NONE);
module.exports.START_MARKER_TRIANGLE_W4_H4 = createRecordStartMarker(MARKER_TRIANGLE, 4, 4);
module.exports.START_MARKER_ARROW_HEAD_W4_H6 = createRecordStartMarker(MARKER_ARROW_HEAD, 4, 6);
module.exports.START_MARKER_CIRCLE_W6_H4 = createRecordStartMarker(MARKER_CIRCLE, 6, 4);
module.exports.START_MARKER_ARROW_TAIL_W4_H4 = createRecordStartMarker(MARKER_ARROW_TAIL, 4, 4);

module.exports.END_MARKER_NONE = createRecordEndMarker(MARKER_NONE);
module.exports.END_MARKER_TRIANGLE_W4_H4 = createRecordEndMarker(MARKER_TRIANGLE, 4, 4);
module.exports.END_MARKER_ARROW_HEAD_W4_H6 = createRecordEndMarker(MARKER_ARROW_HEAD, 4, 6);
module.exports.END_MARKER_CIRCLE_W6_H4 = createRecordEndMarker(MARKER_CIRCLE, 6, 4);
module.exports.END_MARKER_ARROW_TAIL_W4_H4 = createRecordEndMarker(MARKER_ARROW_TAIL, 4, 4);
