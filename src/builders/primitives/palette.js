const { createPalette } = require('../../types/primitives');

class Palette {
  #entries;

  constructor() {
    this.#entries = [];
  }

  static builder() {
    return new Palette();
  }

  entry(v) { this.#entries.push(v); return this; }

  build() {
    return createPalette(this.#entries);
  }
}

module.exports = Palette;
