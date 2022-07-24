const { createPoint } = require('../../types/primitives');

class Point {
  #x;

  #y;

  constructor() {
    this.#x = 0;
    this.#y = 0;
  }

  static builder() {
    return new Point();
  }

  static of(x, y) {
    return Point.builder()
      .x(x)
      .y(y)
      .build();
  }

  x(v) { this.#x = v; return this; }

  y(v) { this.#y = v; return this; }

  build() {
    return createPoint(this.#x, this.#y);
  }
}

module.exports = Point;
