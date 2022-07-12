const {
  Builders: {
    BoundingBox,
    Polyline,

    RecordPath,
    RecordLayer,
    RecordWorkArea,
    RecordStrokeColour,
    RecordStrokeWidth,
    RecordFillColourFlat,
    RecordFillColourGradient,
  },

  FILL_LINEAR,
  FILL_RADIAL,
  UNKNOWN_4_BIT_0,
  UNKNOWN_4_BIT_1,

  LAYER_UNKNOWN_24_BIT_0,
  LAYER_UNKNOWN_24_BIT_3,
} = require('../src/artworks');

const {
  DEFAULT_PALETTE,
  PALETTE_INDEX_TRANSPARENT,
  DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT,
  DEFAULT_PALETTE_INDEX_RED,
  DEFAULT_PALETTE_INDEX_BLUE,
  DEFAULT_PALETTE_INDEX_YELLOW,
} = require('./default-palette');

const {
  createClosedEquilateralTriangle,
  createOpenInvertedV,
  createClosedPentagram,
} = require('./path-creators');

function createRecordPathFromPathWithPadding(path, padding) {
  return RecordPath.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(BoundingBox.of(path, padding))
    .path(path)
    .build();
}

const PATH_TRIANGLE = createRecordPathFromPathWithPadding(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000),
  10_000,
);

const PATH_OPEN_INVERTED_V = createRecordPathFromPathWithPadding(
  createOpenInvertedV(10_000, 10_000, 100_000),
  10_100,
);

const PATH_PENTAGRAM = createRecordPathFromPathWithPadding(
  createClosedPentagram(100_000, 100_000, 80_000),
  10_000,
);

const LAYER_BACKGROUND = RecordLayer
  .builder()
  .unknown24(LAYER_UNKNOWN_24_BIT_0 + LAYER_UNKNOWN_24_BIT_3)
  .name('Background')
  .build();

const LAYER_FOREGROUND = RecordLayer
  .builder()
  .unknown24(LAYER_UNKNOWN_24_BIT_0 + LAYER_UNKNOWN_24_BIT_3)
  .name('Foreground')
  .build();

const WORK_AREA = RecordWorkArea.of(DEFAULT_PALETTE);

const STROKE_COLOUR_RED = RecordStrokeColour.of(UNKNOWN_4_BIT_0, DEFAULT_PALETTE_INDEX_RED);
const STROKE_COLOUR_BLUE = RecordStrokeColour.of(UNKNOWN_4_BIT_0, DEFAULT_PALETTE_INDEX_BLUE);

const STROKE_WIDTH_3000 = RecordStrokeWidth.of(UNKNOWN_4_BIT_0, 3000);

const FILL_FLAT_RED = RecordFillColourFlat.of(
  UNKNOWN_4_BIT_0,
  DEFAULT_PALETTE_INDEX_RED,
);

const FILL_LINEAR_YELLOW_RED = RecordFillColourGradient.builder()
  .unknown4(UNKNOWN_4_BIT_0)
  .type(FILL_LINEAR)
  .gradientLine(Polyline.builder()
    .push(0, 0)
    .push(150_000, 150_000)
    .build())
  .startColour(DEFAULT_PALETTE_INDEX_YELLOW)
  .endColour(DEFAULT_PALETTE_INDEX_RED)
  .build();

const FILL_RADIAL_RED_YELLOW = RecordFillColourGradient.builder()
  .unknown4(UNKNOWN_4_BIT_0)
  .type(FILL_RADIAL)
  .gradientLine(Polyline.builder()
    .push(100_000, 100_000)
    .push(100_00, 150_000)
    .build())
  .startColour(DEFAULT_PALETTE_INDEX_RED)
  .endColour(DEFAULT_PALETTE_INDEX_YELLOW)
  .build();

const FILL_FLAT_TRANSPARENT = RecordFillColourFlat.of(
  UNKNOWN_4_BIT_0,
  PALETTE_INDEX_TRANSPARENT,
);

const FILL_FLAT_BLACK_30 = RecordFillColourFlat.of(
  UNKNOWN_4_BIT_0,
  DEFAULT_PALETTE_INDEX_BLACK_30_PERCENT,
);

module.exports = {
  PATH_TRIANGLE,
  PATH_OPEN_INVERTED_V,
  PATH_PENTAGRAM,
  LAYER_BACKGROUND,
  LAYER_FOREGROUND,
  WORK_AREA,
  STROKE_COLOUR_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  FILL_FLAT_RED,
  FILL_FLAT_TRANSPARENT,
  FILL_FLAT_BLACK_30,

  FILL_LINEAR_YELLOW_RED,
  FILL_RADIAL_RED_YELLOW,

  createRecordPathFromPathWithPadding,
};
