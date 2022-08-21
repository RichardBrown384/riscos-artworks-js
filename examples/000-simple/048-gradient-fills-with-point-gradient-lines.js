/*
Example: 048-gradient-fills-with-point-gradient-lines

Purpose:

To demonstrate what happens when you have gradient lines that point

1. A path filled with a flat path
2. A path filled with a linear gradient with a gradient line of length zero (i.e. a point)
3. A path filled with a linear gradient with a gradient line of length 5000
4. A path filled with a linear gradient with a gradient line of length 100
5. A path filled with a redial gradient with a gradient line of length zero (i.e. a point)
6. A path filled with a redial gradient with a gradient line of length 5000
7. A path filled with a redial gradient with a gradient line of length 100
8. A path filled with a flat path.

All elements render indicating that having gradient lines of length zero is tolerated by !AWViewer.

The radial gradient behaves almost as one would expect.
That is to say that the end of the gradient line is reached immediately,
and the shape is filled with the end colour.

The linear gradient is a little more interesting.

Once the length of the gradient line (N.B. we only tested with
purely horizontal or vertical linear gradients)
drops below about approximately 2200 ArtWorks units
how the path is rendered depends on the zoom level.

When zoomed in the path will render as you would expect
but as you zoom out the path is filled with the start colour.

With a linear gradient length of zero that path is always filled
with the start colour irrespective of the zoom level.

 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
  Constants,
} = require('../../src').Artworks;

const {
  STROKE_WIDTH_1280,
  STROKE_COLOUR_BLUE,
  FILL_FLAT_RED,
  WORK_AREA,
} = require('../shared-objects');

const { createClosedSquare } = require('../path-creators');
const { createRecordPath, createRecordFillColourGradient } = require('../record-creators');
const { DEFAULT_PALETTE_INDEX_MAGENTA, DEFAULT_PALETTE_INDEX_BLACK, DEFAULT_PALETTE_INDEX_YELLOW } = require('../default-palette');

const SIDE_LENGTH = 500_000;
const OBJECT_SPACING = 50_000;
const OBJECT_SIZE = SIDE_LENGTH + OBJECT_SPACING;

const CENTRE_X = 0.5 * SIDE_LENGTH;
const CENTRE_Y = 0.5 * SIDE_LENGTH;

const PADDING = 10_000;

function createSquarePathRecord(y, x) {
  return createRecordPath(
    createClosedSquare(x * OBJECT_SIZE, y * OBJECT_SIZE, SIDE_LENGTH),
    PADDING,
  );
}

function createFillLinear(y, x, lineLength = 0) {
  return createRecordFillColourGradient(
    Constants.FILL_LINEAR,
    x * OBJECT_SIZE + CENTRE_X,
    y * OBJECT_SIZE + CENTRE_Y,
    x * OBJECT_SIZE + CENTRE_X + lineLength,
    y * OBJECT_SIZE + CENTRE_Y,
    DEFAULT_PALETTE_INDEX_MAGENTA,
    DEFAULT_PALETTE_INDEX_BLACK,
  );
}

function createFillRadial(y, x, lineLength = 0) {
  return createRecordFillColourGradient(
    Constants.FILL_RADIAL,
    x * OBJECT_SIZE + CENTRE_X,
    y * OBJECT_SIZE + CENTRE_Y,
    x * OBJECT_SIZE + CENTRE_X + lineLength,
    y * OBJECT_SIZE + CENTRE_Y,
    DEFAULT_PALETTE_INDEX_YELLOW,
    DEFAULT_PALETTE_INDEX_BLACK,
  );
}

const SQUARE_0_0 = createSquarePathRecord(0, 0);
const SQUARE_1_0 = createSquarePathRecord(1, 0);
const SQUARE_1_1 = createSquarePathRecord(1, 1);
const SQUARE_1_2 = createSquarePathRecord(1, 2);
const SQUARE_2_0 = createSquarePathRecord(2, 0);
const SQUARE_2_1 = createSquarePathRecord(2, 1);
const SQUARE_2_2 = createSquarePathRecord(2, 2);
const SQUARE_3_0 = createSquarePathRecord(3, 0);

const FILL_POINT_LINEAR_MAGENTA_1_0 = createFillLinear(1, 0);
const FILL_POINT_LINEAR_MAGENTA_1_1 = createFillLinear(1, 1, 5_000);
const FILL_POINT_LINEAR_MAGENTA_1_2 = createFillLinear(1, 2, 100);

const FILL_POINT_RADIAL_YELLOW_2_0 = createFillRadial(2, 0);
const FILL_POINT_RADIAL_YELLOW_2_1 = createFillRadial(2, 1, 5_000);
const FILL_POINT_RADIAL_YELLOW_2_2 = createFillRadial(2, 2, 100);

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(STROKE_WIDTH_1280),
      List.of(STROKE_COLOUR_BLUE),
      List.of(SQUARE_0_0, FILL_FLAT_RED),
      List.of(SQUARE_1_0, FILL_POINT_LINEAR_MAGENTA_1_0),
      List.of(SQUARE_1_1, FILL_POINT_LINEAR_MAGENTA_1_1),
      List.of(SQUARE_1_2, FILL_POINT_LINEAR_MAGENTA_1_2),
      List.of(SQUARE_2_0, FILL_POINT_RADIAL_YELLOW_2_0),
      List.of(SQUARE_2_1, FILL_POINT_RADIAL_YELLOW_2_1),
      List.of(SQUARE_2_2, FILL_POINT_RADIAL_YELLOW_2_2),
      List.of(SQUARE_3_0, FILL_FLAT_RED),
      List.of(WORK_AREA),
    ),
  )
  .build();
