/*
Example: 002-cap-start-round

Purpose:
To demonstrate round start caps.

NB: We use an inverted V here so that it's possible to compare, in particular,
the butt and square caps with the opposite end without the need of another reference contour.

It's then also possible to infer the default (butt caps)
 */

import { createArtworks, createList } from '../record-creators.js';
import {
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  PATH_OPEN_INVERTED_V,
  START_CAP_ROUND,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  WORK_AREA,
} from '../shared-objects.js';

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(START_CAP_ROUND),
  createList(LAYER_FOREGROUND, PATH_OPEN_INVERTED_V),
  createList(WORK_AREA),
);
