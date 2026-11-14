/*
Example: 005-marker-end-arrow-tail

Purpose:
Demonstrates arrow tail end markers
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
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
  createList(END_MARKER_ARROW_TAIL_W4_H4),
  createList(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  createList(WORK_AREA),
);
