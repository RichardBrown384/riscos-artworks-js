/*
Example: 004-triangle-fill-flat-red-path-bit-1-clear

Purpose:
To demonstrate that if you don't set the path's bit 1 of unknown4 then
the path doesn't get drawn
 */

const {
  Builders: {
    Artworks,
    Lists,
    List,
    PathBoundingBox,

    RecordPath,
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

const PATH = (function p() {
  const path = createClosedEquilateralTriangle(10_000, 10_000, 100_000);
  return RecordPath.builder()
    .unknown4(0)
    .boundingBox(PathBoundingBox.of(path, 10_000))
    .path(path)
    .build();
}());

module.exports = Artworks.builder()
  .lists(
    Lists.of(
      List.of(FILL_FLAT_RED),
      List.of(LAYER_FOREGROUND, PATH),
      List.of(WORK_AREA),
    ),
  )
  .build();
