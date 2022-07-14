const Constants = require('../../constants');

const {
  createPoint,
  createPathElement,
  createPath,
} = require('../../types/primitives');

class Path {
  constructor() {
    this.elements = [];
  }

  static builder() {
    return new Path();
  }

  push(tag, points) {
    this.elements.push(createPathElement(tag, points));
  }

  end() {
    this.push(Constants.TAG_END);
    return this;
  }

  moveTo(x0, y0, options = 0) {
    this.push(Constants.TAG_MOVE + options, [
      createPoint(x0, y0),
    ]);
    return this;
  }

  closeSubPath() {
    this.push(Constants.TAG_CLOSE_SUB_PATH);
    return this;
  }

  bezierTo(x0, y0, x1, y1, x2, y2) {
    this.push(Constants.TAG_BEZIER, [
      createPoint(x0, y0),
      createPoint(x1, y1),
      createPoint(x2, y2),
    ]);
    return this;
  }

  lineTo(x0, y0) {
    this.push(Constants.TAG_LINE, [
      createPoint(x0, y0),
    ]);
    return this;
  }

  build() {
    return createPath(this.elements);
  }
}

module.exports = Path;
