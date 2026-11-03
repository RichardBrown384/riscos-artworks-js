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
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_960,
  WORK_AREA,
} from '../shared-objects.js';

import {
  createArtworks,
  createList,
  createRecordPath,
} from '../record-creators.js';
import {
  ArtworksPath,
  PathBuilder,
  ARTWORKS_PATH_TAG_BIT_31,
} from '@rbrown/computer-concepts-artworks';

const CLOSED_SQUARE_FILLED: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 10_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(10_000, 20_000)
  .lineTo(20_000, 20_000)
  .lineTo(20_000, 10_000)
  .closeSubPath()
  .end()
  .build();

const CLOSED_SQUARE_NO_FILL_1: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 50_000)
  .lineTo(10_000, 60_000)
  .lineTo(20_000, 60_000)
  .lineTo(20_000, 50_000)
  .closeSubPath()
  .end()
  .build();

const CLOSED_SQUARE_NO_FILL_2: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 90_000)
  .lineTo(10_000, 100_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(20_000, 100_000)
  .lineTo(20_000, 90_000)
  .closeSubPath()
  .end()
  .build();

const CLOSED_SQUARE_NO_FILL_3: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 130_000)
  .lineTo(10_000, 140_000)
  .lineTo(20_000, 140_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(20_000, 130_000)
  .closeSubPath()
  .end()
  .build();

const CLOSED_SQUARE_NO_FILL_4: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 170_000)
  .lineTo(10_000, 180_000)
  .lineTo(20_000, 180_000)
  .lineTo(20_000, 170_000, ARTWORKS_PATH_TAG_BIT_31)
  .closeSubPath()
  .end()
  .build();

const CLOSED_SQUARE_NO_FILL_5: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 210_000)
  .lineTo(10_000, 220_000)
  .lineTo(20_000, 220_000)
  .lineTo(20_000, 210_000)
  .closeSubPath(ARTWORKS_PATH_TAG_BIT_31)
  .end()
  .build();

const CLOSED_SQUARE_NO_FILL_6: ArtworksPath = new PathBuilder()
  .moveTo(10_000, 210_000)
  .lineTo(10_000, 220_000)
  .lineTo(20_000, 220_000)
  .lineTo(20_000, 210_000)
  .closeSubPath()
  .end(ARTWORKS_PATH_TAG_BIT_31)
  .build();

const OPEN_SQUARE_FILLED: ArtworksPath = new PathBuilder()
  .moveTo(50_000, 10_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(50_000, 20_000)
  .lineTo(60_000, 20_000)
  .lineTo(60_000, 10_000)
  .end()
  .build();

const OPEN_SQUARE_NO_FILL_1: ArtworksPath = new PathBuilder()
  .moveTo(50_000, 50_000)
  .lineTo(50_000, 60_000)
  .lineTo(60_000, 60_000)
  .lineTo(60_000, 50_000)
  .end()
  .build();

const OPEN_SQUARE_NO_FILL_2: ArtworksPath = new PathBuilder()
  .moveTo(50_000, 50_000)
  .lineTo(50_000, 60_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(60_000, 60_000)
  .lineTo(60_000, 50_000)
  .end()
  .build();

const OPEN_SQUARE_NO_FILL_3: ArtworksPath = new PathBuilder()
  .moveTo(50_000, 90_000)
  .lineTo(50_000, 100_000)
  .lineTo(60_000, 100_000)
  .lineTo(60_000, 90_000)
  .end(ARTWORKS_PATH_TAG_BIT_31)
  .build();

const TWO_SUB_PATHS_FILLED: ArtworksPath = new PathBuilder()
  .moveTo(90_000, 10_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(90_000, 20_000)
  .lineTo(100_000, 20_000)
  .lineTo(100_000, 10_000)
  .closeSubPath()
  .moveTo(110_000, 30_000)
  .lineTo(110_000, 40_000)
  .lineTo(120_000, 40_000)
  .lineTo(120_000, 30_000)
  .end()
  .build();

const TWO_SUB_PATHS_NO_FILL_1: ArtworksPath = new PathBuilder()
  .moveTo(90_000, 50_000)
  .lineTo(90_000, 60_000)
  .lineTo(100_000, 60_000)
  .lineTo(100_000, 50_000)
  .closeSubPath()
  .moveTo(110_000, 70_000)
  .lineTo(110_000, 80_000)
  .lineTo(120_000, 80_000)
  .lineTo(120_000, 70_000)
  .end()
  .build();

const TWO_SUB_PATHS_NO_FILL_2: ArtworksPath = new PathBuilder()
  .moveTo(90_000, 90_000)
  .lineTo(90_000, 100_000)
  .lineTo(100_000, 100_000)
  .lineTo(100_000, 90_000)
  .closeSubPath()
  .moveTo(110_000, 110_000, ARTWORKS_PATH_TAG_BIT_31)
  .lineTo(110_000, 120_000)
  .lineTo(120_000, 120_000)
  .lineTo(120_000, 110_000)
  .end()
  .build();

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
