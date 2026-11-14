/*
Example: 006-marker-start-arrow-tail-cap-start-triangle

Purpose:
Demonstrates the interaction between start line caps and start line markers.
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  START_CAP_TRIANGLE_W10_H10,
  START_MARKER_ARROW_TAIL_W4_H4,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(START_CAP_TRIANGLE_W10_H10),
  createList(START_MARKER_ARROW_TAIL_W4_H4),
  createList(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  createList(WORK_AREA),
);
