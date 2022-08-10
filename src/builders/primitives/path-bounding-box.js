const BoundingBox = require('./bounding-box');

class PathBoundingBox {
  static of(path, padding) {
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
}

module.exports = PathBoundingBox;
