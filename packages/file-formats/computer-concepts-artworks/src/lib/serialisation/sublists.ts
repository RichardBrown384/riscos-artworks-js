import { List } from '../types/index.js';

export interface SubListsElement {
  recordPointerPosition: number;
  listsPointerPosition: number;
  lists: List[];
}

export class SubLists {
  private readonly subLists: SubListsElement[];

  constructor() {
    this.subLists = [];
  }

  add(
    recordPointerPosition: number,
    listsPointerPosition: number,
    lists: List[],
  ) {
    if (lists.length === 0) {
      return;
    }
    this.subLists.unshift({
      recordPointerPosition,
      listsPointerPosition,
      lists,
    });
  }

  getList(): SubListsElement[] {
    return this.subLists;
  }
}
