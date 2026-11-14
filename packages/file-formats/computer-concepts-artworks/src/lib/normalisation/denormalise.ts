import {
  ArtworksFile,
  ArtworksRecord,
  List,
} from '@rbrown/computer-concepts-artworks';

// ArtWorks files on disk will typically have something like a path
// as a penultimate record in an array, followed by an attribute that
// applies to that path. The record before the path might be a layer,
// with the path belonging to that layer.
//
// To render the file using a simple depth-first traversal, we repeatedly
// take the last record and demote it to be the first child of its sibling.
// This way, the attribute ends up under the path and the path ends up under
// the layer.
function demoteRightSiblingRecords(
  records: ArtworksRecord[],
): ArtworksRecord[] {
  if (records.length === 0) {
    return [];
  }

  return [
    records.reduceRight(
      (right: ArtworksRecord, record: ArtworksRecord): ArtworksRecord => {
        const { lists, ...data } = record;
        return {
          ...data,
          lists: [{ records: [right] }, ...lists],
        };
      },
    ),
  ];
}

// Note: Given an array of records [Layer, Path, Attribute], if we were
// to demote Path and Attribute siblings first, transformSubLists would revisit
// those records. By transforming all sublists first, we only visit Path
// and Attribute once, when we move them beneath the Layer.
function transformLists(lists: List[]): List[] {
  return lists.map((list: List): List => {
    const { records, ...data } = list;
    return {
      ...data,
      records: demoteRightSiblingRecords(transformSubLists(records)),
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

export function denormalise(artworks: ArtworksFile): ArtworksFile {
  const { lists, ...data } = artworks;
  return {
    ...data,
    lists: transformLists(lists),
  };
}
