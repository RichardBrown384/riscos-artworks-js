class Artworks {
  #version;

  #children;

  constructor() {
    this.#version = 9;
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
      header: {
        version: this.#version,
      },
      children: this.#children,
    };
  }
}

module.exports = Artworks;
