/*
Example: 047-palette-index-variants

Purpose:

To demonstrate what happens when

1. You fill a path with a valid index
2. An invalid index (i.e. greater than the number of palette entries but less than 0x01000000)
3. An index greater than 0x01000000

Note: it appears that once !AWViewer encounters and invalid index it stops rendering properly.

The fourth square in this example is sometimes partially drawn or not at all.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src').Artworks;

const {
  STROKE_WIDTH_1280,
  STROKE_COLOUR_BLUE,
  FILL_FLAT_RED,
  WORK_AREA,
} = require('../shared-objects');

const { createClosedSquare } = require('../path-creators');
const { createRecordPath, createRecordFillColourFlat } = require('../record-creators');

const SIDE_LENGTH = 50_000;
const VERTICAL_SPACING = 20_000;
const OBJECT_HEIGHT = SIDE_LENGTH + VERTICAL_SPACING;

const PADDING = 10_000;

const SQUARE_1 = createRecordPath(createClosedSquare(0, 0, SIDE_LENGTH), PADDING);

const SQUARE_2 = createRecordPath(createClosedSquare(0, OBJECT_HEIGHT, SIDE_LENGTH), PADDING);

const SQUARE_3 = createRecordPath(createClosedSquare(0, 2 * OBJECT_HEIGHT, SIDE_LENGTH), PADDING);

const SQUARE_4 = createRecordPath(createClosedSquare(0, 3 * OBJECT_HEIGHT, SIDE_LENGTH), PADDING);

const FILL_INDEX_BGR_PASTEL_PURPLE = createRecordFillColourFlat(0x20CAA2B1);
const FILL_OUT_OF_BOUNDS = createRecordFillColourFlat(200);

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(STROKE_WIDTH_1280),
      List.of(STROKE_COLOUR_BLUE),
      List.of(SQUARE_1, FILL_FLAT_RED),
      List.of(SQUARE_2, FILL_INDEX_BGR_PASTEL_PURPLE),
      List.of(SQUARE_3, FILL_OUT_OF_BOUNDS),
      List.of(SQUARE_4, FILL_FLAT_RED),
      List.of(WORK_AREA),
    ),
  )
  .build();
