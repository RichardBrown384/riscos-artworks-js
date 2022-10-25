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
} = require('./record-creators');

const PATH_TRIANGLE = createRecordPath(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000),
  10_000,
);

const PATH_OPEN_INVERTED_V = createRecordPath(
  createOpenInvertedV(10_000, 10_000, 100_000),
  10_100,
);

const PATH_PENTAGRAM = createRecordPath(
  createClosedPentagram(100_000, 100_000, 80_000),
  10_000,
);

const LAYER_UNKNOWN_24 = Constants.LAYER_UNKNOWN_24_BIT_0 + Constants.LAYER_UNKNOWN_24_BIT_3;
const LAYER_BACKGROUND = createRecordLayer(LAYER_UNKNOWN_24, 'Background');
const LAYER_FOREGROUND = createRecordLayer(LAYER_UNKNOWN_24, 'Foreground');

const WORK_AREA = createRecordWorkArea(DEFAULT_PALETTE);

const STROKE_COLOUR_RED = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_RED);
const STROKE_COLOUR_BLUE = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_BLUE);
const STROKE_COLOUR_MAGENTA = createRecordStrokeColour(DEFAULT_PALETTE_INDEX_MAGENTA);
const STROKE_COLOUR_TRANSPARENT = createRecordStrokeColour(PALETTE_INDEX_TRANSPARENT);

const STROKE_WIDTH_960 = createRecordStrokeWidth(960);
const STROKE_WIDTH_1280 = createRecordStrokeWidth(1280);
const STROKE_WIDTH_1500 = createRecordStrokeWidth(1500);
const STROKE_WIDTH_3000 = createRecordStrokeWidth(3000);
const STROKE_WIDTH_6000 = createRecordStrokeWidth(6000);

const FILL_FLAT_TRANSPARENT = createRecordFillColourFlat(PALETTE_INDEX_TRANSPARENT);
const FILL_FLAT_BLACK = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_BLACK);
const FILL_FLAT_BLACK_30 = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT);
const FILL_FLAT_WHITE = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_WHITE);
const FILL_FLAT_RED = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_RED);
const FILL_FLAT_BLUE = createRecordFillColourFlat(DEFAULT_PALETTE_INDEX_BLUE);

const FILL_LINEAR_YELLOW_RED = createRecordFillColourGradient(
  Constants.FILL_LINEAR,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_YELLOW,
  DEFAULT_PALETTE_INDEX_RED,
);

const FILL_RADIAL_RED_YELLOW = createRecordFillColourGradient(
  Constants.FILL_RADIAL,
  0,
  0,
  150_000,
  150_00,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_YELLOW,
);

const JOIN_MITRE = createRecordJoinStyle(Constants.JOIN_MITRE);
const JOIN_ROUND = createRecordJoinStyle(Constants.JOIN_ROUND);
const JOIN_BEVEL = createRecordJoinStyle(Constants.JOIN_BEVEL);

const END_CAP_BUTT = createRecordLineCapEnd(Constants.CAP_BUTT);
const END_CAP_ROUND = createRecordLineCapEnd(Constants.CAP_ROUND);
const END_CAP_SQUARE = createRecordLineCapEnd(Constants.CAP_SQUARE);
const END_CAP_TRIANGLE_W2_H4 = createRecordLineCapEnd(Constants.CAP_TRIANGLE, 2, 4);
const END_CAP_TRIANGLE_W4_H2 = createRecordLineCapEnd(Constants.CAP_TRIANGLE, 4, 2);

const START_CAP_BUTT = createRecordLineCapStart(Constants.CAP_BUTT);
const START_CAP_ROUND = createRecordLineCapStart(Constants.CAP_ROUND);
const START_CAP_SQUARE = createRecordLineCapStart(Constants.CAP_SQUARE);
const START_CAP_TRIANGLE_W2_H4 = createRecordLineCapStart(Constants.CAP_TRIANGLE, 2, 4);
const START_CAP_TRIANGLE_W4_H2 = createRecordLineCapStart(Constants.CAP_TRIANGLE, 4, 2);

module.exports = {
  PATH_TRIANGLE,
  PATH_OPEN_INVERTED_V,
  PATH_PENTAGRAM,

  LAYER_BACKGROUND,
  LAYER_FOREGROUND,

  WORK_AREA,

  STROKE_COLOUR_RED,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_MAGENTA,
  STROKE_COLOUR_TRANSPARENT,

  STROKE_WIDTH_960,
  STROKE_WIDTH_1280,
  STROKE_WIDTH_1500,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,

  FILL_FLAT_TRANSPARENT,
  FILL_FLAT_BLACK,
  FILL_FLAT_BLACK_30,
  FILL_FLAT_WHITE,
  FILL_FLAT_RED,
  FILL_FLAT_BLUE,

  FILL_LINEAR_YELLOW_RED,
  FILL_RADIAL_RED_YELLOW,

  JOIN_MITRE,
  JOIN_ROUND,
  JOIN_BEVEL,

  END_CAP_BUTT,
  END_CAP_ROUND,
  END_CAP_SQUARE,
  END_CAP_TRIANGLE_W2_H4,
  END_CAP_TRIANGLE_W4_H2,

  START_CAP_BUTT,
  START_CAP_ROUND,
  START_CAP_SQUARE,
  START_CAP_TRIANGLE_W2_H4,
  START_CAP_TRIANGLE_W4_H2,
};
