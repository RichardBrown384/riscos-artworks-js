import { check } from '@rbrown/check';
import {
  ArtworksFile,
  ArtworksRecord,
  List,
} from '@rbrown/computer-concepts-artworks';

// Inverse of demoteRightSiblingRecords in denormalise.ts
//
// Demotion wraps each right sibling in a singleton child list.
// Promotion reverses this by extracting the sole record from each
// first child list and appending it to the sibling sequence.
function promoteFirstChildRecords(records: ArtworksRecord[]): ArtworksRecord[] {
  const result: ArtworksRecord[] = [];
  let current = records;

  for (;;) {
    check(current.length === 1, 'expected a singleton list');

    const [record] = current;
    check(record !== undefined, 'expected first element');

    const {
      lists: [firstList, ...lists],
      ...data
    } = record;

    result.push({ ...data, lists });

    if (!firstList) {
      break;
    }
    current = firstList.records;
  }
  return result;
}

function transformLists(lists: List[]): List[] {
  return lists.map((list: List): List => {
    const { records, ...data } = list;
    return {
      ...data,
      records: transformSubLists(promoteFirstChildRecords(records)),
    };
  });
}

function transformSubLists(records: ArtworksRecord[]): ArtworksRecord[] {
  return records.map((record: ArtworksRecord): ArtworksRecord => {
    const { lists, ...data } = record;
    return {
      ...data,
      lists: transformLists(lists),
    };
  });
}

export function normalise(artworks: ArtworksFile): ArtworksFile {
  const { lists, ...data } = artworks;
  return {
    ...data,
    lists: transformLists(lists),
  };
}
