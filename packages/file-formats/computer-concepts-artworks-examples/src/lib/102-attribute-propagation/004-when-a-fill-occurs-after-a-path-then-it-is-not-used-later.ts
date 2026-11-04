/*
Example: 004-when-a-fill-occurs-after-a-path-then-it-is-not-used-later

Purpose:

To demonstrate that a path consumes a subsequent style attribute and that
the attribute is not applied to subsequent paths.

Therefore, !AWViewer should render a 30% black pentagram in the background
and a red triangle on top.
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  FILL_FLAT_RED,
  PATH_PENTAGRAM,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLUE,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_COLOUR_BLUE),
  createList(PATH_PENTAGRAM, FILL_FLAT_BLACK_30),
  createList(PATH_TRIANGLE),
  createList(WORK_AREA),
);
