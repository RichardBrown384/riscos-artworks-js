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
    BoundingBox,

    Record2C,
  },

  UNKNOWN_4_BIT_1,

  TAG_BIT_31,
} = require('../../src/artworks');

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_RED,
  STROKE_WIDTH_960,
  WORK_AREA,

} = require('../shared-objects');

const AffineTransform = require('../affine-transform');

const UNTRANSFORMED_PATH = Path.builder()
  .moveTo(10_000, 10_000, TAG_BIT_31)
  .lineTo(10_000, 20_000)
  .lineTo(20_000, 20_000)
  .lineTo(20_000, 10_000)
  .closeSubPath()
  .end()
  .build();

const ROWS = 2;
const COLUMNS = 16;

function createRecord2C(unknown24, path) {
  return Record2C.builder()
    .unknown4(UNKNOWN_4_BIT_1)
    .boundingBox(BoundingBox.of(path, 5_000))
    .unknown24(unknown24)
    .path(path)
    .build();
}

function createRecords2C() {
  const lists = [];
  let index = 0;
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const unknown24 = Math.floor(index / COLUMNS);
      const transform = new AffineTransform()
        .translate(20_000 * column, -20_000 * row);
      const record = createRecord2C(
        unknown24,
        transform.transformPath(UNTRANSFORMED_PATH),
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
      ...createRecords2C(),
      List.of(WORK_AREA),
    ),
  )
  .build();
