/*
Example: 001-winding-none

Purpose:
To demonstrate that the default winding rule is even-odd
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_3000),
  createList(LAYER_FOREGROUND, PATH_PENTAGRAM),
  createList(WORK_AREA),
);
