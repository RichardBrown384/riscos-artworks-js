const { createBoundingBox } = require('../../types/primitives');

class BoundingBox {
  #minX;

  #minY;

  #maxX;

  #maxY;

  constructor() {
    this.#minX = 0;
    this.#minY = 0;
    this.#maxX = 0;
    this.#maxY = 0;
  }

  static builder() {
    return new BoundingBox();
  }

  static union(first, ...others) {
    let {
      minX, minY, maxX, maxY,
    } = first;

    for (let i = 0; i < others.length; i += 1) {
      const other = others[i];
      if (other.minX < minX) minX = other.minX;
      if (other.minY < minY) minY = other.minY;
      if (other.maxX > maxX) maxX = other.maxX;
      if (other.maxY > maxY) maxY = other.maxY;
    }

    return BoundingBox.builder()
      .minX(minX)
      .minY(minY)
      .maxX(maxX)
      .maxY(maxY)
      .build();
  }

  minX(v) { this.#minX = v; return this; }

  minY(v) { this.#minY = v; return this; }

  maxX(v) { this.#maxX = v; return this; }

  maxY(v) { this.#maxY = v; return this; }

  build() {
    return createBoundingBox(this.#minX, this.#minY, this.#maxX, this.#maxY);
  }
}

module.exports = BoundingBox;
