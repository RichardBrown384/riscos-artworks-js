const {
  Builders: {
    List,
    BoundingBox,
    PathBoundingBox,
    PathElement,
  },
} = require('../src').Artworks;

const {
  createRecordPath,
  createRecordBlendGroup,
  createRecordBlendOptions,
  createRecordBlendPath,
} = require('./record-creators');

const {
  DASH_PATTERN_EMPTY,
} = require('./shared-objects');

function createBlendPath(path) {
  return path.map(
    ({ tag, points }) => PathElement.of(tag % 256, points),
  );
}

function createSimpleBlendGroup({
  startPath,
  startBlendPath = startPath,
  startAttributeRecord = DASH_PATTERN_EMPTY,
  endPath,
  endBlendPath = endPath,
  endAttributeRecord = DASH_PATTERN_EMPTY,
  blendSteps,
}) {
  const startRecordPath = createRecordPath(
    startPath,
    10_000,
    createRecordBlendPath(createBlendPath(startBlendPath), 10_000),
  );

  const endRecordPath = createRecordPath(
    endPath,
    10_000,
    createRecordBlendPath(createBlendPath(endBlendPath), 10_000),
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

function createSimpleAttributeBlendGroup(
  startPath,
  startAttributeRecord,
  endPath,
  endAttributeRecord,
  blendSteps,
) {
  return createSimpleBlendGroup({
    startPath,
    startAttributeRecord,
    endPath,
    endAttributeRecord,
    blendSteps,
  });
}

function createSimplePathBlendGroup(
  startPath,
  endPath,
  blendSteps,
) {
  return createSimpleBlendGroup({
    startPath,
    endPath,
    blendSteps,
  });
}

module.exports = {
  createSimpleBlendGroup,
  createSimpleAttributeBlendGroup,
  createSimplePathBlendGroup,
};
