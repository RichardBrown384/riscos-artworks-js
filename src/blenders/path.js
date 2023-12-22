/*

This file contains a trivial path blender. It will currently only work when
the paths you wish to blend have

1. The number of segments AND
2. Moves/sub-path closures are in the same positions

Adding additional points only works for poly-lines, Beziers are not yet supported.

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
      builder.moveTo(p.x, p.y, Constants.TAG_BIT_31);
      last = p;
    } else if (maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
      builder.closeSubPath();
    } else if (maskedTag === Constants.TAG_BEZIER) {
      const [b0, b1, b2] = points;
      builder.bezierTo(b0.x, b0.y, b1.x, b1.y, b2.x, b2.y);
      last = b2;
    } else if (maskedTag === Constants.TAG_LINE) {
      const b2 = points[0];
      const b0 = interpolatePoints(last, b2, BEZIER_WEIGHT);
      const b1 = interpolatePoints(last, b2, 1.0 - BEZIER_WEIGHT);
      builder.bezierTo(b0.x, b0.y, b1.x, b1.y, b2.x, b2.y);
      last = b2;
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
      builder.moveTo(p.x, p.y, Constants.TAG_BIT_31);
    } else if (maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
      builder.closeSubPath();
    } else if (maskedTag === Constants.TAG_BEZIER) {
      const b0 = interpolatePoints(startPoints[0], endPoints[0], weight);
      const b1 = interpolatePoints(startPoints[1], endPoints[1], weight);
      const b2 = interpolatePoints(startPoints[2], endPoints[2], weight);
      builder.bezierTo(b0.x, b0.y, b1.x, b1.y, b2.x, b2.y);
    }
  }
  return builder.build();
}

function insertAdditionalLines(builder, inserts, start, end) {
  for (let j = 0; j < inserts; j += 1) {
    const weight = (j + 1) / (inserts + 1);
    const q = interpolatePoints(start, end, weight);
    builder.lineTo(q.x, q.y);
  }
}

function insertAdditionalPoints(path, insertsList) {
  const builder = Path.builder();
  let start = Point.of(0, 0);
  let last = Point.of(0, 0);
  for (let i = 0; i < path.length; i += 1) {
    const { tag, points = [] } = path[i];
    const inserts = insertsList[i];
    const maskedTag = maskTag(tag);
    if (maskedTag === Constants.TAG_END) {
      builder.end();
    } else if (maskedTag === Constants.TAG_MOVE) {
      const p = points[0];
      builder.moveTo(p.x, p.y, Constants.TAG_BIT_31);
      start = p;
      last = p;
    } else if (maskedTag === Constants.TAG_CLOSE_SUB_PATH) {
      insertAdditionalLines(builder, inserts, last, start);
      builder.closeSubPath();
    } else if (maskedTag === Constants.TAG_LINE) {
      const p = points[0];
      insertAdditionalLines(builder, inserts, last, p);
      builder.lineTo(p.x, p.y);
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
  insertAdditionalPoints,
};
