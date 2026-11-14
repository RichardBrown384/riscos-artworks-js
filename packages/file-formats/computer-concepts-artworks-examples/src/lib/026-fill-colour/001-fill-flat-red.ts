/*
Example: 001-fill-flat-red

Purpose:
To demonstrate flat fills !AWViewer
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
