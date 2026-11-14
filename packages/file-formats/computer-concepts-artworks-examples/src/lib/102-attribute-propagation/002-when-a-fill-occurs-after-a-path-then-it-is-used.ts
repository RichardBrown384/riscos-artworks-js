/*
Example: 002-when-a-fill-occurs-after-a-path-then-it-is-used

Purpose:
To demonstrate that if a style attribute appears after a path
then that overrides the preceding attribute.

!AWViewer renders a 30% black triangle, not red.
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE, FILL_FLAT_BLACK_30),
  createList(WORK_AREA),
);
