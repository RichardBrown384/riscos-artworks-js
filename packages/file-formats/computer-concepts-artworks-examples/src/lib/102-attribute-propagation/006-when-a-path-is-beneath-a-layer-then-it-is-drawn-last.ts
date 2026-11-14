/*
Example: 006-when-a-path-is-beneath-a-layer-then-it-is-drawn-last

Purpose:

Draws a 30% black triangle, stroked red with a stroke width of 3000 behind a red pentagram,
stroked blue with a stroke width of 6000.

This example demonstrates two things.

Firstly, the order in which things are drawn:
The layer's siblings (the triangle) are drawn first and end up
behind the layer's descendants (the pentagram).

Secondly, some details about how attributes are propagated:

The triangle doesn't inherit any properties from the pentagram and vice versa.
The rules appear to be

1. Attribute changes that happen beneath the layer stay beneath the layer.
2. Attribute changes that happen at the same level as the layer don't propagate down.
(Otherwise in this case the pentagram would be stroked red).

*/

import {
  createList,
  createRecordLayer,
  createRecordPath,
} from '@rbrown/computer-concepts-artworks';

import { createClosedPentagram } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  FILL_FLAT_RED,
  PATH_TRIANGLE,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,
  WORK_AREA,
} from '../shared-objects.js';

const PENTAGRAM = createClosedPentagram(100_000, 100_000, 80_000);
const PATH_PENTAGRAM = createRecordPath(
  PENTAGRAM,
  10_000,
  STROKE_WIDTH_6000,
  FILL_FLAT_RED,
);

const LAYER = createRecordLayer(
  'Foreground',
  createList(PATH_PENTAGRAM, STROKE_COLOUR_BLUE),
);

export default createArtworks(
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_RED),
  createList(LAYER, PATH_TRIANGLE, STROKE_WIDTH_3000),
  createList(WORK_AREA),
);
