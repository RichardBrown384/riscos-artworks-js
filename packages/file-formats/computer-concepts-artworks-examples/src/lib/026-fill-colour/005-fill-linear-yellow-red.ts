/*
Example: 005-fill-linear-yellow-red

Purpose:
To demonstrate the linear gradient fills !AWViewer
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_LINEAR_YELLOW_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_LINEAR_YELLOW_RED),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
