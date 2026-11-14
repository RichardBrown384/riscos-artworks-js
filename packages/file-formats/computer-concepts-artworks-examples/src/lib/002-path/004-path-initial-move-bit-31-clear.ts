/*
Example: 004-path-initial-move-bit-31-clear

Purpose:
To demonstrate that if bit 31 of the initial move is clear then the path isn't filled.

Example 005 tests this example more fully.
 */

import {
  createList,
  createRecordPath,
} from '@rbrown/computer-concepts-artworks';

import { createClosedEquilateralTriangle } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1280,
  WORK_AREA,
} from '../shared-objects.js';

const MOVE_OPTIONS = 0;

const PATH = createRecordPath(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000, MOVE_OPTIONS),
  10_000,
);

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_1280),
  createList(LAYER_FOREGROUND, PATH),
  createList(WORK_AREA),
);
