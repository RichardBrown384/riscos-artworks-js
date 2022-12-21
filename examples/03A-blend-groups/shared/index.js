const {
  Builders: {
    List,
    BoundingBox,
    PathBoundingBox,
    PathElement,
  },
} = require('../../../src').Artworks;

const {
  createRecordPath,
  createRecordBlendGroup,
  createRecordBlendOptions,
  createRecordBlendPath,
} = require('../../record-creators');

function createBlendPath(path) {
  return path.map(
    ({ tag, points }) => PathElement.of(tag % 256, points),
  );
}

function createSimpleBlendGroup(
  startPath,
  startAttributeRecord,
  endPath,
  endAttributeRecord,
  blendSteps,
) {
  const startRecordPath = createRecordPath(
    startPath,
    10_000,
    createRecordBlendPath(createBlendPath(startPath), 10_000),
  );

  const endRecordPath = createRecordPath(
    endPath,
    10_000,
    createRecordBlendPath(createBlendPath(endPath), 10_000),
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

module.exports = createSimpleBlendGroup;
