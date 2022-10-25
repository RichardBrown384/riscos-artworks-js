/*
Example: 008-triangle-fill-flat-red-path-outline-only

Purpose:
To demonstrate that if you don't set bit 31 of the initial move then the path
isn't filled.

Example 046 tests this example more fully.
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  STROKE_COLOUR_BLUE,
  STROKE_WIDTH_1280,
  LAYER_FOREGROUND,
  WORK_AREA,
} = require('../shared-objects');

const {
  createClosedEquilateralTriangle,
} = require('../path-creators');

const {
  createArtworks,
  createRecordPath,
} = require('../record-creators');

const MOVE_OPTIONS = 0;

const PATH = createRecordPath(
  createClosedEquilateralTriangle(10_000, 10_000, 100_000, MOVE_OPTIONS),
  10_000,
);

module.exports = createArtworks(
  List.of(FILL_FLAT_RED),
  List.of(STROKE_COLOUR_BLUE),
  List.of(STROKE_WIDTH_1280),
  List.of(LAYER_FOREGROUND, PATH),
  List.of(WORK_AREA),
);
