/*
Example: 002-winding-even-odd

Purpose:
To demonstrate the even-odd winding rule
 */

import { createArtworks, createList } from '../record-creators.js';

import {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  WINDING_RULE_EVEN_ODD,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_3000),
  createList(WINDING_RULE_EVEN_ODD),
  createList(LAYER_FOREGROUND, PATH_PENTAGRAM),
  createList(WORK_AREA),
);
