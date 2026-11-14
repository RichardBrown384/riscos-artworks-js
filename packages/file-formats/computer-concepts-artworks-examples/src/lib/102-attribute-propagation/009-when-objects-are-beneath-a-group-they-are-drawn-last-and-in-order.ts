/*
Example: 009-when-objects-are-beneath-a-group-they-are-drawn-last-and-in-order

Purpose:

Draws a 30% black hexagon stroked blue
behind a red hexagon stroked red
behind a radially-filled hexagon stroked blue.

The purpose is to demonstrate that grouped objects are drawn
after the group's siblings and that the group members
are drawn in order.
*/

import {
  ArtworksRecord,
  createList,
  createRecordGroup,
  createRecordPath,
} from '@rbrown/computer-concepts-artworks';
import { BoundingBox } from '@rbrown/geometry';

import { createClosedNSidedPolygon } from '../path-creators.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_BLACK_30,
  FILL_FLAT_RED,
  FILL_RADIAL_RED_YELLOW,
  LAYER_FOREGROUND,
  STROKE_COLOUR_BLUE,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_3000,
  STROKE_WIDTH_6000,
  WORK_AREA,
} from '../shared-objects.js';

const HEXAGON_RADIUS = 40_000;
const HEXAGON_PADDING = 10_000;

function createHexagon(
  x: number,
  y: number,
  ...attributes: ArtworksRecord[]
): ArtworksRecord {
  const path = createClosedNSidedPolygon(6, x, y, HEXAGON_RADIUS);
  return createRecordPath(path, HEXAGON_PADDING, ...attributes);
}

const PATH_HEXAGON_1 = createHexagon(50_000, 50_000);
const PATH_HEXAGON_2 = createHexagon(100_000, 75_000, FILL_FLAT_RED);
const PATH_HEXAGON_3 = createHexagon(150_000, 50_000, FILL_RADIAL_RED_YELLOW);

const GROUP_BOUNDING_BOX: BoundingBox = {
  minX: 0,
  minY: 0,
  maxX: 200_000,
  maxY: 120_000,
};

const GROUP = createRecordGroup(
  GROUP_BOUNDING_BOX,
  createList(PATH_HEXAGON_2, STROKE_WIDTH_6000),
  createList(PATH_HEXAGON_3, STROKE_COLOUR_BLUE),
);

export default createArtworks(
  createList(FILL_FLAT_BLACK_30),
  createList(STROKE_COLOUR_RED),
  createList(STROKE_WIDTH_3000),
  createList(LAYER_FOREGROUND, GROUP, PATH_HEXAGON_1, STROKE_COLOUR_BLUE),
  createList(WORK_AREA),
);
