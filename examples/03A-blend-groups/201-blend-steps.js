/*
Example: 201-blend-steps

Purpose:

To demonstrate how blend steps work.

Note a couple of issues:

1. If you change first blend steps value to be zero (not one) only one solitary rectangle is drawn
2. The intermediate steps are stroked white in the simple view. Not sure why this is the case.

 */

const {
  Builders: {
    List,
    BoundingBox,
    PathBoundingBox,
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
  createClosedRectangle,
} = require('../path-creators');

const {
  createArtworks,
  createRecordPath,
  createRecordBlendGroup,
  createRecordBlendOptions,
  createRecordBlendPath,
} = require('../record-creators');

function createSimpleBlendGroup({
  sx, sy, sw, sh,
}, {
  ex, ey, ew, eh,
}, blendSteps) {
  const startPath = createClosedRectangle(sx, sy, sw, sh);
  const startBlendPath = createClosedRectangle(sx, sy, sw, sh, 0);

  const recordPathStart = createRecordPath(
    startPath,
    10_000,
    createRecordBlendPath(startBlendPath, 10_000),
  );

  const endPath = createClosedRectangle(ex, ey, ew, eh);
  const endBlendPath = createClosedRectangle(ex, ey, ew, eh, 0);

  const recordPathEnd = createRecordPath(
    endPath,
    10_000,
    FILL_FLAT_BLUE,
    createRecordBlendPath(endBlendPath, 10_000),
  );

  const blendGroupBoundingBox = BoundingBox.union(
    PathBoundingBox.of(endPath, 10_000),
    PathBoundingBox.of(startPath, 10_000),
  );

  const recordBlendOptions = createRecordBlendOptions(blendGroupBoundingBox, blendSteps);

  const recordBlendGroup = createRecordBlendGroup(
    blendGroupBoundingBox,
    List.of(recordBlendOptions),
    List.of(recordPathEnd, STROKE_COLOUR_TRANSPARENT),
  );

  return List.of(recordBlendGroup, recordPathStart, FILL_FLAT_RED);
}

function createSimpleBlendGroups() {
  const groups = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      const index = 4 * row + col + 1;
      const group = createSimpleBlendGroup({
        sx: 10_000 + 100_000 * col, sy: 10_000 + 100_000 * row, sw: 50_000, sh: 50_000,
      }, {
        ex: 30_000 + 100_000 * col, ey: 30_000 + 100_000 * row, ew: 20_000, eh: 20_000,
      }, index);
      groups.push(group);
    }
  }
  return groups;
}

module.exports = createArtworks(
  List.of(WINDING_RULE_EVEN_ODD),
  List.of(DASH_PATTERN_EMPTY),
  ...createSimpleBlendGroups(),
  List.of(WORK_AREA),
);
