const { createHeader } = require('../../types/primitives');

const DEFAULT_IDENTIFIER = 'Top!';
const DEFAULT_PROGRAM = 'TopDraw';

class Artworks {
  #identifier;

  #version;

  #program;

  #children;

  constructor() {
    this.#identifier = DEFAULT_IDENTIFIER;
    this.#version = 9;
    this.#version = DEFAULT_PROGRAM;
    this.#children = [];
  }

  static builder() {
    return new Artworks();
  }

  version(v) {
    this.#version = v;
    return this;
  }

  lists(lists) {
    this.#children = lists;
    return this;
  }

  build() {
    return {
      header: createHeader(this.#identifier, this.#version, this.#program),
      children: this.#children,
    };
  }
}

module.exports = Artworks;
