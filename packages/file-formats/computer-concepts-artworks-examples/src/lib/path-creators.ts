import {
  ARTWORKS_PATH_TAG_BIT_31,
  ArtworksPath,
  ArtworksPathSegment,
  createPath,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';

export function createClosedEquilateralTriangle(
  x: number,
  y: number,
  sideLength: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  const width = sideLength;
  const height = 0.5 * Math.sqrt(3) * width;
  return createPath([
    pathMoveTo(x, y, moveOptions),
    pathLineTo(x + 0.5 * width, y + height),
    pathLineTo(x + width, y),
    pathCloseSubPath(),
    pathEnd(),
  ]);
}

export function createClosedRectangle(
  x: number,
  y: number,
  w: number,
  h: number,
  moveOptions = ARTWORKS_PATH_TAG_BIT_31,
): ArtworksPath {
  return createPath([
    pathMoveTo(x, y, moveOptions),
    pathLineTo(x, y + h),
    pathLineTo(x + w, y + h),
    pathLineTo(x + w, y),
    pathCloseSubPath(),
    pathEnd(),
  ]);
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
  return createPath([
    pathMoveTo(x, y, moveOptions),
    pathLineTo(x + 0.5 * width, y + height),
    pathLineTo(x + width, y),
    pathEnd(),
  ]);
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
  return createPath([
    pathMoveTo(xp(0), yp(0), moveOptions),
    pathLineTo(xp(2), yp(2)),
    pathLineTo(xp(4), yp(4)),
    pathLineTo(xp(1), yp(1)),
    pathLineTo(xp(3), yp(3)),
    pathCloseSubPath(),
    pathEnd(),
  ]);
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
  const segments: ArtworksPathSegment[] = [];
  segments.push(pathMoveTo(xp(0), yp(0), moveOptions));
  for (let p = 1; p < n; p += 1) {
    segments.push(pathLineTo(xp(p), yp(p)));
  }
  segments.push(pathCloseSubPath());
  segments.push(pathEnd());
  return createPath(segments);
}
