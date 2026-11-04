import { BoundingBox } from '@rbrown/geometry';

import { createList } from '../structures/index.js';
import { ArtworksRecord, List } from '../types/index.js';

export const ZERO_BOUNDING_BOX: BoundingBox = {
  minX: 0,
  minY: 0,
  maxX: 0,
  maxY: 0,
} as const;

export function createAttributeLists(attributes: ArtworksRecord[]): List[] {
  const lists: List[] = [];
  for (const attribute of attributes) {
    lists.push(createList(attribute));
  }
  return lists;
}
