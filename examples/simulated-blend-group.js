const {
  Builders: {
    List,
  },
  Blenders: {
    blendPaths,
    createPathWithAdditionalPoints,
  },
} = require('../src').Artworks;

const {
  createRecordPath,
} = require('./record-creators');

function createBlendedPathRecords(startPath, endPath, steps) {
  const result = [];
  for (let i = 0; i < steps + 1; i += 1) {
    const weight = i / steps;
    const blended = blendPaths(startPath, endPath, weight);
    result.push(List.of(createRecordPath(blended, 10_000)));
  }
  return result;
}

function createBlendedPathRecordsWithWeights({
  startPath,
  startWeights,
  endPath,
  endWeights,
  steps,
}) {
  return createBlendedPathRecords(
    (startWeights && createPathWithAdditionalPoints(startPath, startWeights)) || startPath,
    (endWeights && createPathWithAdditionalPoints(endPath, endWeights)) || endPath,
    steps,
  );
}

function convertInsertsToWeights(inserts) {
  const weights = [];
  for (let i = 0; i < inserts; i += 1) {
    weights.push((i + 1) / (inserts + 1));
  }
  return weights;
}

function convertInsertsListToWeightsList(insertsList) {
  const weightsList = [];
  for (let i = 0; i < insertsList.length; i += 1) {
    weightsList.push(convertInsertsToWeights(insertsList[i]));
  }
  return weightsList;
}

module.exports = {
  createBlendedPathRecordsWithWeights,
  convertInsertsListToWeightsList,
};
