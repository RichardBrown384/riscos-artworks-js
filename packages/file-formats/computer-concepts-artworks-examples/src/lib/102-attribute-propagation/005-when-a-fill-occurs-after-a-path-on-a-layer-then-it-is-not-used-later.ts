/*
Example: 005-when-a-fill-occurs-after-a-path-on-a-layer-then-it-is-not-used-later

Purpose:

To demonstrate that, even with layers, a path consumes a subsequent style attribute and that
the attribute is not applied to subsequent paths.

Therefore, !AWViewer should render a 30% black pentagram in the background
and a red triangle on top.
*/

import { createList } from '@rbrown/computer-concepts-artworks';

import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  FILL_FLAT_RED,
  LAYER_BACKGROUND,
  LAYER_FOREGROUND,
  PATH_PENTAGRAM,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLUE,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(LAYER_BACKGROUND, PATH_PENTAGRAM, FILL_FLAT_BLACK_30),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
