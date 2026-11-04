/*
Example: 002-stroke-magenta

Purpose:
To demonstrate setting the stroke colour.
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_MAGENTA,
  STROKE_WIDTH_1500,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_WIDTH_1500),
  createList(STROKE_COLOUR_MAGENTA),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
