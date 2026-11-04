/*
Example: 001-marker-start-none

Purpose:
Demonstrates no start markers.
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  START_MARKER_NONE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(START_MARKER_NONE),
  createList(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  createList(WORK_AREA),
);
