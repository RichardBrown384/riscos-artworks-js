const Constants = require('../../constants');

const { createHeader } = require('../../types/primitives');

class Artworks {
  #identifier;

  #version;

  #program;

  #bodyPosition;

  #children;

  constructor() {
    this.#identifier = Constants.HEADER_IDENTIFIER;
    this.#version = Constants.HEADER_VERSION;
    this.#program = Constants.HEADER_PROGRAM;
    this.#bodyPosition = Constants.FILE_OFFSET_BODY;
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
      header: createHeader(
        this.#identifier,
        this.#version,
        this.#program,
        this.#bodyPosition,
      ),
      children: this.#children,
    };
  }
}

module.exports = Artworks;
