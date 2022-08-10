/*
Example: 045-record-2c-examples

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
    Artworks,
    Lists,
    List,
    Path,
  },

  TAG_BIT_31,
} = require('../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_960,
  WORK_AREA,

} = require('../shared-objects');

const {
  createRecord2C,
} = require('../record-creators');

const AffineTransform = require('../affine-transform');

const UNTRANSFORMED_PATH = Path.builder()
  .moveTo(10_000, 10_000, TAG_BIT_31)
  .lineTo(10_000, 20_000)
  .lineTo(20_000, 20_000)
  .lineTo(20_000, 10_000)
  .closeSubPath()
  .end()
  .build();

function createGeometry(rows, columns) {
  const lists = [];
  let index = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const unknown24 = Math.floor(index / columns);
      const transform = new AffineTransform()
        .translate(20_000 * column, -20_000 * row);
      const record = createRecord2C(
        transform.transformPath(UNTRANSFORMED_PATH),
        5_000,
        unknown24,
      );
      lists.push(List.of(record));
      index += 1;
    }
  }
  return lists;
}

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_TRANSPARENT),
      List.of(STROKE_WIDTH_960),
      List.of(STROKE_COLOUR_RED),
      ...createGeometry(2, 16),
      List.of(WORK_AREA),
    ),
  )
  .build();
