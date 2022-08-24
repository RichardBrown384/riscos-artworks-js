const Constants = require('../../constants');

const { createArtworks, createArtworksHeader } = require('../../types/structures');

class Artworks {
  #identifier;

  #version;

  #program;

  #bodyPosition;

  #lists;

  constructor() {
    this.#identifier = Constants.HEADER_IDENTIFIER;
    this.#version = Constants.HEADER_VERSION;
    this.#program = Constants.HEADER_PROGRAM;
    this.#bodyPosition = Constants.FILE_OFFSET_BODY;
    this.#lists = [];
  }

  static builder() {
    return new Artworks();
  }

  version(v) {
    this.#version = v;
    return this;
  }

  lists(lists) {
    this.#lists = lists;
    return this;
  }

  build() {
    return createArtworks(
      createArtworksHeader(
        this.#identifier,
        this.#version,
        this.#program,
        this.#bodyPosition,
      ),
      this.#lists,
    );
  }
}

module.exports = Artworks;
