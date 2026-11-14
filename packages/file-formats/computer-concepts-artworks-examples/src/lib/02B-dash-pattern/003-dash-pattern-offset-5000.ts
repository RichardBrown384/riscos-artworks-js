/*
Example: 003-dash-pattern-offset-5000

Purpose:
To demonstrate dash patterns with non-zero offset.
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_OFFSET_5000,
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(DASH_PATTERN_OFFSET_5000),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
