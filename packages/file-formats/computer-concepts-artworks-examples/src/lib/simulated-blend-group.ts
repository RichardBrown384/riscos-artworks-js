import { ArtworksPath, List } from '@rbrown/computer-concepts-artworks';

import { blendPaths, createPathWithAdditionalPoints } from './path-blenders.js';
import { createList, createRecordPath } from './record-creators.js';

function createBlendedPathRecords(
  startPath: ArtworksPath,
  endPath: ArtworksPath,
  steps: number,
): List[] {
  const result: List[] = [];
  for (let i = 0; i < steps + 1; i += 1) {
    const weight = i / steps;
    const blended = blendPaths(startPath, endPath, weight);
    result.push(createList(createRecordPath(blended, 10_000)));
  }
  return result;
}

export type BlendedPathOptions = {
  startPath: ArtworksPath;
  startWeights?: number[][];
  endPath: ArtworksPath;
  endWeights?: number[][];
  steps: number;
};

export function createBlendedPathRecordsWithWeights({
  startPath,
  startWeights,
  endPath,
  endWeights,
  steps,
}: BlendedPathOptions): List[] {
  const normalisedStartPath = startWeights
    ? createPathWithAdditionalPoints(startPath, startWeights)
    : startPath;
  const normalisedEndPath = endWeights
    ? createPathWithAdditionalPoints(endPath, endWeights)
    : endPath;
  return createBlendedPathRecords(
    normalisedStartPath,
    normalisedEndPath,
    steps,
  );
}

function convertInsertsToWeights(inserts: number): number[] {
  const weights: number[] = [];
  for (let i = 0; i < inserts; i += 1) {
    weights.push((i + 1) / (inserts + 1));
  }
  return weights;
}

export function convertInsertsListToWeightsList(
  insertsList: number[],
): number[][] {
  const weightsList: number[][] = [];
  for (let i = 0; i < insertsList.length; i += 1) {
    weightsList.push(convertInsertsToWeights(insertsList[i]));
  }
  return weightsList;
}
