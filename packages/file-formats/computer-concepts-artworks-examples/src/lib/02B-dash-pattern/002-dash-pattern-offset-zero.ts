/*
Example: 002-dash-pattern-offset-zero

Purpose:
To demonstrate dash patterns with offset zero.
 */

import {
  DASH_PATTERN_OFFSET_0,
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

import { createArtworks, createList } from '../record-creators.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(DASH_PATTERN_OFFSET_0),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
