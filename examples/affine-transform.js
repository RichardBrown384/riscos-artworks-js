const {
  Builders: {
    PathElement,
    Point,
  },
} = require('../src/artworks');

class AffineTransform {
  #a;

  #b;

  #c;

  #d;

  #e;

  #f;

  constructor() {
    this.#a = 1;
    this.#b = 0;
    this.#c = 0;
    this.#d = 1;
    this.#e = 0;
    this.#f = 0;
  }

  concatenate(a, b, c, d, e, f) {
    const p = this.#a; const q = this.#b;
    const r = this.#c; const s = this.#d;
    const t = this.#e; const u = this.#f;
    this.#a = a * p + c * q;
    this.#c = a * r + c * s;
    this.#e = a * t + c * u + e;
    this.#b = b * p + d * q;
    this.#d = b * r + d * s;
    this.#f = b * t + d * u + f;
  }

  translate(x, y) {
    this.concatenate(1, 0, 0, 1, x, y);
    return this;
  }

  rotate(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    this.concatenate(c, s, -s, c, 0, 0);
    return this;
  }

  scale(sx, sy) {
    this.concatenate(sx, 0, 0, sy, 0, 0);
    return this;
  }

  transformPoint = ({ x, y }) => Point.of(
    this.#a * x + this.#c * y + this.#e,
    this.#b * x + this.#d * y + this.#f,
  );

  transformCoordinate(x, y) {
    return Object.values(this.transformPoint(Point.of(x, y)));
  }

  transformPoints(points) {
    return points && points.map(this.transformPoint);
  }

  transformPolyline(polyline) {
    return polyline.map(this.transformPoint);
  }

  transformPath(path) {
    return path.map(
      ({ tag, points }) => PathElement.of(tag, this.transformPoints(points)),
    );
  }
}

module.exports = AffineTransform;
