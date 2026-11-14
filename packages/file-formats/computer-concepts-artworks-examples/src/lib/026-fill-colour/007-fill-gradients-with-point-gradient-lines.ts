/*
Example: 007-fill-gradients-with-point-gradient-lines

Purpose:

To demonstrate what happens when you have gradient lines that point

Contains the following objects

1. A path filled with a flat fill
2. A path filled with a linear gradient with a gradient line of length zero (i.e. a point)
3. A path filled with a linear gradient with a gradient line of length 5000
4. A path filled with a linear gradient with a gradient line of length 100
5. A path filled with a redial gradient with a gradient line of length zero (i.e. a point)
6. A path filled with a redial gradient with a gradient line of length 5000
7. A path filled with a redial gradient with a gradient line of length 100
8. A path filled with a flat fill

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

import {
  ARTWORKS_FILL_TYPE_TAG,
  createList,
  createRecordFillColourGradient,
  createRecordPath,
} from '@rbrown/computer-concepts-artworks';

import {
  DEFAULT_PALETTE_INDEX_BLACK,
  DEFAULT_PALETTE_INDEX_MAGENTA,
  DEFAULT_PALETTE_INDEX_YELLOW,
} from '../default-palette.js';
import { createClosedSquare } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1280,
  WORK_AREA,
} from '../shared-objects.js';

const SIDE_LENGTH = 500_000;
const OBJECT_SPACING = 50_000;
const OBJECT_SIZE = SIDE_LENGTH + OBJECT_SPACING;

const CENTRE_X = 0.5 * SIDE_LENGTH;
const CENTRE_Y = 0.5 * SIDE_LENGTH;

const PADDING = 10_000;

function createSquarePathRecord(y: number, x: number) {
  return createRecordPath(
    createClosedSquare(x * OBJECT_SIZE, y * OBJECT_SIZE, SIDE_LENGTH),
    PADDING,
  );
}

function createFillLinear(y: number, x: number, lineLength = 0) {
  return createRecordFillColourGradient(
    ARTWORKS_FILL_TYPE_TAG.LINEAR,
    x * OBJECT_SIZE + CENTRE_X,
    y * OBJECT_SIZE + CENTRE_Y,
    x * OBJECT_SIZE + CENTRE_X + lineLength,
    y * OBJECT_SIZE + CENTRE_Y,
    DEFAULT_PALETTE_INDEX_MAGENTA,
    DEFAULT_PALETTE_INDEX_BLACK,
  );
}

function createFillRadial(y: number, x: number, lineLength = 0) {
  return createRecordFillColourGradient(
    ARTWORKS_FILL_TYPE_TAG.RADIAL,
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

export default createArtworks(
  createList(STROKE_WIDTH_1280),
  createList(STROKE_COLOUR_BLUE),
  createList(SQUARE_0_0, FILL_FLAT_RED),
  createList(SQUARE_1_0, FILL_POINT_LINEAR_MAGENTA_1_0),
  createList(SQUARE_1_1, FILL_POINT_LINEAR_MAGENTA_1_1),
  createList(SQUARE_1_2, FILL_POINT_LINEAR_MAGENTA_1_2),
  createList(SQUARE_2_0, FILL_POINT_RADIAL_YELLOW_2_0),
  createList(SQUARE_2_1, FILL_POINT_RADIAL_YELLOW_2_1),
  createList(SQUARE_2_2, FILL_POINT_RADIAL_YELLOW_2_2),
  createList(SQUARE_3_0, FILL_FLAT_RED),
  createList(WORK_AREA),
);
