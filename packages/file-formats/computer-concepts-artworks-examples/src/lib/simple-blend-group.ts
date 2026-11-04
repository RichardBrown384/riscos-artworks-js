import {
  ArtworksPath,
  ArtworksRecord,
  List,
  pathBoundingBox,
} from '@rbrown/computer-concepts-artworks';
import { bboxUnion } from '@rbrown/geometry';

import {
  createList,
  createRecordBlendGroup,
  createRecordBlendGroupOptions,
  createRecordBlendPath,
  createRecordPath,
} from './record-creators.js';
import { DASH_PATTERN_EMPTY } from './shared-objects.js';

function createBlendPath(path: ArtworksPath): ArtworksPath {
  return path.map((x) => {
    return { ...x, flags: 0 };
  });
}

export interface CreateSimpleBlendGroupOptions {
  startPath: ArtworksPath;
  startBlendPath?: ArtworksPath;
  startAttributeRecord?: ArtworksRecord;
  endPath: ArtworksPath;
  endBlendPath?: ArtworksPath;
  endAttributeRecord?: ArtworksRecord;
  blendSteps: number;
}

export function createSimpleBlendGroup({
  startPath,
  startBlendPath = startPath,
  startAttributeRecord = DASH_PATTERN_EMPTY,
  endPath,
  endBlendPath = endPath,
  endAttributeRecord = DASH_PATTERN_EMPTY,
  blendSteps,
}: CreateSimpleBlendGroupOptions): List {
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

  const blendGroupBoundingBox = bboxUnion(
    pathBoundingBox(endPath, 10_000),
    pathBoundingBox(startPath, 10_000),
  );

  const recordBlendOptions = createRecordBlendGroupOptions(
    blendGroupBoundingBox,
    blendSteps,
  );

  const recordBlendGroup = createRecordBlendGroup(
    blendGroupBoundingBox,
    createList(recordBlendOptions),
    createList(endRecordPath, endAttributeRecord),
  );

  return createList(recordBlendGroup, startRecordPath, startAttributeRecord);
}

export function createSimpleAttributeBlendGroup(
  startPath: ArtworksPath,
  startAttributeRecord: ArtworksRecord,
  endPath: ArtworksPath,
  endAttributeRecord: ArtworksRecord,
  blendSteps: number,
): List {
  return createSimpleBlendGroup({
    startPath,
    startAttributeRecord,
    endPath,
    endAttributeRecord,
    blendSteps,
  });
}

export function createSimplePathBlendGroup(
  startPath: ArtworksPath,
  endPath: ArtworksPath,
  blendSteps: number,
): List {
  return createSimpleBlendGroup({
    startPath,
    endPath,
    blendSteps,
  });
}
