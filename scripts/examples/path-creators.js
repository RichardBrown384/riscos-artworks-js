const { TAG_BIT_31 } = require('../../src/artworks');

const {
  Path,
} = require('../../src/artworks').Builders;

function createClosedEquilateralTriangle(x, y, sideLength, moveOptions = TAG_BIT_31) {
  const width = sideLength;
  const height = 0.5 * Math.sqrt(3) * width;
  return Path.builder()
    .moveTo(x, y, moveOptions)
    .lineTo(x + 0.5 * width, y + height)
    .lineTo(x + width, y)
    .closeSubPath()
    .end()
    .build();
}

function createOpenInvertedV(x, y, sideLength, moveOptions = TAG_BIT_31) {
  const width = sideLength;
  const height = 0.5 * Math.sqrt(3) * width;
  return Path.builder()
    .moveTo(x, y, moveOptions)
    .lineTo(x + 0.5 * width, y + height)
    .lineTo(x + width, y)
    .end()
    .build();
}

function createClosedPentagram(x, y, radius, moveOptions = TAG_BIT_31) {
  function xn(n) {
    return x + radius * Math.sin((2 * n * Math.PI) / 5);
  }
  function yn(n) {
    return y + radius * Math.cos((2 * n * Math.PI) / 5);
  }
  return Path.builder()
    .moveTo(xn(0), yn(0), moveOptions)
    .lineTo(xn(2), yn(2))
    .lineTo(xn(4), yn(4))
    .lineTo(xn(1), yn(1))
    .lineTo(xn(3), yn(3))
    .closeSubPath()
    .end()
    .build();
}

module.exports = {
  createClosedEquilateralTriangle,
  createOpenInvertedV,
  createClosedPentagram,
};
