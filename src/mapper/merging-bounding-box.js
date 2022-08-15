class MergingBoundingBox {
  constructor({
    minX, minY, maxX, maxY,
  }) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
  }

  merge(other) {
    if (!other) return;
    const {
      minX, maxX, minY, maxY,
    } = other;
    if ((minX >= maxX) || (minY >= maxY)) {
      return;
    }
    this.minX = this.minX ? Math.min(this.minX, minX) : minX;
    this.minY = this.minY ? Math.min(this.minY, minY) : minY;
    this.maxX = this.maxX ? Math.max(this.maxX, maxX) : maxX;
    this.maxY = this.maxY ? Math.max(this.maxY, maxY) : maxY;
  }
}

module.exports = MergingBoundingBox;
