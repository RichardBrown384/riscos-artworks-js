const { createList } = require('../../types/structures');

class List {
  #pointer;

  #list;

  constructor() {
    this.#pointer = null;
    this.#list = [];
  }

  static builder() {
    return new List();
  }

  static of(...v) {
    const builder = List.builder();
    for (let i = 0; i < v.length; i += 1) {
      builder.push(v[i]);
    }
    return builder.build();
  }

  pointer(v) { this.#pointer = v; return this; }

  push(item) {
    this.#list.push(item);
    return this;
  }

  build() {
    return createList(this.#pointer, this.#list);
  }
}

module.exports = List;
