const {
  Builders: {
    List,
    BoundingBox,
    PathBoundingBox,
  },
} = require('../../../src').Artworks;

const {
  createClosedRectangle,
} = require('../../path-creators');

const {
  createRecordPath,
  createRecordBlendGroup,
  createRecordBlendOptions,
  createRecordBlendPath,
} = require('../../record-creators');

function createRectangle(x, y, w, h) {
  return {
    x, y, w, h,
  };
}

function createSimpleBlendGroup(
  startPath,
  startBlendPath,
  startAttributeRecord,
  endPath,
  endBlendPath,
  endAttributeRecord,
  blendSteps,
) {
  const startRecordPath = createRecordPath(
    startPath,
    10_000,
    createRecordBlendPath(startBlendPath, 10_000),
  );

  const endRecordPath = createRecordPath(
    endPath,
    10_000,
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
    List.of(endRecordPath, endAttributeRecord),
  );

  return List.of(recordBlendGroup, startRecordPath, startAttributeRecord);
}

function createSimpleRectangleBlendGroup(
  startRectangle,
  startAttributeRecord,
  endRectangle,
  endAttributeRecord,
  blendSteps,
) {
  const {
    x: sx, y: sy, w: sw, h: sh,
  } = startRectangle;
  const startPath = createClosedRectangle(sx, sy, sw, sh);
  const startBlendPath = createClosedRectangle(sx, sy, sw, sh, 0);

  const {
    x: ex, y: ey, w: ew, h: eh,
  } = endRectangle;
  const endPath = createClosedRectangle(ex, ey, ew, eh);
  const endBlendPath = createClosedRectangle(ex, ey, ew, eh, 0);

  return createSimpleBlendGroup(
    startPath,
    startBlendPath,
    startAttributeRecord,
    endPath,
    endBlendPath,
    endAttributeRecord,
    blendSteps,
  );
}

module.exports = {
  createRectangle,
  createSimpleRectangleBlendGroup,
};
