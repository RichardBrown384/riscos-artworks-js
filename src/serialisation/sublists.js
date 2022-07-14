class SubLists {
  #subLists;

  constructor() {
    this.#subLists = [];
  }

  add(recordPointerPosition, listsPointerPosition, lists) {
    if (lists.length === 0) {
      return;
    }
    this.#subLists.unshift({
      recordPointerPosition,
      listsPointerPosition,
      lists,
    });
  }

  getList() {
    return this.#subLists;
  }
}

module.exports = SubLists;
