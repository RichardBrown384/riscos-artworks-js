/*
Example: 001-when-two-fills-occur-before-a-path-then-the-second-is-used

Purpose:

To demonstrate that when two fills occur before a path then the path is shaded
using the second colour.

!AWViewer should render a 30% black triangle, not red.
 */

import {
  FILL_FLAT_BLACK_30,
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  PATH_TRIANGLE,
  WORK_AREA,
} from '../shared-objects.js';

import { createArtworks, createList } from '../record-creators.js';

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(FILL_FLAT_BLACK_30),
  createList(LAYER_FOREGROUND, PATH_TRIANGLE),
  createList(WORK_AREA),
);
