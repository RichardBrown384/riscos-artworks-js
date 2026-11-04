/*
Example: 002-stroke-width-3000

Purpose:
To demonstrate setting the stroke width.
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_3000),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
