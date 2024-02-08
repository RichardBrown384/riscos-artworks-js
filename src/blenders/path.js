/*

This file contains a trivial path blender. It will currently only work when
the paths you wish to blend have

1. The number of segments AND
2. Moves/sub-path closures are in the same positions

The support for splitting Béziers is somewhat rudimentary (i.e. could introduce rounding errors)
and based on a straightforward implementation of the de Casteljau algorithm.

It's here rather than in the /examples folder because it's possible this might evolve
into a path blender that supports all the necessary operations.

*/

const { extractBitField } = require('../common/bitwise');
const { Point, Path } = require('../builders/primitives');
const Constants = require('../constants');

const BEZIER_WEIGHT = 1.0 / 3.0;

function maskTag(tag) {
  return extractBitField(tag, 0, 8);
}

function interpolateValue(a, b, weight) {
  return Math.trunc(a + weight * (b - a));
}

function interpolatePoints(a, b, weight) {
  return Point.builder()
    .x(interpolateValue(a.x, b.x, weight))
    .y(interpolateValue(a.y, b.y, weight))
    .build();
}

function convertLinesToBeziers(path) {
  const builder = Path.builder();
  let last = Point.of(0, 0);
  for (let i = 0; i < path.length; i += 1) {
    const { tag, points = [] } = path[i];
    const maskedTag = maskTag(tag);
    if (maskedTag === Constants.TAG_END) {
      builder.end();
    } else if (maskedTag === Constants.TAG_MOVE) {
      const p = points[0];
      builder.moveToWithPoint(p, Constants.TAG_BIT_31);
      last = p;
    } else if (maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
      builder.closeSubPath();
    } else if (maskedTag === Constants.TAG_BEZIER) {
      const [b1, b2, b3] = points;
      builder.bezierToWithPoints(b1, b2, b3);
      last = b3;
    } else if (maskedTag === Constants.TAG_LINE) {
      const b3 = points[0];
      const b1 = interpolatePoints(last, b3, BEZIER_WEIGHT);
      const b2 = interpolatePoints(last, b3, 1.0 - BEZIER_WEIGHT);
      builder.bezierToWithPoints(b1, b2, b3);
      last = b3;
    }
  }
  return builder.build();
}

function blendBezierPaths(startPath, endPath, weight) {
  const builder = Path.builder();
  for (let i = 0; i < startPath.length; i += 1) {
    const { tag, points: startPoints = [] } = startPath[i];
    const { points: endPoints = [] } = endPath[i];
    const maskedTag = maskTag(tag);
    if (maskedTag === Constants.TAG_END) {
      builder.end();
    } else if (maskedTag === Constants.TAG_MOVE) {
      const p = interpolatePoints(startPoints[0], endPoints[0], weight);
      builder.moveToWithPoint(p, Constants.TAG_BIT_31);
    } else if (maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
      builder.closeSubPath();
    } else if (maskedTag === Constants.TAG_BEZIER) {
      const b1 = interpolatePoints(startPoints[0], endPoints[0], weight);
      const b2 = interpolatePoints(startPoints[1], endPoints[1], weight);
      const b3 = interpolatePoints(startPoints[2], endPoints[2], weight);
      builder.bezierToWithPoints(b1, b2, b3);
    }
  }
  return builder.build();
}

function divideLineByWeights(builder, weights, start, end) {
  for (let i = 0; i < weights.length; i += 1) {
    const weight = weights[i];
    const q = interpolatePoints(start, end, weight);
    builder.lineToWithPoint(q);
  }
}

function divideBezier(weight, [b0, b1, b2, b3]) {
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

function divideBezierByWeights(builder, weights, b0, [b1, b2, b3]) {
  let bezier = [b0, b1, b2, b3];
  for (let i = 0, last = 0.0; i < weights.length; i += 1) {
    const weight = weights[i];
    const [first, second] = divideBezier((weight - last) / (1.0 - last), bezier);
    const [, p1, p2, p3] = first;
    builder.bezierToWithPoints(p1, p2, p3);
    last = weight;
    bezier = second;
  }
  const [, p1, p2, p3] = bezier;
  builder.bezierToWithPoints(p1, p2, p3);
}

function createPathWithAdditionalPoints(path, weightsList) {
  const builder = Path.builder();
  let start = Point.of(0, 0);
  let last = Point.of(0, 0);
  for (let i = 0; i < path.length; i += 1) {
    const { tag, points = [] } = path[i];
    const weights = weightsList[i];
    const maskedTag = maskTag(tag);
    if (maskedTag === Constants.TAG_END) {
      builder.end();
    } else if (maskedTag === Constants.TAG_MOVE) {
      const p = points[0];
      builder.moveToWithPoint(p, Constants.TAG_BIT_31);
      start = p;
      last = p;
    } else if (maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
      divideLineByWeights(builder, weights, last, start);
      builder.closeSubPath();
    } else if (maskedTag === Constants.TAG_BEZIER) {
      const p = points[2];
      divideBezierByWeights(builder, weights, last, points);
      last = p;
    } else if (maskedTag === Constants.TAG_LINE) {
      const p = points[0];
      divideLineByWeights(builder, weights, last, p);
      builder.lineToWithPoint(p);
      last = p;
    }
  }
  return builder.build();
}

function blendPaths(startPath, endPath, weight) {
  return blendBezierPaths(
    convertLinesToBeziers(startPath),
    convertLinesToBeziers(endPath),
    weight,
  );
}

module.exports = {
  blendPaths,
  createPathWithAdditionalPoints,
};
