import { check } from '@rbrown/check';
import {
  ArtworksFile,
  ArtworksRecord,
  List,
} from '@rbrown/computer-concepts-artworks';

type RecordsTransformation = (records: ArtworksRecord[]) => ArtworksRecord[];

function makeSingletonLists(record: ArtworksRecord): List {
  return {
    records: [record],
  };
}

function unmakeSingletonLists(singletonLists: List): ArtworksRecord {
  check(singletonLists.records[0] !== undefined, 'Expected an artworks record');
  return singletonLists.records[0];
}

function makeSingletonList(records: ArtworksRecord[]): ArtworksRecord[] {
  const result = [...records];
  while (result.length > 1) {
    const last = result.pop();
    const penultimate = result.pop();
    check(
      last !== undefined && penultimate !== undefined,
      'Expected at least two records',
    );
    const { lists, ...data } = penultimate;
    result.push({
      ...data,
      lists: [makeSingletonLists(last), ...lists],
    });
  }
  return result;
}

function unmakeSingletonList(records: ArtworksRecord[]): ArtworksRecord[] {
  const result = [...records];
  for (;;) {
    const last = result.pop();
    check(last !== undefined, 'Expected at least one record');
    const { lists, ...data } = last;
    const [first, ...siblings] = lists;
    result.push({
      ...data,
      lists: siblings,
    });
    if (first === undefined) {
      break;
    }
    result.push(unmakeSingletonLists(first));
  }
  return result;
}

class ArtworksListTransformer {
  private readonly recordsTransformation: RecordsTransformation;
  constructor(recordsTransformation: RecordsTransformation) {
    this.recordsTransformation = recordsTransformation;
  }

  transform({ lists, ...data }: ArtworksFile): ArtworksFile {
    return {
      ...data,
      lists: this.transformLists(lists),
    };
  }

  transformLists(lists: List[] = []): List[] {
    const result: List[] = [];
    for (const list of lists) {
      const { records, ...data } = list;
      result.push({
        ...data,
        records: this.transformRecords(records),
      });
    }
    return result;
  }

  transformRecords(records: ArtworksRecord[] = []): ArtworksRecord[] {
    if (records.length === 0) {
      return records;
    }
    return this.transformSubLists(this.recordsTransformation(records));
  }

  transformSubLists(list: ArtworksRecord[]): ArtworksRecord[] {
    const result: ArtworksRecord[] = [];
    for (const record of list) {
      const { lists, ...data } = record;
      result.push({
        ...data,
        lists: this.transformLists(lists),
      });
    }
    return result;
  }
}

function transform(
  artworks: ArtworksFile,
  recordsTransformation: RecordsTransformation,
): ArtworksFile {
  return new ArtworksListTransformer(recordsTransformation).transform(artworks);
}

export function denormalise(artworks: ArtworksFile): ArtworksFile {
  return transform(artworks, makeSingletonList);
}

export function normalise(artworks: ArtworksFile): ArtworksFile {
  return transform(artworks, unmakeSingletonList);
}
