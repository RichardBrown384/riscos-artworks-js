const { createColourIndex } = require('../../types/primitives');

class ColourIndex {
  #index;

  constructor() {
    this.#index = -1;
  }

  static builder() {
    return new ColourIndex();
  }

  static of(index) {
    return ColourIndex.builder().index(index).build();
  }

  index(v) { this.#index = v; return this; }

  build() {
    return createColourIndex(this.#index);
  }
}

module.exports = ColourIndex;
