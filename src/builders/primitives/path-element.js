const Constants = require('../../constants');

const { createPathElement } = require('../../types/primitives');

class PathElement {
  #tag;

  #points;

  constructor() {
    this.#tag = Constants.TAG_END;
  }

  static builder() {
    return new PathElement();
  }

  static of(tag, points) {
    return PathElement.builder()
      .tag(tag)
      .points(points)
      .build();
  }

  tag(v) { this.#tag = v; return this; }

  points(v) { this.#points = v; return this; }

  build() {
    return createPathElement(this.#tag, this.#points);
  }
}

module.exports = PathElement;
