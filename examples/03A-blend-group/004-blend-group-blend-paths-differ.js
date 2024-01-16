/*
Example: 004-blend-group-blend-paths-differ

Purpose:

To demonstrate that !AWViewer uses the blend paths to interpolate and not
the start and end paths.

!AWViewer draws start and end rectangles and intermediate triangles.

 */

const {
  Builders: {
    List,
  },
} = require('../../src').Artworks;

const {
  FILL_FLAT_RED,
  FILL_FLAT_BLUE,
  STROKE_COLOUR_TRANSPARENT,
  WINDING_RULE_EVEN_ODD,
  DASH_PATTERN_EMPTY,
  WORK_AREA,
} = require('../shared-objects');

const {
  createArtworks,
} = require('../record-creators');

const { createClosedSquare, createClosedEquilateralTriangle } = require('../path-creators');

const { createSimpleBlendGroup } = require('../simple-blend-group');

const GROUP_0 = createSimpleBlendGroup({
  startPath: createClosedSquare(100_000, 100_000, 100_000),
  startBlendPath: createClosedEquilateralTriangle(100_000, 100_000, 111_803),
  startAttributeRecord: FILL_FLAT_BLUE,
  endPath: createClosedSquare(1_000_000, 100_000, 100_000),
  endBlendPath: createClosedEquilateralTriangle(1_000_000, 100_000, 111_803),
  endAttributeRecord: FILL_FLAT_RED,
  blendSteps: 6,
});

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  List.of(STROKE_COLOUR_TRANSPARENT),
  GROUP_0,
  List.of(WORK_AREA),
);
