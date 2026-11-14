/*
Example: 002-path-unknown-4-bit-1-clear

Purpose:
To demonstrate that if bit 1 of unknown4 is clear then the path doesn't get drawn
*/

import {
  createList,
  createRecordPathFull,
} from '@rbrown/computer-concepts-artworks';

import { createClosedEquilateralTriangle } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  STROKE_COLOUR_BLACK,
  WORK_AREA,
} from '../shared-objects.js';

const PATH = createRecordPathFull(
  0,
  createClosedEquilateralTriangle(10_000, 10_000, 100_000),
  10_000,
);

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_BLACK),
  createList(LAYER_FOREGROUND, PATH),
  createList(WORK_AREA),
);
