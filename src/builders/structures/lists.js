const { createLists } = require('../../types/structures');

class Lists {
  #lists;

  constructor() {
    this.#lists = [];
  }

  static builder() {
    return new Lists();
  }

  static of(...v) {
    const builder = Lists.builder();
    for (let i = 0; i < v.length; i += 1) {
      builder.push(v[i]);
    }
    return builder.build();
  }

  push(list) { this.#lists.push(list); return this; }

  build() {
    return createLists(this.#lists);
  }
}

module.exports = Lists;
