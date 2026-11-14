/*
Example: 001-stroke-width-1500

Purpose:
To demonstrate setting the stroke width.
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1500,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_1500),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
