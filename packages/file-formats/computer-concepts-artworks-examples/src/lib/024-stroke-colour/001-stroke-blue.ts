/*
Example: 001-stroke-blue

Purpose:
To demonstrate setting the stroke colour.
 */

import {
  FILL_FLAT_BLACK_30,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1500,
  WORK_AREA,
} from '../shared-objects.js';

import { createArtworks, createList } from '../record-creators.js';

export default createArtworks(
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_WIDTH_1500),
  createList(STROKE_COLOUR_BLUE),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
