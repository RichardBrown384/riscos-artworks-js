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

  static of(path, padding = 0) {
    const [
      first = { x: 0, y: 0 },
      ...rest
    ] = path.flatMap(({ points = [] }) => points);

    let minX = first.x;
    let minY = first.y;
    let maxX = first.x;
    let maxY = first.y;

    for (let i = 0; i < rest.length; i += 1) {
      const { x, y } = rest[i];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    return BoundingBox.builder()
      .minX(minX - padding)
      .minY(minY - padding)
      .maxX(maxX + padding)
      .maxY(maxY + padding)
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
