/*
Example: 003-when-a-fill-occurs-after-a-layer-with-no-paths-then-it-is-not-used-later

Purpose:
To demonstrate that if a style attribute appears after a layer with no paths
then it is not used on subsequent paths on following layers.

!AWViewer renders a red triangle, not 30% black.
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
  createList(LAYER_FOREGROUND, FILL_FLAT_BLACK_30),
  createList(PATH_TRIANGLE),
  createList(WORK_AREA),
);
