const {
  createPoint, createPolyline,
} = require('../../types/primitives');

class Polyline {
  constructor() {
    this.points = [];
  }

  static builder() {
    return new Polyline();
  }

  push(x, y) {
    this.points.push(createPoint(x, y));
    return this;
  }

  build() {
    return createPolyline(this.points);
  }
}

module.exports = Polyline;
