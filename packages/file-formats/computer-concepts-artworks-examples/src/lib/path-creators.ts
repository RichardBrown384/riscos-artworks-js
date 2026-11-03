import {
  ArtworksPath,
  PathBuilder,
  ARTWORKS_PATH_TAG_BIT_31,
} from '@rbrown/computer-concepts-artworks';

export function createClosedEquilateralTriangle(
  x: number,
  y: number,
  sideLength: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  const width = sideLength;
  const height = 0.5 * Math.sqrt(3) * width;
  return new PathBuilder()
    .moveTo(x, y, moveOptions)
    .lineTo(x + 0.5 * width, y + height)
    .lineTo(x + width, y)
    .closeSubPath()
    .end()
    .build();
}

export function createClosedRectangle(
  x: number,
  y: number,
  w: number,
  h: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  return new PathBuilder()
    .moveTo(x, y, moveOptions)
    .lineTo(x, y + h)
    .lineTo(x + w, y + h)
    .lineTo(x + w, y)
    .closeSubPath()
    .end()
    .build();
}

export function createClosedSquare(
  x: number,
  y: number,
  sideLength: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  return createClosedRectangle(x, y, sideLength, sideLength, moveOptions);
}

export function createOpenInvertedV(
  x: number,
  y: number,
  sideLength: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  const width = sideLength;
  const height = 0.5 * Math.sqrt(3) * width;
  return new PathBuilder()
    .moveTo(x, y, moveOptions)
    .lineTo(x + 0.5 * width, y + height)
    .lineTo(x + width, y)
    .end()
    .build();
}

export function createClosedPentagram(
  x: number,
  y: number,
  radius: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  function xp(p: number) {
    return x + radius * Math.sin((2 * p * Math.PI) / 5);
  }
  function yp(p: number) {
    return y + radius * Math.cos((2 * p * Math.PI) / 5);
  }
  return new PathBuilder()
    .moveTo(xp(0), yp(0), moveOptions)
    .lineTo(xp(2), yp(2))
    .lineTo(xp(4), yp(4))
    .lineTo(xp(1), yp(1))
    .lineTo(xp(3), yp(3))
    .closeSubPath()
    .end()
    .build();
}

export function createClosedNSidedPolygon(
  n: number,
  x: number,
  y: number,
  radius: number,
  rotation = 0,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  function xp(p: number) {
    return x + radius * Math.sin(rotation + (2 * p * Math.PI) / n);
  }
  function yp(p: number) {
    return y + radius * Math.cos(rotation + (2 * p * Math.PI) / n);
  }
  const builder = new PathBuilder();
  builder.moveTo(xp(0), yp(0), moveOptions);
  for (let p = 1; p < n; p += 1) {
    builder.lineTo(xp(p), yp(p));
  }
  return builder.closeSubPath().end().build();
}
