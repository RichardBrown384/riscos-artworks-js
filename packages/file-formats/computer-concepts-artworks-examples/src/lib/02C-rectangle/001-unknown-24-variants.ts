/*
Example: 001-unknown-24-variants

Purpose:

To demonstrate the purpose of the unknown value at offset 24.

All the available files have zero at this offset.

In Outline mode !AWViewer will error with the message
'Path elements out of order (1100)'.

In other modes !AWViewer will only draw a single row
of red squares. The second row will not be drawn.

Any non-zero value appears to introduce problems with
the rendering.

It's an outstanding task to determine the winding order of
the path elements in the files.

*/

import {
  ARTWORKS_PATH_TAG_BIT_31,
  ArtworksPath,
  createList,
  createPath,
  createRecordRectangle,
  List,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';

import { AffineTransform } from '../affine-transform.js';
import { createArtworks } from '../record-creators.js';
import {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_960,
  WORK_AREA,
} from '../shared-objects.js';

const RECTANGLE_PATH: ArtworksPath = createPath([
  pathMoveTo(10_000, 10_000, ARTWORKS_PATH_TAG_BIT_31),
  pathLineTo(10_000, 20_000),
  pathLineTo(20_000, 20_000),
  pathLineTo(20_000, 10_000),
  pathCloseSubPath(),
  pathEnd(),
]);

function createRectangles(rows: number, columns: number): List[] {
  const lists = [];
  let index = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const unknown24 = Math.floor(index / columns);
      const transform = new AffineTransform().translate(
        20_000 * column,
        -20_000 * row,
      );
      const record = createRecordRectangle(
        transform.transformPath(RECTANGLE_PATH),
        5_000,
        unknown24,
      );
      lists.push(createList(record));
      index += 1;
    }
  }
  return lists;
}

export default createArtworks(
  createList(FILL_FLAT_TRANSPARENT),
  createList(STROKE_WIDTH_960),
  createList(STROKE_COLOUR_RED),
  ...createRectangles(2, 16),
  createList(WORK_AREA),
);
