const {
  Builders: {
    Path,
  },
  Constants: {
    TAG_BIT_31,
  },
} = require('../src').Artworks;

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

function createClosedRectangle(x, y, w, h, moveOptions = TAG_BIT_31) {
  return Path.builder()
    .moveTo(x, y, moveOptions)
    .lineTo(x, y + h)
    .lineTo(x + w, y + h)
    .lineTo(x + w, y)
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
  function xp(p) {
    return x + radius * Math.sin((2 * p * Math.PI) / 5);
  }
  function yp(p) {
    return y + radius * Math.cos((2 * p * Math.PI) / 5);
  }
  return Path.builder()
    .moveTo(xp(0), yp(0), moveOptions)
    .lineTo(xp(2), yp(2))
    .lineTo(xp(4), yp(4))
    .lineTo(xp(1), yp(1))
    .lineTo(xp(3), yp(3))
    .closeSubPath()
    .end()
    .build();
}

function createClosedNSidedPolygon(n, x, y, radius, moveOptions = TAG_BIT_31) {
  function xp(p) {
    return x + radius * Math.sin((2 * p * Math.PI) / n);
  }
  function yp(p) {
    return y + radius * Math.cos((2 * p * Math.PI) / n);
  }
  const builder = Path.builder();
  builder.moveTo(xp(0), yp(0), moveOptions);
  for (let p = 1; p < n; p += 1) {
    builder.lineTo(xp(p), yp(p));
  }
  return builder
    .closeSubPath()
    .end()
    .build();
}

module.exports = {
  createClosedEquilateralTriangle,
  createClosedRectangle,
  createOpenInvertedV,
  createClosedPentagram,
  createClosedNSidedPolygon,
};
