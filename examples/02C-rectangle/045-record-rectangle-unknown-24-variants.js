/*
Example: 045-record-rectangle-unknown-24-variants

Purpose:

To demonstrate the purpose of the unknown value at offset 24.

All the available files have zero at this offset.

In Outline mode !AWViewer will error with the message
'Path elements out of order (1100)'.
In other modes !AWViewer will only draw a single row
of red squares. The second row will not be drawn.

It's still not known how to order the path elements correctly.
However, any non-zero value appears to introduce problems with
the rendering.

*/

const {
  Builders: {
    List,
    Path,
  },

  Constants,
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_960,
  WORK_AREA,

} = require('../shared-objects');

const {
  createArtworks,
  createRecordRectangle,
} = require('../record-creators');

const AffineTransform = require('../affine-transform');

const RECTANGLE_PATH = Path.builder()
  .moveTo(10_000, 10_000, Constants.TAG_BIT_31)
  .lineTo(10_000, 20_000)
  .lineTo(20_000, 20_000)
  .lineTo(20_000, 10_000)
  .closeSubPath()
  .end()
  .build();

function createRectangles(rows, columns) {
  const lists = [];
  let index = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const unknown24 = Math.floor(index / columns);
      const transform = new AffineTransform()
        .translate(20_000 * column, -20_000 * row);
      const record = createRecordRectangle(
        transform.transformPath(RECTANGLE_PATH),
        5_000,
        unknown24,
      );
      lists.push(List.of(record));
      index += 1;
    }
  }
  return lists;
}

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_WIDTH_960),
  List.of(STROKE_COLOUR_RED),
  ...createRectangles(2, 16),
  List.of(WORK_AREA),
);
