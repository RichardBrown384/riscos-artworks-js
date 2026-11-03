/*
Example: 003-path-initial-move-bit-31-set

Purpose:
To demonstrate that if bit 31 of the initial move is set then the path is filled.

Example 005 tests this example more fully.
 */

import {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1280,
  WORK_AREA,
} from '../shared-objects.js';

import { createClosedEquilateralTriangle } from '../path-creators.js';

import {
  createArtworks,
  createList,
  createRecordPath,
} from '../record-creators.js';
import { ARTWORKS_PATH_TAG_BIT_31 } from '@rbrown/computer-concepts-artworks';

const PATH = createRecordPath(
  createClosedEquilateralTriangle(
    10_000,
    10_000,
    100_000,
    ARTWORKS_PATH_TAG_BIT_31,
  ),
  10_000,
);

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_1280),
  createList(LAYER_FOREGROUND, PATH),
  createList(WORK_AREA),
);
