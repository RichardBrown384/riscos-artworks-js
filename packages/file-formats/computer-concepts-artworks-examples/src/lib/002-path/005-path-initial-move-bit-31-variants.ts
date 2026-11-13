/*
Example: 005-path-initial-move-bit-31-variants

Purpose:

To demonstrate the role bit 31 of the path tags.

The rule appears to be that the bit is only effective for the first move.

If the bit is set all the paths are filled.
If the bit is clear then none of the paths are filled.

For the closed paths we try setting bit 31 of the tag in all positions
to see if that impacts the rendering. The bit appears to only be relevant
for the first move.

For the open paths we try with the first move, the first line to and ending the path.

For two sub paths we try setting bit 31 for the first and second move respectively.

*/

import {
  ARTWORKS_PATH_TAG_BIT_31,
  ArtworksPath,
  createPath,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';

import {
  createArtworks,
  createList,
  createRecordPath,
} from '../record-creators.js';
import {
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_960,
  WORK_AREA,
} from '../shared-objects.js';

const CLOSED_SQUARE_FILLED: ArtworksPath = createPath([
  pathMoveTo(10_000, 10_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(10_000, 20_000),
  pathLineTo(20_000, 20_000),
  pathLineTo(20_000, 10_000),
  pathCloseSubPath(),
  pathEnd(),
]);

const CLOSED_SQUARE_NO_FILL_1: ArtworksPath = createPath([
  pathMoveTo(10_000, 50_000),
  pathLineTo(10_000, 60_000),
  pathLineTo(20_000, 60_000),
  pathLineTo(20_000, 50_000),
  pathCloseSubPath(),
  pathEnd(),
]);

const CLOSED_SQUARE_NO_FILL_2: ArtworksPath = createPath([
  pathMoveTo(10_000, 90_000),
  pathLineTo(10_000, 100_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(20_000, 100_000),
  pathLineTo(20_000, 90_000),
  pathCloseSubPath(),
  pathEnd(),
]);

const CLOSED_SQUARE_NO_FILL_3: ArtworksPath = createPath([
  pathMoveTo(10_000, 130_000),
  pathLineTo(10_000, 140_000),
  pathLineTo(20_000, 140_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(20_000, 130_000),
  pathCloseSubPath(),
  pathEnd(),
]);

const CLOSED_SQUARE_NO_FILL_4: ArtworksPath = createPath([
  pathMoveTo(10_000, 170_000),
  pathLineTo(10_000, 180_000),
  pathLineTo(20_000, 180_000),
  pathLineTo(20_000, 170_000, ARTWORKS_PATH_TAG_BIT_31),
  pathCloseSubPath(),
  pathEnd(),
]);

const CLOSED_SQUARE_NO_FILL_5: ArtworksPath = createPath([
  pathMoveTo(10_000, 210_000),
  pathLineTo(10_000, 220_000),
  pathLineTo(20_000, 220_000),
  pathLineTo(20_000, 210_000),
  pathCloseSubPath(ARTWORKS_PATH_TAG_BIT_31),
  pathEnd(),
]);

const CLOSED_SQUARE_NO_FILL_6: ArtworksPath = createPath([
  pathMoveTo(10_000, 210_000),
  pathLineTo(10_000, 220_000),
  pathLineTo(20_000, 220_000),
  pathLineTo(20_000, 210_000),
  pathCloseSubPath(),
  pathEnd(ARTWORKS_PATH_TAG_BIT_31),
]);

const OPEN_SQUARE_FILLED: ArtworksPath = createPath([
  pathMoveTo(50_000, 10_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(50_000, 20_000),
  pathLineTo(60_000, 20_000),
  pathLineTo(60_000, 10_000),
  pathEnd(),
]);

const OPEN_SQUARE_NO_FILL_1: ArtworksPath = createPath([
  pathMoveTo(50_000, 50_000),
  pathLineTo(50_000, 60_000),
  pathLineTo(60_000, 60_000),
  pathLineTo(60_000, 50_000),
  pathEnd(),
]);

const OPEN_SQUARE_NO_FILL_2: ArtworksPath = createPath([
  pathMoveTo(50_000, 50_000),
  pathLineTo(50_000, 60_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(60_000, 60_000),
  pathLineTo(60_000, 50_000),
  pathEnd(),
]);

const OPEN_SQUARE_NO_FILL_3: ArtworksPath = createPath([
  pathMoveTo(50_000, 90_000),
  pathLineTo(50_000, 100_000),
  pathLineTo(60_000, 100_000),
  pathLineTo(60_000, 90_000),
  pathEnd(ARTWORKS_PATH_TAG_BIT_31),
]);

const TWO_SUB_PATHS_FILLED: ArtworksPath = createPath([
  pathMoveTo(90_000, 10_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(90_000, 20_000),
  pathLineTo(100_000, 20_000),
  pathLineTo(100_000, 10_000),
  pathCloseSubPath(),
  pathMoveTo(110_000, 30_000),
  pathLineTo(110_000, 40_000),
  pathLineTo(120_000, 40_000),
  pathLineTo(120_000, 30_000),
  pathEnd(),
]);

const TWO_SUB_PATHS_NO_FILL_1: ArtworksPath = createPath([
  pathMoveTo(90_000, 50_000),
  pathLineTo(90_000, 60_000),
  pathLineTo(100_000, 60_000),
  pathLineTo(100_000, 50_000),
  pathCloseSubPath(),
  pathMoveTo(110_000, 70_000),
  pathLineTo(110_000, 80_000),
  pathLineTo(120_000, 80_000),
  pathLineTo(120_000, 70_000),
  pathEnd(),
]);

const TWO_SUB_PATHS_NO_FILL_2: ArtworksPath = createPath([
  pathMoveTo(90_000, 90_000),
  pathLineTo(90_000, 100_000),
  pathLineTo(100_000, 100_000),
  pathLineTo(100_000, 90_000),
  pathCloseSubPath(),
  pathMoveTo(110_000, 110_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(110_000, 120_000),
  pathLineTo(120_000, 120_000),
  pathLineTo(120_000, 110_000),
  pathEnd(),
]);

const PADDING = 50_000;

export default createArtworks(
  createList(FILL_FLAT_RED),
  createList(STROKE_WIDTH_960),
  createList(STROKE_COLOUR_BLUE),
  createList(createRecordPath(CLOSED_SQUARE_FILLED, PADDING)),
  createList(createRecordPath(CLOSED_SQUARE_NO_FILL_1, PADDING)),
  createList(createRecordPath(CLOSED_SQUARE_NO_FILL_2, PADDING)),
  createList(createRecordPath(CLOSED_SQUARE_NO_FILL_3, PADDING)),
  createList(createRecordPath(CLOSED_SQUARE_NO_FILL_4, PADDING)),
  createList(createRecordPath(CLOSED_SQUARE_NO_FILL_5, PADDING)),
  createList(createRecordPath(CLOSED_SQUARE_NO_FILL_6, PADDING)),
  createList(createRecordPath(OPEN_SQUARE_FILLED, PADDING)),
  createList(createRecordPath(OPEN_SQUARE_NO_FILL_1, PADDING)),
  createList(createRecordPath(OPEN_SQUARE_NO_FILL_2, PADDING)),
  createList(createRecordPath(OPEN_SQUARE_NO_FILL_3, PADDING)),
  createList(createRecordPath(TWO_SUB_PATHS_FILLED, PADDING)),
  createList(createRecordPath(TWO_SUB_PATHS_NO_FILL_1, PADDING)),
  createList(createRecordPath(TWO_SUB_PATHS_NO_FILL_2, PADDING)),
  createList(WORK_AREA),
);
