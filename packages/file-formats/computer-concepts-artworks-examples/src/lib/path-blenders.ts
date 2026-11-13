/*

This file contains a trivial path blender. It will currently only work when
the paths you wish to blend have

1. The number of segments AND
2. Moves/sub-path closures are in the same positions

The support for splitting Béziers is somewhat rudimentary (i.e. could introduce rounding errors)
and based on a straightforward implementation of the de Casteljau algorithm.

*/

import { check } from '@rbrown/check';
import {
  ARTWORKS_PATH_TAG,
  ARTWORKS_PATH_TAG_BIT_31,
  ArtworksPath,
  ArtworksPathSegment,
  createPath,
  pathBezierTo,
  pathCloseSubPath,
  pathEnd,
  pathLineTo,
  pathMoveTo,
} from '@rbrown/computer-concepts-artworks';
import { Point } from '@rbrown/geometry';

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
  const segments: ArtworksPathSegment[] = [];
  const last: Point = { x: 0, y: 0 };
  for (let i = 0; i < path.length; i += 1) {
    const segment = path[i];
    const { flags } = segment;
    switch (segment.tag) {
      case ARTWORKS_PATH_TAG.END: {
        segments.push(pathEnd(flags));
        break;
      }
      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        segments.push(pathCloseSubPath(flags));
        break;
      }
      case ARTWORKS_PATH_TAG.MOVE: {
        const { to } = segment;
        // TODO
        // setting bit 31 here is to force the behaviour to be the same as the js code
        // as a temporary measure
        segments.push(pathMoveTo(to.x, to.y, flags | ARTWORKS_PATH_TAG_BIT_31));
        last.x = to.x;
        last.y = to.y;
        break;
      }
      case ARTWORKS_PATH_TAG.BEZIER: {
        const { cp1, cp2, to } = segment;
        segments.push(
          pathBezierTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y, flags),
        );
        last.x = to.x;
        last.y = to.y;
        break;
      }
      case ARTWORKS_PATH_TAG.LINE: {
        const { to } = segment;
        const cp1 = interpolatePoints(last, to, BEZIER_WEIGHT);
        const cp2 = interpolatePoints(last, to, 1.0 - BEZIER_WEIGHT);
        segments.push(
          pathBezierTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y, flags),
        );
        last.x = to.x;
        last.y = to.y;
        break;
      }
      default:
        throw new Error(`Unsupported path segment: ${String(segment.tag)}`);
    }
  }
  return createPath(segments);
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
  const segments: ArtworksPathSegment[] = [];
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
        segments.push(pathEnd(flags));
        break;
      }
      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        segments.push(pathCloseSubPath(flags));
        break;
      }
      case ARTWORKS_PATH_TAG.MOVE: {
        check(endSegment.tag === ARTWORKS_PATH_TAG.MOVE, 'impossible');
        const to = interpolatePoints(startSegment.to, endSegment.to, weight);
        // TODO
        // remove the flag, this is just to make sure the files are
        // binary identical
        segments.push(pathMoveTo(to.x, to.y, flags | ARTWORKS_PATH_TAG_BIT_31));
        break;
      }
      case ARTWORKS_PATH_TAG.BEZIER: {
        check(endSegment.tag === ARTWORKS_PATH_TAG.BEZIER, 'impossible');
        const cp1 = interpolatePoints(startSegment.cp1, endSegment.cp1, weight);
        const cp2 = interpolatePoints(startSegment.cp2, endSegment.cp2, weight);
        const to = interpolatePoints(startSegment.to, endSegment.to, weight);
        segments.push(
          pathBezierTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y, flags),
        );
        break;
      }
      default:
        throw new Error(
          `Unsupported path segment: ${String(startSegment.tag)}`,
        );
    }
  }
  return createPath(segments);
}

function divideLineByWeights(
  weights: number[],
  start: Point,
  end: Point,
): ArtworksPathSegment[] {
  const segments: ArtworksPathSegment[] = [];
  for (let i = 0; i < weights.length; i += 1) {
    const weight = weights[i];
    const q = interpolatePoints(start, end, weight);
    segments.push(pathLineTo(q.x, q.y));
  }
  return segments;
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
  weights: number[],
  b0: Point,
  [b1, b2, b3]: Point[],
): ArtworksPathSegment[] {
  const segments: ArtworksPathSegment[] = [];
  let bezier = [b0, b1, b2, b3];
  for (let i = 0, last = 0.0; i < weights.length; i += 1) {
    const weight = weights[i];
    const [first, second] = divideBezier(
      (weight - last) / (1.0 - last),
      bezier,
    );
    const [, p1, p2, p3] = first;
    segments.push(pathBezierTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
    last = weight;
    bezier = second;
  }
  const [, p1, p2, p3] = bezier;
  segments.push(pathBezierTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
  return segments;
}

export function createPathWithAdditionalPoints(
  path: ArtworksPath,
  weightsList: number[][],
): ArtworksPath {
  check(
    path.length === weightsList.length,
    'path and weight list must have the same length',
  );
  const segments: ArtworksPathSegment[] = [];
  const start = { x: 0, y: 0 };
  const last = { x: 0, y: 0 };
  for (let i = 0; i < path.length; i += 1) {
    const weights = weightsList[i];
    const segment = path[i];
    const { flags } = segment;
    switch (segment.tag) {
      case ARTWORKS_PATH_TAG.END: {
        segments.push(pathEnd(flags));
        break;
      }
      case ARTWORKS_PATH_TAG.CLOSE_SUB_PATH: {
        segments.push(...divideLineByWeights(weights, last, start));
        segments.push(pathCloseSubPath(flags));
        break;
      }
      case ARTWORKS_PATH_TAG.MOVE: {
        const { to } = segment;
        // TODO
        // same story with the flags
        segments.push(pathMoveTo(to.x, to.y, flags | ARTWORKS_PATH_TAG_BIT_31));
        start.x = to.x;
        start.y = to.y;
        last.x = to.x;
        last.y = to.y;
        break;
      }

      case ARTWORKS_PATH_TAG.BEZIER: {
        const { cp1, cp2, to } = segment;
        segments.push(...divideBezierByWeights(weights, last, [cp1, cp2, to]));
        last.x = to.x;
        last.y = to.y;
        break;
      }

      case ARTWORKS_PATH_TAG.LINE: {
        const { to } = segment;
        segments.push(...divideLineByWeights(weights, last, to));
        segments.push(pathLineTo(to.x, to.y));
        last.x = to.x;
        last.y = to.y;
        break;
      }

      default:
        throw new Error(`Unsupported path segment: ${String(segment.tag)}`);
    }
  }
  return createPath(segments);
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
