/*
Example: 006-marker-end-arrow-tail-cap-end-triangle

Purpose:
Demonstrates the interaction between end line caps and end line markers.
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  END_CAP_TRIANGLE_W10_H10,
  END_MARKER_ARROW_TAIL_W4_H4,
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(END_CAP_TRIANGLE_W10_H10),
  createList(END_MARKER_ARROW_TAIL_W4_H4),
  createList(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  createList(WORK_AREA),
);
