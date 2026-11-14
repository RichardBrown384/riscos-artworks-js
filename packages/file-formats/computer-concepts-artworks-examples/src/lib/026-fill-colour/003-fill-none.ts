/*
Example: 003-fill-none

Purpose:
To demonstrate that !AWViewer crashes when a file doesn't contain a fill record
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
