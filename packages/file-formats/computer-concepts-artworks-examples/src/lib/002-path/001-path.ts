/*
Example: 001-path

Purpose:
To demonstrate paths !AWViewer
 */

import { createArtworks, createList } from '../record-creators.js';

import {
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLACK,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_BLACK),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
