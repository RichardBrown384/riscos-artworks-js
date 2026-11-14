/*
Example: 001-dash-empty

Purpose:
To demonstrate that an empty dash pattern does nothing
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  DASH_PATTERN_EMPTY,
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
  createList(DASH_PATTERN_EMPTY),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
