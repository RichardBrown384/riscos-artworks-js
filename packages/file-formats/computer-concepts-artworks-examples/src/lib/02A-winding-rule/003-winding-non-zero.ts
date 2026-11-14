/*
Example: 003-winding-non-zero

Purpose:
To demonstrate the non-zero winding rule
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  WINDING_RULE_NON_ZERO,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_3000),
  createList(WINDING_RULE_NON_ZERO),
  createList(LAYER_FOREGROUND, PATH_PENTAGRAM),
  createList(WORK_AREA),
);
