/*
Example: 002-fill-flat-blue

Purpose:
To demonstrate flat fills !AWViewer
 */

import {
  FILL_FLAT_BLUE,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

import { createArtworks, createList } from '../record-creators.js';

export default createArtworks(
  createList(FILL_FLAT_BLUE),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
