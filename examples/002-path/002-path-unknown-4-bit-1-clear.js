/*
Example: 002-path-unknown-4-bit-1-clear

Purpose:
To demonstrate that if bit 1 of unknown4 is clear then the path doesn't get drawn
 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_TRANSPARENT,
  STROKE_COLOUR_BLACK,
  LAYER_FOREGROUND,
  WORK_AREA,
} = require('../shared-objects');

const { createArtworks, createRecordPathFull } = require('../record-creators');

const {
  createClosedEquilateralTriangle,
} = require('../path-creators');

const PATH = createRecordPathFull(
  0,
  createClosedEquilateralTriangle(10_000, 10_000, 100_000),
  10_000,
);

module.exports = createArtworks(
  List.of(FILL_FLAT_TRANSPARENT),
  List.of(STROKE_COLOUR_BLACK),
  List.of(LAYER_FOREGROUND, PATH),
  List.of(WORK_AREA),
);
