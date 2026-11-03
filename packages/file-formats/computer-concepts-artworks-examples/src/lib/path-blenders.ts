/*

This file contains a trivial path blender. It will currently only work when
the paths you wish to blend have

1. The number of segments AND
2. Moves/sub-path closures are in the same positions

The support for splitting Béziers is somewhat rudimentary (i.e. could introduce rounding errors)
and based on a straightforward implementation of the de Casteljau algorithm.

*/

import {
  ARTWORKS_PATH_TAG,
  ArtworksPath,
  PathBuilder,
  ARTWORKS_PATH_TAG_BIT_31,
} from '@rbrown/computer-concepts-artworks';
import { Point } from '@rbrown/geometry';
import { check } from '@rbrown/check';

const BEZIER_WEIGHT = 1.0 / 3.0;

function interpolateValue(a: number, b: number, weight: number): number {
  return Math.trunc(a + weight * (b - a));
}

function interpolatePoints(a: Point, b: Point, weight: number): Point {
  return {
    x: interpolateValue(a.x, b.x, weight),
    y: interpolateValue(a.y, b.y, weight),
  };
}

function convertLinesToBeziers(path: ArtworksPath): ArtworksPath {
  const builder = new PathBuilder();
  const last: Point = { x: 0, y: 0 };
  for (let i = 0; i < path.length; i += 1) {
    const segment = path[i];
    const { flags } = segment;
    switch (segment.tag) {
      case ARTWORKS_PATH_TAG.END: {
        builder.end(flags);
        break;
      }
      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        builder.closeSubPath(flags);
        break;
      }
      case ARTWORKS_PATH_TAG.MOVE: {
        const { to } = segment;
        // TODO
        // setting bit 31 here is to force the behaviour to be the same as the js code
        // as a temporary measure
        builder.moveTo(to.x, to.y, flags | ARTWORKS_PATH_TAG_BIT_31);
        last.x = to.x;
        last.y = to.y;
        break;
      }
      case ARTWORKS_PATH_TAG.BEZIER: {
        const { cp1, cp2, to } = segment;
        builder.bezierTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y, flags);
        last.x = to.x;
        last.y = to.y;
        break;
      }
      case ARTWORKS_PATH_TAG.LINE: {
        const { to } = segment;
        const cp1 = interpolatePoints(last, to, BEZIER_WEIGHT);
        const cp2 = interpolatePoints(last, to, 1.0 - BEZIER_WEIGHT);
        builder.bezierTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y, flags);
        last.x = to.x;
        last.y = to.y;
        break;
      }
      default:
        throw new Error(`Unsupported path segment: ${String(segment.tag)}`);
    }
  }
  return builder.build();
}

function blendBezierPaths(
  startPath: ArtworksPath,
  endPath: ArtworksPath,
  weight: number,
): ArtworksPath {
  check(
    startPath.length === endPath.length,
    'blend paths must have the same length',
  );
  const builder = new PathBuilder();
  for (let i = 0; i < startPath.length; i += 1) {
    const startSegment = startPath[i];
    const endSegment = endPath[i];
    check(
      startSegment.tag === endSegment.tag,
      'blend paths must have like for like elements',
    );
    const { flags } = startSegment;
    switch (startSegment.tag) {
      case ARTWORKS_PATH_TAG.END: {
        builder.end(flags);
        break;
      }
      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        builder.closeSubPath(flags);
        break;
      }
      case ARTWORKS_PATH_TAG.MOVE: {
        check(endSegment.tag === ARTWORKS_PATH_TAG.MOVE, 'impossible');
        const to = interpolatePoints(startSegment.to, endSegment.to, weight);
        // TODO
        // remove the flag, this is just to make sure the files are
        // binary identical
        builder.moveTo(to.x, to.y, flags | ARTWORKS_PATH_TAG_BIT_31);
        break;
      }
      case ARTWORKS_PATH_TAG.BEZIER: {
        check(endSegment.tag === ARTWORKS_PATH_TAG.BEZIER, 'impossible');
        const cp1 = interpolatePoints(startSegment.cp1, endSegment.cp1, weight);
        const cp2 = interpolatePoints(startSegment.cp2, endSegment.cp2, weight);
        const to = interpolatePoints(startSegment.to, endSegment.to, weight);
        builder.bezierTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y, flags);
        break;
      }
      default:
        throw new Error(
          `Unsupported path segment: ${String(startSegment.tag)}`,
        );
    }
  }
  return builder.build();
}

function divideLineByWeights(
  builder: PathBuilder,
  weights: number[],
  start: Point,
  end: Point,
): void {
  for (let i = 0; i < weights.length; i += 1) {
    const weight = weights[i];
    const q = interpolatePoints(start, end, weight);
    builder.lineTo(q.x, q.y);
  }
}

function divideBezier(weight: number, [b0, b1, b2, b3]: Point[]): Point[][] {
  const c0 = interpolatePoints(b0, b1, weight);
  const c1 = interpolatePoints(b1, b2, weight);
  const c2 = interpolatePoints(b2, b3, weight);
  const d0 = interpolatePoints(c0, c1, weight);
  const d1 = interpolatePoints(c1, c2, weight);
  const e0 = interpolatePoints(d0, d1, weight);
  return [
    [b0, c0, d0, e0],
    [e0, d1, c2, b3],
  ];
}

function divideBezierByWeights(
  builder: PathBuilder,
  weights: number[],
  b0: Point,
  [b1, b2, b3]: Point[],
): void {
  let bezier = [b0, b1, b2, b3];
  for (let i = 0, last = 0.0; i < weights.length; i += 1) {
    const weight = weights[i];
    const [first, second] = divideBezier(
      (weight - last) / (1.0 - last),
      bezier,
    );
    const [, p1, p2, p3] = first;
    builder.bezierTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    last = weight;
    bezier = second;
  }
  const [, p1, p2, p3] = bezier;
  builder.bezierTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

export function createPathWithAdditionalPoints(
  path: ArtworksPath,
  weightsList: number[][],
): ArtworksPath {
  check(
    path.length === weightsList.length,
    'path and weight list must have the same length',
  );
  const builder = new PathBuilder();
  const start = { x: 0, y: 0 };
  const last = { x: 0, y: 0 };
  for (let i = 0; i < path.length; i += 1) {
    const weights = weightsList[i];
    const segment = path[i];
    const { flags } = segment;
    switch (segment.tag) {
      case ARTWORKS_PATH_TAG.END: {
        builder.end(flags);
        break;
      }
      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        divideLineByWeights(builder, weights, last, start);
        builder.closeSubPath(flags);
        break;
      }
      case ARTWORKS_PATH_TAG.MOVE: {
        const { to } = segment;
        // TODO
        // same story with the flags
        builder.moveTo(to.x, to.y, flags | ARTWORKS_PATH_TAG_BIT_31);
        start.x = to.x;
        start.y = to.y;
        last.x = to.x;
        last.y = to.y;
        break;
      }

      case ARTWORKS_PATH_TAG.BEZIER: {
        const { cp1, cp2, to } = segment;
        divideBezierByWeights(builder, weights, last, [cp1, cp2, to]);
        last.x = to.x;
        last.y = to.y;
        break;
      }

      case ARTWORKS_PATH_TAG.LINE: {
        const { to } = segment;
        divideLineByWeights(builder, weights, last, to);
        builder.lineTo(to.x, to.y);
        last.x = to.x;
        last.y = to.y;
        break;
      }

      default:
        throw new Error(`Unsupported path segment: ${String(segment.tag)}`);
    }
  }
  return builder.build();
}

export function blendPaths(
  startPath: ArtworksPath,
  endPath: ArtworksPath,
  weight: number,
): ArtworksPath {
  return blendBezierPaths(
    convertLinesToBeziers(startPath),
    convertLinesToBeziers(endPath),
    weight,
  );
}
