/*
Example: 002-group-unknown-4-bit-1-clear

Purpose:

To demonstrate that if bit 1 of unknown4 is clear then group doesn't get drawn
correctly in !AWViewer.

The first pentagon is partially visible but the file's bounding box appears to
be wrong.

 */

import { ArtworksRecord } from '@rbrown/computer-concepts-artworks';
import {
  FILL_FLAT_TRANSPARENT,
  LAYER_FOREGROUND,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1500,
  WORK_AREA,
} from '../shared-objects.js';
import { createClosedNSidedPolygon } from '../path-creators.js';

import {
  createArtworks,
  createList,
  createRecordGroupFull,
  createRecordPath,
} from '../record-creators.js';
import { BoundingBox } from '@rbrown/geometry';

const PENTAGON_RADIUS = 40_000;
const PENTAGON_PADDING = 10_000;

function createPentagon(x: number, y: number): ArtworksRecord {
  const path = createClosedNSidedPolygon(5, x, y, PENTAGON_RADIUS);
  return createRecordPath(path, PENTAGON_PADDING);
}

const PATH_PENTAGON_1 = createPentagon(50_000, 50_000);
const PATH_PENTAGON_2 = createPentagon(100_000, 75_000);
const PATH_PENTAGON_3 = createPentagon(150_000, 50_000);

const GROUP_BOUNDING_BOX: BoundingBox = {
  minX: 0,
  minY: 0,
  maxX: 200_000,
  maxY: 120_000,
};

const GROUP = createRecordGroupFull(
  0,
  GROUP_BOUNDING_BOX,
  createList(PATH_PENTAGON_2),
  createList(PATH_PENTAGON_3),
);

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_COLOUR_BLUE),
  createList(STROKE_WIDTH_1500),
  createList(LAYER_FOREGROUND, GROUP, PATH_PENTAGON_1),
  createList(WORK_AREA),
);
