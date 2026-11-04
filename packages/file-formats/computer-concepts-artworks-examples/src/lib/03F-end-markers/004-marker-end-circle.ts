/*
Example: 004-marker-end-circle

Purpose:
Demonstrates circle end markers
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  END_MARKER_CIRCLE_W6_H4,
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
  createList(END_MARKER_CIRCLE_W6_H4),
  createList(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  createList(WORK_AREA),
);
