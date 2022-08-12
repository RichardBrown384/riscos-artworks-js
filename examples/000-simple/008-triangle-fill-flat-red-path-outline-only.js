/*
Example: 008-triangle-fill-flat-red-path-outline-only

Purpose:
To demonstrate that if you don't set bit 31 of the initial move then the path
is only shown in the outline WYSIWYG mode.
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  LAYER_FOREGROUND,
  WORK_AREA,
} = require('../shared-objects');

const {
  createClosedEquilateralTriangle,
} = require('../path-creators');

const {
  createRecordPath,
} = require('../record-creators');

const PATH = createRecordPath(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000, 0),
  10_000,
);

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(LAYER_FOREGROUND, PATH),
      List.of(WORK_AREA),
    ),
  )
  .build();
