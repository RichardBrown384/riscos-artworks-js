/*
Example: 005-fill-radial-red-yellow

Purpose:
To demonstrate the radial gradient fills !AWViewer
 */

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_RADIAL_RED_YELLOW,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_RADIAL_RED_YELLOW),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_3000),
  createList(LAYER_FOREGROUND, PATH_PENTAGRAM),
  createList(WORK_AREA),
);
